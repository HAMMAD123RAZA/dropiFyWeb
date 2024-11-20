import React from 'react'
import { useState } from 'react'
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

const Counter = () => {
    const [count, setcount] = useState(0)
    const onPlus=()=>{
        setcount(count+1)
    }
    const onMinus=()=>{
        if (count>0) {
            setcount(count-1)
        }
    }

  return (
    <div className='flex gap-6 my-3' >
        <button  onClick={onMinus}><FaMinusCircle size={24} color='blue'  /></button>
        <p>{count}</p>
      <button onClick={onPlus}  ><FaPlusCircle size={24} color='blue'  /></button>
    </div>
  )
}

export default Counter
