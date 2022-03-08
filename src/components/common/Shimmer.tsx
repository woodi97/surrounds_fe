import React from 'react'
import ShimmerEffect from 'react-shimmer-effect'

const Shimmer = () => {
  return (
    <ShimmerEffect>
      <div className="w-8 h-8 mr-2 rounded-2xl" />
      <div className="w-[calc(100%-3rem)] h-8 rounded-xl" />
    </ShimmerEffect>
  )
}

export default Shimmer
