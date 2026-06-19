import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI +
      "/ecom?ssl=true&replicaSet=atlas-caes3d-shard-0&authSource=admin"
    );

    console.log("Database Connected Successfully");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;