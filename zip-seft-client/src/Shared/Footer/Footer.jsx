import React from 'react'
import { FaLinkedinIn, FaFacebookF, FaYoutube } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx"; 
import Logo from '../../Shared/Logo';
import { NavLink } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-[#0F0F0F] text-[rgba(234,236,237,1)] rounded-2xl py-10 px-6 flex flex-col items-center text-center my-6">
      
      {/* Logo + Tagline */}
      <div className="flex flex-col items-center space-y-3">
        {/* Logo */}
      <Logo></Logo>

        {/* Description */}
        <p className="max-w-xl text-[rgba(96,96,96,1)] font-urbanist text-base font-medium leading-[100%] tracking-[0%] text-center">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-[rgba(255,255,255,0.1)] my-8"></div>

      {/* Navigation Links */}
      <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium text-white">
         <NavLink  to='/' className="hover:text-[#B4FF00] cursor-pointer transition">Services</NavLink>
         <NavLink to='/' className="hover:text-[#B4FF00] cursor-pointer transition" >Coverage</NavLink>
         <NavLink to='/' className="hover:text-[#B4FF00] cursor-pointer transition">About Us</NavLink>
         <NavLink to='/' className="hover:text-[#B4FF00] cursor-pointer transition">Pricing</NavLink>
         <NavLink to='/' className="hover:text-[#B4FF00] cursor-pointer transition">Blog</NavLink>
         <NavLink to='/' className="hover:text-[#B4FF00] cursor-pointer transition">Contact</NavLink>

      </ul>

      {/* Social Icons */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <NavLink to='https://www.linkedin.com/in/sabbircse/' target='blank' className="bg-white text-[#0A66C2] p-2 rounded-full hover:scale-110 transition">
          <FaLinkedinIn size={16} />
        </NavLink>
        <NavLink to='/' className="bg-white text-black p-2 rounded-full hover:scale-110 transition">
          <RxCross2 size={16} />
        </NavLink>
        <NavLink to='https://www.facebook.com/profile.php?id=100086091671728' target='blank' className="bg-white text-[#1877F2] p-2 rounded-full hover:scale-110 transition">
          <FaFacebookF size={16} />
        </NavLink>
        <NavLink to={'https://youtube.com/'} target='blank' className="bg-white text-[#FF0000]  p-2 rounded-full hover:scale-110 transition">
          <FaYoutube size={16} />
        </NavLink>
      </div>

    </footer>
  )
}

export default Footer