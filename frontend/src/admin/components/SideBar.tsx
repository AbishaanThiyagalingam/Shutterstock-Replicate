import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  onTitleChange: (newTitle: string) => void;
}

const SideBar: React.FC<SidebarProps> = ({ onTitleChange }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-white shadow-md w-64 h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">ButterStock</h1>
      <div className="mb-8">
        <img
          src="https://via.placeholder.com/50"
          alt="User Avatar"
          className="w-12 h-12 rounded-full mb-2"
        />
        <p className="text-lg font-semibold">Lorem Ipsum</p>
        <p className="text-sm text-gray-600">loremipsum@gmail.com</p>
      </div>
      <nav className="flex flex-col gap-4">
        <Link
          to="/admin/dashboard"
          onClick={() => onTitleChange("Dashboard")}
          className={`p-2 rounded ${
            isActive("/admin/dashboard")
              ? "bg-blue-100 text-blue-500 font-bold"
              : "text-black hover:text-blue-500"
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/category"
          onClick={() => onTitleChange("Category Management")}
          className={`p-2 rounded ${
            isActive("/admin/category")
              ? "bg-blue-100 text-blue-500 font-bold"
              : "text-black hover:text-blue-500"
          }`}
        >
          Category
        </Link>
        <Link
          to="/admin/image"
          onClick={() => onTitleChange("Image Management")}
          className={`p-2 rounded ${
            isActive("/admin/image")
              ? "bg-blue-100 text-blue-500 font-bold"
              : "text-black hover:text-blue-500"
          }`}
        >
          Images
        </Link>
        <Link
          to="/admin/user"
          onClick={() => onTitleChange("User Management")}
          className={`p-2 rounded ${
            isActive("/admin/user")
              ? "bg-blue-100 text-blue-500 font-bold"
              : "text-black hover:text-blue-500"
          }`}
        >
          Users
        </Link>
        <Link
          to="/admin/userHistory"
          onClick={() => onTitleChange("User History")}
          className={`p-2 rounded ${
            isActive("/admin/userHistory")
              ? "bg-blue-100 text-blue-500 font-bold"
              : "text-black hover:text-blue-500"
          }`}
        >
          User History
        </Link>
        <Link
          to="#"
          className="text-black hover:text-blue-500 p-2 rounded"
        >
          Log Out
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
