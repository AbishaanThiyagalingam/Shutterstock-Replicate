// import React from "react";

// const UploadImageForm: React.FC = () => {
//   return (
//     <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
//       {/* Header */}
//       <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
//         Upload Your Image
//       </h2>

//       <div className="flex flex-wrap">
//         {/* Left Section */}
//         <div className="w-full md:w-1/2 pr-4">
//           {/* Upload Section */}
//           <div className="w-full h-40           border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer mb-6">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-10 w-10 text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 4v16m8-8H4"
//               />
//             </svg>
//             <p className="mt-2 text-sm text-blue-600">Click to upload</p>
//             <p className="text-xs text-gray-500">or drag and drop</p>
//             <p className="text-xs text-gray-500">JPG, JPEG, PNG, and WebP</p>
//           </div>

//           {/* Name Field */}
//           <div className="flex items-center mb-4">
//             <label
//               htmlFor="name"
//               className="w-1/3 text-sm font-medium text-gray-700"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               placeholder="Enter your name"
//               className="flex-1 block px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           {/* Price Field */}
//           <div className="flex items-center">
//             <label
//               htmlFor="price"
//               className="w-1/3 text-sm font-medium text-gray-700"
//             >
//               Price
//             </label>
//             <input
//               type="number"
//               id="price"
//               placeholder="Enter a price"
//               className="flex-1 block px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="w-full md:w-1/2 pl-4">
//           {/* Category Dropdown */}
//           <div className="flex items-center mb-4">
//             <label
//               htmlFor="category"
//               className="w-1/3 text-sm font-medium text-gray-700"
//             >
//               Category
//             </label>
//             <select
//               id="category"
//               className="flex-1 block px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             >
//               <option>Select a category</option>
//               <option>Nature</option>
//               <option>Abstract</option>
//               <option>Portrait</option>
//               <option>Landscape</option>
//             </select>
//           </div>

//           {/* Description Field */}
//           <div className="flex items-center mb-4">
//             <label
//               htmlFor="description"
//               className="w-1/3 text-sm font-medium text-gray-700"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               rows={2}
//               placeholder="Enter a description"
//               className="flex-1 block px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           {/* Taken By Field */}
//           <div className="flex items-center mb-4">
//             <label
//               htmlFor="takenBy"
//               className="w-1/3 text-sm font-medium text-gray-700"
//             >
//               Taken By
//             </label>
//             <input
//               type="text"
//               id="takenBy"
//               placeholder="Enter photographer name"
//               className="flex-1 block px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           {/* Date Field */}
//           <div className="flex items-center mb-4">
//             <label
//               htmlFor="date"
//               className="w-1/3 text-sm font-medium text-gray-700"
//             >
//               Date
//             </label>
//             <input
//               type="date"
//               id="date"
//               className="flex-1 block px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           {/* Tags Field */}
//           <div className="flex items-center">
//             <label
//               htmlFor="tags"
//               className="w-1/3 text-sm font-medium text-gray-700"
//             >
//               Tags
//             </label>
//             <input
//               type="text"
//               id="tags"
//               placeholder="Add tags (comma-separated)"
//               className="flex-1 block px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="mt-6 flex justify-end">
//         <button
//           type="submit"
//           className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadImageForm;

import React, { useState } from "react";
import { FaTrash, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const TwoStepUploadModal: React.FC = () => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const handleNextStep = () => {
    if (step === 1 && image) {
      setStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Top Progress Indicators */}
      <div className="flex items-center justify-between p-4 border-b">
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

      {step === 1 && (
        <div className="p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Upload Your Image
          </h2>
          {image ? (
            <div className="relative w-64 h-64 border rounded-lg overflow-hidden mb-4">
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                onClick={handleImageRemove}
              >
                <FaTrash />
              </button>
            </div>
          ) : (
            <label className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
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
              <p className="text-xs text-gray-500">JPG, JPEG, PNG, and WebP</p>
            </label>
          )}
          <div className="flex justify-end w-full">
            <button
              onClick={handleNextStep}
              className={`mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center ${
                !image ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!image}
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Image Details</h2>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="col-span-1 md:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                placeholder="Enter Price"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>

              <select
                id="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select a category</option>
                <option value="Nature">Nature</option>
                <option value="Abstract">Abstract</option>
                <option value="Portrait">Portrait</option>
                <option value="Landscape">Landscape</option>
              </select>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                placeholder="Enter Tags"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="takenBy"
                className="block text-sm font-medium text-gray-700"
              >
                Taken By
              </label>
              <input
                type="text"
                id="takenBy"
                placeholder="Enter Name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </form>
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePreviousStep}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoStepUploadModal;

// import React, { useState } from "react";

// const UploadImageForm: React.FC = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
//       {/* Title */}
//       <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
//         Upload Your Image
//       </h2>

//       {/* Image Preview and Name */}
//       <div className="mb-6">
//         <div className="w-full flex flex-col items-center">
//           {preview ? (
//             <img
//               src={preview}
//               alt="Preview"
//               className="w-60 h-60 object-cover rounded-lg mb-4"
//             />
//           ) : (
//             <div className="w-60 h-60 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg mb-4">
//               <p className="text-gray-500">No image selected</p>
//             </div>
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//           />
//         </div>
//       </div>

//       {/* Name Field */}
//       <div className="mb-6">
//         <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//           Name
//         </label>
//         <input
//           type="text"
//           id="name"
//           placeholder="Enter your name"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//         />
//       </div>

//       {/* Form Fields */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div>
//           {/* Price Field */}
//           <div className="mb-4">
//             <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
//               Price
//             </label>
//             <input
//               type="number"
//               id="price"
//               placeholder="Enter a price"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           {/* Category Field */}
//           <div className="mb-4">
//             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//               Category
//             </label>
//             <select
//               id="category"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             >
//               <option value="">Select a category</option>
//               <option value="Nature">Nature</option>
//               <option value="Abstract">Abstract</option>
//               <option value="Portrait">Portrait</option>
//               <option value="Landscape">Landscape</option>
//             </select>
//           </div>

//           {/* Description Field */}
//           <div className="mb-4">
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               id="description"
//               rows={3}
//               placeholder="Enter a description"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//         </div>

//         {/* Right Column */}
//         <div>
//           {/* Taken By Field */}
//           <div className="mb-4">
//             <label htmlFor="takenBy" className="block text-sm font-medium text-gray-700 mb-1">
//               Taken By
//             </label>
//             <input
//               type="text"
//               id="takenBy"
//               placeholder="Enter photographer's name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           {/* Date Field */}
//           <div className="mb-4">
//             <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
//               Date
//             </label>
//             <input
//               type="date"
//               id="date"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           {/* Tags Field */}
//           <div className="mb-4">
//             <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
//               Tags
//             </label>
//             <input
//               type="text"
//               id="tags"
//               placeholder="Add tags (comma-separated)"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadImageForm;
