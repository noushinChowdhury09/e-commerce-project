import React from "react";
import { assets } from "../assets/admin_assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm">
      
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img
          className="h-12 w-auto object-contain"
          src={assets.logo}
          alt="Veloura Logo"
        />

        <div className="hidden md:block">
          <h1 className="text-lg font-semibold text-gray-800">
            Veloura Admin
          </h1>
          <p className="text-xs text-gray-500">
            Fashion Store Management Panel
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => setToken("")}
        className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;