
import {Text,Input,Heading,Box,Select,
    Image, Button, UnorderedList, ListItem,
     Checkbox} from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import {  faCalendarDays} from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from "react"

import { useNavigate } from "react-router"
import { handleError, handleSuccess } from "../utils";
import Navbar from "./Navbar"
import Footer from "./Footer"
import React from "react"




export let CreateEvent = ()=>{
    let navigate = useNavigate()

    let [loading, setLoading] = useState(false)

    let [eventData, setEventData] = useState({
        title: "",
        media: null,
        description: "",
        location: "",
        startTime: "",
        endTime: "",
        invitees: [] // Invitees will store an array of email addresses or user IDs
    });
    
    
    function handleInvites(e) {
        const invitee = e.target.value;
        if (invitee && !eventData.invitees.includes(invitee)) {
            setEventData(prevState => ({
                ...prevState,
                invitees: [...prevState.invitees, invitee]
            }));
        }
    }

    function removeInvitee(index) {
        const updatedInvitees = [...eventData.invitees];
        updatedInvitees.splice(index, 1);
        setEventData(prevState => ({
            ...prevState,
            invitees: updatedInvitees
        }));
    }

    function handleChange(e) {
        const { name, value, files } = e.target;
        if (name === 'media') {
            setEventData({ ...eventData, [name]: files[0] });
        } 
        else {
            setEventData({ ...eventData, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let { title, startTime, endTime, location, invitees, media, description } = eventData;
        // let parse  = JSON.parse(invitees)

        // Ensure required fields are filled
        if (!title || !startTime || !location) {
            console.log("field required");
            return handleError("Field required");
            
        }

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const startDate = new Date(startTime).toISOString(); 
        const endDate = endTime ? new Date(endTime).toISOString() : startDate; 

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", eventData.description || "");
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);
        formData.append("location", location);
        formData.append("invitees", (JSON.stringify(invitees))) 
        formData.append("timeZone", timeZone);
        if (media) formData.append("media", media);

        setLoading(true);
        try {
            let url = "http://localhost:3000/event/create";
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"), 
                },
                body: formData,
            });

            const result = await response.json();
            const { msg, accessToken, refreshToken } = result;

            if (response.status === 200 && accessToken && refreshToken ) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                navigate("/");
            } else {
                navigate("/login")
                handleError(msg);
            }
        } catch (err) {
            navigate("/");
            handleError(err.message);
        } finally {
            setLoading(false);  
        }
    }


    return(
        <div className="body-cont"> 
           <Navbar/> 
     
        
        <div className="back"></div>
        <Text
            textAlign={"center"}
            padding={"30px"}
            bgGradient='linear(to-r, yellow.300, yellow.500, yellow.300)'
            bgClip='text'
            fontSize='6xl'
            fontWeight='extrabold'
            position={"absolute"} top={{md:"40px",base : "100px"}} left={{md : "500px",base:"100px"}}
           >
            Event Creation 
        </Text>
            <form id="form" onSubmit={handleSubmit}  >
        
            <Box className="left-box"   left={{md:"10%"}}
             width={"500px"} height={"470px"} padding={{md:"40px",base:"20px"}} borderWidth='1px'
              borderRadius='lg' overflow='hidden'>

                <div>
                    
                    <Text
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                        fontSize={{md : '4xl',base : "3xl"}}
                        fontWeight='extrabold'
                        >
                        Create Your Own Event
                    </Text><br />
                    <label htmlFor="event_name">Enter Your Event Name: </label> <br /> 
                    <Input variant='outline' type="text"
                        name="title" placeholder="Enter Event Name" 
                        value={eventData.title}
                        onChange={handleChange}
                         /><br /><br />

                    <div>
                        <label htmlFor="media">Upload media You Wanna Add</label><br />
                        <Input variant='outline'
                         type="file" name="media"
                          placeholder="Want to upload any file..?" 
                          onChange={handleChange}
                        /><br /><br />

                    </div>
        
                    <label htmlFor="desc">Description : </label> <br />
                    <Input variant='outline' 
                    type="text" name="description" 
                    placeholder="About your Venue"
                    value={eventData.description}
                    onChange={handleChange}
                      /><br /><br />
                    
                </div>
            </Box>


            <Box className="right-box" right={"10%"}  width={"500px"}   borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <div>
                    <Heading textAlign={"center"}
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    fontSize='4xl'
                    fontWeight='extrabold'
                    >Add Venue Details</Heading>
                    <br />
                <label htmlFor="location">Add Venue Location</label><br />
                <Input variant="outline" type="text"
                 name="location" placeholder="Select Venue Place"
                 value={eventData.location}
                 onChange={handleChange}
              /><br /><br />


                <label htmlFor="date&time">Select Date and Time: </label><br />
                <Input variant="outline" type="datetime-local"
                 name="startTime" placeholder="Select startdate and time" 
                 value={eventData.dateTime}
                onChange={handleChange}
                
             /><br /><br />
             <Input variant="outline" type="datetime-local"
                 name="endTime" placeholder="Select enddate and time" 
                 value={eventData.endTime}
                onChange={handleChange}
                
             />
             <br />
             <label htmlFor="invitee">Enter Invitee Email: </label><br />
                    <Input variant='outline' type="email"
                    name="invitee" placeholder="Invitee Email"
                    onBlur={handleInvites} // Trigger adding invitee when user leaves the input
                    /><br /><br />
                <div>
                            {eventData.invitees.length > 0 && (
                                <UnorderedList>
                                    {eventData.invitees.map((invitee, index) => (
                                        <li key={index}>
                                            {invitee} <Button size="sm" onClick={() => removeInvitee(index)}>Remove</Button>
                                        </li>
                                    ))}
                                </UnorderedList>
                            )}
                        </div>


                </div>
            </Box>
            
                <Button type="submit" position={{md:"absolute",base:"relative"}} top={{md:"200px",base:""}} id="create-event" bg={"orange"} width={"350px"}
                isLoading={loading}  // Use Chakra's isLoading prop to show loading state
                loadingText="Creating Event..."
                >Create Event</Button>
            </form>   
            <div className="context"  >
                <div id="advise" style={{ backgroundColor:"#FFC72C", width:"500px", padding:"60px 40px", color:"#AA0000" }}>
                <Heading>Why Choose Eventron..?</Heading>
                <UnorderedList>
                    <Checkbox colorScheme='green' defaultChecked>We are Faster than Anyone Around</Checkbox>
                    <Checkbox colorScheme='green' defaultChecked>We Knows What you Like</Checkbox>
                    <Checkbox colorScheme='green' defaultChecked>Offers You The Best Ways To Manage Your Events</Checkbox>
                    
                </UnorderedList>
                </div>
                
                <Text 
                fontSize={{md:"50px",base:"27px"}} marginBottom={"100px"} fontWeight={"bold"} color={"#AA0000"}>Create Your Own Events 
                <br /> With EventRon <FontAwesomeIcon color="black" icon={faCalendarDays} /></Text>

            </div>
            
      <br />
    <Footer/>
    </div>
    )

}