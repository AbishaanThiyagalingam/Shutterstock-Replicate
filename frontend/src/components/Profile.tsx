// import React, { useState } from "react";
// import ProfileSideBar from "./ProfileSideBar";
// import bgImage from "../images/home-page-background.jpeg";
// import BuyerHeader from "../user/components/Header/index";
// import BuyerFooter from "../user/components/Footer/index";

// const Profile: React.FC = () => {
//   const [title, setTitle] = useState("Personal Info");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const renderContent = () => {
//     switch (title) {
//       case "Personal Info":
//         return (
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Personal Info</h2>
//             <p>Edit your profile details here.</p>
//           </div>
//         );
//       case "Downloads":
//         return (
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Downloads</h2>
//             <p>View your downloads here.</p>
//           </div>
//         );
//       case "Purchasing History":
//         return (
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Purchasing History</h2>
//             <p>View your purchase history here.</p>
//           </div>
//         );
//       case "Contributions":
//         return (
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Contributions</h2>
//             <p>View your contributions here.</p>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       {/* Header */}
//       <BuyerHeader />

//       {/* Background Section */}
//       <section
//         id="profile"
//         className="dark:bg-[#000000] relative z-10 overflow-hidden bg-cover bg-center bg-no-repeat h-[80px] md:h-[100px]"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//         }}
//       ></section>

//       {/* Sidebar Toggle Button for Mobile */}
//       <div className="relative z-20 md:hidden bg-white py-2">
//         <button
//           className="mx-4 bg-black text-white px-3 py-2 rounded-[10px]"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           {isSidebarOpen ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15.75 19.5L8.25 12l7.5-7.5"
//               />
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M8.25 19.5l7.5-7.5-7.5-7.5"
//               />
//             </svg>
//           )}
//         </button>
//       </div>

//       <div className="relative container mx-auto py-10 flex">
//         {/* Sidebar */}
//         <div
//           className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transition-transform transform ${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } md:relative md:translate-x-0`}
//         >
//           <ProfileSideBar
//             onTitleChange={(newTitle) => {
//               setTitle(newTitle);
//               setIsSidebarOpen(false); // Close the sidebar after selecting an item on mobile
//             }}
//             isOpen={isSidebarOpen}
//             onClose={() => setIsSidebarOpen(false)}
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-6 bg-white shadow-md rounded-lg border border-gray-200">
//           {renderContent()}
//         </div>
//       </div>

//       {/* Footer */}
//       <BuyerFooter />
//     </>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import ProfileSideBar from "./ProfileSideBar";
import bgImage from "../images/home-page-background.jpeg";
import BuyerHeader from "../user/components/Header/index";
import BuyerFooter from "../user/components/Footer/index";
import visibleIcon from "../images/visible-eye.svg";
import hiddenIcon from "../images/hidden-eye.svg";
import Modal from "../components/Modal/Modal";
import ResetPasswordForm from "../components/Forms/ResetPasswordForm";
import InvoiceForm from "../components/Forms/InvoiceForm";
import PlaceHolder from "../images/home-page-background.jpeg";

const Profile: React.FC = () => {
  const [title, setTitle] = useState("Personal Info");
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.innerWidth <= 768
  );
  const [isTabletView, setIsTabletView] = useState<boolean>(
    window.innerWidth > 768 && window.innerWidth <= 1024
  );
  const [showPassword, setShowPassword] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null); // Add this state

  const userDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    package: "Basic",
    avatar: "https://via.placeholder.com/50",
    verified: false,
  };

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsnvoiceModalOpen] = useState(false);

  const [visibleDownloads, setVisibleDownloads] = useState(10);

  const mockDownloads = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    image: "https://via.placeholder.com/150",
    title: `Downloaded Image Downloaded Image ${index + 1}`,
    date: `2023-12-${String(index + 1).padStart(2, "0")}`,
    price: `$${(Math.random() * 10 + 1).toFixed(2)}`,
  }));

  const mockPurchaseHistory = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    image: "https://via.placeholder.com/150",
    title: `Downloaded Image Downloaded Image ${index + 1}`,
    date: `2023-12-${String(index + 1).padStart(2, "0")}`,
    price: `$${(Math.random() * 10 + 1).toFixed(2)}`,
    status: index % 2 === 0 ? "Successful" : "Failure", // Alternating status
  }));

  const handleLoadMore = () => {
    setVisibleDownloads((prev) => prev + 10); // Moved here
  };

  const renderContent = (currentTitle: string) => {
    switch (currentTitle) {
      case "Personal Info":
        return (
          <div className="space-y-6">
            {/* Account Verification */}
            <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
              <div className="flex items-center space-x-2">
                {userDetails.verified ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="font-semibold">Verified Account</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-red-600 font-semibold">
                      Verify your account now
                    </span>
                    <button className="ms-2 border px-4 py-2 rounded-md hover:bg-gray-200">
                      Verify
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Info Fields */}
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
              {[
                { label: "Name", value: "Lorem Ipsum" },
                { label: "Email Address", value: "loremipsum@gmail.com" },
                { label: "Payment Details", value: "4513 **** **** ****" },
                {
                  label: "Password",
                  value: "chakbhak",
                  isPassword: true,
                },
              ].map((field, index) => (
                <div key={index} className="flex items-center">
                  <label className="w-1/4 text-sm font-medium">
                    {field.label}
                  </label>
                  <div className="relative flex-1">
                    <input
                      type={
                        field.isPassword && showPassword
                          ? "text"
                          : field.isPassword
                          ? "password"
                          : "text"
                      }
                      defaultValue={field.value}
                      className="w-full border rounded-lg px-4 py-2 pr-10"
                      disabled={!editingField || editingField !== field.label}
                    />
                    {field.isPassword && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center"
                      >
                        <img
                          src={showPassword ? visibleIcon : hiddenIcon}
                          alt={showPassword ? "Hide password" : "Show password"}
                          className="w-5 h-5"
                        />
                      </button>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-2">
                    {field.isPassword ? (
                      <button
                        className="bg-black hover:bg-black/70 text-white p-2 rounded-md"
                        onClick={() => setIsPasswordModalOpen(true)} // Open modal for password
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </button>
                    ) : editingField === field.label ? (
                      <>
                        <button
                          className="bg-green-500 hover:bg-green-400/70 text-white p-2 rounded-md"
                          onClick={() => setEditingField(null)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-400/70 text-white p-2 rounded-md"
                          onClick={() => setEditingField(null)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <button
                        className="bg-black hover:bg-black/70 text-white p-2 rounded-md"
                        onClick={() => setEditingField(field.label)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-4">
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-black/70">
                Log Out
              </button>
              <button className="ms-2 border px-4 py-2 rounded-md hover:bg-gray-200">
                Delete Account
              </button>
            </div>
          </div>
        );

      case "Downloads":
        return (
          <div>
            <div className="space-y-6">
              {mockDownloads.slice(0, visibleDownloads).map((item) => (
                <div
                  key={item.id}
                  className={`flex ${
                    isMobileView || isTabletView
                      ? "flex-row items-start"
                      : "flex-row items-center"
                  } justify-between p-4 bg-white rounded-lg hover:shadow-md`}
                >
                  {/* Image */}
                  <div
                    className={`flex-shrink-0 ${
                      isMobileView || isTabletView ? "w-[30%]" : "w-[10%]"
                    }`}
                  >
                    <img
                      src={PlaceHolder}
                      alt={item.title}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex ${
                      isMobileView || isTabletView
                        ? "flex-col w-[70%] space-y-2"
                        : "flex-row items-center justify-between w-[85%]"
                    } ml-4`}
                  >
                    {/* Title */}
                    <div
                      className={`${
                        isMobileView || isTabletView ? "w-full" : "w-[55%]"
                      }`}
                    >
                      <h3 className="font-medium text-sm md:text-base text-gray-900">
                        {item.title}
                      </h3>
                      {/* Date */}
                      <p
                        className={`text-sm md:text-base font-light text-gray-800`}
                      >
                        {item.date}
                      </p>
                    </div>

                    {/* Price */}
                    <p
                      className={`text-sm md:text-base font-medium text-gray-800 ${
                        isMobileView || isTabletView ? "w-full" : "w-[10%]"
                      }`}
                    >
                      {item.price}
                    </p>

                    {/* Button */}
                    <div
                      className={`${
                        isMobileView || isTabletView
                          ? "w-full text-left"
                          : "w-[25%] text-right"
                      }`}
                    >
                      <button className="px-4 py-2 text-sm md:px-6 md:py-3 font-medium text-black border border-blue-100 bg-blue-100 rounded-md hover:border-blue-300 hover:bg-blue-300 hover:text-black transition">
                        Download Again
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Load More Button */}
              {visibleDownloads < mockDownloads.length && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 text-sm md:px-8 md:py-3 font-medium text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Load more
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case "Purchasing History":
        return (
          <div>
            <div className="space-y-6">
              {mockPurchaseHistory.slice(0, visibleDownloads).map((item) => (
                <div
                  key={item.id}
                  className={`flex ${
                    isMobileView || isTabletView
                      ? "flex-row items-start"
                      : "flex-row items-center"
                  } justify-between p-4 bg-white rounded-lg hover:shadow-md`}
                >
                  {/* Image */}
                  <div
                    className={`flex-shrink-0 ${
                      isMobileView || isTabletView ? "w-[30%]" : "w-[10%]"
                    }`}
                  >
                    <img
                      src={PlaceHolder}
                      alt={item.title}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex ${
                      isMobileView || isTabletView
                        ? "flex-col w-[70%]"
                        : "flex-row items-center justify-between w-[85%]"
                    } ml-4`}
                  >
                    {/* Title */}
                    <div
                      className={`${
                        isMobileView || isTabletView ? "w-full" : "w-[50%]"
                      }`}
                    >
                      <h3 className="font-medium text-sm md:text-base text-gray-900">
                        {item.title}
                      </h3>
                      <p
                        className={`text-sm md:text-base font-light text-gray-800`}
                      >
                        {item.date}
                      </p>
                    </div>

                    {/* Price */}
                    <p
                      className={`text-sm md:text-base font-medium text-gray-800 ${
                        isMobileView || isTabletView ? "w-full" : "w-[10%]"
                      }`}
                    >
                      {item.price}
                    </p>

                    {/* Successful */}
                    <p
                      className={`text-sm md:text-base font-medium text-gray-800 ${
                        item.status === "Successful"
                          ? "text-green-500"
                          : "text-red-500"
                      } ${isMobileView || isTabletView ? "w-full" : "w-[15%]"}`}
                    >
                      {item.status}
                    </p>

                    {/* Button */}
                    <div
                      className={`${
                        isMobileView || isTabletView
                          ? "w-full text-left"
                          : "w-[15%] text-right"
                      }`}
                    >
                      <button
                        className="pr-4 text-sm font-medium text-black underline hover:text-black/50 transition"
                        onClick={() => setIsnvoiceModalOpen(true)} // Open modal for password
                      >
                        Invoice
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Load More Button */}
              {visibleDownloads < mockDownloads.length && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 text-sm md:px-8 md:py-3 font-medium text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Load more
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case "Contributions":
        return (
          <div className="space-y-6">
            {/* Account Verification */}
            <div className="p-4 bg-white rounded-lg">
              {/* Title */}
              <div className="mb-10">
                <h2 className="mb-2 text-3xl font-bold">
                  Upgrade to Premium Plan
                </h2>
                <p className="text-gray-500">
                  Upgrade to Premium and Start Contributing Today
                </p>
              </div>

              {/* Pricing Cards */}
              <div
                className={`${
                  isMobileView || isTabletView
                    ? "grid grid-cols-1 gap-6"
                    : "grid grid-cols-3 gap-6 max-w-5xl mx-auto"
                }`}
              >
                {/* Basic Plan */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="top-0 left-0 w-full flex">
                    <div className="bg-blue-100 px-4 py-0.5 rounded-[20px]">
                      <h3 className="text-lg font-medium text-blue-600">
                        Basic
                      </h3>
                    </div>
                  </div>
                  <p className="text-5xl font-semibold mt-4">
                    $70
                    <span className="text-lg font-medium text-gray-500">
                      /month
                    </span>
                  </p>
                  <p className="text-gray-500 mt-4">
                    Just using this for yourself? Lite is the way to go for the
                    lite platform.
                  </p>
                  <button className="mt-6 w-full px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-black/70 transition">
                    Select Lite
                  </button>
                  <ul className="mt-6 space-y-2 text-left">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      10 downloads daily
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Upto 2K quality
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Copyrights Acclaimed
                    </li>
                  </ul>
                </div>

                {/* Standard Plan */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="top-0 left-0 w-full flex">
                    <div className="bg-pink-100 px-4 py-0.5 rounded-[20px]">
                      <h3 className="text-lg font-medium text-pink-600">
                        Standard
                      </h3>
                    </div>
                  </div>
                  <p className="text-5xl font-semibold mt-4">
                    $190
                    <span className="text-lg font-medium text-gray-500">
                      /month
                    </span>
                  </p>
                  <p className="text-gray-500 mt-4">
                    Just using this for yourself? Pro is the way to go for the
                    lite platform.
                  </p>
                  <button className="mt-6 w-full px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-black/70 transition">
                    Select Pro
                  </button>
                  <ul className="mt-6 space-y-2 text-left">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-pink-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      25 downloads daily
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-pink-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Upto 4K quality
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-pink-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Copyrights Acclaimed
                    </li>
                  </ul>
                </div>

                {/* Premium Plan */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="top-0 left-0 w-full flex">
                    <div className="bg-green-100 px-4 py-0.5 rounded-[20px]">
                      <h3 className="text-lg font-medium text-green-600">
                        Premium
                      </h3>
                    </div>
                  </div>
                  <p className="text-5xl font-semibold mt-4">
                    $310
                    <span className="text-lg font-medium text-gray-500">
                      /month
                    </span>
                  </p>
                  <p className="text-gray-500 mt-4">
                    Just using this for yourself? Premium is the way to go for
                    the lite platform.
                  </p>
                  <button className="mt-6 w-full px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-black/70 transition">
                    Select Premium
                  </button>
                  <ul className="mt-6 space-y-2 text-left">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Unlimited Downloads
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Upto 8K quality
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Copyrights Acclaimed
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width <= 768);
      setIsTabletView(width > 768 && width <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <BuyerHeader />

      <section
        id="profile"
        className="dark:bg-[#000000] relative z-10 overflow-hidden bg-cover bg-center bg-no-repeat h-[80px] md:h-[100px]"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></section>

      <div className="container mx-auto py-10">
        {isMobileView ? (
          <div className="space-y-4">
            {/* User Info for Mobile */}
            <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
              <img
                src={userDetails.avatar}
                alt="User Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-lg font-semibold">{userDetails.name}</p>
                <p className="text-sm text-gray-600">{userDetails.email}</p>
                <p className="text-sm text-gray-600 bg-blue-100 mt-2 px-4 py-1 rounded-[10px] inline-block">
                  {userDetails?.package || "Basic"}
                </p>
              </div>
            </div>

            {/* Foldable Cards for Mobile */}
            {[
              "Personal Info",
              "Downloads",
              "Purchasing History",
              "Contributions",
            ].map((item) => (
              <div key={item} className="bg-white shadow-md rounded-lg p-4">
                <button
                  className="w-full flex justify-between items-center text-left text-xl font-medium"
                  onClick={() => setTitle(item === title ? "" : item)}
                >
                  {item}
                  <span>{item === title ? "-" : "+"}</span>
                </button>
                {item === title && (
                  <div className="mt-4">{renderContent(item)}</div>
                )}
              </div>
            ))}
          </div>
        ) : isTabletView ? (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_8fr] gap-4">
            {/* Sidebar */}
            <div className="bg-white rounded-lg">
              <ProfileSideBar
                onTitleChange={setTitle}
                isOpen
                userDetails={userDetails}
              />
            </div>
            {/* Content */}
            <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
              {renderContent(title)}
            </div>
          </div>
        ) : (
          <div className="flex">
            {/* Sidebar for Laptops */}
            <div className="w-1/5 mr-5">
              <ProfileSideBar
                onTitleChange={setTitle}
                isOpen
                userDetails={userDetails}
              />
            </div>
            {/* Content for Laptops */}
            <div className="flex-1 p-6 bg-white shadow-md rounded-lg">
              {renderContent(title)}
            </div>
          </div>
        )}
      </div>

      {/* Modal for Reset Password */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      >
        <ResetPasswordForm />
      </Modal>

      {/* Modal for Reset Password */}
      <Modal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsnvoiceModalOpen(false)}
      >
        <InvoiceForm />
      </Modal>

      <BuyerFooter />
    </>
  );
};

export default Profile;
