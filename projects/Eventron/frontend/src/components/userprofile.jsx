import { Avatar,Heading,Text,Card,
    Box,Badge,ListIcon,ListItem,
    UnorderedList
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
    const [user, setUser] = useState(null);  // To store the user profile data
    const navigate = useNavigate();
    
    const email = sessionStorage.getItem("email");

    async function checkUser() {
        setLoading(true);

        try {
            let url = `http://localhost:3000/user/profile/${email}`;
            
            const res = await fetch(url, {
                method: 'GET',
                // Uncomment and update the Authorization header if needed
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            // Check if the response is ok (status 200-299)
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setUser(data.user);  // Assuming the response contains a "user" object
            } else {
                throw new Error('Failed to fetch user profile');
            }

        } catch (err) {
            console.error('Error:', err.message);
            navigate("/login");  // Navigate to login page if error occurs
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (email) {
            checkUser();  // Only attempt to fetch if the email is available
        } else {
            navigate("/login");  // If no email is in localStorage, navigate to login
        }
    }, [email, navigate]);  // Added `email` and `navigate` to dependency array to re-run the effect if they change

    if (loading) {
        return <div>Loading...</div>;  // You can replace this with a spinner or any loading component
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
                                user.createdEvents.map((ele) => (
                                    <ListItem alignContent={"center"}>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                            {ele.title}
                                            <Badge ml='1' colorScheme='green'>
                                            New
                                            </Badge>
                                    </ListItem>
                                ))
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
                            <ListItem alignContent={"center"}>
                                <ListIcon as={MdCheckCircle} color='green.500' />
                               Event 1 <Badge ml='1' colorScheme='green'>
                                New
                            </Badge>
                            </ListItem>
                        </UnorderedList>

                    </Box>
                </Card>
            </div>
        </div>
        <Footer/>
        </>
        
    );


    // return(
    //     <>
    //     <body style={{backgroundColor:"rgb(223, 223, 223)",paddingBottom:"100px"}}>
    //     
        
        
    //     
        
        
    //     </body>
    //     <Footer/>
    //     </>
    // )
}