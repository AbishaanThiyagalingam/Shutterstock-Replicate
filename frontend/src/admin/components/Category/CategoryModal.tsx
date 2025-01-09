import React, { useState } from "react";
import { FaTrash, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const CategoryModal: React.FC<{
  onSubmit: (data: any) => void;
  onClose: () => void;
}> = ({ onSubmit, onClose }) => {
  const [step, setStep] = useState(1);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active", // Default category status
  });

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return; // Exit if no file is selected
    }

    const file = e.target.files[0]; // Get the first file
    const fileURL = URL.createObjectURL(file); // Create a temporary URL for the image preview

    setThumbnail(fileURL); // Update the thumbnail state for preview
    setFormData((prevData) => ({
      ...prevData,
      thumbnail: file, // Keep the file in formData
    }));
  };

  // Handle thumbnail removal
  const handleThumbnailRemove = () => {
    setThumbnail(null);
    setFormData((prevData) => ({
      ...prevData,
      thumbnail: null,
    }));
  };

  // Handle input changes for form fields
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle navigation between steps
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, thumbnail });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Modal Header with "X" Button */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Category Modal</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Top Progress Indicators */}
        <div className="flex items-center justify-center p-4">
          <div className="flex space-x-2">
            <div
              className={`h-2 w-10 rounded ${
                step >= 1 ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`h-2 w-10 rounded ${
                step >= 2 ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          </div>
        </div>

        {/* Step 1: Thumbnail Upload */}
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p className="mt-2 text-sm text-blue-600">Click to upload</p>
                <p className="text-xs text-gray-500">or drag and drop</p>
                <p className="text-xs text-gray-500">
                  JPG, JPEG, PNG, and WebP
                </p>
              </label>
            )}
            <div className="flex justify-end w-full">
              <button
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

        {/* Step 2: Category Details */}
        {step === 2 && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Category Details
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
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
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryModal;
