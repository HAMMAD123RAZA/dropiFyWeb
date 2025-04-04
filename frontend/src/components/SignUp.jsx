import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css';
import { Navigate, useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [username, setusername] = useState('')
  const [Password, setPassword] = useState('')
  const [email, setemail] = useState('')
  const [loading, setLoading] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [Data, setData] = useState(null)
  const [Message, setMessage] = useState('')

  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
  
    try {
      const registerResponse = await axios.post(
        'http://localhost:8080/register',
        { username, email, password: Password }
      );
  
      console.log('Register response:', registerResponse.data);
      setData(registerResponse.data);
  
      if (registerResponse.data.success) {
        try {
          // Send verification email
          const verifyResponse = await axios.post(
            'http://localhost:8080/send_email_verify',
            { email }
          );
  
          console.log('Verify response:', verifyResponse.data);
  
          if (verifyResponse.data.success) {
            setVerificationSent(true);
            // Store user data without sensitive information
            const userData = {
              id: registerResponse.data.newUser.id,
              username: registerResponse.data.newUser.username,
              email: registerResponse.data.newUser.email,
              token: registerResponse.data.token,
              isVerified: false
            };
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Show verification prompt/message
            setMessage('Registration successful! Please check your email to verify your account.');
            
            // Redirect to verification page or dashboard
            // navigate('/verification');
          } else {
            setMessage(verifyResponse.data.message || 'Verification email could not be sent. Please try again.');
          }
        } catch (verifyError) {
          console.error('Verification error:', verifyError);
          setMessage('Registration successful, but verification email could not be sent. Please contact support.');
          // Store user data anyway
          const userData = {
            id: registerResponse.data.newUser.id,
            username: registerResponse.data.newUser.username,
            email: registerResponse.data.newUser.email,
            token: registerResponse.data.token,
            isVerified: false
          };
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } else {
        setMessage(registerResponse.data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        // The server responded with an error status
        console.log('Error response data:', error.response.data);
        setMessage(error.response.data.message || `Registration failed with status ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Error request:', error.request);
        setMessage('No response from server. Please check your connection and try again.');
      } else {
        // Something happened in setting up the request
        console.log('Error message:', error.message);
        setMessage(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <>
    <div  className='flex justify-center items-center h-screen bg-gray-100' >
<form onSubmit={(e)=>handleSubmit(e)} data-aos='fade-down-right' className='bg-white shadow-lg border rounded-lg border-gray-400 p-8 w-96' >
<h1 className="text-center text-3xl font-bold text-blue-700 mb-6">Register</h1>

{verificationSent && (
  <>
  <div className='text-center px-4' >
  <div>Verification Link Sent to your <span className='font-bold' > {email} </span></div>
  <div> Plz check your email </div>
  </div>
  </>
)}

<label htmlFor="email" className="block font-bold text-blue-700 text-lg mb-2">
            Name
          </label>
          <input
            type="text"
            onChange={(e)=>setusername(e.target.value)}
            value={username}
            placeholder="Name"
            className="w-full px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none border rounded-md"
          />
          
          <label htmlFor="email" className="block font-bold text-blue-700 text-lg mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e)=>setemail(e.target.value)}
            value={email}
            className="w-full px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none border rounded-md"
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

          <button   className="w-full py-2 bg-blue-500 transition duration-200 text-white hover:bg-white hover:text-blue-500 font-bold text-lg border-2 border-blue-500 rounded-lg">
            Register
          </button>
          <p className="text-sm text-gray-600 text-center py-3">
            Already have an account? <a href="/login" className="font-bold hover:underline">Login</a>
          </p>

</form>
    </div>
    </>
  )
}

export default SignUp