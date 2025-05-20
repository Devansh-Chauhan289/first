import { Avatar,Heading,Text,Card,
    Box,Badge,ListIcon,ListItem,
    UnorderedList,
    Spinner
 } from "@chakra-ui/react"
import {MdCheckCircle} from "react-icons/md"
import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { handleError,handleSuccess } from "../utils";
import { useNavigate } from "react-router"
import axios from "axios"

export let UserProfile = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);  
    const navigate = useNavigate();
    
    const email = sessionStorage.getItem("email");

    async function checkUser() {
        setLoading(true);

        try {
            let url = `https://eventron-backend-production.up.railway.app/user/profile/${email}`;
            
            const res = await fetch(url, {
                method: 'GET',
                
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            
            if (res.ok) {
                const data = await res.json();
                console.log(data.user._id);
                sessionStorage.setItem("userID",data.user._id)
                setUser(data.user);  
                
            } else {
                throw new Error('Failed to fetch user profile');
            }

        } catch (err) {
            console.error('Error:', err.message);
            navigate("/login");  
        } finally {
            setLoading(false);
            
        }
    }

    useEffect(() => {
        if (email) {
            checkUser();  
            
        } else {
            navigate("/login"); 
        }
    }, [email, navigate]);  

    if (loading) {
        return <div style={{margin : "auto",fontSize : "50px",width: "fit-content"}}>
                    Loading... <Spinner size="xl" color="teal"/> 
            </div>; 
    } 

    if (!user) {
        return <div>No user data available.</div>;
    }

    return (
        <>
        <Navbar/>
        <div>
            <div className="profile-cont">
                <Text fontSize={"20px"}><b>User ID : </b>{user._id}</Text>
                <Heading textTransform={"uppercase"}>{user.name}</Heading><br />
                <Text fontSize={"20px"}><b>User Email: </b>{user.email}</Text><br />
                
            </div>
            
            
        </div>
        <div className="event-cont" >
            <div style={{marginBottom:"20px"}}>
                <Card padding={"20px"} width={"350px"} position={{base : "relative"}} right={{base :"40px"}}>
                    <Box>
                        <Heading  >
                        Recent Events
                        </Heading>
                        <br />
                        <UnorderedList>
                            {
                                user.createdEvents.map((ele) => {
                                    let startDate = new Date(ele.dateTime.start.dateTime) - Date.now();
                                    if(startDate < 0){
                                        return (
                                            <ListItem alignContent={"center"} onClick={() => navigate(`/eventdetails/${ele._id}`)} cursor={"pointer"}>
                                                <ListIcon as={MdCheckCircle} color='red.500' />
                                                    {ele.title}
                                                    <Badge ml='1' colorScheme='red'>
                                                    old
                                                    </Badge>
                                            </ListItem>
                                        )
                                    }
                                    })
                            }
                        </UnorderedList>
                    </Box>
                </Card>
            </div>

            <div className="upcoming">
                <Card padding={"20px"} width={"350px"}  position={{base : "relative"}} right={{base :"40px"}}>
                    <Box>
                        <Heading  >
                        Upcoming Events
                        </Heading>
                        <br />
                        <UnorderedList>
                            {
                                user.createdEvents.map((ele) => {
                                    let startDate = new Date(ele.dateTime.start.dateTime) - Date.now();
                                    if(startDate > 0){
                                        return (
                                            <ListItem alignContent={"center"} onClick={() => navigate(`/eventdetails/${ele._id}`)} cursor={"pointer"} >
                                                <ListIcon as={MdCheckCircle} color='green.500' />
                                                    {ele.title}
                                                    <Badge ml='1' colorScheme='green'>
                                                    New
                                                    </Badge>
                                            </ListItem>
                                        )
                                    }
                                    })
                            }
                        </UnorderedList>

                    </Box>
                </Card>
            </div>
        </div>
        <Footer/>
        </>
        
    );

}