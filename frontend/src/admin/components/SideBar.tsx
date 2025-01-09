import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-white shadow-md w-64 h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">ButterStock</h1>
      <div className="mb-8">
        <img
          src="https://via.placeholder.com/50" // Replace with the actual user image
          alt="User Avatar"
          className="w-12 h-12 rounded-full mb-2"
        />
        <p className="text-lg font-semibold">Lorem Ipsum</p>
        <p className="text-sm text-gray-600">loremipsum@gmail.com</p>
      </div>
      <nav className="flex flex-col gap-4">
        <a
          href="#"
          className="text-black hover:text-blue-500"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="text-black hover:text-blue-500"
        >
          Content
        </a>
        <a
          href="#"
          className="text-black hover:text-blue-500"
        >
          Users
        </a>
        <a
          href="#"
          className="text-blue-500 font-bold bg-blue-100 py-1 px-2 rounded-lg"
        >
          History
        </a>
        <a
          href="#"
          className="text-black hover:text-blue-500 mt-6"
        >
          Log Out
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
