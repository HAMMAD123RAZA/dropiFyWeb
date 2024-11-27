import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router , Routes , Route, Navigate} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Slider from './components/Slider'
import Bottles from './components/Bottles'
import Gallon from './components/Gallon'
import Tanker from './components/Tanker'
import Explore from './components/Explore'
import Id from './components/detail/[Id]'
import Cart from './RTK/Cart.jsx'
import Login from './components/Login.jsx'
import PropTypes from 'prop-types';
import SignUp from './components/SignUp.jsx'
import Loading from './components/Loading.jsx'

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
      <Slider/>
      <Routes>
        {/* Private Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/bottle"
          element={
            <PrivateRoute>
              <Bottles />
            </PrivateRoute>
          }
        />
        <Route
          path="/gallon"
          element={
            <PrivateRoute>
              <Gallon />
            </PrivateRoute>
          }
        />
        <Route
          path="/tank"
          element={
            <PrivateRoute>
              <Tanker />
            </PrivateRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <Explore />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/detail/:Id"
          element={
            <PrivateRoute>
              <Id />
            </PrivateRoute>
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
    </Router>
)}
</div>
  )
}

export default App