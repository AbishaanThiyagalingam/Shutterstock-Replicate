import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import menuData from "./menuData";
import Modal from "../Modal/Modal";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
import UploadImageForm from "../Forms/UploadImageForm";
import ConfirmationForm from "../Forms/ConfirmationForm";
import user from "../../../images/seller.svg";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => setNavbarOpen(!navbarOpen);

  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    setSticky(window.scrollY >= 80);
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [isSellerMode, setIsSellerMode] = useState(true);

  const navigate = useNavigate();

  // User dropdown
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  // Submenu handler
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const handleSubmenu = (index: number) =>
    setOpenIndex(openIndex === index ? -1 : index);

  const location = useLocation();
  const usePathName = location.pathname;

  const handleModeChange = () => {
    setIsConfirmationOpen(true);
  };

  const confirmModeChange = () => {
    setIsConfirmationOpen(false);
    if (isSellerMode) {
      navigate("/"); // Navigate to base URL
    }
    setIsSellerMode(!isSellerMode);
  };

  const cancelModeChange = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <>
      <header
        className={`left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-[#FFFFFF] dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            {/* Logo Section */}
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                to="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                }`}
              >
                <h1 className="text-2xl font-bold text-black dark:text-black">
                  ButterStock
                </h1>
              </Link>
            </div>

            {/* Navigation Section */}
            <div className="flex w-full items-center justify-end px-4">
              {/* Mobile Burger Menu */}
              <div className="flex items-center lg:hidden">
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="relative z-10 block rounded-lg px-3 py-[6px] ring-[#000000] focus:ring-2"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-[#000000] transition-all duration-300 dark:bg-black ${
                      navbarOpen ? " top-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-[#000000] transition-all duration-300 dark:bg-black ${
                      navbarOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-[#000000] transition-all duration-300 dark:bg-black ${
                      navbarOpen ? " top-[-8px] -rotate-45" : ""
                    }`}
                  />
                </button>
                {/* User Icon for Mobile */}
                <div className="relative ml-4">
                  <img
                    src={user}
                    alt="User"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  />
                  <div
                    className={`absolute right-0 mt-2 w-[200px] rounded bg-white/80 p-4 shadow-lg transition-opacity duration-300 dark:bg-[#FFFFFF] ${
                      userDropdownOpen ? "block" : "hidden"
                    }`}
                  >
                    <Link
                      to="/account"
                      className="block py-2 text-sm text-black/70 hover:text-black"
                    >
                      Account
                    </Link>
                    <button
                      className="block w-full py-2 text-left text-sm text-black/70 hover:text-black"
                      onClick={() => setIsSignUpOpen(true)}
                      // onClick={() => {
                      //   alert("Logged out!");
                      // }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav
                id="navbarCollapse"
                className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white/80 px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-[#FFFFFF] lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                  navbarOpen
                    ? "visibility top-full opacity-100"
                    : "invisible top-[120%] opacity-0"
                }`}
              >
                <div className="md:max-h-[calc(100vh-6rem)] md:overflow-y-auto lg:overflow-visible md:pb-6 lg:pb-0 box-border">
                  <ul className="block lg:flex lg:space-x-12">
                    {/* Seller/Buyer Mode Toggler */}
                    <li className="flex items-center lg:mb-0 mb-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <span
                          className={`mr-3 text-base ${
                            isSellerMode
                              ? "text-black/70 dark:text-black"
                              : "text-black/70 hover:text-black dark:text-black/70 dark:hover:text-black"
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
                        <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-gray-500 dark:peer-focus:ring-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </li>

                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.title === "Images" ? (
                          <button
                            onClick={() => setIsImageModalOpen(true)}
                            className="flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 text-black/70 hover:text-black dark:text-black/70 dark:hover:text-black"
                          >
                            {menuItem.title}
                          </button>
                        ) : menuItem.path ? (
                          <Link
                            to={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              usePathName === menuItem.path
                                ? "text-black dark:text-black"
                                : "text-black/70 hover:text-black dark:text-black/70 dark:hover:text-black"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-black/70 group-hover:text-black dark:text-black/70 dark:group-hover:text-black lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
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
                              className={`submenu relative left-0 top-full rounded-sm bg-white/80 transition-[top] duration-300 group-hover:opacity-100 dark:bg-[#FFFFFF] lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu?.map((submenuItem, index) => (
                                <Link
                                  to={submenuItem.path || "#"}
                                  key={index}
                                  className="block rounded py-2.5 text-sm text-black/70 hover:text-black dark:text-black/70 dark:hover:text-black lg:px-3"
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
                </div>
              </nav>

              {/* Desktop User Icon */}
              <div className="hidden lg:block relative ml-8">
                <img
                  src={user}
                  alt="User"
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                />
                <div
                  className={`absolute right-0 mt-2 w-[200px] rounded bg-white/80 p-4 shadow-lg transition-opacity duration-300 dark:bg-[#FFFFFF] ${
                    userDropdownOpen ? "block" : "hidden"
                  }`}
                >
                  <Link
                    to="/account"
                    className="block py-2 text-sm text-black/70 hover:text-black"
                  >
                    Account
                  </Link>
                  <button
                    className="block w-full py-2 text-left text-sm text-black/70 hover:text-black"
                    onClick={() => setIsSignUpOpen(true)}
                    // onClick={() => {
                    //   alert("Logged out!");
                    // }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Modal */}
        <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
          <LoginForm />
        </Modal>

        {/* Sign-Up Modal */}
        <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
          <SignUpForm />
        </Modal>

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
