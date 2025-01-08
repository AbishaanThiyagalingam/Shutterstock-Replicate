import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";

const UserApp: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more user-specific routes here */}
      </Routes>
      <Footer />
      <ScrollToTop />      
    </div>
  );
};

export default UserApp;
