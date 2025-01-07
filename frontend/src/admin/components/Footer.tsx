// Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h1 className="text-2xl font-bold">ButterStock</h1>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <p className="text-sm mt-4">© 2025 ButterStock. All rights reserved.</p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Our Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Images
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Videos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Profile</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                Login
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Signup
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Self Content
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                Terms of Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Copyrights
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Publishing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
