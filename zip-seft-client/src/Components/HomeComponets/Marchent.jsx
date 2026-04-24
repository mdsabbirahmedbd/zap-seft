import React from "react";
import marchent from "../../assets/location-merchant.png";
import marchent_bg from "../../assets/be-a-merchant-bg.png";

const Marchent = () => {
  return (
    <div className="relative bg-[#03373D] rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 mt-10">
      {/* Background design image */}
      <img
        src={marchent_bg}
        alt="background"
        className="absolute top-0 left-0  pointer-events-none"
      />

      {/* Left side text section */}
      <div className="relative z-10 text-white max-w-xl space-y-5">
        <h1 className="text-3xl lg:text-4xl font-extrabold leading-snug">
          Merchant and Customer Satisfaction <br /> is Our First Priority
        </h1>
        <p className="text-gray-200 leading-relaxed">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Profast courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">
          <button className="bg-[#CAEB66] cursor-pointer text-[#03373D] font-semibold px-6 py-3 rounded-full hover:bg-lime-400 transition">
            Become a Merchant
          </button>
          <button className="cursor-pointer border border-[#CAEB66] text-[#CAEB66] font-semibold px-6 py-3 rounded-full hover:bg-[#CAEB66] hover:text-[#03373D] transition">
            Earn with Profast Courier
          </button>
        </div>
      </div>

      {/* Right side image */}
      <div className="relative z-10 mt-10 lg:mt-0 lg:ml-10">
        <img
          src={marchent}
          alt="merchant"
          className="w-[300px] lg:w-[400px] object-contain"
        />
      </div>
    </div>
  );
};

export default Marchent;
