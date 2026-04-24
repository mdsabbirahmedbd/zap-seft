import { useState } from "react";
import { Menu, X, Home, Package,  CreditCard, Settings } from "lucide-react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { MdOutlineDirectionsBike } from "react-icons/md";
import Logo from "../../Shared/Logo";
import { NavLink, Outlet } from "react-router";
import UseRole from "../../Hooks/UseRole";
import Loading from "../../Shared/Loading/Loading";

export default function DashboardLayout() {
  const [role,isLoading] = UseRole()
  const [isMobileOpen, setIsMobileOpen] = useState(false);
   const allmenu  = [
    {
        icon :  <Package size={20} />,
        name : 'Parcels',
        address :'/dashboard/myparcel'
    },
    {
        icon : <CreditCard size={20} />,
        name : 'Payments History',
        address :'/dashboard/payment-history'
    },
        {
        icon : <Settings size={20} />,    
        name : 'Settings',
        address :'#'
    },
   
    
   ]


   const adminMenu = [
      {
        icon  : <Home size={20} />,
        name : 'Dashboard',
        address :'/dashboard/dasghboard-home'
    },
    {
        icon :  <MdOutlineDirectionsBike size={20} />,
        name : 'Approval Riders',
        address :'/dashboard/rider-parmission'    
    },
    {
        icon : <FaUsers  size={20} />,
        name : 'User Managment',
        address :'/dashboard/user-managment'
    },
    {
        icon : <CiDeliveryTruck size={20} />,
        name : 'Rider Assignment',
        address :'/dashboard/ride-assaignment'
    }
   ]
   

   const riderMenu = [
    {
        icon  : <Home size={20} />,
        name : 'Dashboard',
        address :'/dashboard/dasghboard-home'
    },
    {
        icon :  <MdOutlineDirectionsBike size={20} />,
        name : 'Rider Account',
        address :'/dashboard/rider-account'    
    },
    {
      icon : <CiDeliveryTruck size={20} />,
      name : 'Complete Delivery',
      address :'/dashboard/complete-delivery'
    }
   ]

   if(isLoading) return <Loading></Loading>

  return (
    <div className="h-screen flex bg-gray-100">
      {/* ---------------- MOBILE MENU BUTTON ---------------- */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-3 bg-white shadow-lg rounded-xl hover:bg-gray-50 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* ---------------- OVERLAY (mobile only) ---------------- */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-[#00000019] bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ---------------- SIDEBAR ---------------- */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out w-64
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static
        `}
      >
        {/* MOBILE close button */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* SIDEBAR HEADER */}
        <div className="p-6 border-b">
          <Logo></Logo>
        </div>

        {/* MENU ITEMS */}
        <nav className="p-4">
          <ul className="space-y-2">
            {
                allmenu.map((menu ,idx) => {
                    return <li key={idx}>
               <NavLink to={menu.address} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                {menu.icon}
              <span>{menu.name}</span>
               </NavLink>
                 </li>    
                })
            }


            {/* this is for rider */}

            {role?.role === 'rider' && (
              <>
                <li className="pt-2">
                  <p className="px-4 text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Rider
                  </p>
                </li>
                <li>
                 {
                    riderMenu.map((menu, idx) => (
                      <NavLink
                        key={idx}
                        to={menu.address}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                          }`
                        }
                      >
                        {menu.icon}
                        <span>{menu.name}</span>
                      </NavLink>
                    ))
                 }
                </li>
              </>
            )}




      {/* this is for admin      */}
    {role?.role=== 'admin' && (
      <>
        <li className="pt-2">
          <p className="px-4 text-xs text-gray-400 uppercase tracking-wide mb-1">
            Admin
          </p>
        </li>
        {adminMenu.map((menu, idx) => (
          <li key={idx}>
            <NavLink
              to={menu.address}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`
              }
            >
              {menu.icon}
              <span>{menu.name}</span>
            </NavLink>
          </li>
        ))}
      </>
    )}

            

          </ul>
        </nav>
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 p-6 md:p-8 ml-0 mt-16 md:mt-0">
          <Outlet></Outlet>
      </main>
    </div>
  );
}