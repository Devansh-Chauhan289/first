import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faIdCard, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/TRONL.png";
import { MdSettings } from 'react-icons/md';
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Text,
  Divider,
  Icon,
  Spinner,
} from '@chakra-ui/react';

function Navbar() {
  const [menu, setMenu] = useState(false);
  let [loading, setLoading] = useState(false);
  let [userLog, setLog] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  let navigate = useNavigate();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const seeProfile = () => {
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");
    let email = sessionStorage.getItem("email");

    if (accessToken && refreshToken && email) {
      setLog(true);
      setLoading(true)
      setTimeout(() => {
        navigate(`/user/profile/${email}`);
      }, 2000);
      
    } else {
      handleError("User not logged In");
      setLoading(true)
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const ForCreateEvent = () => {
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");
    let email = sessionStorage.getItem("email");

    if (accessToken && refreshToken && email) {
      setLog(true);
      setLoading(true)
      setTimeout(() => {
        navigate(`/Create Event`);
      }, 2000);
      
    } else {
      handleError("User not logged In");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

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
          />
      <nav className="navbar">
        <img src={logo} alt="" height={"140px"} width={"140px"} />
        <div id="nav-head" style={{ color: "white", fontSize: "40px", display: "flex", gap: "20px", alignItems: "center" }}>
          <b>EVENTRON</b>
          <h1 id="Head" style={{ color: "#DDA0DD", alignItems: "center" }}>Making Invites Easy</h1>
        </div>
        <div className="menu" onClick={toggleMenu}>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
        </div>
        <ul className={menu ? 'navbar-link active' : 'navbar-link'}>
          <li className="navbar-elem" onClick={() =>{ 
            setLoading(true)
            setTimeout(() => {
              navigate("/")
            }, 2000)
          }}>Events</li>
          <li className="navbar-elem" onClick={() =>{ 
            setLoading(true)
            setTimeout(() => {
              navigate("/signup")
            }, 2000)
          }}>Sign Up</li> 
          <li className="navbar-elem" onClick={() =>{ 
            setLoading(true)
            setTimeout(() => {
              navigate("/contact")
            }, 2000)
          }} >Contact</li>   
          <li className="navbar-elem" onClick={() =>{ 
            setLoading(true)
            setTimeout(() => {
              navigate("/login")
            }, 2000)
          }}>Login</li>  
          <li 
            onClick={ForCreateEvent}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
            className="navbar-elem"
          >
            Create Event
          </li>
        </ul>
        <Popover>
          <PopoverTrigger>
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#74C0FC", fontSize: "30px", cursor: "pointer" }}
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />  
              <PopoverCloseButton /> <br />
              <PopoverBody>
                <Text className="Profile-icon" onClick={seeProfile}>
                  <FontAwesomeIcon icon={faIdCard} color="green" fontSize={"25px"} /> 
                  View Profile
                </Text>
                <Divider />
                <Text className="Profile-icon"><Icon as={MdSettings} color={"midnightblue"} fontSize={"25px"}/>Account Setting</Text>
                <Divider />
                <Text className="Profile-icon">
                <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ color: "red", fontSize: "25px", cursor: "pointer" }}
            />
                  Log Out</Text>
                
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </nav> 
      <ToastContainer />
    </>
  );
}

export default Navbar;
