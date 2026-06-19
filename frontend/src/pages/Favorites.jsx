import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const Favorites = () => {
  const {
    favorites,
    products,
    currency,
    toggleFavorite,
  } = useContext(ShopContext);

  const favoriteProducts = products.filter((product) =>
    favorites.some(
      (id) => String(id) === String(product._id)
    )
  );
  return (
    <div className="border-t pt-10 min-h-[70vh]">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"WISHLIST"} />
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-3">
            ❤️ Your Wishlist is Empty
          </h2>

          <p className="text-gray-500">
            Save your favorite products here.
          </p>

          <Link
            to="/collection"
            className="inline-block mt-6 bg-black text-white px-6 py-3 rounded"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <Link to={`/product/${item._id}`}>
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-72 object-cover"
                />
              </Link>

              <div className="p-4">
                <h3 className="font-medium truncate">
                  {item.name}
                </h3>

                <p className="text-pink-600 font-semibold mt-2">
                  {currency}
                  {item.price}
                </p>

                <button
                  onClick={() => toggleFavorite(item._id)}
                  className="mt-3 w-full bg-red-50 text-red-500 py-2 rounded hover:bg-red-100"
                >
                  Remove ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;