import React from "react";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  X,
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  Truck,
  UtensilsCrossed,
} from "lucide-react";

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

const PAYMENT_ICONS = {
  card: <CreditCard size={14} />,
  wallet: <Wallet size={14} />,
  bank_transfer: <Banknote size={14} />,
};

const ACTION_STYLES = {
  None: "bg-gray-100 text-gray-600",
  Warned: "bg-yellow-100 text-yellow-700",
  Blocked: "bg-red-100 text-red-700",
  Active: "bg-green-100 text-green-700",
};

const Res_DetailComplaintModel = ({ selectedComplaint, dummyOrderData, modalId }) => {

  if (!selectedComplaint) return null;
  const statusStyle =
    STATUS_STYLES[selectedComplaint.status] || STATUS_STYLES.Pending;

  return (
   <dialog id={modalId} className="modal">
      <div className="modal-box max-w-3xl bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6 shadow-xl relative animate-fadeIn">
        {/* Close Icon */}
        <form method="dialog">
          <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition">
            <X size={22} />
          </button>
        </form>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
          {/* Left: Restaurant Info */}
          <div className="flex items-center gap-3">
            <img
              src={
                selectedComplaint.againstUser?.profilePic ||
                "/restaurant-placeholder.jpg"
              }
              alt="customer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-gray-200 shadow-sm"
            />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Complaint against{" "}
                <span className="text-orange-600">
                  {selectedComplaint.againstUser?.name}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Order ID: #{selectedComplaint.orderId}
              </p>
            </div>
          </div>

          {/* Right: Status Badge */}
          <div
            className={`self-start sm:self-auto flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full ${statusStyle.color}`}
          >
            {statusStyle.icon}
            <span>{statusStyle.label}</span>
          </div>
        </div>

        {/* Complaint Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm space-y-2 mb-5">
          <p>
            <span className="font-semibold text-orange-600">Reason:</span>{" "}
            {selectedComplaint.reason}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Manager Action:</span>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                ACTION_STYLES[selectedComplaint.managerAction]
              }`}
            >
              {selectedComplaint.managerAction}
            </span>
          </p>
          {selectedComplaint.responseToCustomer && (
            <p className="italic text-gray-600 border-l-4 border-orange-400 pl-3">
              “{selectedComplaint.responseToCustomer}”
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h4 className="font-semibold text-gray-800 text-base mb-3 flex items-center gap-2">
            <Truck size={18} className="text-orange-500" />
            Order Summary
          </h4>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Delivery Address:</span>{" "}
              <span className="flex items-center gap-1 text-gray-600">
                <MapPin size={13} className="text-orange-500"/> {dummyOrderData.deliveryAddress}
              </span>
            </p>
            <p>
              <span className="font-medium">Payment Method:</span>{" "}
              <span className="inline-flex items-center gap-1 text-gray-600">
                {PAYMENT_ICONS[dummyOrderData.paymentMethod]}
                {dummyOrderData.paymentMethod}
              </span>
            </p>
            <p>
              <span className="font-medium">Payment Status:</span>{" "}
              {dummyOrderData.paymentStatus}
            </p>
            <p>
              <span className="font-medium">Total Price:</span>{" "}
              <span className="font-semibold text-orange-600">
                Rs. {dummyOrderData.totalPrice}
              </span>
            </p>
          </div>

          {/* Order Progress */}
          <div className="mt-5">
            <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <UtensilsCrossed size={16} className="text-orange-500" />
              Order Progress
            </h5>
            <div className="relative border-l-2 border-orange-200 pl-4">
              {dummyOrderData.statusHistory.map((step, index) => (
                <div
                  key={index}
                  className="mb-3 last:mb-0 relative before:absolute before:w-3 before:h-3 before:rounded-full before:bg-orange-500 before:-left-[22px] before:top-[4px]"
                >
                  <p className="text-sm font-medium text-gray-800">
                    {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(step.time).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-6">
          <p>
            Filed on:
            <span className="font-medium text-gray-700">
              {new Date(selectedComplaint.createdAt).toLocaleDateString()}
            </span>
          </p>
          <form method="dialog">
            <button className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600 transition px-4 py-2 rounded-md">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Res_DetailComplaintModel;
