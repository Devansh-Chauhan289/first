import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faIdCard } from "@fortawesome/free-solid-svg-icons";
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
      setTimeout(() => {
        navigate(`/user/profile/${email}`);
      }, 2000);
      
    } else {
      handleError("User not logged In");
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
      navigate(`/Create Event`);
    } else {
      handleError("User not logged In");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <>
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
          <li><Link to='/'>Events</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li> 
          <li><Link to='/contact'>Contact</Link></li>   
          <li><Link to='/login'>Login</Link></li>  
          <li
            style={{
              color: isHovered ? "red" : "rgb(72, 255, 0)",
              cursor: "pointer",
              fontSize: "1.1rem",
            }}
            onClick={ForCreateEvent}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="createEvent"
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
                  <FontAwesomeIcon icon={faIdCard} /> 
                  View Profile
                </Text>
                <Divider />
                <Text className="Profile-icon"><Icon as={MdSettings} />Account Setting</Text>
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
