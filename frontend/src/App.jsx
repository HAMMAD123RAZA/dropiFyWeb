import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
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
import SignUp from './components/SignUp.jsx'

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Slider/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/bottle' element={<Bottles/>}  />
        <Route path='/gallon' element={<Gallon/>}  />
        <Route path='/tank' element={<Tanker/>}  />
        <Route path='/explore' element={<Explore/>}  />
        <Route path='/cart' element={<Cart/>}  />
        <Route path='/detail/:Id' element={<Id/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<SignUp/>} />
      </Routes>
    </Router>

  )
}

export default App