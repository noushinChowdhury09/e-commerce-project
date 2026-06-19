
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { token, navigate, backendUrl, setToken } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [forgotMode, setForgotMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const onSumbitHandler = async (e) => {
    try {
      e.preventDefault();

      if (currentState === "Sign Up") {
        const response = await axios.post(
          backendUrl + "/api/user/register",
          {
            name,
            email,
            password,
          }
        );

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Account created successfully");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(
          backendUrl + "/api/user/login",
          {
            email,
            password,
          }
        );

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const resetPassword = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/forgot-password",
        {
          email,
          newPassword,
        }
      );

      if (response.data.success) {
        toast.success("Password updated successfully");
        setForgotMode(false);
        setCurrentState("Login");
        setNewPassword("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <form
      onSubmit={onSumbitHandler}
      className="w-[90%] sm:max-w-md mx-auto mt-16 mb-16 bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 md:p-10 text-gray-800 border border-white/30"
    >
      {/* Heading */}
      <div className="text-center mb-6">
        <p className="prata-regular text-4xl text-gray-900">
          {forgotMode
            ? "Reset Password"
            : currentState === "Sign Up"
            ? "Create Account"
            : "Login"}
        </p>

        <p className="text-gray-500 mt-2 text-sm">
          Welcome to Veloura Fashion Store
        </p>
      </div>

      {forgotMode ? (
        <>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all mt-4"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={resetPassword}
            className="w-full bg-black hover:bg-pink-500 text-white py-3 rounded-xl transition-all duration-300 mt-5"
          >
            Reset Password
          </button>

          <button
            type="button"
            onClick={() => setForgotMode(false)}
            className="w-full mt-3 text-pink-500 hover:text-pink-600 transition-all"
          >
            Back to Login
          </button>
        </>
      ) : (
        <>
          {currentState === "Sign Up" && (
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          )}

          <input
            className={`w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all ${
              currentState === "Sign Up" ? "mt-4" : ""
            }`}
            type="email"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all mt-4"
            type="password"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <div className="w-full flex justify-between items-center text-sm mt-3">
            <p
              onClick={() => setForgotMode(true)}
              className="cursor-pointer text-pink-500 hover:text-pink-600 transition-all"
            >
              Forgot Password?
            </p>

            {currentState === "Sign Up" ? (
              <p
                onClick={() => setCurrentState("Login")}
                className="cursor-pointer text-gray-600 hover:text-pink-500 transition-all"
              >
                Login Here
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer text-gray-600 hover:text-pink-500 transition-all"
              >
                Create an Account
              </p>
            )}
          </div>

          <button className="w-full bg-black hover:bg-pink-500 text-white font-medium py-3 rounded-xl transition-all duration-300 mt-5">
            {currentState}
          </button>
        </>
      )}
    </form>
  );
};

export default Login;
