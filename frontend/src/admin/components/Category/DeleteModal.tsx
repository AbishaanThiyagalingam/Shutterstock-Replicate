import React from "react";

interface DeleteModalProps {
  category: any;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ category, onDelete, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Delete Category</h2>
        <p>Are you sure you want to delete the category "{category.name}"?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 mr-2 border rounded">
            Cancel
          </button>
          <button onClick={onDelete} className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
