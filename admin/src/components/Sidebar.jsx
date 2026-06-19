import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r bg-white shadow-sm">
      <div className="flex flex-col gap-4 pt-8 pl-[15%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 px-4 py-3 rounded-l-xl border border-gray-200 border-r-0 hover:bg-pink-50 hover:border-pink-200 transition-all duration-300"
          to="/"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="dashboard-icon" />
          <p className="hidden md:block font-medium">Dashboard</p>
        </NavLink>
        
        <NavLink
          className="flex items-center gap-3 px-4 py-3 rounded-l-xl border border-gray-200 border-r-0 hover:bg-pink-50 hover:border-pink-200 transition-all duration-300"
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="add-icon" />
          <p className="hidden md:block font-medium">Add Products</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 px-4 py-3 rounded-l-xl border border-gray-200 border-r-0 hover:bg-pink-50 hover:border-pink-200 transition-all duration-300"
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="list-icon" />
          <p className="hidden md:block font-medium">Manage Products</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 px-4 py-3 rounded-l-xl border border-gray-200 border-r-0 hover:bg-pink-50 hover:border-pink-200 transition-all duration-300"
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="order-icon" />
          <p className="hidden md:block font-medium">Orders</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;