import React, { useState } from "react";
import { Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import Cus_DetailComplaintModel from "../Models/Cus_DetailComplaintModel";

const STATUS_STYLES = {
  Pending: {
    color: "bg-yellow-100 text-yellow-700",
    label: "Pending",
    icon: <Clock size={14} />,
  },
  Reviewing: {
    color: "bg-blue-100 text-blue-700",
    label: "Reviewing",
    icon: <AlertTriangle size={14} />,
  },
  Resolved: {
    color: "bg-green-100 text-green-700",
    label: "Resolved",
    icon: <CheckCircle2 size={14} />,
  },
};

const ACTION_STYLES = {
  None: "bg-gray-100 text-gray-600",
  Warned: "bg-yellow-100 text-yellow-700",
  Blocked: "bg-red-100 text-red-700",
  Active: "bg-green-100 text-green-700",
};

const dummyOrderData = {
  _id: "order12345",
  deliveryAddress: "123 Main Street, Karachi, Pakistan",
  paymentMethod: "card",
  paymentStatus: "paid",
  totalPrice: 2450,
  status: "delivered",
  statusHistory: [
    { status: "pending", time: "2025-10-25T09:00:00Z" },
    { status: "confirmed", time: "2025-10-25T09:15:00Z" },
    { status: "preparing", time: "2025-10-25T09:40:00Z" },
    { status: "arriving", time: "2025-10-25T10:10:00Z" },
    { status: "delivered", time: "2025-10-25T10:40:00Z" },
  ],
};

const Cus_ComplaintCard = ({ complaint }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const statusStyle = STATUS_STYLES[complaint.status] || STATUS_STYLES.Pending;

  const modalId = `view_detail_complaint_model_${complaint._id}`;

  const handleDetailBtnClick = () => {
    // console.log("compleint id from parent ",complaint._id)
    setSelectedComplaint(complaint._id);
    setTimeout(() => {
      document.getElementById(modalId).showModal();
    }, 50);
  };

  return (
    <div className="card w-full bg-white shadow-md hover:shadow-lg transition-all border border-gray-100 rounded-2xl p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
        <div className="flex items-center gap-3">
          <img
            src={
              complaint?.againstRestaurant?.logo ||
              "/restaurant-placeholder.jpg"
            }
            alt="Restaurant"
            className="w-12 h-12 rounded-xl object-cover border"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              Complaint against {complaint?.againstRestaurant?.name}
            </h3>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${statusStyle.color}`}
        >
          {statusStyle.icon}
          <span>{statusStyle.label}</span>
        </div>
      </div>

      {/* Body */}
      <div className="text-sm text-gray-700 space-y-2">
        <p>
          <span className="font-medium text-gray-900">Order ID:</span>{" "}
          {complaint?.orderId._id}
        </p>
        <p>
          <span className="font-medium text-orange-600">Reason:</span>{" "}
          {complaint?.reason}
        </p>
      </div>

      {/* Manager Section */}
      <div className="border-t border-gray-100 mt-4 pt-3">
        <p className="text-sm">
          <span className="font-medium text-gray-900">Manager Action:</span>{" "}
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              ACTION_STYLES[complaint.managerAction]
            }`}
          >
            {complaint.managerAction}
          </span>
        </p>
        {complaint.responseToCustomer && (
          <p className="text-sm text-gray-600 mt-2 italic">
            “{complaint.responseToCustomer}”
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <span>
          Filed on: {new Date(complaint?.createdAt).toLocaleDateString()}
        </span>
        <button
          className="text-orange-600 font-semibold hover:underline"
          onClick={handleDetailBtnClick}
        >
          View Details
        </button>
      </div>

      {/* Modal */}
      <Cus_DetailComplaintModel
        selectedComplaint={selectedComplaint}
        dummyOrderData={dummyOrderData}
        modalId={modalId} 
      />
    </div>
  );
};

export default Cus_ComplaintCard;
