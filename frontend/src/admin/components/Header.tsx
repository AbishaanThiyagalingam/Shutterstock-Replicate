import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="bg-white shadow-md w-full p-6">
      <div className="flex justify-end items-center">
        <div className="text-right">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
