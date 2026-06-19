import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image3, setImage3] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(20);
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setName("");
        setDescription("");
        setPrice("");
        setStock(20);

        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);

        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full max-w-5xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100 gap-5"
    >
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Add New Product
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Upload products to your Veloura collection.
        </p>
      </div>

      {/* Upload Images */}
      <div>
        <p className="mb-3 font-medium">Upload Images</p>

        <div className="flex gap-4 flex-wrap">
          <label className="cursor-pointer" htmlFor="image1">
            <img
              className="w-24 h-24 object-cover rounded-xl border border-gray-200 hover:shadow-md transition-all"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label className="cursor-pointer" htmlFor="image2">
            <img
              className="w-24 h-24 object-cover rounded-xl border border-gray-200 hover:shadow-md transition-all"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label className="cursor-pointer" htmlFor="image3">
            <img
              className="w-24 h-24 object-cover rounded-xl border border-gray-200 hover:shadow-md transition-all"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label className="cursor-pointer" htmlFor="image4">
            <img
              className="w-24 h-24 object-cover rounded-xl border border-gray-200 hover:shadow-md transition-all"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product Name</p>

        <input
          className="w-full max-w-[600px] px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-300"
          type="text"
          placeholder="Enter Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product Description</p>

        <textarea
          className="w-full max-w-[600px] px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-300"
          placeholder="Add Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
        />
      </div>

      {/* Category Section */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div>
          <p className="mb-2 font-medium">Product Category</p>

          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="px-4 py-3 rounded-xl border border-gray-200"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium">Sub Category</p>

          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="px-4 py-3 rounded-xl border border-gray-200"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium">Product Price</p>

          <input
            className="px-4 py-3 rounded-xl border border-gray-200 w-[140px]"
            type="number"
            placeholder="25"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <p className="mb-2 font-medium">Stock Quantity</p>
          <input
            className="px-4 py-3 rounded-xl border border-gray-200 w-[140px]"
            type="number"
            placeholder="20"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-3 font-medium">Available Sizes</p>

        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size)
                    ? "bg-pink-400 text-white"
                    : "bg-gray-100 hover:bg-pink-50"
                } px-4 py-2 rounded-lg cursor-pointer transition-all`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex items-center gap-3 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />

        <label
          htmlFor="bestseller"
          className="cursor-pointer text-gray-700"
        >
          Add to Bestseller Collection
        </label>
      </div>

      {/* Submit */}
      <button
        className="px-8 py-3 mt-2 bg-pink-400 hover:bg-pink-500 text-white rounded-xl font-medium transition-all duration-300 shadow-sm w-fit"
        type="submit"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;

