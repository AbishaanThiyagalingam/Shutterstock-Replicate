import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CategoryModal from "../components/Category/CategoryModal";
import DeleteModal from "../components/Category/DeleteModal";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import UpdateCategoryModal from "../components/Category/UpdateCategoryModal";

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [modalType, setModalType] = useState<
    "add" | "update" | "delete" | null
  >(null);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      const updatedCategories = response.data.map((category: any) => ({
        ...category,
        thumbnailUrl: category.thumbnail
          ? `http://localhost:8080/categories/${category.thumbnail.replace("uploads/", "")}` // Remove "uploads/" from the thumbnail path
          : null,
      }));
  
      setCategories(updatedCategories);
  
      // Extract and log only the updated thumbnails
      const thumbnails = updatedCategories.map((cat) => cat.thumbnailUrl);
      console.log("Updated Thumbnails:", thumbnails);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleAddCategory = async (category: any) => {
    try {
      await axios.post("http://localhost:8080/categories", category);
      fetchCategories();
      setModalType(null);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const handleUpdateCategory = async (categoryId: string, updatedData: any) => {
    try {
      await axios.put(
        `http://localhost:8080/categories/${categoryId}`,
        updatedData
      );
      fetchCategories();
      setModalType(null);
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await axios.delete(`http://localhost:8080/categories/${categoryId}`);
      fetchCategories();
      setModalType(null);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(categories.length / rowsPerPage);
  const currentData = categories.slice(
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
      {/* <Sidebar /> */}
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Category Management</h1>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setModalType("add")}
            >
              Add Category
            </button>
          </div>
          <div className="overflow-auto rounded-lg shadow-md border border-gray-200">
            <table className="w-full text-left border-collapse bg-white">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="p-4">Thumbnail</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Created At</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((category: any) => (
                  <tr key={category._id} className="border-t border-gray-200">
                    {/* Thumbnail */}
                    <td className="p-4">
                      {category.thumbnailUrl ? (
                        <img
                          src={category.thumbnailUrl}
                          alt={category.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-500 rounded">
                          No Image
                        </div>
                      )}
                    </td>
                    {/* Name */}
                    <td className="p-4">{category.name}</td>
                    {/* Description */}
                    <td className="p-4">{category.description}</td>
                    {/* Created At */}
                    <td className="p-4">
                      {new Date(category.createdAt).toLocaleString()}
                    </td>
                    {/* Actions */}
                    <td className="p-4 flex items-center space-x-2">
                      <button
                        className="text-yellow-500 hover:text-yellow-600"
                        onClick={() => {
                          setModalType("update");
                          setCurrentCategory(category);
                        }}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          setModalType("delete");
                          setCurrentCategory(category);
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
            {/* Rows Per Page Dropdown */}
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

            {/* Page Number and Navigation */}
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
            <CategoryModal
              title="Add Category"
              onSubmit={handleAddCategory}
              onClose={() => setModalType(null)}
            />
          )}
          {modalType === "update" && (
            <UpdateCategoryModal
              category={currentCategory}
              onSubmit={(data: any) =>
                handleUpdateCategory(currentCategory._id, data)
              }
              onClose={() => setModalType(null)}
            />
          )}
          {modalType === "delete" && (
            <DeleteModal
              category={currentCategory}
              onDelete={() => handleDeleteCategory(currentCategory._id)}
              onClose={() => setModalType(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
