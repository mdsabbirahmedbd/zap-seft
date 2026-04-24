import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaBrain, FaGlobeAsia, FaMoneyBillWave, FaShippingFast } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";

const OurServices = () => {
  const cards = [
    {
      id: 1,
      icon: <FaBrain />,
      title: "Express & Standard Delivery",
      discription:
        "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
    },
    {
      id: 2,
      icon: <FaShippingFast />,
      title: "Nationwide & Delivery",
      discription:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
    },
    {
      id: 3,
      icon: <FaGlobeAsia />,
      title: "Fulfillment Solution",
      discription:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      id: 4,
      icon: <FaMoneyBillWave />,
      title: "Cash on Home Delivery",
      discription:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      id: 5,
      icon: <RiTeamLine />,
      title: "Corporate Service / Contract In Logistics",
      discription:
        "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      id: 6,
      icon: <RiTeamLine />,
      title: "Parcel Return",
      discription:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];

  return (
    <div className="flex flex-col items-center my-20 bg-[rgba(3,55,61,1)] rounded-3xl p-10 lg:p-24">
      <div className="text-center">
        <h1 className="text-4xl text-white font-extrabold">Our Services</h1>
        <p className="text-base-300">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          <br /> From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Grid for large screens */}
      <div className="hidden lg:grid grid-cols-3 gap-11 my-10 px-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-10 hover:scale-105 transition-transform duration-300 cursor-pointer hover:bg-[rgba(202,235,102,1)] flex flex-col items-center space-y-4"
          >
            <div className="bg-red-50 w-[70px] h-[70px] rounded-full flex items-center justify-center">
              <div className="text-4xl text-gray-700">{card.icon}</div>
            </div>
            <h1 className="text-black font-semibold text-2xl text-center">{card.title}</h1>
            <p className="text-center text-gray-700">{card.discription}</p>
          </div>
  
        ))}
      </div>

      {/* Swiper for small & medium screens */}
      <div className="w-full lg:hidden mt-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
          loop
        >
          {cards.map((card) => (
            <SwiperSlide className="rounded-2xl" key={card.id}>
              <div className="bg-white rounded-2xl p-6  cursor-pointer hover:bg-[rgba(202,235,102,1)] flex flex-col items-center space-y-4">
                <div className="bg-red-50 w-[70px] h-[70px] rounded-full flex items-center justify-center">
                  <div className="text-4xl text-gray-700">{card.icon}</div>
                </div>
                <h1 className="text-black font-semibold text-xl text-center">{card.title}</h1>
                <p className="text-center text-gray-700 text-sm">{card.discription}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OurServices;
