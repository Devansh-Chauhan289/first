// *****
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Footer from './Footer'
import { data, Link } from 'react-router'
import { EditDetails } from './editDetails'
import {useDispatch,useSelector} from "react-redux"
import { fetchdata } from '../redux/action'
import { Heading,Text,Button } from '@chakra-ui/react'

// let data = null
const EApp = () => {

  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  // const [ogdata, setOgdata] = useState([]);  // Initialize ogdata as an empty array

  // Define getdata as an async function
  const getdata = async () => {
    try {
      let res = await axios.get("http://localhost:3000/event");
      let mydata = res.data.events;  
      console.log(mydata[2]); 
      let eventsData = res.data.events.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.desc,
        media: item.media[0],  
        startTime: item.dateTime.start.dateTime, 
        endTime: item.dateTime.end.dateTime,
        location: item.location.address, 
      }));

      setEvents(eventsData);
      setFilteredEvents(eventsData);  
       

    } catch (error) {
      console.log(error);  
    }
  };


  useEffect(() => {
    getdata()

  }, []);

  useEffect(() => {
    console.log(events);  // Log the updated events after state has changed
  }, [events]);

  
  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    filterEvents(e.target.value, categoryFilter, sortOrder)
  }

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value)
    filterEvents(searchQuery, e.target.value, sortOrder)
  }

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value)
    filterEvents(searchQuery, categoryFilter, e.target.value)
  }

  const filterEvents = (query, category, order) => {
    let updatedEvents = events

    if (query) {
      updatedEvents = updatedEvents.filter((event) =>
        event.title.toLowerCase().includes(query.toLowerCase())
      )
    }

    if (category) {
      updatedEvents = updatedEvents.filter(
        (event) => event.category === category
      )
    }

    updatedEvents = updatedEvents.sort((a, b) => {
      const dateA = new Date(a.startTime)
      const dateB = new Date(b.startTime)
      return order === 'asc' ? dateA - dateB : dateB - dateA
    })

    setFilteredEvents(updatedEvents)
  }

  return (
    <>
    <Navbar/>
    {/* <EditDetails events = {filteredEvents}/> */}
    <div className='App'>
      <Heading fontSize={"50px"}><h1>Event Management</h1></Heading>

      <div className='controls'>
        <input
          type='text'
          placeholder='Search events by title...'
          value={searchQuery}
          onChange={handleSearch}
        />

        <select value={categoryFilter} onChange={handleCategoryChange}>
          <option value=''>All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value='asc'>Sort by Date (Ascending)</option>
          <option value='desc'>Sort by Date (Descending)</option>
        </select>
      </div>

      <div className='event-list'>
  {filteredEvents.map((event) => (
    <div key={event.id} className='event-card'>
      <Heading fontSize={"30px"}><h3>{event.title}</h3></Heading>
      
      
      <p ><strong>Category:</strong> {event.category}</p>
      <p style={{fontSize:"20px"}}><strong>Date:</strong> {new Date(event.startTime).toDateString()}</p>
      
      <p style={{fontSize:"20px",fontWeight:"bold"}}> {event.description}</p>
      <Button><Link to={`/eventdetails/${event.id}`}>Learn More</Link></Button>
    </div>
  ))}
</div>

    </div>
    <Footer/>
    </>
  )}


export default EApp
