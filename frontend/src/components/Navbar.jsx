import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiMenuBurger } from "react-icons/ci";
import { GiTireIronCross } from "react-icons/gi";
import { BsCartPlusFill } from "react-icons/bs";
import { useSelector } from 'react-redux';


const Navbar = () => {
    const [open, setopen] = useState(false)
  const item=useSelector((state)=>state.cart.items)
    const handleClick=()=>{
        setopen(!open)
    }

  return (
    <>
    <div className="flex justify-between bg-gray-200 p-5 ">
      <p className='font-bold text-blue-500 text-3xl'>logo</p>
      <div className=' hidden md:flex gap-6' >
      <Link to='/' className='font-bold text-blue-500 text-xl' >Home</Link>
      <Link to='/bottle' className='font-bold text-blue-500 text-xl' >Bottles</Link>
      <Link to='/gallon' className='font-bold text-blue-500 text-xl'>Gallon</Link>
      <Link to='/tank' className='font-bold text-blue-500 text-xl'>Tank</Link>
      <Link to={'/explore'}  className='font-bold text-blue-500 text-xl'>Explore</Link>

      <div className="relative">
      <p  className='absolute text-xs text-center bg-blue-700 text-white rounded-full w-5 h-5 -top-3 right-6'>      {item.length}      </p>
      <Link to={'/cart'} ><BsCartPlusFill size={34} color='blue' />  </Link>
      </div>
      </div>
      {/* mobile */}

        <button onClick={handleClick} className='flex md:hidden' >{
    !open? <CiMenuBurger/> : <GiTireIronCross/>
} 
</button>
    </div>

<div>
    {open && (
        <div className=' flex flex-col  bg-gray-200 p-4 md:hidden items-center  ' >
      <Link to='/' className='font-bold pt-1 text-blue-500 text-xl' >Home</Link>
      <Link to='/bottle' className='font-bold pt-1 text-blue-500 text-xl'>Bottles</Link>
      <Link to='/gallon'  className='font-bold pt-1 text-blue-500 text-xl'>Gallon</Link>
      <Link  to='/tank' className='font-bold pt-1 text-blue-500 text-xl'>Tank</Link>
      <Link to={'/explore'} className='font-bold pt-1 text-blue-500 text-xl'>Explore</Link>

            </div>
    )}
</div>
</>
  )
}

export default Navbar