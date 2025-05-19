import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, Heading, Stack, Text, Button, Image, Select, Box, CardBody, CardFooter } from '@chakra-ui/react';
import axios from 'axios';
import Footer from './Footer';
import Navbar from './Navbar';
import { handleSuccess } from '../utils';

export let IndividualEvent = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState(null); 
  const [filterData, setFilteredEvents] = useState(null);
  const [openmodal,setopenmodal] = useState(false)
  const [responded,setresponded] = useState(false)
  const [status,setstatus] = useState("")
  const [userID,setuserID] = useState("")
  const { id } = useParams(); 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleString('en-US', options); 
  };


  const getData = async () => {
    try {
      let res = await axios.get("https://eventron-backend-production.up.railway.app/event");
      let eventsData = res.data.events.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.desc,
        media: item.media,  
        startTime: item.dateTime.start.dateTime,
        endTime: item.dateTime.end.dateTime,
        location: item.location.address,
        rsvp : item.rsvpStatus
      }));
      setFilteredEvents(eventsData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const checkResponse = () => {
    if (filterData) {
      
      const event = filterData.find((ele) => ele.id === id);
      if (event && event.rsvp) {
        const userResponse = event.rsvp.find((rsvp) => rsvp.user.toString() === userID);
        if (userResponse) {
          setresponded(true);
          
        }
      }
    }
  };
  

  const handleResponse = async() =>{

    try {
      let url = `http://localhost:3000/event/rsvp`
      let res = await fetch(url,{
        method : 'POST',
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventId: id,
          status: status,
          userId: userID
        })
      })
      console.log({"eventId" : id , "status" :status, "userId" : userID});
      const result = await res.json()
      const {msg,event} = result

      if(res.status === 200){
        handleSuccess("Response Submitted Successfully")
        setTimeout(() => {
          navigate("/")
          setresponded(true)
          setopenmodal(false)
        }, 1500);
        
        
      }
      else{
        // console.log(status);
        alert("something went wrong")
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    
    getData();
  }, []);

  useEffect(() => {
    if (filterData) {
      const individual = filterData.find((item) => item.id === id);
      setuserID(sessionStorage.getItem("userID"))
      setEvent(individual);
      checkResponse()
    }
  }, [filterData, id]);

  const handleChange = (value) =>{
    setopenmodal(true)
    setstatus(value)
  }


  if (!event) {
    return <Text>Loading...</Text>; // Handle loading state
  }

  return (
    <>
    <Navbar/>
    
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant="outline"
        shadow={"dark-lg"}
        width={{ lg: "850px", md: "500px", sm: "500px" }}
        margin={"auto"}
        marginTop={"50px"}
        padding={"50px"}
        backgroundColor={"#E8E8E8"}
        display={{ lg: "flex", sm: "flex" }}
        flexWrap={{ lg: "nowrap", sm: "wrap" }}
      >
        {/* Image for the event */}
        <Image
          objectFit='cover'
          maxW={{ base: '400px', sm: '350px' }}
          height={"400px"}
          src={event.media} // Add image source
          alt={event.title} // Alt text for accessibility
        />
        

        <Stack>
          <CardBody>
            <Heading textAlign={"center"} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize='4xl' fontWeight='extrabold'>
              {event.title}
            </Heading>
            <Text py='2' fontSize={"20px"}>
              {event.description}
            </Text>
            <Text fontSize={"20px"}><b>Event Date And Time:</b> {formatDate(event.startTime)}</Text>
            <Text fontSize={"20px"}><b>Venue Happening At: </b>
              <Button>
                <a href={`https://www.google.com/maps/dir//${encodeURIComponent(event.location)}`} target="_blank" rel="noopener noreferrer">
                  {event.location}
                </a>
              </Button>
            </Text>
          </CardBody>

          <CardFooter>
            <div>
              <Select display={responded? "none" : "flex"} variant={"solid"} bgGradient='linear(to-r, teal.500, green.500)' colorScheme='blue' width={"200px"} onChange={(e) => handleChange(e.target.value)} placeholder='Want To Respond..?'>
                <option value="attending">Yes</option>
                <option value="not attending">No</option>
                <option value="maybe">Maybe</option>
              </Select>
              <Box display={responded? "flex" : "none"} backgroundColor="lightgreen" color="midnightblue" fontStyle="bold" padding="10px" borderRadius="10px">
                <Heading fontSize="20px">Already Responded</Heading>
              </Box>

            </div>
            
            
          </CardFooter>
          <div className='confirm-modal' style={{display : openmodal? "flex" : "none" ,gap : "10px"}}  >
              <Button onClick={handleResponse}>Submit</Button>
              <Button onClick={() => setopenmodal(false)}>Cancel</Button>
            </div>
        </Stack>
      </Card>
      <Footer/>
    </>
  );
};
