import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router , Routes , Route, Navigate} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Slider from './components/Slider'
import Bottles from './components/Bottles'
import Gallon from './components/Gallon'
import Tanker from './components/Tanker'
import Explore from './components/Explore'
import Id from './components/detail/[Id].jsx'
import Cart from './RTK/Cart.jsx'
import Login from './components/Login.jsx'
import PropTypes from 'prop-types';
import SignUp from './components/SignUp.jsx'
import Loading from './components/Loading.jsx'
import { ToastContainer } from 'react-toastify'
import VerifyEmail from './components/VerifyEmail.jsx'

const App = () => {

  const [Load, setLoad] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 900);
  }, []);


  const PrivateRoute=({children})=>{
    const token=localStorage.getItem('token')
   return token ? children :<Navigate to='/register' />
  }
  
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

  return (
    <div>
    {Load?(
      <Loading/>
    ):(    <Router>
      <Navbar/>
      <Routes>
        {/* Private Routes */}
        <Route
          path="/"
          element={
            
              <Home />
            
          }
        />
    <Route path='/verify-email' element={<VerifyEmail />} /> 
    <Route
          path="/bottle"
          element={
            
              <Bottles />
            
          }
        />
        <Route
          path="/gallon"
          element={
            
              <Gallon />
            
          }
        />
        <Route
          path="/tank"
          element={
            
              <Tanker />
            
          }
        />
        <Route
          path="/explore"
          element={
            
              <Explore />
            
          }
        />
        <Route
          path="/cart"
          element={            
              <Cart />
          }
        />
        <Route
          path="/detail/:Id"
          element={
            
              <Id />
            
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
              <Login />
          }
        />
        <Route
          path="/register"
          element={
              <SignUp />
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
)}
</div>
  )
}

export default App