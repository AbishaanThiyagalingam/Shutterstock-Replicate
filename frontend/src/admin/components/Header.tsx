import React from "react";

const Header: React.FC = () => {
  return (
    <div className="bg-white shadow-md w-full p-6">
      <div className="flex justify-end items-center">
        {/* Left: ButterStock logo and user info */}
        

        {/* Right: Admin Page and History */}
        <div className="text-right">
          <p className="text-lg font-semibold">Admin Page</p>
          <h2 className="text-2xl font-bold">History</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
