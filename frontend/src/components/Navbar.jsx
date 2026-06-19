import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    getFavoritesCount,
    navigate,
    token,
    setToken,
    setCartItems,
    setFavorites,
  } = useContext(ShopContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setFavorites([]);
    navigate("/login");
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-white/20 backdrop-blur-2xl shadow-sm"
          : "bg-[#fffaf8]/40 backdrop-blur-md"
      }`}
    >
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <div className="flex items-center justify-between py-3">
          
          {/* Logo */}
          <Link to="/">
            <img
              src={assets.logo}
              alt="Veloura Logo"
              className={`w-auto object-contain transition-all duration-500 ${
                scrolled
                  ? "h-10 md:h-12"
                  : "h-12 md:h-14"
              }`}
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden sm:flex gap-8 text-sm tracking-wide text-gray-800">
            <NavLink
              to="/"
              className="flex flex-col items-center gap-1 hover:text-pink-500 transition-all"
            >
              <p>HOME</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-pink-400 hidden" />
            </NavLink>

            <NavLink
              to="/collection"
              className="flex flex-col items-center gap-1 hover:text-pink-500 transition-all"
            >
              <p>COLLECTION</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-pink-400 hidden" />
            </NavLink>

            <NavLink
              to="/about"
              className="flex flex-col items-center gap-1 hover:text-pink-500 transition-all"
            >
              <p>ABOUT</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-pink-400 hidden" />
            </NavLink>

            <NavLink
              to="/contact"
              className="flex flex-col items-center gap-1 hover:text-pink-500 transition-all"
            >
              <p>CONTACT</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-pink-400 hidden" />
            </NavLink>
          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center gap-6">

            {/* Search */}
            <img
              onClick={() => {
                setShowSearch(true);
                navigate("/collection");
              }}
              src={assets.search_icon}
              className="w-5 cursor-pointer hover:scale-110 transition-all"
              alt="search"
            />

            {/* Profile */}
            <div className="group relative">
              <img
                onClick={() => (token ? null : navigate("/login"))}
                src={assets.profile_icon}
                className="w-5 cursor-pointer hover:scale-110 transition-all"
                alt="profile"
              />

              {token && (
                <div className="group-hover:block hidden absolute right-0 pt-4">
                  <div className="flex flex-col gap-2 w-40 py-3 px-5 bg-white shadow-lg rounded-md text-gray-600">
                    <p
                      onClick={() => navigate("/orders")}
                      className="cursor-pointer hover:text-pink-500"
                    >
                      Orders
                    </p>

                    <p
                      onClick={logout}
                      className="cursor-pointer hover:text-pink-500"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Favorites */}
            <Link
              to={token ? "/favorites" : "/login"}
              className="relative"
            >
              <div className="text-xl hover:scale-110 transition-all cursor-pointer">
                ❤️
              </div>

              {token && getFavoritesCount() > 0 && (
                <p className="absolute right-[-6px] bottom-[-6px] w-4 text-center leading-4 bg-pink-500 text-white aspect-square rounded-full text-[8px]">
                  {getFavoritesCount()}
                </p>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <img
                src={assets.cart_icon}
                className="w-5 hover:scale-110 transition-all"
                alt="cart"
              />

              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                {getCartCount()}
              </p>
            </Link>

            {/* Mobile Menu */}
            <img
              onClick={() => setVisible(true)}
              src={assets.menu_icon}
              className="w-5 cursor-pointer sm:hidden"
              alt="menu"
            />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-700">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt=""
            />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/"
          >
            HOME
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/collection"
          >
            COLLECTION
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to={token ? "/favorites" : "/login"}
          >
            FAVORITES
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/about"
          >
            ABOUT
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
