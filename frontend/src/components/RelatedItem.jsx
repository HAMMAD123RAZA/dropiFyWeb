import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from './Card'

const RelatedItem = ({cat,id}) => {
    const [data, setdata] = useState([])
    const {Id}=useParams()
    console.log(Id)
    const getData=async()=>{
        try {
            const api=await axios.get(`http://localhost:8080/get/`)
            const filter=api.data.filter(item=>item.category===cat && item._id!==id)
            setdata(filter)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getData()
    })
    const SliceData=data.slice(0,6)
    // const filterData=data.filter(item=>item.cat===cat && item._Id!==id)
  return (
    <>
    <div className="md:grid md:grid-cols-4 grid-cols-1 md:px-2 px-6 md:py-3 py-5 gap-x-4 gap-y-6">
    {data.length > 0 ? (
  SliceData.map((item, id) => (
    <Card key={id} item={item} />
  ))
) : (
  <p className="text-center col-span-4 text-gray-500">No tankers available</p>
)}
    </div>
    </>
  )
}

export default RelatedItem
