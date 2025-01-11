import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AdminHome from "./pages/Home";
import UserHistory from "./pages/UserHistory";
import CategoryManagement from "./pages/CategoryManagement";
import ImageManagement from "./pages/ImageManagement";
import UserManagement from "./pages/UserManagement";
import Dashboard from "./pages/Dashboard";
import SideBar from "../admin/components/Sidebar";
import Header from "../admin/components/Header";
import AdminManagement from "./pages/AdminManagement";

const AdminApp: React.FC = () => {
  const [title, setTitle] = useState("Dashboard"); // State to manage header title
  const location = useLocation();

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  // Define routes where the SideBar and Header should NOT render
  const excludedRoutes = ["/admin"];

  // Check if the current route is excluded
  const isExcludedRoute = excludedRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {/* Render SideBar and Header only if the route is not excluded */}
      {!isExcludedRoute && <SideBar onTitleChange={handleTitleChange} />}
      <div className={`flex-1 ${isExcludedRoute}`}>
        {!isExcludedRoute && <Header title={title} />}
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userHistory" element={<UserHistory />} />
          <Route path="/category" element={<CategoryManagement />} />
          <Route path="/user" element={<UserManagement />} />
          <Route path="/image" element={<ImageManagement />} />
          <Route path="/manage-admin" element={<AdminManagement />} />

          {/* Add more admin-specific routes here */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminApp;
