import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import partyLogo from "../assets/party.jpg";
import { position } from "@chakra-ui/react";

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
        <div>
            <h1 style={{position : "absolute",fontSize:"50px",color : "black", right:"40%" }}>Welcome To Eventron</h1>
            <img src={partyLogo} alt="PartyLogo" className="Home-Background" />
            
        </div>
        
        <ToastContainer/>
        </div>
        <Footer />
        </>
    )
}

export default Home