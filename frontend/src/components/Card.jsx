import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ item ,id}) => {
  return (
    <Link
      to={`/detail/${item?._id}`}
      className="rounded-lg border border-gray-300 bg-gray shadow-lg active:shadow-2xl active:-translate-y-1 max-w-xs"
      >
      <img
        src={item?.image}
        alt={item?.name || "Product Image"}
        className="rounded-t-lg  md:h-52 w-full md:object-cover"
      />
      <div className="flex flex-col items-center md:items-start p-4">
        <h2 className="font-semibold text-xl text-blue-600 hover:text-blue-700 transition-colors duration-200">
          {item?.name}
        </h2>
        <p className="mt-2 text-lg text-gray-700 font-medium">
          {item?.price} PKR
        </p>
        <button className="p-2 my-2 bg-blue-500 transition duration-200 text-white hover:bg-white hover:text-blue-500 font-bold text-xl border-2 border-blue-500 rounded-lg">
          Buy Now
        </button>
      </div>
    </Link>
  );
};

export default Card;