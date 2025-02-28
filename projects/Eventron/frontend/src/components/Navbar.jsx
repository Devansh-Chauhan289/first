import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/TRONL.png"

import { handleError,handleSuccess } from "../utils";
import { color } from "framer-motion";

// import './Navbar.css' 
// import Footer from "./Footer";
// import Home from "./Home";

function Navbar() {
  const [menu, setMenu] = useState(false);
  let [loading,setloading] = useState(false)
  let [userlog,setlog] = useState(true)
  const [isHovered, setIsHovered] = useState(false);
  let navigate = useNavigate();

  const toggleMenu = () => {
    setMenu(!menu);
  };


//   async function checkuser() {
//     setloading(true);
//     let user = localStorage.getItem("email")
//     try {
//         let url = `http://localhost:3000/user/profile/${user}`;
        
//         const res = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
//             }
//         });

//         if (!res.ok) {
            
//             let errorResponse;
//             try {
//                 errorResponse = await res.json();
//             } catch (err) {
//                 errorResponse = { msg: "Unknown error occurred" }; 
//             }
            
//             const { msg } = errorResponse;
//             handleError(msg);  
//             navigate("/login");  
//             return;
//         }

//         const result = await res.json();
//         const { accessToken, refreshToken } = result;

        
//         if (accessToken && refreshToken) {
          
//             localStorage.setItem("accessToken", accessToken);
//             localStorage.setItem("refreshToken", refreshToken);
//             // navigate(`user/profile/${user}`);  
//             console.log(user);
//         } else {
//             handleError("Tokens missing in response.");  
//             navigate("/login");  
//         }

//     } catch (err) {
//         handleError(err.message);  
//         navigate("/login");  
//     } finally {
//         setloading(false);  
//     }
// }
  function seeProfile(){
    let accessToken = localStorage.getItem("accessToken")
    let refreshToken = localStorage.getItem("refreshToken")
    let email = sessionStorage.getItem("email")
    if(accessToken && refreshToken && email){
      setlog(true)
      navigate(`/user/profile/${email}`)
    } else{
      navigate("/login")
    }
  } 

  function ForCreateEvent(){
    let accessToken = localStorage.getItem("accessToken")
    let refreshToken = localStorage.getItem("refreshToken")
    let email = sessionStorage.getItem("email")
    if(accessToken && refreshToken && email){
      setlog(true)
      navigate(`/Create Event`)
    } else{
      navigate("/login")
    }
  }

  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="" height={"140px"} width={"140px"} />
        {/* <div className="navbar-logo">Eventron</div> */}
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
        <FontAwesomeIcon
          icon={faUser}
          style={{ color: "#74C0FC", fontSize: "30px", cursor: "pointer" }}
          onClick={seeProfile}
        />    
      </nav> 
    </>
  );
}

export default Navbar;
