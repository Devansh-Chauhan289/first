import { Avatar,Heading,Text,Card,
    Box,Badge,ListIcon,ListItem,
    UnorderedList
 } from "@chakra-ui/react"
import {MdCheckCircle} from "react-icons/md"
import { useState } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

export let UserProfile=()=>{

    let [userdata,setuserdata] = useState({
        userid : "0947783",
        name : "Ken Addams",
        username : "kenadd_00",
        email : "kenaddams@gmail.com",
        phoneno : "9138773901",
        role : "Creator",
        pfp : "https://bit.ly/sage-adebayo"
    })    

    return(
        <>
        <body style={{backgroundColor:"rgb(223, 223, 223)",paddingBottom:"100px"}}>
        <Navbar/><br />
        
        
        <div className="profile-cont">

            <div>
            <Avatar height={{sm:"200px",base:"100px"}} width={{sm:"200px",base:"100px"}}
            
             name='Segun Adebayo' src={userdata.pfp} />
            </div>

            <div>
                <Heading textTransform={"uppercase"}>{userdata.name}</Heading><br />
                <Text fontSize={"20px"}><b>User Name: </b>{userdata.username}</Text><br />
                <Text fontSize={"20px"}><b>Email : </b>{userdata.email}</Text>
            </div>

            <div>
                <Heading>Role : {userdata.role}</Heading><br />
                <Text fontSize={"20px"}><b>Phone : </b>{userdata.phoneno}</Text><br />
                <Text fontSize={"20px"}><b>User ID : </b>{userdata.userid}</Text>
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
                            <ListItem alignContent={"center"}>
                                <ListIcon as={MdCheckCircle} color='red.500' />
                               Event 1 
                            </ListItem>
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
        </body>
        <Footer/>
        </>
    )
}