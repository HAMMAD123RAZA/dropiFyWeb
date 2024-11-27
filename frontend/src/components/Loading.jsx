import React from 'react'

import ReactLoading from 'react-loading';


const Loading = () => {
  return (
    <div>
      <div style={{display:'flex', justifyContent:'center',alignItems:'center',height:'100vh'}}>
      <ReactLoading type='spinningBubbles'   color="#007bff" height={130} width={150} />
    </div>
    </div>
  )
}

export default Loading
