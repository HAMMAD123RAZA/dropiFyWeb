import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card'

const Tanker = () => {
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

    const filterData=data.filter(item=>item.category==='Tanker')

  return (
    <div className="md:grid md:grid-cols-4 grid-cols-1 md:px-2 px-6 md:py-3 py-5 gap-x-4 gap-y-6">
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

export default Tanker
