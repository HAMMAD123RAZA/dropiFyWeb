import axios from 'axios'
import React, { useEffect } from 'react'
import Card from './Card'

interface product {
    name:string,
    category:string,
    price:number,
    image:string

}

const View = () => {
    const [data, setData] = React.useState<product[]>([])
    const fetchData=async ()=>{
        try {
            const api = await axios.get('http://localhost:8080/get');
            setData(api.data)
            console.log(api.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div  className='grid grid-cols-1 md:grid-cols-3 py-2'>
      {data?.map((item,id)=>{
        return (
                <Card key={id} item={item} />
        )
      })}

    </div>
  )
}

export default View
