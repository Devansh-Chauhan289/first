import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import partyLogo from "../assets/party.jpg";
import { position, Button, Text, Spinner } from "@chakra-ui/react";
import charityimage from "../assets/charity-image.png";
import birthdayimage from "../assets/birthday.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Home() {
    const [loading,setloading] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState("");
    const navigate = useNavigate();
    
    const handleCheck =  () => {
        const accesstoken = localStorage.getItem("accessToken")
        const refreshtoken = localStorage.getItem("refreshToken")
        if(accesstoken){
            navigate("/event")
        }
    }
    
    useEffect(() => {
        handleCheck()
    },[])


    return (
        <>
            <Spinner 
                      display={loading? "block" : "none"}
                      padding={"50px"}
                      margin="25% 50%"
                      position="absolute"
                        thickness='7px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                        zIndex={"1000"}
                      />
            <Navbar />
            {/* <img src={partyLogo} alt="" style={{position : "absolute"}} /> */}
            {/* <Text visibility={"unset"} color={"midnightblue"}>Hello</Text> */}
            <div>
                <div className="Home-Background">
                    
                    <h1 className="Home-Head"> <b style={{ fontSize: "70px" }}>EVENTRON</b>
                        <br />Event Creation And Management System <br />
                        Start Creating Your Events Now <br /> <br />
                        <Button onClick={() =>{ 
                    setloading(true)
                    setTimeout(() => {
                    navigate("/login")
                    setloading(false)
                    }, 2000)
                }} style={{ padding: "40px", fontSize: "30px", backgroundColor: "mediumpurple", color: "whitesmoke" }}>Start Creating Event</Button>
                <Button 
                onClick={() =>{ 
                    setloading(true)
                    console.log(loading);
                    setTimeout(() => {
                    navigate("/signup")
                    setloading(false)
                    }, 2000)
                }}
                style={{ padding: "40px", fontSize: "30px", backgroundColor: "green", color: "whitesmoke", marginLeft: "1.1rem"}}
                >New Here..? Then Join Us</Button>
                    </h1>
                </div>
                <div className="suggestion-box">
                    <div className="sug-text"  >
                        <h1>Zero cost for free events</h1>
                        <h2>If you are hosting an event free <br />
                            You don't have to pay anything  <em></em>
                            <Button onClick={() =>{ 
                    setloading(true)
                    setTimeout(() => {
                    navigate("/login")
                    setloading(false)
                    }, 2000)
                }}  style={{padding : "5%",fontSize : "111%",backgroundColor : "mediumpurple",color : "whitesmoke"}}> Start Creating Event</Button>
                        </h2>
                    </div>
                    <div className="sug-image">
                        <img src={charityimage} alt="" />
                    </div>
                </div>
                <div className="suggestion-box">
                <div className="sug-image">
                        <img className="sug-image" src={birthdayimage} alt="" />
                    </div>
                    <div className="sug-text"  >
                        <h1>Invite whom you like in your party <em></em>
                            <FontAwesomeIcon icon={faBirthdayCake} color="green" fontSize={"6vw"} />
                        </h1>
                        <h2> You can create the private Events too... Just give it a shot  <em></em>
                            <Button onClick={() =>{ 
                    setloading(true)
                    setTimeout(() => {
                    navigate("/login")
                    setloading(false)
                    }, 2000)
                }}  style={{padding : "5%",fontSize : "111%",backgroundColor : "mediumpurple",color : "whitesmoke"}}>Create Event</Button>
                        </h2>
                    </div>
                    
                </div>

                <ToastContainer />
            </div>
            <Footer />
        </>
    )
}

export default Home
