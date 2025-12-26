import React from "react";
import { ShieldAlert, LogOut, PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlockedAccess = ({
  title = "Access Restricted",
  message = "Your account has been temporarily restricted. Please contact support for further assistance.",
  reason,
  showLogout = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-lg bg-white shadow-xl border border-orange-200 rounded-2xl">
        <div className="card-body text-center space-y-6">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 border border-orange-300">
            <ShieldAlert className="w-10 h-10 text-orange-600" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-orange-600">
            {title}
          </h2>

          {/* Message */}
          <p className="text-gray-600 leading-relaxed">
            {message}
          </p>

          {/* Optional Reason */}
          {reason && (
            <div className="alert alert-warning bg-orange-50 border-orange-300 text-orange-700 text-sm">
              <span className="font-semibold">Reason:</span> {reason}
            </div>
          )}

          {/* Support Info */}
          <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
            <PhoneCall size={18} />
            <span>support@yourapp.com</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <button
              className="btn bg-green-500 hover:bg-green-600 text-white rounded-xl"
              onClick={() => navigate("/")}
            >
              Go to Home
            </button>

            {showLogout && (
              <button
                className="btn btn-outline border-orange-500 text-orange-600 hover:bg-orange-100 rounded-xl"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedAccess;
