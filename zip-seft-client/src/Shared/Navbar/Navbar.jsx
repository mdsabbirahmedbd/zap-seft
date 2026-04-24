import React from 'react'
import { Link, NavLink } from 'react-router'
import Logo from '../Logo'
import UseAuth from '../../Hooks/UseAuth'

const   Navbar = () => {
   const {user,logoutUser} = UseAuth();

   const logout = () => {
    logoutUser()
   }

  const navlink = <>
         <NavLink to='/'>Services</NavLink>
         <NavLink to='/coverage'>Coverage</NavLink>
         <NavLink to='/'>About Us</NavLink>
         <NavLink to='/'>Pricing</NavLink>
         <NavLink to='/rider'>Be a Rider</NavLink>
         {
          user && <>
              <NavLink to='/sendparcel'>Send a Parcel</NavLink>
              <NavLink to='/dashboard/myparcel'>Dashboard</NavLink>
          </>
         }

  </>

  
  return (
    <div className="navbar bg-white rounded-xl z-10">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
      {navlink}
      </ul>
    </div>
    <div>
     <Logo></Logo>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 ">
       <div className='gap-5 flex font-medium text-base'>
       {navlink} 
       </div>
    </ul>
  </div>
  <div className="navbar-end">
    {
      user ? 
      <button onClick={logout} className="btn">Log Out</button>
      :
      <button className="btn bg-white border-[#CAEB66]  hover:bg-[#CAEB66] hover:text-white">
                  <Link to='/login'>Login</Link>
      </button>
    }
    
  </div>
</div>
  )
}

export default Navbar