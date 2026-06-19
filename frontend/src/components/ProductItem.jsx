import React, { useContext } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, isNew }) => {
  const {
    currency,
    toggleFavorite,
    isFavorite,
    navigate,
    token,
  } = useContext(ShopContext);
  const handleFavorite = (e) => {
    e.preventDefault();

    console.log("Heart clicked", id);

    if (!token) {
      toast.error("Please login to save favorites");
      navigate("/login");
      return;
    }

    toggleFavorite(id);
  };

  return (
    <Link
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      to={`/product/${id}`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 z-10 bg-white w-9 h-9 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition"
        >
          {isFavorite(id) ? "❤️" : "🤍"}
        </button>
        <img
          className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
          src={image[0]}
          alt={name}
        />

        {/* New Badge */}
        {isNew && (
          <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
            NEW
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <p className="text-gray-800 font-medium truncate">
          {name}
        </p>

        {/* Ratings */}
        <div className="flex items-center gap-1 mt-2 text-yellow-400 text-sm">
          ★★★★★
          <span className="text-gray-500 text-xs ml-1">
            (4.8)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <p className="text-lg font-semibold text-pink-600">
            {currency}
            {price}
          </p>

          <p className="text-sm text-gray-400 line-through">
            {currency}
            {Math.round(price * 1.3)}
          </p>
        </div>
      </div>

    </Link>
  );
};

export default ProductItem;