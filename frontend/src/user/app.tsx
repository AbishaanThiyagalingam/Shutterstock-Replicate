import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/index";
import WelcomeHeader from "./components/WelcomeHeader/index";
import Footer from "./components/Footer/index";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Welcome from "./pages/Welcome";

const UserApp: React.FC = () => {
  return (
    <div>
      {location.pathname === "/welcome" ? <WelcomeHeader /> : <Header />}
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Home />} />
        {/* Add more user-specific routes here */}
      </Routes>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default UserApp;
