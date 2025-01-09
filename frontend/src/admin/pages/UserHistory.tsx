import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

interface UserHistoryItem {
  userId: string;
  action: string;
  timestamp: string;
}

const UserHistory: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userHistory, setUserHistory] = useState<UserHistoryItem[]>([]);
  const [userDetails, setUserDetails] = useState<{ [key: string]: User }>({});
  const itemsPerPage = 5;

  const activityFilters = [
    "ALL",
    "USER REGISTERED",
    "VERIFY EMAIL PENDING",
    "USER LOGGED IN",
    "USER LOGGED IN WITH GOOGLE",
    "USER LOGGED IN WITH FACEBOOK",
    "USER BECAME A SELLER",
    "USER UPDATED PROFILE",
    "USER LOGGED OUT",
  ];  

  useEffect(() => {
    fetchUserHistory();
  }, []);

  const fetchUserHistory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/history");
      setUserHistory(response.data);

      // Fetch user details for each userId
      const userIds = [...new Set(response.data.map((item: UserHistoryItem) => item.userId))];
      const userDetailsPromises = userIds.map(async (userId) => {
        const userResponse = await axios.get(`http://localhost:8080/auth/user/${userId}`);
        return { userId, user: userResponse.data };
      });

      const userDetailsResults = await Promise.all(userDetailsPromises);
      const userDetailsMap: { [key: string]: User } = {};
      userDetailsResults.forEach(({ userId, user }) => {
        userDetailsMap[userId] = user;
      });

      setUserDetails(userDetailsMap);
    } catch (error) {
      console.error("Error fetching user history or user details:", error);
    }
  };

  // Filter data based on the selected activity
  const filteredData = userHistory.filter((item) =>
    filter === "All" ? true : item.action === filter
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
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex-1">
          <h2 className="text-lg font-bold mb-4">User History</h2>

          {/* Activity Filter */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Filter by Activity:</label>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1); // Reset to the first page on filter change
              }}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              {activityFilters.map((activity, index) => (
                <option key={index} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-auto rounded-lg shadow-md border border-gray-200">
            <table className="w-full border-collapse bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Action</th>
                  <th className="p-4 text-left">Time</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {paginatedData.map((item, index) => {
                  const user = userDetails[item.userId] || { name: "Loading...", email: "Loading..." };
                  return (
                    <tr
                      key={index}
                      className={`border-t border-gray-200 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{item.action}</td>
                      <td className="p-4">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-gray-200">
              <div>
                <label htmlFor="perPage" className="text-sm text-gray-600">
                  {itemsPerPage} per page
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

export default UserHistory;
