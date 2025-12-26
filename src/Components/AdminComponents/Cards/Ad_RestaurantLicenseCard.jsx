import React from 'react'

const Ad_RestaurantLicenseCard = ({image}) => {
  return (
   <div className="mt-8 flex justify-center items-center p-4">
      <img
        src={image}
        alt="Restaurant License"
        className="w-full max-w-4xl h-auto object-contain rounded-lg shadow-lg border border-gray-200"
      />
    </div>
  )
}

export default Ad_RestaurantLicenseCard
