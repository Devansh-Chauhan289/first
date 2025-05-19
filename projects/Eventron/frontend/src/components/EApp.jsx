// *****
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Footer from './Footer'
import { data, Link, useNavigate } from 'react-router'
import { EditDetails } from './editDetails'
import {useDispatch,useSelector} from "react-redux"
import { fetchdata } from '../redux/action'
import { Heading,Text,Button, Select, Input } from '@chakra-ui/react'
import { handleError } from '../utils'
// dotenv.config()

// let data = null
const EApp = () => {
  let navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
 
  const getdata = async () => {
    try {
      let res = await axios.get("https://eventron-backend-production.up.railway.app/event");
      let mydata = res.data.events;  
      let eventsData = res.data.events.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.desc,
        media: item.media,  
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

  const handleCheck =  () => {
    const accesstoken = localStorage.getItem("accessToken")
    const refreshtoken = localStorage.getItem("refreshToken")
    if(!accesstoken || !refreshtoken){
      navigate("/login")
    }
  }


  useEffect(() => {
    getdata()
    handleCheck()

  }, []);

  const debounceSearch = (func,delay) => {
    let timeout;
    return function(...args){
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this,args)
      }, delay);
    }
  } 

  

  const handleSearch = (query) => {
    
    filterEvents(query, categoryFilter, sortOrder)
  }

  const Search = (query) => {
    setSearchQuery(query)
    let debouncingSearch = debounceSearch(handleSearch,1000)
    debouncingSearch(query)
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

  function LearnMoreButton(id){
    let accessToken = localStorage.getItem("accessToken")
    let refreshToken = localStorage.getItem("refreshToken")
    let email = sessionStorage.getItem("email")

    if(accessToken && refreshToken && email){
      navigate(`/eventdetails/${id}`)
    } else{
      handleError("User not logged In")
      setTimeout(() => {
        navigate("/login")
      }, 2000);
      
      
    }
  }
  

  return (
    <>
    <Navbar/>
    {/* <EditDetails events = {filteredEvents}/> */}
    <div className='App'>
      <Heading fontSize={"50px"} textAlign={"center"} margin={"7%"}>ATTEND WHICH ONE YOU LIKE</Heading>

      <div className='controls'>
        <Input  
          type='text'
          placeholder='Search events by title...'
          fontSize={"30px"}
          value={searchQuery}
          
          onChange={(e) => Search(e.target.value)}
        />

        <Select fontSize={"25px"} height={"auto"} value={categoryFilter} onChange={handleCategoryChange} width={"300px"} placeholder='Filter By Categories'>
          <option value=''>All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <Select fontSize={"25px"} height={"auto"} value={sortOrder} onChange={handleSortOrderChange} width={"400px "}>
          <option value='asc'>Sort by Date (Ascending)</option>
          <option value='desc'>Sort by Date (Descending)</option>
        </Select>
      </div>

      <div className='event-list'>
        {
          filteredEvents.length === 0 ? <Text fontSize={"30px"}>No events found</Text> : null
        }
  {filteredEvents.map((event) => (
    <div key={event.id} className='event-card'>
      <Heading fontSize={"30px"}><h3>{event.title}</h3></Heading>
      <img src={event.media} alt="" />
      
      <p ><strong>Category:</strong> {event.category}</p>
      <p style={{fontSize:"20px"}}><strong>Date:</strong> {new Date(event.startTime).toDateString()}</p>
      
      <p style={{fontSize:"20px",fontWeight:"bold"}}> {event.description.substring(0,20)}....</p>
      
      <Button onClick={() => LearnMoreButton(event.id) }>Learn More</Button>
    </div>
  ))}
</div>

    </div>
    <Footer/>
    </>
  )}


export default EApp
