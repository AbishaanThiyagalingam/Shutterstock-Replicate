import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  onTitleChange: (newTitle: string) => void;
  isOpen: boolean;
  onClose?: () => void;
  userDetails: UserDetails;
}

interface UserDetails {
  name: string;
  email: string;
  package: string;
  avatar: string;
  verified?: boolean;
}

const ProfileSideBar: React.FC<SidebarProps> = ({
  onTitleChange,
  isOpen,
  onClose,
  userDetails,
}) => {
  const location = useLocation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("admintoken");
      if (!token) {
        console.error("No token found");
        return;
      }
    };

    fetchUserDetails();
  }, []);

  const [activeTitle, setActiveTitle] = useState<string>("Personal Info");

  const handleLinkClick = (title: string) => {
    setActiveTitle(title);
    onTitleChange(title);
    onClose?.(); // Call onClose only if it exists
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-white p-4 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0`}
    >
      {/* Close button only for mobile */}
      {onClose && (
        <button
          className="block md:hidden text-gray-600 absolute top-4 right-4"
          onClick={onClose}
        >
          ✕
        </button>
      )}
      <div className="mb-8">
        <img
          src="https://via.placeholder.com/50"
          alt="User Avatar"
          className="rounded-full mb-2"
        />
        <p className="text-lg font-semibold">{userDetails?.name || "User"}</p>
        <p className="text-sm text-gray-600">
          {userDetails?.email || "user@example.com"}
        </p>
        <p className="text-sm text-gray-600 bg-blue-100 mt-2 px-4 py-1 rounded-[10px] inline-block">
          {userDetails?.package || "Basic"}
        </p>
      </div>
      <nav className="flex flex-col gap-4">
        <Link
          to="#"
          onClick={() => handleLinkClick("Personal Info")}
          className={`rounded-[20px] px-4 py-2 ${
            activeTitle === "Personal Info"
              ? "bg-blue-100 text-black font-bold"
              : "text-black hover:text-blue-500 font-semibold"
          }`}
        >
          Personal Info
        </Link>
        <Link
          to="#"
          onClick={() => handleLinkClick("Downloads")}
          className={`rounded-[20px] px-4 py-2 ${
            activeTitle === "Downloads"
              ? "bg-blue-100 text-black font-bold"
              : "text-black hover:text-blue-500 font-semibold"
          }`}
        >
          Downloads
        </Link>
        <Link
          to="#"
          onClick={() => handleLinkClick("Purchasing History")}
          className={`rounded-[20px] px-4 py-2 ${
            activeTitle === "Purchasing History"
              ? "bg-blue-100 text-black font-bold"
              : "text-black hover:text-blue-500 font-semibold"
          }`}
        >
          Purchasing History
        </Link>
        <Link
          to="#"
          onClick={() => handleLinkClick("Contributions")}
          className={`rounded-[20px] px-4 py-2 ${
            activeTitle === "Contributions"
              ? "bg-blue-100 text-black font-bold"
              : "text-black hover:text-blue-500 font-semibold"
          }`}
        >
          Contributions
        </Link>
      </nav>
    </div>
  );
};

export default ProfileSideBar;
