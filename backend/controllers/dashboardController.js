import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const getDashboardData = async (req, res) => {
  try {
    const productCount = await productModel.countDocuments();
    const orderCount = await orderModel.countDocuments();
    const userCount = await userModel.countDocuments();

    const orders = await orderModel.find({});

    const revenue = orders.reduce(
      (total, order) => total + order.amount,
      0
    );

    res.json({
      success: true,
      stats: {
        products: productCount,
        orders: orderCount,
        users: userCount,
        revenue,
      },
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { getDashboardData };