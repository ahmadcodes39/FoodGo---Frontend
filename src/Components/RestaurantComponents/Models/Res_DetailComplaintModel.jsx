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

const Res_DetailComplaintModel = ({ selectedComplaint, modalId }) => {
  if (!selectedComplaint) return null;

  const statusStyle =
    STATUS_STYLES[selectedComplaint.status] || STATUS_STYLES.Pending;

  const order = selectedComplaint.order;

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box max-w-3xl bg-white rounded-2xl p-6 shadow-xl relative">
        {/* Close */}
        <form method="dialog">
          <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
            <X size={22} />
          </button>
        </form>

        {/* Header */}
        <div className="flex justify-between items-start mb-4 gap-3">
          <div className="flex items-center gap-3">
            <img
              src={selectedComplaint.againstUser?.profilePic}
              alt={selectedComplaint.againstUser?.name}
              className="w-14 h-14 rounded-xl object-cover border"
            />
            <div>
              <h3 className="text-lg font-semibold">
                Complaint against{" "}
                <span className="text-orange-600">
                  {selectedComplaint.againstUser?.name}
                </span>
              </h3>
              <p className="text-sm text-gray-500">Order ID: #{order?._id}</p>
            </div>
          </div>

          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full ${statusStyle.color}`}
          >
            {statusStyle.icon}
            <span>{statusStyle.label}</span>
          </div>
        </div>

        {/* Complaint Info */}
        <div className="border rounded-lg p-4 mb-5 space-y-2">
          <p>
            <span className="font-semibold text-orange-600">Reason:</span>{" "}
            {selectedComplaint.reason}
          </p>

          <p>
            <span className="font-semibold">Manager Action:</span>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                ACTION_STYLES[selectedComplaint.managerAction]
              }`}
            >
              {selectedComplaint.managerAction}
            </span>
          </p>

          {selectedComplaint.responseToRestaurant && (
            <p className="italic text-gray-600">
              “{selectedComplaint.responseToRestaurant}”
            </p>
          )}
        </div>

        {/* Order Summary */}
        {order && (
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Truck size={18} className="text-orange-500" />
              Order Summary
            </h4>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="flex items-center gap-1">
                <MapPin size={13} /> {order.deliveryAddress}
              </p>

              <p className="flex items-center gap-1">
                {PAYMENT_ICONS[order.paymentMethod]}
                {order.paymentMethod}
              </p>

              <p className="font-medium text-gray-800">
                Payment:{" "}
                <span
                  className={
                    order.paymentStatus === "paid"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {order.paymentStatus}
                </span>
              </p>

              <p className="font-semibold text-orange-600">
                Rs. {order.totalPrice}
              </p>
            </div>

            {/* Order Progress */}
            {order.statusHistory?.length > 0 && (
              <div className="mt-4 border-l-2 border-orange-200 pl-4">
                {order.statusHistory.map((step) => (
                  <div key={step._id} className="mb-3">
                    <p className="font-medium">{step.status.toUpperCase()}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(step.time).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-xs text-gray-500 mt-6 flex justify-between">
          <span>
            Filed on{" "}
            {new Date(selectedComplaint.createdAt).toLocaleDateString()}
          </span>
          <form method="dialog">
            <button className="btn btn-sm bg-orange-500 text-white">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Res_DetailComplaintModel;
