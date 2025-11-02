import React, { useEffect } from "react";
import { Clock, MapPin, CheckCircle2 } from "lucide-react";
import Cus_ComplaintModel from "./Cus_ComplaintModel";

const Cus_ViewOrderModel = ({ order }) => {
  useEffect(() => {
    console.log("order data ", order);
  }, [order]);
  if (!order) return null;

  const steps = [
    { label: "Order Placed", time: "1:45 PM" },
    { label: "Restaurant Preparing", time: "1:50 PM" },
    { label: "Out for Delivery", time: "2:10 PM" },
    { label: "Delivered", time: "2:30 PM (Est.)" },
  ];

  const currentStep = order.currentStep !== undefined ? order.currentStep : 2;

  return (
    <>
      <dialog id="cus_viewOrder_modal" className="modal">
        <div className="modal-box max-w-2xl rounded-2xl p-6 relative">
          {/* Close Button */}
          <form method="dialog">
            <button className="absolute top-3 right-3 border border-orange-500 rounded-lg text-gray-700 hover:bg-orange-50 w-8 h-8 flex items-center justify-center">
              ✕
            </button>
          </form>

          {/* Order Header */}
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Order Details
          </h2>
          <div className="flex items-center gap-4 mb-5">
            <img
              src={order.image}
              alt={order.restaurant}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">{order.restaurant}</h3>
              <p className="text-sm text-gray-500">Order #{order.id}</p>
            </div>
          </div>

          {/* Delivery Progress */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Clock size={18} className="text-orange-500" />
              Delivery Progress
            </h3>

            <ul className="relative border-l-2 border-green-500 ml-4">
              {steps.map((step, index) => (
                <li key={index} className="mb-6 ml-4">
                  <div
                    className={`absolute -left-[13px] w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      index <= currentStep
                        ? "bg-green-500 border-green-500 text-white"
                        : "bg-gray-200 border-gray-300 text-gray-500"
                    }`}
                  >
                    {index <= currentStep ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <Clock size={12} />
                    )}
                  </div>
                  <p
                    className={`font-medium ${
                      index <= currentStep ? "text-green-700" : "text-gray-600"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-sm text-gray-400 ml-1">{step.time}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Items */}
          <div className="border-t border-gray-200 pt-5 mt-5">
            <h3 className="font-semibold mb-3 text-gray-800">Order Items</h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>2x Classic Cheeseburger</span>
                <span>$12.99</span>
              </div>
              <div className="flex justify-between">
                <span>1x French Fries</span>
                <span>$4.99</span>
              </div>
              <div className="flex justify-between">
                <span>1x Milkshake</span>
                <span>$5.99</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="border-t border-gray-200 pt-5 mt-5">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <MapPin size={18} className="text-orange-500" />
              Delivery Address
            </h3>
            <p className="text-sm text-gray-600">
              123 Main Street, Apt 4B, New York, NY 10001
            </p>
          </div>

          {/* Summary */}
          <div className="border-t border-gray-200 pt-5 mt-5 text-sm">
            <div className="flex justify-between font-bold text-lg text-orange-600 mt-2">
              <span>Total</span>
              <span>{order.total}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="modal-action mt-6 flex flex-col items-center sm:flex-row sm:justify-end ">
            {/* Reorder Button */}
            <button className="btn w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white">
              Reorder
            </button>

            {/* Complaint Button */}
            <button
              onClick={() =>
                document.getElementById("cus_complaint_modal").showModal()
              }
              className="btn w-full sm:w-auto bg-red-500 text-white border border-red-200 hover:bg-red-600"
            >
              Make a Complaint
            </button>
          </div>
        </div>
      </dialog>
      <Cus_ComplaintModel />
    </>
  );
};

export default Cus_ViewOrderModel;
