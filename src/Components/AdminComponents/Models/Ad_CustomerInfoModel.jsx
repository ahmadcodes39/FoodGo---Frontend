import React from "react";

const Ad_CustomerInfoModel = ({ data }) => {
  if (!data) return null;

  return (
    <dialog id="ad_customer_info_modal" className="modal">
      <div className="modal-box max-w-md bg-base-100 rounded-2xl shadow-xl p-6">
        {/* Header */}
        <h3 className="text-2xl font-bold text-center mb-5 border-b pb-3">
          Customer Profile
        </h3>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-5">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  data.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
              />
            </div>
          </div>

          <h4 className="text-lg font-semibold mt-3">{data.name}</h4>
          <p className="text-sm text-gray-500">{data.email}</p>
          <p className="text-sm text-gray-500">{data.phone}</p>

          <span
            className={`badge mt-3 px-4 py-2 text-white ${
              data.status?.toLowerCase() === "active"
                ? "badge-success"
                : data.status?.toLowerCase() === "blocked"
                ? "badge-error"
                : "badge-warning"
            }`}
          >
            {data.status}
          </span>
        </div>

        {/* Divider */}
        <div className="divider my-4">Account Details</div>

        {/* Info Section */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Customer ID:</span>
            <span className="font-semibold break-all text-right">{data.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Joined:</span>
            <span className="font-semibold">{data.joined}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Total Orders:</span>
            <span className="font-semibold">{data.orders}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Total Spent:</span>
            <span className="font-semibold">{data.totalSpent}</span>
          </div>
        </div>

        {/* Footer */}
         <form method="dialog" className="w-full mt-5">
          <button className="btn btn-primary btn-outline w-full text-sm rounded-lg">
            Close
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default Ad_CustomerInfoModel;
