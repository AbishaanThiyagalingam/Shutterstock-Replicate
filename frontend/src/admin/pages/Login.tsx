import React from "react";

const Login: React.FC = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/path-to-your-image.jpg')` }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg w-11/12 max-w-md">
        <h1 className="text-white text-3xl font-bold text-center mb-4">ButterStock</h1>
        <p className="text-white text-center mb-6">Welcome, Admin</p>
        <form>
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
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
