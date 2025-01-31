import { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from "axios"
import React from "react"
import {Input} from "@chakra-ui/react"

export let EditDetails = ()=>{
    let {_id} = useParams()
    let [events,setevents] = useState([])
    const getdata = async () => {
        try {
          let res = await axios.get("http://localhost:3000/event");
          let mydata = res.data.events;  
        //   console.log(mydata[2]); 
          let eventsData = res.data.events.map((item) => ({
            id: item._id,
            title: item.title,
            description: item.desc,
            media: item.media[0],  
            startTime: item.dateTime.start.dateTime, 
            endTime: item.dateTime.end.dateTime,
            location: item.location.address, 
          }));
    
           setevents(eventsData)
           
    
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

    
    if(events.length>0){
        console.log("empty")
        
    }
    let filterdata = events.filter(item => item._id ===  _id)
    let {title,description,startTime,endTime,TimeZone,location,media,invitees} = filterdata[0]
    console.log(filterdata[0])
    
    
    return(
        <>
        <h1>hello</h1>
        <Input varient="outline" width={"400px"} placeholder="title" type="text" value={title}  />
        <Input varient="outline" width={"400px"} placeholder="title" type="file" value={media} />
        <Input varient="outline" width={"400px"} placeholder="title" type="text" value={description}  />
        <Input varient="outline" width={"400px"} placeholder="title" type="datetime-local" value={startTime}  />
        <Input varient="outline" width={"400px"} placeholder="title" type="text" value={location}  />

        
        </>
    )
}