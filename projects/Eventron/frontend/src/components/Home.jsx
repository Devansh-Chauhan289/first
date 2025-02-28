import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import partyLogo from "../assets/party.jpg";
import { position,Button } from "@chakra-ui/react";
import charityimage from "../assets/charity-image.png"

function Home(){
    const [loggedInUser, setLoggedInUser] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])
    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        
        setTimeout(()=>{
            navigate('/login')
        }, 1000)
    }
    return(
        <>
        <Navbar/>
        <div>
        <div className="Home-Background">
            
            <h1 className="Home-Head"> <b style={{fontSize : "70px"}}>EVENTRON</b> 
            <br />Event Creation And Management System <br />
            Start Creating Your Events Now <br /> 
            <Button style={{padding : "40px",fontSize : "30px",backgroundColor : "mediumpurple",color : "whitesmoke"}}>Create Event</Button>
            </h1>
        </div>
        <div style={{display : "flex",justifyContent:"space-around"}}>
            <div >
                <h1>Zero cost for free events</h1>
                <h2>If you are hosting an event free <br />
                You don't have to pay anything
                </h2>
            </div>
            <div>
                <img src={charityimage} alt="" />
            </div>
        </div>
        
        <ToastContainer/>
        </div>
        <Footer />
        </>
    )
}

export default Home