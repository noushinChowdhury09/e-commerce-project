import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Veloura is a modern fashion destination offering premium clothing for Men, Women, and Kids. We focus on quality, comfort, and style, bringing the latest trends at affordable prices. Our mission is to make online shopping simple, secure, and enjoyable for everyone.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <Link to="/" className="hover:text-black">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-black">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/collection" className="hover:text-black">
                Collections
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-black">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 98765 43210</li>
            <li>www.velourastore.com</li>
            <li className="cursor-pointer">Instagram: @velourastore</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          © 2026 Veloura Store. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
