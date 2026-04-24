import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Autoplay  } from "swiper/modules";
import "swiper/css";
import reviewQuote from '../../assets/reviewQuote.png'
import customer from '../../assets/customer-top.png'

const reviews = [
  {
    name: "Awlad Hossin",
    role: "Senior Product Designer",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Nasir Uddin",
    role: "CEO",
    text: "The posture corrector helps maintain a natural curve of your spine, reducing the strain on your back during work or exercise.",
  },
  {
    name: "Rasel Ahamed",
    role: "CTO",
    text: "An excellent product! It provides just enough tension to remind me to sit and stand straighter without discomfort.",
  },
  {
    name: "Tania Rahman",
    role: "UX Researcher",
    text: "I love how this posture corrector is lightweight and comfortable for daily use!",
  },
];

const ReviewSlider = () => {
  const swiperRef = useRef(null);

  return (
    <div className="py-20 px-4 md:px-10 rounded-3xl">
     <div className="my-10">
        <div className="flex justify-center items-center my-4"><img src={customer} alt="" /></div>
         <h2 className="text-3xl md:text-4xl font-bold text-center mb-5 text-[#03373D]">What our customers are sayings</h2>
         <p className="text-center">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your body with ease!</p>

     </div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation,Autoplay ]}
        centeredSlides={true}
        slidesPerView={1.2}
        spaceBetween={20}
        loop={true}
          autoplay={{
          delay: 3000, // auto slide every 3 sec
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        
        breakpoints={{
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
        }}
        className="relative"
      >
        {reviews.map((r, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <div
                className={`rounded-2xl p-8 text-center transition-all duration-500 ${
                  isActive
                    ? "bg-white shadow-xl scale-105 blur-0 opacity-100"
                    : "bg-white/50 scale-90 blur-[2px] opacity-60"
                }`}
              >
                <img src={reviewQuote} alt="" />
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {r.text}
                </p>
                <div className="mt-4 pt-4 border-t border-dashed border-[#03373D]">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-[#03373D] rounded-full mb-2"></div> 
                    <h3 className="text-[#03373D] font-bold">{r.name}</h3>
                    <p className="text-gray-500 text-sm">{r.role}</p>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center mt-10 gap-4">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-10 cursor-pointer h-10 flex items-center justify-center bg-white shadow rounded-full text-[#03373D] hover:bg-[#03373D] hover:text-white transition"
        >
          ←
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="w-10 cursor-pointer h-10 flex items-center justify-center bg-[#C3E432] shadow rounded-full text-[#03373D] hover:bg-[#03373D] hover:text-white transition"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ReviewSlider;
