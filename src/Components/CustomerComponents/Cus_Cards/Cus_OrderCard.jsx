import React from "react";
import { CheckCircle, Clock, Truck, CookingPot } from "lucide-react";

const STATUS_STYLES = {
  pending: {
    color: "bg-yellow-100 text-yellow-700",
    label: "Pending",
    icon: <Clock size={14} />,
  },
  confirmed: {
    color: "bg-blue-100 text-blue-700",
    label: "Confirmed",
    icon: <CheckCircle size={14} />,
  },
  preparing: {
    color: "bg-orange-100 text-orange-700",
    label: "Preparing",
    icon: <CookingPot size={14} />,
  },
  arriving: {
    color: "bg-purple-100 text-purple-700",
    label: "Arriving",
    icon: <Truck size={14} />,
  },
  delivered: {
    color: "bg-green-100 text-green-700",
    label: "Delivered",
    icon: <CheckCircle size={14} />,
  },
};

const Cus_OrderCard = ({ order, onViewDetails }) => {
  const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.pending;

  const restaurant = order?.orderItems?.[0]?.restaurantId;
  const restaurantName = restaurant?.name || "Unknown Restaurant";
  const restaurantLogo = restaurant?.logo || "/placeholder.png";

  // dates formatting
  const orderDate = new Date(order.createdAt).toLocaleDateString();
  const deliveredTime = order.deliveredAt
    ? new Date(order.deliveredAt).toLocaleTimeString()
    : "--";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
        {/* RESTAURANT IMAGE */}
        <img
          src={restaurantLogo}
          alt={restaurantName}
          className="w-full sm:w-20 h-48 sm:h-20 rounded-xl object-cover border"
        />

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            {/* RESTAURANT NAME */}
            <h3 className="font-semibold text-lg text-gray-800">
              {restaurantName}
            </h3>

            {/* STATUS CHIP */}
            <div
              className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full self-start sm:self-auto ${statusStyle.color}`}
            >
              {statusStyle.icon}
              <span>{statusStyle.label}</span>
            </div>
          </div>

          {/* ORDER ID */}
          <p className="text-sm text-gray-500 mt-1">Order #{order._id}</p>
        </div>
      </div>

      {/* MIDDLE DETAILS */}
      <div className="px-4 text-sm text-gray-700 border-t border-gray-100 py-3 space-y-2">
        <div className="flex justify-between flex-wrap">
          <span>Order Date:</span>
          <span className="font-medium">{orderDate}</span>
        </div>

        <div className="flex justify-between flex-wrap">
          <span>
            {order.status === "preparing" || order.status === "arriving"
              ? "Est. Delivery:"
              : order.status === "delivered"
              ? "Delivered At:"
              : "Expected Time:"}
          </span>
          <span className="font-medium">{deliveredTime}</span>
        </div>

        <div className="flex justify-between flex-wrap text-orange-600 font-semibold pt-1">
          <span>Total:</span>
          <span>$ {order.totalPrice}</span>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-end p-4 border-t border-gray-100">
        <button
          onClick={onViewDetails}
          className="w-full sm:w-auto sm:min-w-[120px] py-2 border text-sm font-semibold rounded-lg text-gray-600 hover:text-orange-500 transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Cus_OrderCard;
