import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import{ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from "../utils";
import {Text,Input,Heading,Box,Select,
    Image, Button, UnorderedList, ListItem,ListIcon,IconButton,
     Checkbox} from "@chakra-ui/react"
     import {MdCheckCircle} from "react-icons/md"
     import {CheckIcon} from "@chakra-ui/icons"
import Navbar from "./Navbar";
import Footer from "./Footer";
// import './Login.css'




function Signup(){
    let [signup, setsignup] = useState({
        name:"",
        email:"",
        password:""
    })

    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
       
        setsignup({ ...signup, [name]: value });
      };
      const handlesubmit = async(e) =>{
        e.preventDefault();
        const {name, email, password} = signup;
        if(!name || !email || !password){
            return handleError('name, email and password are required')
        }
        setLoading(true)
        try{
           const url = "https://eventron-backend-production.up.railway.app/user/register"
           const response = await fetch(url, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signup)
           })
           const result = await response.json();
           
           const {success, message} = result;
           if(success){
            handleSuccess(message)
            
            
           }
           else if(error){
            const details = error?.details[0].message
            handleError(details);
           }
           else if(!success){
            handleError(message)
           }

        }
        catch(err){
           handleError(err)
        }
        alert("success")
        setTimeout(() => {
            navigate('/login')
        }, 1000);
        
      }
    console.log(signup)
    return(
        <>
        <body style={{backgroundColor:"#f0f0f0"}}>
            
        
        <Navbar/>
        <div style={{margin:"auto",marginTop:"50px",textAlign:"center"}}>
            <Text 
                textAlign={"center"}
                padding={"30px"}
                bgGradient='linear(to-r, #2561ed,  #a516e7)'
                bgClip='text'
                fontSize={{md:'5xl',base : "3xl"}}
                fontWeight='extrabold'
            >Looking for SomeOne to Handle Your Venue..? <br />Dont You Worry <br />We Got You <IconButton
            isRound={true}
            variant='solid'
            colorScheme='green'
            aria-label='Done'
            fontSize='20px'
            icon={<CheckIcon />}
          /></Text>

            </div>
        <div className="signup-container">
            
            <div style={{width:"700px", height : "auto",marginTop:"50px", backgroundColor:"#008B8B"
                            ,textAlign:"center",alignContent:"center",
                            padding:"40px 0px", borderRadius : "10px"
                            }}>
                    <Text 
                fontWeight={'bold'}
                fontSize={"4xl"}
                color={"white"}
                >Lets Get Started With Eventron</Text> <br />
                <UnorderedList>
                <ListItem fontSize={"3xl"}
                color={"white"}><ListIcon as={MdCheckCircle} color='yellow.500' />
                Offering You The Best Services <br /> You Need For Your Venue</ListItem>
                <ListItem fontSize={"3xl"}
                color={"white"}><ListIcon as={MdCheckCircle} color='yellow.500' />
                Offering You The Best Services <br /> You Need For Your Venue</ListItem>
                </UnorderedList>
                            
                            
            </div>
            
            <form className = "signup-form" onSubmit={handlesubmit}>  
            <Heading>Sign Up To Eventon</Heading>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Input type="text" name="name" autoFocus onChange={handleChange} placeholder="Enter Name" value={signup.name}/> 
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input type="email" name="email" onChange={handleChange} placeholder="Enter Email" value={signup.email}/> 
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input type="password" name="password" onChange={handleChange} placeholder="Enter Password" value={signup.password}/> 
                </div>
                <Button
                    bg="orange"
                    className="signup-button"
                    type="submit"
                    isLoading={loading}  // Use Chakra's isLoading prop to show loading state
                    loadingText="Signing Up.."
                    _hover={{backgroundColor:"#ADFF2F"}}
                    >
                    SignUp
                </Button>
                <span>Already have an account ?</span>
                <Link to='/login'>Login</Link>
            </form>
            <ToastContainer/>
        </div>
        <Footer/>
        </body>
        </>
    )
}

export default Signup


