import React, { useState } from "react";
import visibleIcon from "../../images/visible-eye.svg";
import hiddenIcon from "../../images/hidden-eye.svg";

const ResetPasswordForm: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-5 text-black/70">Change Password</h2>
      <form className="space-y-6">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <img
                src={showCurrentPassword ? visibleIcon : hiddenIcon}
                alt={showCurrentPassword ? "Hide password" : "Show password"}
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium mb-2 text-black/70">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <img
                src={showNewPassword ? visibleIcon : hiddenIcon}
                alt={showNewPassword ? "Hide password" : "Show password"}
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-sm font-medium mb-2 text-black/70">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <img
                src={showConfirmPassword ? visibleIcon : hiddenIcon}
                alt={showConfirmPassword ? "Hide password" : "Show password"}
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-black/70"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
