import mongoose, { mongo } from "mongoose";
console.log("PRODUCT MODEL LOADED");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestSeller: { type: Boolean },
  date: { type: Number, required: true },
  stock: { type: Number, default: 20 },
});

console.log(productSchema.obj);

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
