// import React from "react";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
//       aria-hidden={!isOpen}
//     >
//       <div className="relative p-4 w-full max-w-4xl max-h-full">
//         {/* Modal content */}
//         <div className="relative bg-white rounded-lg shadow-lg">
//           {/* Close Button in Body Corner */}
//           <button
//             type="button"
//             onClick={onClose}
//             className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//           >
//             <svg
//               className="w-3 h-3"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 14 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//               />
//             </svg>
//             <span className="sr-only">Close modal</span>
//           </button>

//           {/* Modal Body */}
//           <div className="p-4 md:p-5 space-y-4">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;


// import React from "react";
// import ReactDOM from "react-dom";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return ReactDOM.createPortal(
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
//       style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}
//     >
//       <div className="relative p-4 w-full max-w-4xl max-h-full">
//         {/* Modal content */}
//         <div className="relative bg-white rounded-lg shadow-lg">
//           {/* Close Button in Body Corner */}
//           <button
//             type="button"
//             onClick={onClose}
//             className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//           >
//             <svg
//               className="w-3 h-3"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 14 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//               />
//             </svg>
//             <span className="sr-only">Close modal</span>
//           </button>

//           {/* Modal Body */}
//           <div className="p-4 md:p-5 space-y-4">{children}</div>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default Modal;



import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      <div className="relative p-4 w-full max-w-4xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-lg">
          {/* Close Button in Body Corner */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          {/* Modal Body */}
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
