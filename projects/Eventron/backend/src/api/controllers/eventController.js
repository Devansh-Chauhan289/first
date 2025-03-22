import { eventData } from "../../models/eventModel.js"
import { createEvent, getAuthClient } from "../services/calendarService.js"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import mongoose from "mongoose"
import axios from "axios"
import { userData } from "../../models/userModel.js"
import multer from "multer"
import bufferToStream from "buffer-to-stream"
// let upload = multer({storage : "storage"})
import { upload } from "../middlewares/multer.js"
import { cloudinary } from "../middlewares/cloudinary.js"


dotenv.config()


const mediacontroller = async (req) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(req.file.path, (result, error) => {
            if (error) {
                console.log("Error - ", error);
                return reject("Error uploading media");
            }
            
            resolve(result.url); 
        });
    });
};



const createEventInDatabase = async (req, res) => {
    const { title, description, startTime, endTime, timeZone, location, invitees } = req.body;
    let parseInvite = JSON.parse(invitees);
    console.log("parse - ",parseInvite);
    console.log("invitees - ",invitees);

    if (!title || !startTime || !location) {
        return res.status(400).json({ msg: "Missing required fields" });
    }

    try {
        if (!Array.isArray(parseInvite)) {
            return res.status(400).json({ msg: "Invitees should be an array" });
        }
        let memberIDArr = await userData.find({email : {$in : parseInvite}}).select("_id");
        console.log(memberIDArr);
        

        // const inviteeObjectIds = memberIDArr.map((id) => new mongoose.Types.ObjectId(id));

        if (parseInvite.length > 0) {
            const users = await userData.find({ _id: { $in: memberIDArr } });
            for (let user of users) {
                if (user.email) {
                    await sendInvitationEmail(user.email, {
                        title,
                        description,
                        location,
                        dateTime: { start: { dateTime: startTime }, end: { dateTime: endTime || startTime } }
                    });
                }
            }
        }

        // Handle media upload
        
        let uploadedMedia = [];
        if(req.file){
            uploadedMedia.push( await mediacontroller(req))
        }
         
        

        // Set default end time if not provided
        let eventEndTime = endTime;
        if (!eventEndTime) {
            const startDate = new Date(startTime);
            startDate.setHours(startDate.getHours() + 1); // Add 1 hour as default duration
            eventEndTime = startDate.toISOString();
        }

        const newEvent = new eventData({
            title,
            desc: description || "",
            dateTime: {
                summary: title,
                start: {
                    dateTime: startTime,
                    timeZone: timeZone,
                },
                end: {
                    dateTime: eventEndTime,
                    timeZone: timeZone,
                },
            },
            
            location: {
                address: location,
            },
            media: uploadedMedia,
            invitees: memberIDArr,
        });

        // Google Calendar integration (optional)
        if (req.user.accessToken) {
            const oauth2Client = getAuthClient();
            oauth2Client.setCredentials({ access_token: req.user.accessToken });
            await createEvent(oauth2Client, {
                summary: title,
                description,
                start: { dateTime: startTime, timeZone: timeZone },
                end: { dateTime: eventEndTime, timeZone: timeZone },
                location,
            });
        }

        await newEvent.location.setCoordinates();
        await newEvent.save();

        // Add new event to user's created events
        const user = await userData.findById(req.user.id);
        if (user) {
            user.createdEvents.push(newEvent.id);
            await user.save();
        }

        return res.status(201).json({ msg: "Event created successfully!", newEvent });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error creating event", error: err.message });
    }
};



const getAllEvents = async (req, res) => {
    try {
        const events = await eventData.find()
        if (events.length === 0) {
            return res.status(404).json({ msg: "No Events Created yet." })
        }
        return res.status(200).json({ events })
    } catch (err) {
        return res.status(500).json({ msg: "Error creating event", error: err.message })
    }

}

const getEvent = async (req, res) => {
    const { id } = req.params

    try {
        const event = await eventData.findById(id).populate("rsvpStatus.user")
        if (!event) {
            return res.status(404).json({ msg: "Event not found." })
        }

        const eventUrl = process.env.WEBSITE_URL + `/event/${event._id}`
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${event.location.lat},${event.location.lng}`

        return res.status(200).json({ event, eventUrl, mapUrl })
    } catch (err) {
        return res.status(500).json({ msg: "Error fetching event", error: err.message })
    }
}

const getRSVPs = async (req, res) => {
    const { eventId } = req.params

    try {
        const event = await eventData.findById(eventId).populate("rsvpStatus.user")
        if (!event) return res.status(404).json({ msg: "Event not found" })

        return res.status(200).json({ rsvpStatus: event.rsvpStatus })
    } catch (err) {
        return res.status(500).json({ msg: "Error fetching RSVPs", error: err.message })
    }
}

const updateEventInDatabase = async (req, res) => {
    const { id } = req.params
    const { title, description, startTime, endTime, timeZone, location, media, invitees } = req.body

    if (!title || !startTime || !endTime || !timeZone || !location) {
        return res.status(400).json({ msg: "Missing required fields" })
    }

    if (!req.user && !req.user.accessToken) {
        return res.status(401).json({ msg: "Unauthorized" })
    }

    try {
        const event = await eventData.findById(id)
        if (!event) {
            return res.status(404).json({ msg: "Event not found" })
        }

        event.title = title || event.title
        event.desc = description || event.desc
        event.dateTime.start.dateTime = startTime || event.dateTime.start.dateTime
        event.dateTime.end.dateTime = endTime || event.dateTime.end.dateTime
        event.dateTime.start.timeZone = timeZone || event.dateTime.start.timeZone
        event.dateTime.end.timeZone = timeZone || event.dateTime.end.timeZone
        event.location.address = location || event.location.address

        if (media && Array.isArray(media)) {
            const uploadedMedia = await uploadMediaToFilestack(media)
            event.media = uploadedMedia
        }

        if (invitees && Array.isArray(invitees)) {
            const inviteeObjectIds = invitees.map((id) => new mongoose.Types.ObjectId(id))
            event.invitees = inviteeObjectIds

            const users = await userData.find({ _id: { $in: inviteeObjectIds } })
            for (let user of users) {
                if (user.email) {
                    await sendInvitationEmail(user.email, event)
                }
            }
        }

        if (req.user.accessToken) {
            const oauth2Client = getAuthClient()
            oauth2Client.setCredentials({ access_token: req.user.accessToken })

            const googleEvent = await createEvent(oauth2Client, {
                summary: title,
                description,
                start: {
                    dateTime: startTime,
                    timeZone: timeZone,
                },
                end: {
                    dateTime: endTime,
                    timeZone: timeZone,
                },
                location,
            })
        }

        await event.save()
        return res.status(200).json({ msg: "Event updated successfully!", event })
    } catch (err) {
        return res.status(500).json({ msg: "Error updating event", error: err.message })
    }
}

const deleteEvent = async (req, res) => {
    const { id } = req.params

    try {
        const event = await eventData.findByIdAndDelete(id)
        if (!event) return res.status(404).json({ msg: "Event not found" })
        return res.status(200).json({ msg: "Event deleted successfully", event })
    }
    catch (err) {
        return res.status(500).json({ msg: "Error deleting event", error: err.message })
    }
}


const updateRSVP = async (req, res) => {
    const { eventId, status,userId } = req.body
    

    if (!["attending", "maybe", "not attending"].includes(status)) {
        return res.status(400).json({ msg: "Invalid RSVP status" })
    }

    try {
        const event = await eventData.findById(eventId)
        if (!event) return res.status(404).json({ msg: "Event not found" })

        const rsvp = event.rsvpStatus.find(rsvp => rsvp.user.toString() === userId.toString())
        if (rsvp) {
            rsvp.status = status
        } else {
            event.rsvpStatus.push({ user: userId, status })
        }

        await event.save()

        if (status === "attending") {
            const user = await userData.findById(userId)
            if (user && user.email) {
                await sendInvitationEmail(user.email, event)
            }
        }

        return res.status(200).json({ msg: "RSVP updated successfully", event })
    } catch (err) {
        return res.status(500).json({ msg: "Error updating RSVP", error: err.message })
    }
}

const sendInvitationEmail = async (toEmail, event) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: toEmail,
        subject: `You're Invited to ${event.title}`,
        html: `
            <h3>Hey Creator,
            We hope this message finds you well!
            </h3>
            <h3>You are invited to attend the event <b> "${event.title}" </b> on ${new Date(event.dateTime.start.dateTime).toDateString()}.</h3>
            <h4> <b>Event details: </b> </h4>
            <h4>${event.description}</h4>
            <h4>For more details, please visit <a href="https://esports.battlegroundsmobileindia.com/"> <b>Eventron </b> </a>.</h4>         
            
            
            <a href="https://www.google.com/maps/dir//${encodeURIComponent(event.location)}"><strong>Location:</strong> ${event.location}</a>
            
            <h4><strong>Date and Time:</strong> ${new Date(event.dateTime.start.dateTime).toDateString()}</h4>
            <h4>We hope to see you there!</h4>
            <h4>Best regards,</h4>
            <h4>TEAM EVENTRON</h4>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Invitation email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Error sending invitation email");
    }
};



export {
    createEventInDatabase,
    getAllEvents,
    getEvent,
    updateEventInDatabase,
    deleteEvent,
    updateRSVP,
    getRSVPs,
    sendInvitationEmail,
    mediacontroller
}

