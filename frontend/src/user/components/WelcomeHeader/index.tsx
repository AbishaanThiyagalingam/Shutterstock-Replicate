import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menuData from "./menuData";
import Modal from "../Modal/Modal";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
import UploadImageForm from "../Forms/UploadImageForm";

const Header = () => {



  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  // Submenu handler
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const location = useLocation();
  const usePathName = location.pathname;

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
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                to="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                {/* <img
                  src="/images/logo/logo-2.svg"
                  alt="logo"
                  style={{ width: "140px", height: "30px" }}
                  className="w-full dark:hidden"
                />
                <img
                  src="/images/logo/logo.svg"
                  alt="logo"
                  style={{ width: "140px", height: "30px" }}
                  className="hidden w-full dark:block"
                /> */}
                <h1 className="text-2xl font-bold text-white dark:text-white">
                  ButterStock
                </h1>
              </Link>
            </div>
            <div className="flex w-full items-center justify-end px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-[#FFFFFF] focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-[#FFFFFF] transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-[#FFFFFF] transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-[#FFFFFF] transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-black/80 px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-[#000000] lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <div className="md:max-h-[calc(100vh-6rem)] md:overflow-y-auto lg:overflow-visible md:pb-6 lg:pb-0 box-border">
                    <ul className="block lg:flex lg:space-x-12">
                      {menuData.map((menuItem, index) => (
                        <li key={index} className="group relative">
                          {/* {menuItem.path ? (
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
                          )  */}
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
                                  <svg
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                  >
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
                                    className="block rounded py-2.5 text-sm text-white/70 hover:text-white dark:text-white/70 dark:hover:text-white lg:px-3"
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
                    {/* Mobile-Only Buttons */}
                    <div className="mt-6 flex flex-col space-y-4 md:hidden">
                      <button
                        onClick={() => setIsLoginOpen(true)} // Open Login Modal
                        className="px-4 py-2 text-center text-base font-medium text-black bg-white rounded-[20px] shadow-md hover:bg-opacity-90 transition"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => setIsSignUpOpen(true)} // Open Signup Modal
                        className="px-4 py-2 text-center text-base font-medium text-black bg-white rounded-[20px] shadow-md hover:bg-opacity-90 transition"
                      >
                        Signup
                      </button>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0 space-x-6">
                <button
                  onClick={() => setIsLoginOpen(true)} // Open the Login Modal
                  className="hidden ml-6 px-6 py-3 text-base font-medium text-black bg-white hover:bg-opacity-90 rounded-[20px] shadow-md transition duration-300 md:block"
                >
                  Login
                </button>
                <button
                  onClick={() => setIsSignUpOpen(true)} // Open the Signup Modal
                  className="hidden px-6 py-3 text-base font-medium text-black bg-white hover:bg-opacity-90 rounded-[20px] shadow-md transition duration-300 md:block"
                >
                  Signup
                </button>
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
      </header>
    </>
  );
};

export default Header;