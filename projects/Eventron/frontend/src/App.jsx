
import './App.css'
// import { Address } from './components/address'
import { CreateEvent } from './components/createevent'
import { IndividualEvent } from './components/individualDisplay'
import { UserProfile } from './components/userprofile'
import RedirectButton from './helpers/redirectMaps'
import EApp from './components/EApp'
import { Routes,Route, Navigate } from 'react-router'
// import {MapContainer} from "@react-leaflet/core"
import MapComponent from './helpers/address'
import Signup from './components/Signup'
import Login from './components/Login'
import MyMapComponent from './helpers/address'
import { EditDetails } from './components/editDetails'
import Home from './components/Home'
import { NewCreateEvent } from './components/newcreate'
import { jwtDecode } from 'jwt-decode'
// import { Maps } from './helpers/maps'


function App() {

  
   
  const ProtectedRoutes = ({children}) => {
    const token = localStorage.getItem('accessToken');
    
    // Check if token exists
    if (!token) {
      return <Navigate to='/login' />
    }
    
    // Decode and check token expiration
    try {
      const decodedToken = jwtDecode(token);
      
      // Check if token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        // Token is expired, remove it
        localStorage.removeItem('accessToken');
        // localStorage.removeItem('user');
        return <Navigate to='/login' />
      }
      
      return children;
    } catch (error) {
      // Token is invalid, remove it
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return <Navigate to='/login' />
    }
  }

  const PublicRoutes = ({children}) => {
    const token = localStorage.getItem('accessToken');
    
    // Check if token exists and is valid
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        
        // Check if token is not expired
        if (decodedToken.exp * 1000 > Date.now()) {
          // Token is valid, redirect to dashboard
          return <Navigate to="/" />
        } else {
          // Token is expired, remove it
          localStorage.removeItem('token');
          // localStorage.removeItem('user');
          <Navigate to={"/login"}/>
        }
      } catch (error) {
        // Token is invalid, remove it
        console.error('Invalid token:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }
    }
    
    return children
  }


  return (
    <>
      <Routes>
        <Route path='/event' element = { 
            <EApp/>
          } />
        <Route path='/Create Event' element ={
          <ProtectedRoutes>
            <NewCreateEvent/>
          </ProtectedRoutes>
          } />
        <Route path='/user/profile/:email' element = {
          <ProtectedRoutes>
            <UserProfile/>
          </ProtectedRoutes>
          } />
        <Route path='/eventdetails/:id' element = {
          <ProtectedRoutes>
            <IndividualEvent/>
          </ProtectedRoutes>} />
        <Route path='/signup' element={
          <PublicRoutes>
            <Signup/>
          </PublicRoutes>
          }  />
        <Route path='/login' element={
          <PublicRoutes>
            <Login/>
          </PublicRoutes>
          } />
        <Route path='/editdetails/:id' element={<EditDetails/>} />
        <Route path='/' element={
          <PublicRoutes>
            <Home/>
          </PublicRoutes>
          } />
        
      </Routes> 
      
    </>
  )
}

export default App
