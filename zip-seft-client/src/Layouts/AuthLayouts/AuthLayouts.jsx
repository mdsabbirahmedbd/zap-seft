import React from "react";
import authImage from "../../assets/authImage.png";

import { Outlet } from "react-router";

export default function AuthLayouts() {
  return (
    <div className="min-h-screen w-full flex  lg:flex-row bg-white">
      {/* Left Section */}
      <div className="w-full lg:w-1/2  flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-6 relative">
      <Outlet></Outlet>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex w-1/2 bg-[#F7F9EE] items-center justify-center p-6">
        <img src={authImage} className="w-3/4" />
      </div>
    </div>
  );
}