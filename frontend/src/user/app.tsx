import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/index";
import WelcomeHeader from "./components/WelcomeHeader/index";
import Footer from "./components/Footer/index";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Welcome from "./pages/Welcome";
import Profile from "../components/Profile";

const UserApp: React.FC = () => {
  return (
    <div>
      {/* Conditionally render header */}
      {location.pathname === "/" ? (
        <WelcomeHeader />
      ) : location.pathname !== "/profile" ? (
        <Header />
      ) : null}{" "}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add more user-specific routes here */}
      </Routes>
      {/* Conditionally render header */}
      {location.pathname !== "/profile" ? <Footer /> : null} 
      <ScrollToTop />
    </div>
  );
};

export default UserApp;
