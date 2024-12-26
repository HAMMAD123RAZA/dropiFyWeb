import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from './CartSlice';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'


const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  console.log("Cart items:", items); // Log the items to inspect their structure

  const handleRemove = (item) => {
    dispatch(removeItem(item)); // Pass the entire item object
  }

  const handleOrder = async () => {
    try {
        const response = await axios.post('http://localhost:8080/send-order', { items });
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Hooray!",
            iconColor:"rgb(37 99 235)",
            color:"rgb(37 99 235)",
            text: "Order Has Been Placed!",
            confirmButtonColor:"rgb(37 99 235)"
          }); 

        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            // iconColor:"rgb(37 99 235)",
            color:"rgb(37 99 235)",
            confirmButtonColor:"rgb(37 99 235)"

                  });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        //   iconColor:"rgb(37 99 235)",
          color:"rgb(37 99 235)",
          confirmButtonColor:"rgb(37 99 235)"

        });    }
};

return (
  <div className='my-3' >
      <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
          {items.map((item,id) => (
              <div key={id} className="card w-80 bg-base-100 shadow-xl rounded-lg overflow-hidden">
                  <figure>
                      <img 
                          src={item.image}
                          alt="Shoes" 
                          className="w-full h-48 object-cover"
                      />
                  </figure>
                  <div className="card-body p-4">
                      <div className="flex justify-between">
                          <h2 className="card-title text-xl text-blue-600 font-bold">
                              {item.name}
                          </h2>
                          <div className="badge badge-outline font-bold text-blue-600">{item.price}</div>
                      </div>
                      <p className="text-gray-600 mt-2">
                          If a dog chews shoes whose shoes does he choose?
                      </p>
                      <div className="card-actions flex justify-between mt-4">
                          <button className='px-3 py-2 bg-sky-600 hover:bg-sky-400 text-white rounded-full'
                              onClick={() => handleRemove(item)}
                          >
                              Remove 
                          </button>
                          <button className='px-3 py-2 bg-sky-600 hover:bg-sky-400 text-white rounded-xl'
                              onClick={handleOrder}
                          >
                              Order 
                          </button>
                      </div>
                  </div>
              </div>
          ))}
      </div>
      {/* Include ToastContainer */}
  </div>
);
};

export default Cart;