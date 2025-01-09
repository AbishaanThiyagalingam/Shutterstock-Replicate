import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from "./pages/Home";
import UserHistory from "./pages/UserHistory";
import CategoryManagement from "./pages/CategoryManagement";
import ImageManagement from "./pages/ImageManagement";
import UserManagement from "./pages/UserManagement";
import Dashboard from "./pages/Dashboard";
import SideBar from "../admin/components/Sidebar";
import Header from "../admin/components/Header";

const AdminApp: React.FC = () => {
  const [title, setTitle] = useState("Dashboard"); // State to manage header title

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <div className="flex">
      {/* Pass handleTitleChange as a prop to SideBar */}
      <SideBar onTitleChange={handleTitleChange} />
      <div className="flex-1">
        <Header title={title} />
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userHistory" element={<UserHistory />} />
          <Route path="/category" element={<CategoryManagement />} />
          <Route path="/user" element={<UserManagement />} />
          <Route path="/image" element={<ImageManagement />} />
          {/* Add more admin-specific routes here */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminApp;
