import React, { useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const slides = [
  {
    title: "Men's Fashion Collection",
    subtitle:
      "Discover premium shirts, t-shirts, jeans, jackets, and essentials designed for modern style and everyday comfort.",
    image: assets.banner6,
    category: "FEATURED COLLECTION",
    route: "/collection",
  },

  {
    title: "Summer Sale Up To 50% Off",
    subtitle:
      "Upgrade your wardrobe with exclusive deals on premium fashion, footwear, and accessories.",
    image: assets.banner5,
    category: "LIMITED TIME OFFER",
    route: "/collection",
  },

  {
    title: "Women's New Arrivals",
    subtitle:
      "Explore elegant dresses, tops, handbags, and statement pieces curated for every occasion.",
    image: assets.banner4,
    category: "NEW SEASON STYLES",
    route: "/collection",
  },

  {
    title: "Kids Fashion Collection",
    subtitle:
      "Comfortable, stylish, and playful outfits for boys and girls, perfect for every season and celebration.",
    image: assets.banner3,
    category: "KIDS WEAR",
    route: "/collection",
  },
];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleShopNow = () => {
    navigate("/collection");
  };

  return (
    <div className="flex flex-col sm:flex-row border border-gray-300 overflow-hidden">
      {/* Left Section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-gray-50">
        <div className="text-[#414141] px-8">
          <div className="flex items-center gap-2">
            <p className="w-10 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base uppercase">
              {slides[currentSlide].category}
            </p>
          </div>

          <h1 className="prata-regular text-3xl sm:py-4 lg:text-5xl leading-relaxed">
            {slides[currentSlide].title}
          </h1>

          <p className="text-gray-600 text-base md:text-lg mb-6">
            {slides[currentSlide].subtitle}
          </p>

          <div
            onClick={handleShopNow}
            className="flex items-center gap-2 cursor-pointer hover:text-black transition-all"
          >
            <p className="font-semibold text-sm md:text-base">
              SHOP NOW
            </p>
            <p className="w-10 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <img
        className="w-full sm:w-1/2 object-cover transition-all duration-700"
        src={slides[currentSlide].image}
        alt={slides[currentSlide].title}
      />
    </div>
  );
};

export default Hero;

