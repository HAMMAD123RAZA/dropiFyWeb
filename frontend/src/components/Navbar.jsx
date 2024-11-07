import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiMenuBurger } from "react-icons/ci";
import { GiTireIronCross } from "react-icons/gi";


const Navbar = () => {
    const [open, setopen] = useState(false)

    const handleClick=()=>{
        setopen(!open)
    }

  return (
    <>
    <div className="flex justify-between ">
      <p className='font-bold text-3xl ' >logo</p>
      <div className=' hidden md:flex gap-3' >
      <Link to='/' >Home</Link>
      <Link>Bottles</Link>
      <Link>Gallon</Link>
      <Link>Tank</Link>
      <Link>Explore</Link>
      </div>
      {/* mobile */}

        <button onClick={handleClick} className='flex md:hidden' >{
    !open? <CiMenuBurger/> : <GiTireIronCross/>
} 
</button>
    </div>

<div>
    {open && (
        <div className=' flex flex-col md:hidden items-center justify-center ' >
      <Link to='/' >Home</Link>
      <Link>Bottles</Link>
      <Link>Gallon</Link>
      <Link>Tank</Link>
      <Link>Explore</Link>

            </div>
    )}
</div>
</>
  )
}

export default Navbar