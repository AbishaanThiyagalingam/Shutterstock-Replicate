import React, { useState } from "react";
import { FaTrash, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const CategoryModal: React.FC<{
  onSubmit: (data: any) => void;
  onClose: () => void;
}> = ({ onSubmit, onClose }) => {
  const [step, setStep] = useState(1);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null); // Store actual file
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      const fileURL = URL.createObjectURL(uploadedFile);

      setThumbnail(fileURL); // Preview image
      setFile(uploadedFile); // Save file for submission
    }
  };

  const handleThumbnailRemove = () => {
    setThumbnail(null);
    setFile(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextStep = () => {
    if (step === 1 && thumbnail) {
      setStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !file) {
      setMessage("Please complete all fields and upload a thumbnail.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("thumbnail", file);

    try {
      const response = await axios.post("http://localhost:8080/categories", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Category created successfully!");
      onSubmit(response.data); // Pass response to parent
      // onClose(); // Close modal
      setTimeout(() => {
        window.location.href = "/admin/category"; // Refresh the page and navigate
      }, 1000);
    } catch (error) {
      setMessage("Failed to create category.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Category Modal</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="flex items-center justify-center p-4">
          <div className="flex space-x-2">
            <div
              className={`h-2 w-10 rounded ${step >= 1 ? "bg-blue-500" : "bg-gray-300"}`}
            ></div>
            <div
              className={`h-2 w-10 rounded ${step >= 2 ? "bg-blue-500" : "bg-gray-300"}`}
            ></div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {step === 1 && (
            <div className="p-8 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Upload Category Thumbnail
              </h2>
              {thumbnail ? (
                <div className="relative w-64 h-64 border rounded-lg overflow-hidden mb-4">
                  <img
                    src={thumbnail}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    onClick={handleThumbnailRemove}
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                <label className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleThumbnailUpload}
                    accept="image/*"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="mt-2 text-sm text-blue-600">Click to upload</p>
                  <p className="text-xs text-gray-500">or drag and drop</p>
                  <p className="text-xs text-gray-500">JPG, JPEG, PNG, and WebP</p>
                </label>
              )}
              <div className="flex justify-end w-full">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className={`mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center ${
                    !thumbnail ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!thumbnail}
                >
                  Next <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Category Details
              </h2>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Category Name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                >
                  <FaArrowLeft className="mr-2" /> Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
