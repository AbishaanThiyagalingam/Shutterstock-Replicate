// Header.tsx
import React, { useState } from "react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling menu

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 ${
        menuOpen ? "bg-black" : "bg-transparent"
      } transition duration-300`}
    >
      <div className="container flex justify-between items-center py-4 text-white">
        {/* Logo */}
        <h1 className="text-2xl font-bold">ButterStock</h1>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 ml-4">
          <a href="#" className="hover:text-gray-400">
            Images
          </a>
          <a href="#" className="hover:text-gray-400">
            Videos
          </a>
          <a href="#" className="hover:text-gray-400">
            Trending
          </a>
          <a href="#" className="hover:text-gray-400">
            Pricing
          </a>
          <a href="#" className="hover:text-gray-400">
            About Us
          </a>
          <a href="#" className="hover:text-gray-400">
            <i className="fas fa-shopping-cart"></i>
          </a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex space-x-4">
          <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200">
            Login
          </button>
          <button className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black">
            Signup
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)} // Toggle menu on click
            className="text-2xl focus:outline-none"
          >
            <i className={`${menuOpen ? "fas fa-times" : "fas fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="flex flex-col items-center space-y-4 bg-black text-white py-4 lg:hidden">
          <a href="#" className="hover:text-gray-400">
            Images
          </a>
          <a href="#" className="hover:text-gray-400">
            Videos
          </a>
          <a href="#" className="hover:text-gray-400">
            Trending
          </a>
          <a href="#" className="hover:text-gray-400">
            Pricing
          </a>
          <a href="#" className="hover:text-gray-400">
            About Us
          </a>
          <a href="#" className="hover:text-gray-400">
            <i className="fas fa-shopping-cart"></i>
          </a>
          <button className="w-full px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200">
            Login
          </button>
          <button className="w-full px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black">
            Signup
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
