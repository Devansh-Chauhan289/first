

export let fetchdata= ()=>{
    return async(dispatch)=>{
        dispatch({type : "FETCH-REQ"})

        try {
            let res = await axios.get("http://localhost:3000/event");
            let mydata = res.data.events;  
            console.log(mydata);
            dispatch({type : "FETCH-COM",payload : mydata})
        } catch (error) {
            dispatch({type : "FETCH-FAIL"})
        }
    }
}

export let postdata=(post={obj})=>{
    return async(dispatch)=>{
        dispatch({type : "POST-REQ"})

        try {
            axios.post("URL",post)
            
            dispatch({type : "POST-COM" })
        } catch (error) {
            dispatch({type : "POST-FAIL"})
        }
    }
}