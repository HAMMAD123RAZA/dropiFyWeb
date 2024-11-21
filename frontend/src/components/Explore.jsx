import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Card from './Card'
import { IoSearchOutline } from "react-icons/io5";

const Explore = () => {
  const [data, setdata] = useState([])
  const [search, setsearch] = useState('')

  const fetchData = async () => {
    try {
      const api = await axios.get('http://localhost:8080/get')
      setdata(api.data)
    } catch (error) {
      console.log('error occured in fetching data', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const searchQuery = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      {/* Search Field */}
      <div className="flex gap-3 items-center mx-auto my-5 p-4 rounded-full border-2 border-gray-300 max-w-xl ">
        <IoSearchOutline size={28} />
        <input 
          value={search} 
          onChange={(e) => setsearch(e.target.value)} 
          type="text" 
          placeholder="Search here..." 
          className="flex-1 p-2 text-sm md:text-base" 
        />
      </div>

      {/* Cards */}
      <div className="md:grid md:grid-cols-4 grid-cols-1 md:px-2 px-6 md:py-3 py-5 gap-x-4 gap-y-6">
        {searchQuery.length > 0 ? (
          searchQuery.map((item, id) => (
            <Card key={id} item={item} />
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-500">No items found</p>
        )}
      </div>
    </div>
  )
}

export default Explore;