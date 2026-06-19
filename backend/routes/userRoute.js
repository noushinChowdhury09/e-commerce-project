import express from "express";
import authUser from "../middlewares/auth.js";
import {
  loginUser,
  registerUser,
  adminLogin,
  forgotPassword,
  toggleFavorite,
  getFavorites,
} from "../controllers/userController.js";

const userRouter = express.Router()

userRouter.post("/register", registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/favorite", authUser, toggleFavorite);
userRouter.post("/get-favorites", authUser, getFavorites);
export default userRouter;