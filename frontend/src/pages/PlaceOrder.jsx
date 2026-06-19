import React, { useContext, useState} from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { token } = useContext(ShopContext);
  const {
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [token, navigate]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Hi");

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item]) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  return (
    <div className="border-t pt-5 sm:pt-10 min-h-[80vh]">
    
    {/* Progress Indicator */}
      <div className="mb-10">
        <div className="flex justify-center items-center gap-3 text-sm sm:text-base font-medium">
          <span className="text-pink-500">🛒 Cart</span>
          <span>→</span>
          <span className="text-pink-500">📍 Delivery</span>
          <span>→</span>
          <span className="text-pink-500">💳 Payment</span>
          <span>→</span>
          <span className="text-gray-400">✅ Complete</span>
        </div>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:flex-row justify-between gap-10"
      >
        {/* Left Side */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[520px] bg-white shadow-lg rounded-2xl p-6">
        
          <div className="text-xl sm:text-2xl my-2">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <p className="text-gray-500 text-sm mb-2">
            Please enter your shipping details to continue.
          </p>

          <div className="flex gap-3">
            <input
              required
              className="border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-pink-300"
              type="text"
              placeholder="First Name"
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
            />

            <input
              required
              className="border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-pink-300"
              type="text"
              placeholder="Last Name"
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
            />
          </div>

          <input
            required
            className="border border-gray-300 rounded-xl py-3 px-4 w-full"
            type="email"
            placeholder="Email Address"
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
          />

          <input
            required
            className="border border-gray-300 rounded-xl py-3 px-4 w-full"
            type="text"
            placeholder="Street Address"
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
          />

          <div className="flex gap-3">
            <input
              required
              className="border border-gray-300 rounded-xl py-3 px-4 w-full"
              type="text"
              placeholder="City"
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
            />

            <input
              required
              className="border border-gray-300 rounded-xl py-3 px-4 w-full"
              type="text"
              placeholder="State"
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
            />
          </div>

        <div className="flex gap-3">
          <input
            required
            className="border border-gray-300 rounded-xl py-3 px-4 w-full"
            type="number"
            placeholder="Zipcode"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
          />

          <input
            required
            className="border border-gray-300 rounded-xl py-3 px-4 w-full"
            type="text"
            placeholder="Country"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
          />
        </div>

        <input
          required
          className="border border-gray-300 rounded-xl py-3 px-4 w-full"
          type="number"
          placeholder="Phone Number"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
        />
      </div>

      {/* Right Side */}
      <div className="w-full lg:max-w-[450px]">
        
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <CartTotal />

          <div className="mt-5 text-sm text-gray-500 space-y-2">
            <p>🔒 Secure Checkout</p>
            <p>🚚 Free Shipping above ₹999</p>
            <p>↩️ Easy Returns & Exchanges</p>
          </div>
        </div>

        <div className="mt-6 bg-white shadow-lg rounded-2xl p-6">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex flex-col gap-4 mt-5">

            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-all ${
                method === "stripe"
                  ? "border-pink-400 bg-pink-50"
                  : "hover:border-pink-300"
              }`}
            >
              <p
                className={`min-w-4 h-4 border rounded-full ${
                  method === "stripe" ? "bg-pink-500" : ""
                }`}
              ></p>

              <img
                className="h-5 mx-2"
                src={assets.stripe_logo}
                alt=""
              />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-all ${
                method === "cod"
                  ? "border-pink-400 bg-pink-50"
                  : "hover:border-pink-300"
              }`}
            >
              <p
                className={`min-w-4 h-4 border rounded-full ${
                  method === "cod" ? "bg-pink-500" : ""
                }`}
              ></p>

              <p className="font-medium text-gray-600">
                CASH ON DELIVERY
              </p>
            </div>

          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white px-16 py-4 rounded-xl text-sm font-medium transition-all shadow-md"
            >
              PLACE ORDER
            </button>
          </div>
        </div>

      </div>
    </form>
  </div>
  );
};

export default PlaceOrder;
