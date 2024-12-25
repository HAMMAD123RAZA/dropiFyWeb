import React from 'react'

interface product {
    name:string,
    category:string,
    price:number,
    image:string

}

const Card = ({item}:{item:product}) => {
  return (
    <div className='py-2'>
          <div
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
      </div>
    </div>

    </div>
  )
}

export default Card
