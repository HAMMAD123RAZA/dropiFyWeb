import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Card from './Card'

const Home = () => {
  const [data, setdata] = useState([])

  const fetchData=async()=>{
    try {
      const api=await axios.get('http://localhost:8080/get')
      setdata(api.data)
    } catch (error) {
      console.log('error occured in fetching data',error)
    }
  }

    useEffect(()=>{
      fetchData()
    },[])
    
  return (
    <div>
{data.map((item,id)=>{
  return (
    <div key={id}>
<Card item={item}  />
    </div>
  )
})}
    </div>
  )
}

export default Home