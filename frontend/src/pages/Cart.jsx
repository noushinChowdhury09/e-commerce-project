import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }

      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="pt-12 min-h-screen">
      <div className="mb-10">
        <Title text1={"SHOPPING"} text2={"CART"} />
      </div>

      {cartData.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-medium mb-3">
            Your Cart is Empty 🛍️
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything yet.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id
              );

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4"
                >
                  <div className="flex flex-col sm:flex-row gap-5 items-center">
                    {/* Product Image */}
                    <img
                      className="w-32 h-32 object-cover rounded-xl"
                      src={productData.image[0]}
                      alt={productData.name}
                    />

                    {/* Product Details */}
                    <div className="flex-1 w-full">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {productData.name}
                      </h3>

                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-lg font-medium">
                          {currency}
                          {productData.price}
                        </span>

                        <span className="px-3 py-1 bg-pink-50 border border-pink-200 rounded-full text-sm">
                          Size {item.size}
                        </span>
                      </div>

                      <p className="text-sm text-green-600 mt-3">
                        🚚 Delivery in 3-5 business days
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.size,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                          -
                        </button>

                        <span className="font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, 0)
                      }
                    >
                      <img
                        className="w-5 hover:scale-110 transition"
                        src={assets.bin_icon}
                        alt="delete"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="mt-12 grid lg:grid-cols-2 gap-10">
            {/* Coupon Section */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                Have a Coupon?
              </h3>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 border rounded-lg px-4 py-3"
                />

                <button className="bg-pink-500 text-white px-6 rounded-lg hover:bg-pink-600">
                  Apply
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-3">
                Try: WELCOME10 or SUMMER20
              </p>
            </div>

            {/* Cart Total */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <CartTotal />

              <button
                onClick={() => navigate("/place-order")}
                className="w-full mt-6 bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition"
              >
                Secure Checkout 🔒
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;