import React from 'react'

const Card = ({item}) => {
  return (
    <div>
      <p>{item?.name}</p>
      <p>{item?.price}</p>
    </div>
  )
}

export default Card
