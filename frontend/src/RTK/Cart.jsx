import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from './CartSlice';
import axios from 'axios'

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
            alert('Order placed successfully');
        } else {
            alert('Error placing order: ' + response.data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Oh no, error placing order');
    }
};

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => {
          return (
            <div key={item._id} className="card w-80 bg-base-100 shadow-xl rounded-lg overflow-hidden">
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

                  {/* <div className="badge badge-secondary ml-2 text-blue-600 font-bold">{item.capacity}</div> */}
                </div>
                <p className="text-gray-600 mt-2">
                  If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose?
                </p>
                <div className="card-actions flex justify-between mt-4">
                  <button className='px-3 py-2 bg-sky-600 hover:bg-sky-400 text-white rounded-full'
                    onClick={() => handleRemove(item)} // Pass the entire item object
                  >
                    Remove 
                  </button>
                  <button className='px-3 py-2 bg-sky-600 hover:bg-sky-400 text-white rounded-xl'
                    onClick={handleOrder} // Pass the entire item object
                  >
                    Order 
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;