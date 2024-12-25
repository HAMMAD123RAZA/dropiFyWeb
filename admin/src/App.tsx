import React from 'react'
import Home from './scenes/Home.tsx'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Create from './scenes/Create.tsx'
import Navbar from './scenes/Navbar.tsx'
import View from './scenes/View.tsx'

const App = () => {
  return (
    <BrowserRouter>
            <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/view' element={<View/>} />
        <Route path='/create' element={<Create/>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
