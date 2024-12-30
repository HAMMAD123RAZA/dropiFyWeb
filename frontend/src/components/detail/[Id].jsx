import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RelatedItem from '../RelatedItem'
import Counter from '../Counter'
import { useDispatch } from 'react-redux'
import { addItem } from '../../RTK/CartSlice'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

// import {addItem} from './rtk'

const Id = () => {
    const [data, setdata] = useState([])
    const { Id } = useParams();
    const dispatch=useDispatch()
    console.log(Id , "Id")
    const getData = async () => {
      try {
        const api = await axios.get(`http://localhost:8080/get/${Id}`);
        console.log("API Response:", api?.data);
        setdata(api?.data[0] || {});
      } catch (error) {
        console.error("Error fetching product:", error.response?.data || error.message);
      }
    };
    useEffect(() => {
     getData();
    }, [Id]);
    
    const handleAddCart=(item)=>{
      dispatch(addItem(item))
      Swal.fire({
        icon:'success',
        title:"Alright",
        text:"Item Added In The Cart!",
        iconColor:"rgb(37 99 235)",
        color:"rgb(37 99 235)",
        confirmButtonColor:"rgb(37 99 235)"

      });
    }

        return (
    <>
<div className="grid md:grid-cols-2 md:gap-8 p-4">
  {/* Card Section */}
  <div className="rounded-lg p-3 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 max-w-md w-full">
    <img
      src={data?.image}
      alt={data?.name || "Product Image"}
      className="rounded-t-lg object-cover w-full h-52"
    />
    <div className="flex flex-col items-start p-4">
      <h2 className="font-semibold text-xl text-blue-600 hover:text-blue-700 transition-colors duration-200">
        {data?.name}
      </h2>
      <p className="mt-2 text-lg text-gray-700 font-medium">
        {data?.price} PKR
      </p>
      <button className="p-2 my-2 bg-blue-500 transition duration-200 text-white hover:bg-white hover:text-blue-500 font-bold text-xl border-2 border-blue-500 rounded-lg">
Buy Now
      </button>
    </div>
  </div>

  {/* Side Content Section */}
  <div className="px-4">
    <p>
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut iure necessitatibus facilis accusantium deserunt temporibus beatae corrupti ipsam. Alias placeat possimus reiciendis, unde fuga quis, vitae exercitationem nihil nam doloribus officiis, delectus tempore sapiente? Nulla dolorum possimus totam repudiandae soluta obcaecati, suscipit et mollitia voluptate voluptas sequi molestias odio quidem reprehenderit accusantium libero, corrupti porro quos placeat iusto deleniti labore! Dicta veniam voluptates eligendi aliquam qui voluptatibus omnis, deserunt molestiae  facere magni quis sapiente, vero nam? Maiores neque voluptas mollitia magni. 
   </p>
<Counter/>
    <p className="my-4 text-lg text-gray-700 font-medium">
      {data?.price} PKR
    </p>
    <button onClick={()=>handleAddCart(data)} className="p-2 my-2 bg-white transition duration-200 text-blue-500
     hover:bg-blue-500 hover:text-white font-bold text-xl border-2 border-blue-500 rounded-lg">
      Add to Cart
    </button>
  </div>
</div>

{/* Related items */}
<div className='font-bold text-3xl py-3 text-center  text-gray-400' >You May Also Like</div>

<RelatedItem cat={data?.category} id={Id} />
    </>
  )
}

export default Id