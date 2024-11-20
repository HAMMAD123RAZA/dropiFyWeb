import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card'

const Gallon = () => {
    const [data, setdata] = useState([])
    const fetchData=async()=>{
        try {
            const api=await axios.get('http://localhost:8080/get')
            setdata(api.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])

    const filterData=data.filter(item=>item.category==='Gallon')

  return (
    <div className='md:grid p-3 md:grid-cols-3 grid-cols-1' >
{filterData.length > 0 ? (
  filterData.map((item, id) => (
    <Card key={id} item={item} />
  ))
) : (
  <p className="text-center col-span-4 text-gray-500">No tankers available</p>
)}
    </div>
  )
}

export default Gallon
