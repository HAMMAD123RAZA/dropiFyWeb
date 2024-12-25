import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col items-center  justify-center h-screen' >
      <div className='font-bold text-blue-500 text-7xl' >
            Admin Panel
      </div>
    <Link to='/create' className='bg-blue-500 my-14 text-2xl  text-white font-bold hover:bg-white hover:text-blue-500 border-2 border-blue-500 px-8 py-3 rounded-lg ' >
    Create It
    </Link>
    </div>
  )
}

export default Home 