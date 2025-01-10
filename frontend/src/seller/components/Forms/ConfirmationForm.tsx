import React from "react";

interface ConfirmationFormProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="text-center">
      <p className="text-lg font-medium text-gray-800 pt-8 pb-2">{message}</p>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationForm;
