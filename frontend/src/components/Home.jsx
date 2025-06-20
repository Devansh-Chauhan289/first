import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import partyLogo from "../assets/party.jpg";
import { position, Button, Text } from "@chakra-ui/react";
import charityimage from "../assets/charity-image.png";
import birthdayimage from "../assets/birthday.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Home() {
    const [loading,setloading] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])
    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');

        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }

    function handleNavigate(){
        setloading(true)
        setTimeout(() => {
            navigate("/login") 
        }, 1000);
        setloading(false)
    }


    return (
        <>
            <Navbar />
            {/* <img src={partyLogo} alt="" style={{position : "absolute"}} /> */}
            {/* <Text visibility={"unset"} color={"midnightblue"}>Hello</Text> */}
            <div>
                <div className="Home-Background">
                    
                    <h1 className="Home-Head"> <b style={{ fontSize: "70px" }}>EVENTRON</b>
                        <br />Event Creation And Management System <br />
                        Start Creating Your Events Now <br /> <br />
                        <Button onClick={handleNavigate} style={{ padding: "40px", fontSize: "30px", backgroundColor: "mediumpurple", color: "whitesmoke" }}>Start Creating Event</Button>
                    </h1>
                </div>
                <div className="suggestion-box">
                    <div className="sug-text"  >
                        <h1>Zero cost for free events</h1>
                        <h2>If you are hosting an event free <br />
                            You don't have to pay anything  <em></em>
                            <Button style={{padding : "5%",fontSize : "111%",backgroundColor : "mediumpurple",color : "whitesmoke"}}> Start Creating Event</Button>
                        </h2>
                    </div>
                    <div className="sug-image">
                        <img src={charityimage} alt="" />
                    </div>
                </div>
                <div className="suggestion-box">
                <div className="sug-image">
                        <img src={birthdayimage} alt="" />
                    </div>
                    <div className="sug-text"  >
                        <h1>Invite whom you like in your party <em></em>
                            <FontAwesomeIcon icon={faBirthdayCake} color="green" fontSize={"6vw"} />
                        </h1>
                        <h2> You can create the private Events too... Just give it a shot  <em></em>
                            <Button style={{padding : "5%",fontSize : "111%",backgroundColor : "mediumpurple",color : "whitesmoke"}}>Create Event</Button>
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