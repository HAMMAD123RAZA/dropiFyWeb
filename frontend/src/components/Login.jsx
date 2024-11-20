import axios from 'axios'
import React, { useState } from 'react'

const Login = () => {
  const [Password, setPassword] = useState('')
  const [email, setemail] = useState('')

  const handleLogin=async()=>{
    try {
      const api=await axios.post('http://localhost:8080/login',{
        Password:Password,
        email:email
      })
      alert('alright , logged in ')
    } catch (error) {
      console.log(error)
      alert('couldnt get through')
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        {/* Card Container */}
        <div className="bg-white shadow-lg rounded-lg border border-gray-300 p-8 w-96">
          <h1 className="text-center text-3xl font-bold text-blue-700 mb-6">Login</h1>
          
          <label htmlFor="email" className="block font-bold text-blue-700 text-lg mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none border rounded-md"
            onChange={(e)=>setemail(e.target.value)}
            value={email}
          />

          <label htmlFor="password" className="block font-bold text-blue-700 text-lg mb-2">
            Password
          </label>
          <input
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            value={Password}
            placeholder="Password"
            className="w-full px-4 py-2 mb-6 focus:ring-2 focus:ring-blue-400 focus:outline-none border rounded-md"
          />

          <button onClick={handleLogin} className="w-full py-2 bg-blue-500 transition duration-200 text-white hover:bg-white hover:text-blue-500 font-bold text-lg border-2 border-blue-500 rounded-lg">
            Login
          </button>
          <p className="text-center text-sm text-gray-500 py-3">
            Dont have an account? <a href="/register" className="underline font-bold">Register</a>
          </p>

        </div>
      </div>
    </>
  )
}

export default Login