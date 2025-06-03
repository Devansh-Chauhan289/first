import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";
import { Heading, Input, ListItem, UnorderedList } from "@chakra-ui/react";
import { Text, Button,Icon,ListIcon } from "@chakra-ui/react";
import {MdCheckCircle} from "react-icons/md"
import Navbar from "./Navbar";
import Footer from "./Footer";

function Login() {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);  // To handle loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = login;

        if (!email || !password) {
            return handleError('Email and password are required');
        }

        setLoading(true); 

        try {
            const url = "https://eventron-backend-5gl7.onrender.com/user/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            const result = await response.json();
            const { msg, accessToken, refreshToken } = result;

            if (response.status === 200 && accessToken && refreshToken) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("email", email);
                handleSuccess(msg);
                setTimeout(() => {
                    navigate(`/user/profile/:${email}`);
                }, 2000);
                 
            } else {
                handleError(msg);
            }
        } catch (err) {
            handleError(err.message);
        } finally {
            setLoading(false);  
        }
    };

    return (
        <body >
        <Navbar/>
        <div className="signup-container">
            <div style={{width:"500px", height : "300px",marginTop:"50px", backgroundColor:"#008B8B"
                ,textAlign:"center",alignContent:"center"}}>
                <Text 
                fontWeight={'bold'}
                fontSize={"4xl"}
                color={"white"}
                >Login To Eventron</Text> <br />
                <UnorderedList>
                
                <ListItem fontSize={"3xl"}
                color={"white"}><ListIcon as={MdCheckCircle} color='yellow.500' />Offering You The Best Services <br /> You Need For Your Venue</ListItem>
                </UnorderedList>
                
                
            </div>
            <form className="signup-form" onSubmit={handleLogin}>
                <Heading>Login to Eventron</Heading> <br />
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                    
                    className="input"
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter Email"
                        value={login.email}
                    /> <br /><br />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Enter Password"
                        value={login.password}
                    /> <br /><br />
                </div>
                <Button
                    bg="orange"
                    className="signup-button"
                    type="submit"
                    isLoading={loading}  // Use Chakra's isLoading prop to show loading state
                    loadingText="Logging in..."
                    _hover={{backgroundColor:"#ADFF2F"}}
                >
                    Login
                </Button> <br /> <br />
                <span>Doesn't have an account? <Link to='/signup'>SignUp</Link></span>
            </form>
            <ToastContainer />
        </div>
        <Footer/>
        </body>
    );
}

export default Login;
