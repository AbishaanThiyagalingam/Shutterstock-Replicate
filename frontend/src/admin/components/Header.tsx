// Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-transparent text-white flex justify-between items-center p-4 fixed top-0 left-0 w-full z-50">
      <h1 className="text-2xl font-bold">ButterStock</h1>
      <nav className="hidden md:flex gap-6">
        <a href="#" className="hover:text-gray-300">
          Images
        </a>
        <a href="#" className="hover:text-gray-300">
          Videos
        </a>
        <a href="#" className="hover:text-gray-300">
          Trending
        </a>
        <a href="#" className="hover:text-gray-300">
          Pricing
        </a>
        <a href="#" className="hover:text-gray-300">
          About Us
        </a>
        <a href="#" className="hover:text-gray-300">
          <i className="fa-solid fa-cart-shopping"></i>
        </a>
      </nav>
      <div className="flex gap-4">
        <button className="hidden md:block px-4 py-2 bg-white text-black rounded-full">
          Login
        </button>
        <button className="hidden md:block px-4 py-2 bg-transparent border border-white rounded-full">
          Signup
        </button>
      </div>
    </header>
  );
};

export default Header;
