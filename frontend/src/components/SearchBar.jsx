import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, showSearch, setSearch, setShowSearch } =
    useContext(ShopContext);

  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
      setShowSearch(false);
    }
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <div className="fixed top-24 left-0 right-0 z-40 flex justify-center">
      <div className="w-[90%] max-w-2xl bg-white shadow-lg rounded-full px-6 py-3 flex items-center gap-4 border border-gray-200">
        <input
          className="flex-1 outline-none text-sm bg-transparent"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <img
          className="w-5"
          src={assets.search_icon}
          alt="search_icon"
        />

        <img
          className="w-4 cursor-pointer"
          onClick={() => setShowSearch(false)}
          src={assets.cross_icon}
          alt="cross_icon"
        />
      </div>
    </div>
  );
};

export default SearchBar;