import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for userRegistration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking if user already exists or not
    const exist = await userModel.findOne({ email });

    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be atleast 8 characters long",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating user
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    // generating token
    const token = createToken(user._id);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Add / Remove Favorite

// Add / Remove Favorite
const toggleFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.body.userId;

    const user = await userModel.findById(userId);

    let favorites = user.favorites || [];

    if (favorites.includes(productId)) {
      favorites = favorites.filter((id) => id !== productId);
    } else {
      favorites.push(productId);
    }

    await userModel.findByIdAndUpdate(userId, { favorites });

    res.json({
      success: true,
      favorites,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};



// Get Favorites

// Get Favorites
const getFavorites = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await userModel.findById(userId);

    res.json({
      success: true,
      favorites: user.favorites || [],
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


export {
  loginUser,
  registerUser,
  adminLogin,
  forgotPassword,
  toggleFavorite,
  getFavorites,
};
