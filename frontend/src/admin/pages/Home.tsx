import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../../images/home-page-background.jpeg";

const AdminHome: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/admin/login", {
        email: userId,
        password,
      });

      const { token } = response.data;

      // Store the token as admintoken
      localStorage.setItem("admintoken", token);

      // Redirect to the admin dashboard
      navigate("/admin/dashboard");
    } catch (err: any) {
      // Handle error
      const errorMessage =
        err.response?.data?.message || "Unable to connect to the server. Please try again later.";
      setError(errorMessage);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <h1 className="text-white text-2xl sm:text-3xl font-bold text-center mb-4">
          ButterStock
        </h1>
        <p className="text-white text-center mb-6 text-sm sm:text-base">
          Welcome, Admin
        </p>
        {error && (
          <div className="bg-red-500 text-white text-sm rounded-md p-2 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-medium mb-2"
              htmlFor="userId"
            >
              User ID
            </label>
            <input
              type="text"
              id="userId"
              placeholder="Enter Your ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-12 sm:px-16 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminHome;
