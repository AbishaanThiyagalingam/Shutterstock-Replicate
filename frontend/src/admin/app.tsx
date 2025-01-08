import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Home";

const AdminApp: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Add more admin-specific routes here */}
      </Routes>
      <Footer />
    </div>
  );
};

export default AdminApp;
