import React, { useEffect, useState } from "react";
import { Clock, MapPin, CheckCircle2 } from "lucide-react";
import Cus_ComplaintModel from "./Cus_ComplaintModel";
import { checkIsComplaint } from "../../../api/customerApi";
import toast from "react-hot-toast";

const Cus_ViewOrderModel = ({ order }) => {
  const [dataForComplaint, setDataForComplaint] = useState({
    reason: "",
    orderId: "",
    againstUser: "",
    againstRestaurant: "",
  });

  useEffect(()=>{
console.log("data ",order)
  },[order])


  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!order?._id) return;

    const checkIfAlreadyAComplaint = async () => {
      try {
        // console.log("chcking order data ",order)
        const response = await checkIsComplaint(order._id);
        const data = response.data;

        if (data.isAlreadyComplaint === true) {
          setActive(true);
        } else {
          setActive(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };

    checkIfAlreadyAComplaint();
  }, [order]);

  if (!order) return null;

  const steps =
    order.statusHistory?.map((entry) => ({
      label: entry.status,
      time: new Date(entry.time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    })) || [];

 const getDataReadyForComplaint = () => {
  document.getElementById("cus_complaint_modal").showModal();

  setDataForComplaint(prev => ({
    ...prev,
    orderId: order._id,
    againstRestaurant: order?.orderItems[0]?.restaurantId?._id || "",
    againstUser: "",
  }));
};


  const currentStep = steps.length - 1;

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
              src={order.orderItems[0]?.restaurantId?.logo}
              alt={order.orderItems[0]?.restaurantId?.name}
              className="w-16 h-16 rounded-xl object-cover border"
            />
            <div>
              <h3 className="font-semibold text-lg">
                {order.orderItems[0]?.restaurantId?.name}
              </h3>
              <p className="text-sm text-gray-500">Order #{order._id}</p>
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
              {order.orderItems?.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>
                    {item.quantity}x {item.item?.name}
                  </span>
                  <span>$ {item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="border-t border-gray-200 pt-5 mt-5">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <MapPin size={18} className="text-orange-500" />
              Delivery Address
            </h3>
            <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
          </div>

          {/* Summary */}
          <div className="border-t border-gray-200 pt-5 mt-5 text-sm">
            <div className="flex justify-between font-bold text-lg text-orange-600 mt-2">
              <span>Total</span>
              <span>$ {order.totalPrice}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="modal-action mt-6 flex flex-col items-center sm:flex-row sm:justify-end ">
          
            <button
              onClick={getDataReadyForComplaint}
              disabled={active}
              className={`btn w-full sm:w-auto text-white border ${
                active
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {active ? "Complaint Submitted" : "Make a Complaint"}
            </button>
          </div>
        </div>
      </dialog>

      <Cus_ComplaintModel
        dataForComplaint={dataForComplaint}
        setDataForComplaint={setDataForComplaint}
        setActive={setActive}
      />
    </>
  );
};

export default Cus_ViewOrderModel;
