
import {Text,Input,Heading,Box,Select,
    Image, Button, UnorderedList, ListItem,
     Checkbox,
     Spinner,
     grid} from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import {  faCalendarDays} from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from "react"
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router"
import { handleError, handleSuccess } from "../utils";
import Navbar from "./Navbar"
import Footer from "./Footer"
import React from "react"




export let NewCreateEvent = () => {
    let navigate = useNavigate();
    let [loading, setLoading] = useState(false);
    let [eventData, setEventData] = useState({
        title: "",
        media: null,
        description: "",
        category : "",
        location: "",
        dateTime: "",
        endTime: "",
        invitees: [] // Invitees will store an array of email addresses or user IDs
    });
    let [member,setmember] = useState("")
    let [ispublic,setpublic] = useState(false)

    function handleInvites(invitee) {
        
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (invitee && !eventData.invitees.includes(invitee) && emailPattern.test(invitee)) {
            setEventData(prevState => ({
                ...prevState,
                invitees: [...prevState.invitees, invitee]
            }));
        } else {
            handleError("Invalid email or already added.");
        }
        console.log(eventData.invitees);
        setmember("")
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
        } else {
            setEventData({ ...eventData, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let { title, startTime, endTime, location, invitees, media, description } = eventData;

        // Ensure required fields are filled
        if (!title || !startTime || !location ) {
            return handleError("Field required");
        }

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const startDate = new Date(startTime).toISOString();
        const endDate = endTime ? new Date(endTime).toISOString() : startDate;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description || "");
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);
        formData.append("location", location);
        formData.append("invitees", JSON.stringify(invitees));
        formData.append("timeZone", timeZone);
        if (media) formData.append("media", media);
        console.log(eventData);

        setLoading(true);
        try {
            let url = "https://eventron-backend-production.up.railway.app/event/create";
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                },
                body: formData,
            });

            const result = await res.json();
            const { msg, newEvent } = result;

            if ((res.status === 201 || res.status === 204) && newEvent) {
                setEventData({ ...eventData, media: newEvent.media });
                handleSuccess(msg);
                setTimeout(() => {
                    navigate("/event");
                }, 2000);
            } else {
                handleError(msg);
                setTimeout(() => {
                    navigate("/event");
                }, 2000);
            }
        } catch (err) {
            handleError(err.message);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    }


    return(
        <div>
            <Navbar/>
            <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
                <Box width={{ base: "90%", md: "60%", lg: "40%" }} p={5} borderWidth={1} borderRadius="md" boxShadow="lg">
                    <Heading as="h2" size="lg" mb={4} textAlign="center">Create Event</Heading>
                    <form onSubmit={handleSubmit} >
                        <Input placeholder='Event Title' name='title' onChange={handleChange} required mb={4} />
                        <Input placeholder='Event Description' name='description' onChange={handleChange} mb={4} />
                        <Select placeholder='Select Category' name='category' onChange={handleChange} mb={4}>
                            <option value='Music'>Music</option>
                            <option value='Art'>Art</option>
                            <option value='Technology'>Technology</option>
                            <option value='Sports'>Sports</option>
                            <option value='Food'>Food</option>
                            <option value='Education'>Education</option>
                            <option value='Health'>Health</option>
                            <option value='Business'>Business</option>
                            <option value='Gathering'>Gathering</option>
                            <option value='Entertainment'>Entertainment</option>
                        </Select>
                        <Input type='file' name='media' accept="image/*" onChange={handleChange} mb={4} />
                        <Input placeholder='Location' name='location' onChange={handleChange} required mb={4} />
                        <Input type='datetime-local' name='startTime' onChange={handleChange} required mb={4} />
                        <Input type='datetime-local' name='endTime' onChange={handleChange} mb={4} />

                        <Select placeholder='Private' name='' onChange={(e) => setpublic(e.target.value)} mb={4}>
                            <option value = {true}>Public</option>
                            
                        </Select>
                        {
                            ispublic ? (
                                <Text fontSize="lg" color="green.500">Your Event is Public</Text>
                            ) : (
                                <>
                                <Input placeholder='Invitees (comma separated)' value={member} onChange={(e) => setmember(e.target.value)} mb={4}/>
                                <Button colorScheme="teal" onClick={() => handleInvites(member)}>Add Invitee</Button>
                                </>
                                
                            )
                        }
                        

                        {eventData.invitees.length > 0 && (
                            <UnorderedList mt={3}>
                                {eventData.invitees.map((invitee, index) => (
                                    <ListItem key={index}>
                                        {invitee}
                                        <Button ml={2} colorScheme="red" size="xs" onClick={() => removeInvitee(index)}>Remove</Button>
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        )}
                        
                        {loading ? (
                            <Spinner size="lg" color="teal"/>) : (
                            <Button type='submit' colorScheme='teal'onClick={handleSubmit} width="100%" mt={4}>
                                Create Event
                            </Button>
                        )}
                    </form>
                    </Box>
                </Box>
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
        </div>
    )

}
