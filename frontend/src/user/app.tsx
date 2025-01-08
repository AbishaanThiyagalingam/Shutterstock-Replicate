import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Home from "./pages/Home";

const UserApp: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more user-specific routes here */}
      </Routes>
      <Footer />
    </div>
  );
};

export default UserApp;
