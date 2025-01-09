import React, { useState, useEffect } from "react";
import DeleteModal from "../components/Category/DeleteModal";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalType, setModalType] = useState<"delete" | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:8080/auth/users/${userId}`);
      fetchUsers(); // Refresh the user list
      setModalType(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / rowsPerPage);
  const currentData = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">User Management</h1>
          </div>
          <div className="overflow-auto rounded-lg shadow-md border border-gray-200">
            <table className="w-full text-left border-collapse bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Created At</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((user: any) => (
                  <tr key={user._id} className="border-t border-gray-200">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.role}</td>
                    <td className="p-4">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                    <td className="p-4 flex items-center space-x-2">
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          setModalType("delete");
                          setCurrentUser(user);
                        }}
                      >
                        <FaTrashAlt size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <label htmlFor="rowsPerPage" className="text-gray-700 mr-2">
                Rows per page:
              </label>
              <select
                id="rowsPerPage"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="px-2 py-1 border rounded text-gray-700"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePreviousPage}
                className={`px-4 py-2 bg-gray-300 text-gray-700 rounded ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-400"
                }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                className={`px-4 py-2 bg-gray-300 text-gray-700 rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-400"
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>

          {/* Delete Modal */}
          {modalType === "delete" && (
            <DeleteModal
              category={currentUser} // Replace `category` with the `user` object
              onDelete={() => handleDeleteUser(currentUser._id)}
              onClose={() => setModalType(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
