import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import mockData from "../mockData";

const UserHistory: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Filter data based on the selected filter
  const filteredData = mockData.filter((item) =>
    filter === "All" ? true : item.status === filter
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content Section */}
        <div className="p-4 flex-1">
          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-green-100 rounded shadow">
              <p>Total Earnings</p>
              <h2 className="text-2xl font-bold">3.1M $</h2>
              <p className="text-sm">as of 1st February 2023</p>
            </div>
            <div className="p-4 bg-blue-100 rounded shadow">
              <p>Pending Payments</p>
              <h2 className="text-2xl font-bold">6526 $</h2>
              <p className="text-sm">as of 1st February 2023</p>
            </div>
            <div className="p-4 bg-gray-100 rounded shadow">
              <p>Withdrawal Method</p>
              <h2 className="text-2xl font-bold">1520******4832</h2>
            </div>
          </div>

          {/* Payment History Section */}
          <h2 className="text-lg font-bold mb-4">Payment History</h2>

          {/* Filter Buttons */}
<div className="flex space-x-4 mb-4">
  {["All", "Complete", "Pending", "Rejected"].map((status) => (
    <button
      key={status}
      onClick={() => {
        setFilter(status);
        setCurrentPage(1);
      }}
      className={`px-6 py-2 rounded-full text-sm font-semibold ${
        filter === status
          ? "bg-white border border-purple-500 text-purple-500 shadow-sm"
          : "bg-transparent border border-gray-300 text-gray-600 hover:bg-gray-100"
      }`}
    >
      {status}
    </button>
  ))}
</div>

{/* Table */}
<div className="overflow-auto rounded-lg shadow-md border border-gray-200">
  <table className="w-full border-collapse bg-white">
    <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
      <tr>
        <th className="p-4 text-left">Order ID</th>
        <th className="p-4 text-left">Date</th>
        <th className="p-4 text-left">Amount</th>
        <th className="p-4 text-left">Total Questions</th>
        <th className="p-4 text-left">Status</th>
      </tr>
    </thead>
    <tbody className="text-gray-700">
      {paginatedData.map((item, index) => (
        <tr
          key={index}
          className={`border-t border-gray-200 ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          }`}
        >
          <td className="p-4">{item.id}</td>
          <td className="p-4">{item.date}</td>
          <td className="p-4">{item.amount}</td>
          <td className="p-4">{item.totalQuestions}</td>
          <td
            className={`p-4 font-semibold ${
              item.status === "Success"
                ? "text-green-500"
                : item.status === "Rejected"
                ? "text-red-500"
                : "text-blue-500"
            }`}
          >
            {item.status}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Pagination */}
  <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-gray-200">
    <div>
      <label htmlFor="perPage" className="text-sm text-gray-600">
        10 per page
      </label>
    </div>
    <div className="flex space-x-2 text-gray-600">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-200"
        }`}
      >
        &lt;
      </button>
      <span>{`${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-200"
        }`}
      >
        &gt;
      </button>
    </div>
  </div>
</div>
</div>
      </div>
    </div>
  );
};

// Helper function for status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "Success":
      return "text-green-500";
    case "Rejected":
      return "text-red-500";
    case "Pending":
      return "text-yellow-500";
    default:
      return "text-gray-700";
  }
};

export default UserHistory;
