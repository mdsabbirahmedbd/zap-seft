import React, { useEffect, useState } from 'react'
import { FaShippingFast } from 'react-icons/fa'
import { FaPeopleGroup, FaSackDollar, FaTruckFast } from 'react-icons/fa6'


const OurWorks = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isSmallDevice = windowWidth <= 768

    const cards = [
        {
          icon : <FaTruckFast />,
          title : "Booking Pick & Drop",
          discription : "From personal packages to business shipments — we deliver on time, every time."
        },
        {
          icon : <FaSackDollar />,
          title : "Cash On Delivery",
          discription : "From personal packages to business shipments — we deliver on time, every time."
        },
        {
          icon : <FaShippingFast />,
          title : "Delivery Hub",
          discription : "From personal packages to business shipments — we deliver on time, every time."
        },
        {
          icon : <FaPeopleGroup />,
          title : "Booking SME & Corporate",
          discription : "From personal packages to business shipments — we deliver on time, every time."
        },
    ]
  const [showAll, setShowAll] = useState(false)

  const visibleCards = isSmallDevice && !showAll ? cards.slice(0, 2) : cards


  return (
<div className='my-20'>
    <h1 className='px-4 my-5 text-2xl font-bold'>How it Work</h1>
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-11 my-5 px-4'>
       {
        visibleCards.map(card => {
            return (
                <div className='bg-white rounded-2xl p-4 flex flex-col space-y-4 '>
                    <div className='text-5xl'>{card.icon} </div>
                    <h1 className='text-black font-semibold'>{card.title}</h1>
                    <h1>{card.discription}</h1>
                </div>
            )
        })
       }
    </div>

     {isSmallDevice && (
        <div className='flex justify-center mt-6'>
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className='px-5 py-2 bg-[#03373D] cursor-pointer text-white rounded-lg'>
              View More
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className='px-5 py-2 bg-gray-200 cursor-pointer text-black rounded-lg'>
              Show Less
            </button>
          )}
        </div>
      )}
     

</div>
  )
}

export default OurWorks