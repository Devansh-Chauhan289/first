import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, Heading, Stack, Text, Button, Image, Select, Box, CardBody, CardFooter } from '@chakra-ui/react';
import axios from 'axios';
import Footer from './Footer';
import Navbar from './Navbar';

export let IndividualEvent = () => {
  const [event, setEvent] = useState(null); 
  const [filterData, setFilteredEvents] = useState(null);
  const { id } = useParams(); 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleString('en-US', options); 
  };


  const getData = async () => {
    try {
      let res = await axios.get("http://localhost:3000/event");
      let eventsData = res.data.events.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.desc,
        media: item.media[0],  
        startTime: item.dateTime.start.dateTime,
        endTime: item.dateTime.end.dateTime,
        location: item.location.address,
      }));
      setFilteredEvents(eventsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (filterData) {
      const individual = filterData.find((item) => item.id === id);
      setEvent(individual);
    }
  }, [filterData, id]);

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
            <Text fontSize={"20px"}><b>No. of Seats Left:</b> 103</Text>
          </CardBody>

          <CardFooter>
            <Select variant={"solid"} bgGradient='linear(to-r, teal.500, green.500)' colorScheme='blue' width={"200px"} placeholder='Want To Respond..?'>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="might go">Maybe</option>
            </Select>
          </CardFooter>
        </Stack>
      </Card>
      <Footer />
      <Footer/>
    </>
  );
};
