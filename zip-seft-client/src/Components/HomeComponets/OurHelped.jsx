import React from 'react'
import livetraking from '../../assets/live-tracking.png'
import safeDelivary from '../../assets/safe-delivery.png'
import tinydeliveryman from '../../assets/tiny-deliveryman.png'
import Marquee from "react-fast-marquee";
import rokomari from '../../assets/brands/rokomari_logo.png'
import amazon from '../../assets/brands/amazon.png'
import casio from '../../assets/brands/casio.png'
import moonstar from '../../assets/brands/moonstar.png'
import randstad from '../../assets/brands/randstad.png'
import start_people from '../../assets/brands/start-people 1.png'
import start from '../../assets/brands/start.png'
  



const OurHelped = () => {
 const cards = [
        {
          icon : livetraking,
          title : "Live Parcel Tracking",
          discription : "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
        },
        {
          icon : tinydeliveryman,
          title : "100% Safe Delivery",
          discription : "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
        },
        {
          icon : safeDelivary,
          title : "24/7 Call Center Support",
          discription : "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us"
        },

    ]

 const marqueeImage = [amazon,start,casio,moonstar,randstad,start_people,rokomari]

  return (
  <div>
    <h1 className='text-center text-3xl font-extrabold'>We've helped thousands of sales teams</h1>

    <Marquee  direction='"left" | "right"' speed={100}  pauseOnHover={true}>
  <div className="flex items-center gap-14 px-6 my-5">
          {marqueeImage.map((brand, i) => (
            <div key={i}  className="flex items-center justify-center bg-white/10 rounded-xl p-3 hover:bg-white/20 transition">
              <img
                src={brand}
                alt={`brand-${i}`}
                className="lg:h-12 h-6 w-auto object-contain brightness-110 contrast-105"
              />
            </div>
          ))}
        </div>
    </Marquee>

      <div className='my-20 border-y border-dashed'>
     <div className='grid grid-cols  gap-11 my-5 p-6'>
       {
        cards.map(card => {
            return (
                <div className='bg-base-200 rounded-2xl flex flex-col lg:flex-row  items-center gap-12 p-20 '>
                    <div className=''><img src={card.icon} alt="" /></div>
                    <div className='border border-dashed h-full'> </div>
                    <div className='space-y-3.5 '>
                      <h1 className='text-[rgba(3,55,61,1)] md:text-2xl text-xl lg:text-3xl font-extrabold'>{card.title}</h1>
                      <h1 className='font-bold text-shadow-base-100'>{card.discription}</h1>
                    </div>
                </div>
            )
        })
       }
    </div>
    </div>
  </div>
  )
}

export default OurHelped