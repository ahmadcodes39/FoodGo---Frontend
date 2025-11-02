import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  User,
  CreditCard,
  CalendarClock,
  LayoutList,
  Utensils,
} from "lucide-react";

const Res_viewOrderModal = ({ item }) => {
  if (!item || !item._id) return null;

  return (
    <dialog id="view_order_model" className="modal">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="modal-box w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 flex-wrap gap-2">
          <h3 className="font-bold text-xl sm:text-2xl text-gray-800 flex items-center gap-2">
            <LayoutList size={22} /> Order Details
          </h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-700 text-sm">
          <div>
            <p className="mb-1">
              <span className="font-semibold">Order ID:</span> {item._id}
            </p>
            <p className="flex items-center gap-2">
              <User size={15} className="text-gray-500" />
              {item.customerId?.name}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={15} className="text-gray-500" />
              {item.customerId?.phone}
            </p>
            <p className="flex items-start gap-2 break-words">
              <MapPin size={15} className="text-gray-500 mt-1" />
              {item.deliveryAddress}
            </p>
          </div>

          <div>
            <p className="mb-1">
              <span className="font-semibold">Total:</span> Rs.{" "}
              {item.totalPrice?.toLocaleString()}
            </p>
            <p className="flex items-center gap-2">
              <CreditCard size={15} className="text-gray-500" />
              {item.paymentMethod}
            </p>

            <p className="mb-1">
              <span className="font-semibold">Payment Status:</span>{" "}
              <span
                className={`badge ml-2 capitalize ${
                  item.paymentStatus?.toLowerCase() === "paid"
                    ? "badge-success"
                    : "badge-error"
                }`}
              >
                {item.paymentStatus}
              </span>
            </p>

            <p>
              <span className="font-semibold">Order Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  {
                    pending: "bg-yellow-100 text-yellow-800",
                    confirmed: "bg-purple-100 text-purple-800",
                    preparing: "bg-orange-100 text-orange-800",
                    arriving: "bg-blue-100 text-blue-800",
                    delivered: "bg-green-100 text-green-800",
                  }[item.status?.toLowerCase()] || "bg-gray-100 text-gray-800"
                }`}
              >
                {item.status}
              </span>
            </p>

            <p className="flex items-center gap-2 mt-1">
              <CalendarClock size={15} className="text-gray-500" />
              {item.timeAgo}
            </p>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="mt-6">
          <h4 className="font-semibold flex items-center gap-2 text-lg text-gray-800 border-b pb-2 mb-3">
            <Utensils size={18} /> Ordered Items
          </h4>

          {item.orderItems?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-64 overflow-y-auto pr-2">
              {item.orderItems.map((product, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-3 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={product?.item?.image}
                    alt={product.name}
                    className="w-full h-28 sm:h-32 object-cover rounded-md border mb-2"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800">
                      {product.name}
                    </p>
                    <p className="text-gray-500">
                      Category: {product.category}
                    </p>
                    <p className="text-gray-500">Qty: {product.quantity}</p>
                    <p className="font-medium text-gray-700 mt-1">
                      Rs. {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">
              No items found for this order.
            </p>
          )}
        </div>

        {/* Complaint Section */}
        <div className="mt-6 border-t pt-4">
          <h4 className="font-semibold text-lg text-gray-800 mb-2">
            Raise a Complaint
          </h4>
          <p className="text-gray-500 text-sm mb-3 leading-relaxed">
            Report an issue related to this order (e.g. fake address, rude
            behavior, or payment dispute).
          </p>

          <textarea
            className="textarea textarea-bordered w-full h-24 text-sm"
            placeholder="Describe your complaint here..."
          ></textarea>

          <div className="mt-3 flex justify-end">
            <button
              className="btn btn-sm bg-orangeBtn text-white hover:bg-orange-600 rounded-md"
              onClick={() =>
                console.log("Complaint submitted for order:", item._id)
              }
            >
              Submit Complaint
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-action mt-6 border-t pt-3 flex justify-end">
          <form method="dialog">
            <button className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md">
              Close
            </button>
          </form>
        </div>
      </motion.div>
    </dialog>
  );
};

export default Res_viewOrderModal;
