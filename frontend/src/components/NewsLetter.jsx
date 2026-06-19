
import React from "react";
import { toast } from "react-toastify";

const NewsLetter = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    toast.success("Thank you for subscribing to Veloura Store!");
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Stay Updated with Veloura Store
      </p>

      <p className="text-gray-500 mt-3">
        Join our community and be the first to know about new arrivals,
        exclusive offers, seasonal sales, and the latest fashion trends for
        Men, Women, and Kids.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email address"
          required
        />

        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4 hover:bg-gray-800 transition-all duration-300"
        >
          JOIN NOW
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
