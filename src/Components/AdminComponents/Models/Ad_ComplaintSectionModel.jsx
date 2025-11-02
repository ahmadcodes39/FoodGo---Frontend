import React from "react";
import {
  BadgeCheck,
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  Store,
  Receipt,
  Phone,
} from "lucide-react";
import Ad_ComplaintActionModel from "./Ad_ComplaintActionModel";

const Ad_ComplaintSectionModel = ({ complaintData }) => {

  if (!complaintData) return null;

  const {
    _id,
    raisedBy,
    againstRestaurant,
    againstUser,
    orderId,
    reason,
    complaintStatus,
    status,
    createdAt,
  } = complaintData;

  // 🔹 Handle Admin Action
  const handleBtnClick = () => {
    document.getElementById('ad_complaint_Action_model').showModal()
  };

  return (
    <dialog id={`ad_complain_section_model_${_id}`} className="modal">
      <div className="modal-box w-11/12 max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 overflow-y-auto max-h-[90vh]">
        {/* HEADER */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
          <h2 className="text-2xl font-bold text-gray-800">
            Complaint Overview
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              complaintStatus === "Customer"
                ? "bg-blue-100 text-blue-700"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            {complaintStatus === "Customer"
              ? "Against Restaurant"
              : "Against Customer"}
          </span>
        </div>

        <div className="border-b border-gray-200 mb-4"></div>

        {/* USER DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Raised By */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <User size={18} /> Raised By
            </h3>
            <p className="text-gray-600 text-sm">
              <strong>Name:</strong> {raisedBy?.name || "N/A"}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Email:</strong> {raisedBy?.email || "N/A"}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Complaint ID:</strong> {_id}
            </p>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              <Calendar size={16} />
              <strong>Date:</strong> {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Against */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              {complaintStatus === "Customer" ? (
                <>
                  <Store size={18} /> Against Restaurant
                </>
              ) : (
                <>
                  <User size={18} /> Against Customer
                </>
              )}
            </h3>
            <p className="text-gray-600 text-sm">
              <strong>Name:</strong>{" "}
              {againstRestaurant?.name || againstUser?.name || "N/A"}
            </p>

            {complaintStatus === "Customer" ? (
              <p className="text-gray-600 text-sm flex items-center gap-1">
                <Phone size={16} />
                <strong>Phone:</strong>{" "}
                {againstRestaurant?.restaurantPhoneNumber || "N/A"}
              </p>
            ) : (
              <p className="text-gray-600 text-sm">
                <strong>Email:</strong> {againstUser?.email || "N/A"}
              </p>
            )}

            <p className="text-gray-600 text-sm">
              <strong>Reason:</strong> {reason}
            </p>
          </div>
        </div>

        {/* ORDER DETAILS */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Receipt size={18} /> Order Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <p className="text-gray-600">
              <strong>Order ID:</strong> {orderId?._id || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Total Price:</strong> $
              {orderId?.totalPrice?.toFixed(2) || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Payment Method:</strong> {orderId?.paymentMethod || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Payment Status:</strong>{" "}
              <span
                className={`badge 
                  ${
                    orderId?.paymentStatus === "Paid"
                      ? "badge-success"
                      : orderId?.paymentStatus === "Failed"
                      ? "badge-error"
                      : orderId?.paymentStatus === "Refunded"
                      ? "badge-info"
                      : orderId?.paymentStatus === "Pending"
                      ? "badge-warning"
                      : "badge-ghost"
                  }`}
              >
                {orderId?.paymentStatus || "N/A"}
              </span>
            </p>

            <p className="text-gray-600 col-span-2 flex items-center gap-1">
              <MapPin size={16} />
              {orderId?.deliveryAddress || "No address provided"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span
              className={`px-4 py-1 text-sm rounded-full font-medium ${
                status === "Resolved"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              Current Status: {status}
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-1">
              <AlertTriangle size={16} /> Mark Pending
            </button>

            <button
              onClick={handleBtnClick}
              className="btn btn-sm bg-green-500 hover:bg-green-600 text-white flex items-center gap-1"
            >
              <BadgeCheck size={16} /> Mark Resolved
            </button>
          </div>
        </div>

        {/* MAIN CLOSE BUTTON */}
        <div className="modal-action mt-6 flex">
          <form method="dialog" className="justify-end">
            <button className="btn btn-outline btn-primary">Close</button>
          </form>
        </div>
      </div>
      <Ad_ComplaintActionModel complaintStatus={complaintStatus}/>
    </dialog>
  );
};

export default Ad_ComplaintSectionModel;
