
import './App.css'
// import { Address } from './components/address'
import { CreateEvent } from './components/createevent'
import { IndividualEvent } from './components/individualDisplay'
import { UserProfile } from './components/userprofile'
import RedirectButton from './helpers/redirectMaps'
import EApp from './components/EApp'
import { Routes,Route } from 'react-router'
// import {MapContainer} from "@react-leaflet/core"
import MapComponent from './helpers/address'
import Signup from './components/Signup'
import Login from './components/Login'
import MyMapComponent from './helpers/address'
import { EditDetails } from './components/editDetails'
import Home from './components/Home'
// import { Maps } from './helpers/maps'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element = <EApp/> />
        <Route path='/Create Event' element = <CreateEvent/> />
        <Route path='/user-profile' element = <UserProfile/> />
        <Route path='/eventdetails/:id' element = <IndividualEvent/> />
        <Route path='/maps' element=<MyMapComponent/> />
        <Route path='/signup' element=<Signup/>  />
        <Route path='/login' element=<Login/> />
        <Route path='/editdetails/:id' element=<EditDetails/> />
        <Route path='/Home' element=<Home/> />
      </Routes> 
      
    </>
  )
}

export default App
