import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import illustration from "../../../images/login-illustration.svg";
import googleIconImageSrc from "../../../images/google-icon.png";
import facebookIconImageSrc from "../../../images/facebook-icon.svg";
import appleIconImageSrc from "../../../images/apple-icon.png";
import visibleIcon from "../../../images/visible-eye.svg";
import hiddenIcon from "../../../images/hidden-eye.svg";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Redirect user to Google login
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  // Redirect user to Facebook login
  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:8080/auth/facebook";
  };

  const fetchGoogleToken = async () => {
    try {
        console.log("Attempting to fetch token...");
        const response = await fetch("http://localhost:8080/auth/google/token", {
            method: "GET",
            credentials: "include", // Ensure cookies are sent
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Token response data:", data);

            if (data.token) {
                // Store the token in localStorage
                localStorage.setItem("token", data.token);
                console.log("Token stored in localStorage:", data.token);
                navigate("/profile");
            } else {
                console.error("Token not found in response:", data);
            }
        } else {
            console.error(`Error fetching token: ${response.status}`);
        }
    } catch (error) {
        console.error("Error while fetching token:", error);
    }
};


React.useEffect(() => {
  console.log("LoginForm mounted. Attempting to fetch token...");
  fetchGoogleToken();
}, []); // Empty dependency array ensures this runs only once



  return (
    <div className="flex flex-wrap w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Left Side - Illustration */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${illustration})` }}
      ></div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome Back</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please login to your account to continue.
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Your Password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
              >
                <img
                  src={showPassword ? visibleIcon : hiddenIcon}
                  alt={showPassword ? "Hide password" : "Show password"}
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Social Login Buttons */}
        <div className="mt-6 space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
          >
            <img
              src={googleIconImageSrc}
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
          >
            <img
              src={facebookIconImageSrc}
              alt="Facebook"
              className="w-5 h-5 mr-2"
            />
            Continue with Facebook
          </button>
          <button className="flex items-center justify-center w-full py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
            <img src={appleIconImageSrc} alt="Apple" className="w-5 h-5 mr-2" />
            Continue with Apple
          </button>
        </div>

        {/* Footer Links */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
