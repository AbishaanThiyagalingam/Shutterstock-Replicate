import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AdminModal from "../components/Admin/AdminModal";
import DeleteModal from "../components/Admin/DeleteModal";

const AdminManagement: React.FC = () => {
  const [admins, setAdmins] = useState([]);
  const [modalType, setModalType] = useState<"add" | "update" | "delete" | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const token = localStorage.getItem("admintoken");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(response.data);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    }
  };

  const handleAddAdmin = async (admin: any) => {
    try {
      await axios.post("http://localhost:8080/admin", admin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAdmins();
      setModalType(null);
    } catch (error) {
      console.error("Failed to add admin:", error);
    }
  };

  const handleUpdateAdmin = async (adminId: string, updatedData: any) => {
    try {
      await axios.put(`http://localhost:8080/admin/${adminId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAdmins();
      setModalType(null);
    } catch (error) {
      console.error("Failed to update admin:", error);
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    try {
      await axios.delete(`http://localhost:8080/admin/${adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAdmins();
      setModalType(null);
    } catch (error) {
      console.error("Failed to delete admin:", error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(admins.length / rowsPerPage);
  const currentData = admins.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

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
    setCurrentPage(1);
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Admin Management</h1>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setModalType("add")}
            >
              Add Admin
            </button>
          </div>
          <div className="overflow-auto rounded-lg shadow-md border border-gray-200">
            <table className="w-full text-left border-collapse bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((admin: any) => (
                  <tr key={admin._id} className="border-t border-gray-200">
                    <td className="p-4">{admin.name}</td>
                    <td className="p-4">{admin.email}</td>
                    <td className="p-4">{admin.role}</td>
                    <td className="p-4 flex items-center space-x-2">
                      <button
                        className="text-yellow-500 hover:text-yellow-600"
                        onClick={() => {
                          setModalType("update");
                          setCurrentAdmin(admin);
                        }}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          setModalType("delete");
                          setCurrentAdmin(admin);
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

          {modalType === "add" && (
            <AdminModal
              title="Add Admin"
              onSubmit={handleAddAdmin}
              onClose={() => setModalType(null)}
            />
          )}
          {modalType === "update" && (
            <AdminModal
              title="Update Admin"
              admin={currentAdmin}
              onSubmit={(data: any) => handleUpdateAdmin(currentAdmin._id, data)}
              onClose={() => setModalType(null)}
            />
          )}
          {modalType === "delete" && (
            <DeleteModal
              admin={currentAdmin}
              onDelete={() => handleDeleteAdmin(currentAdmin._id)}
              onClose={() => setModalType(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
