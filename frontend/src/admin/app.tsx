import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from "./pages/Home";
import UserHistory from "./pages/UserHistory";

const AdminApp: React.FC = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/userHistory" element={<UserHistory />} />
        {/* Add more admin-specific routes here */}
      </Routes>
    </div>
  );
};

export default AdminApp;
