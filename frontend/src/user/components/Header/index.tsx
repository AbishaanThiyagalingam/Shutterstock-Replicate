import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import menuData from "./menuData";
import Modal from "../../../components/Modal/Modal";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
import UploadImageForm from "../Forms/UploadImageForm";
import ConfirmationForm from "../../../components/Forms/ConfirmationForm";
import cart from "../../../images/cart.svg";
import user from "../../../images/user.svg";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => setNavbarOpen(!navbarOpen);

  // User dropdown
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        console.log("Click outside detected");
        setUserDropdownOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => setSticky(window.scrollY >= 80);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [isSellerMode, setIsSellerMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  const fetchGoogleToken = async () => {
    try {
        console.log("Attempting to fetch token...");
        const response = await fetch("http://localhost:8080/auth/google/token", {
            method: "GET",
            credentials: "include", // Ensure cookies are sent
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Token response data:", data);
            
            if (data.token) {
                // Store the token in localStorage
                localStorage.setItem("token", data.token);
                console.log("Token stored in localStorage:", data.token);
                //navigate("/profile");
            } else {
                console.error("Token not found in response:", data);
            }
        } else {
            console.error(`Error fetching token: ${response.status}`);
        }
    } catch (error) {
        console.error("Error while fetching token:", error);
    }
};
React.useEffect(() => {
  console.log("LoginForm mounted. Attempting to fetch token...");
  fetchGoogleToken();
}, []); // Empty dependency array ensures this runs only once

  // Submenu handler
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const handleSubmenu = (index: number) =>
    setOpenIndex(openIndex === index ? -1 : index);

  const location = useLocation();
  const usePathName = location.pathname;

  const handleModeChange = () => setIsConfirmationOpen(true);

  const confirmModeChange = () => {
    setIsConfirmationOpen(false);
    if (!isSellerMode) navigate("/seller");
    setIsSellerMode(!isSellerMode);
  };

  const cancelModeChange = () => setIsConfirmationOpen(false);

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-[#000000] dark:shadow-sticky-dark fixed z-[9999] bg-black !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative flex items-center justify-between">
            {/* Logo Section */}
            <div className="w-60 max-w-full xl:mr-12">
              <Link
                to="/"
                className={`header-logo block ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                }`}
              >
                <h1 className="text-2xl font-bold text-white dark:text-white">
                  ButterStock
                </h1>
              </Link>
            </div>

            {/* Navigation and Icons */}
            <div className="flex items-center justify-end w-full">
              {/* Icons Section for Mobile */}
              <div className="flex items-center lg:hidden mr-2 md:mr-4">
                {/* Cart Icon */}
                <Link to="/cart" className="relative">
                  <img src={cart} alt="Cart" className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    3
                  </span>
                </Link>

                {/* User Icon */}
                <div className="relative ml-4 md:ml-8" ref={dropdownRef}>
                  <img
                    src={user}
                    alt="User"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setUserDropdownOpen((prev) => !prev)}
                  />
                  <div
                    className={`absolute right-0 mt-2 w-[200px] rounded bg-black/80 p-4 shadow-lg transition-opacity duration-300 dark:bg-[#000000] ${
                      userDropdownOpen ? "block" : "hidden"
                    }`}
                  >
                    <Link
                      to="/profile"
                      className="block py-2 text-sm text-white/70 hover:text-white"
                    >
                      Account
                    </Link>
                    <button
                      className="block w-full py-2 text-left text-sm text-white/70 hover:text-white"
                      onClick={() => setIsSignUpOpen(true)}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              {/* Burger Menu for Mobile */}
              <div className="flex items-center lg:hidden">
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="relative z-10 block rounded-lg px-3 py-[6px] ring-[#FFFFFF] focus:ring-2"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-[#FFFFFF] transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-[#FFFFFF] transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-[#FFFFFF] transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Navigation Menu */}
              <nav
                id="navbarCollapse"
                className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-black/80 px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-[#000000] lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                  navbarOpen
                    ? "visibility top-full opacity-100"
                    : "invisible top-[120%] opacity-0"
                }`}
              >
                <ul className="block lg:flex lg:space-x-12">
                  {/* Seller/Buyer Mode Toggler */}
                  <li className="flex items-center lg:mb-0 mb-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <span
                        className={`mr-3 text-base ${
                          isSellerMode
                            ? "text-white/70 dark:text-white"
                            : "text-white/70 hover:text-white dark:text-white/70 dark:hover:text-white"
                        }`}
                      >
                        {isSellerMode ? "Seller Mode" : "Buyer Mode"}
                      </span>
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isSellerMode}
                        onChange={handleModeChange}
                      />
                      <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-gray-500 dark:peer-focus:ring-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-black after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
                    </label>
                  </li>
                  {menuData.map((menuItem, index) => (
                    <li key={index} className="group relative">
                      {menuItem.title === "Images" ? (
                        <button
                          onClick={() => setIsImageModalOpen(true)}
                          className="flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 text-white/70 hover:text-white dark:text-white/70 dark:hover:text-white"
                        >
                          {menuItem.title}
                        </button>
                      ) : menuItem.path ? (
                        <Link
                          to={menuItem.path}
                          className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                            usePathName === menuItem.path
                              ? "text-white dark:text-white"
                              : "text-white/70 hover:text-white dark:text-white/70 dark:hover:text-white"
                          }`}
                        >
                          {menuItem.title}
                        </Link>
                      ) : (
                        <>
                          <p
                            onClick={() => handleSubmenu(index)}
                            className="flex cursor-pointer items-center justify-between py-2 text-base text-white/70 group-hover:text-white dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                          >
                            {menuItem.title}
                            <span className="pl-3">
                              <svg width="25" height="24" viewBox="0 0 25 24">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </p>
                          <div
                            className={`submenu relative left-0 top-full rounded-sm bg-black/80 transition-[top] duration-300 group-hover:opacity-100 dark:bg-[#000000] lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                              openIndex === index ? "block" : "hidden"
                            }`}
                          >
                            {menuItem.submenu?.map((submenuItem, index) => (
                              <Link
                                to={submenuItem.path || "#"}
                                key={index}
                                className="block rounded py-2.5 px-3 text-sm text-white/70 hover:bg-gray-700 hover:text-white dark:text-white/70 dark:hover:text-white"
                              >
                                {submenuItem.title}
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Icons Section for Laptops */}
              <div className="hidden lg:flex items-center ml-4 md:ml-8">
                {/* Cart Icon */}
                <Link to="/cart" className="relative">
                  <img src={cart} alt="Cart" className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    3
                  </span>
                </Link>

                {/* User Icon */}
                <div className="relative ml-4 md:ml-8" ref={dropdownRef}>
                  <img
                    src={user}
                    alt="User"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setUserDropdownOpen((prev) => !prev)}
                  />
                  <div
                    className={`absolute right-0 mt-2 w-[200px] rounded bg-black/80 p-4 shadow-lg transition-opacity duration-300 dark:bg-[#000000] ${
                      userDropdownOpen ? "block" : "hidden"
                    }`}
                  >
                    <Link
                      to="/profile"
                      className="block py-2 text-sm text-white/70 hover:text-white"
                    >
                      Account
                    </Link>
                    <button
                      className="block w-full py-2 text-left text-sm text-white/70 hover:text-white"
                      onClick={() => setIsSignUpOpen(true)}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Images Modal */}
        <Modal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
        >
          <UploadImageForm />
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          isOpen={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
        >
          <ConfirmationForm
            message="Are you sure you want to switch modes?"
            onConfirm={confirmModeChange}
            onCancel={cancelModeChange}
          />
        </Modal>
      </header>
    </>
  );
};

export default Header;
