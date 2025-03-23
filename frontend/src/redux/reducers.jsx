
let initial = {
    mydata : null,
    loading : false,
    error : false,

}

export let DataReducers=(state = initial,{type,payload})=>{
    switch(type){
        case "FETCH-REQ":
            return{
                ...state,
                loading : true
            }
        case "FETCH-COM":
            return{
                ...state,
                mydata : payload,
                loading : false
            }
        
        case "FETCH-FAIL":
            return{
                ...state,
                error : true
            }
        default:
            return state
    }
}