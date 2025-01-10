import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const UpdateAdminModal: React.FC<{
  admin: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}> = ({ admin, onSubmit, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name || "",
        email: admin.email || "",
        role: admin.role || "",
        password: "", // Leave blank by default
      });
    }
  }, [admin]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    if (step === 1) setStep(2);
  };

  const handlePreviousStep = () => {
    if (step === 2) setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Update Admin</h2>
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
                step === 1 ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`h-2 w-10 rounded ${
                step === 2 ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          </div>
        </div>

        {/* Step 1: Admin Details */}
        {step === 1 && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Update Admin Details
            </h2>
            <form onSubmit={handleNextStep} className="grid grid-cols-1 gap-4">
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
                  placeholder="Enter admin name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter admin email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                  <option value="ADMIN">Admin</option>
                  <option value="ALL_ACCESS">All Access</option>
                </select>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                >
                  Next <FaArrowRight className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Password Update */}
        {step === 2 && (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Update Password (Optional)
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Leave blank to keep current password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateAdminModal;
