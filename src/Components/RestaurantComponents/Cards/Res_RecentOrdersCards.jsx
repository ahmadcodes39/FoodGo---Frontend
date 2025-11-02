import React from "react";
import { User, Package, Clock, MapPin } from "lucide-react";

const Res_RecentOrderCard = ({ order }) => {
  // 🎨 Status color mapping
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    preparing: "bg-orange-100 text-orange-700",
    arriving: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
  };

  const itemsSummary = order.orderItems
    .map(
      (itm) =>
        `${itm.quantity}x ${itm.item?.name || "Unknown Item"}`
    )
    .join(", ");

  const orderShortId = order._id.slice(0, 5).toUpperCase();
  const phoneShort = order.customerId?.phone.slice(0, 6) + "****";

  return (
    <div className="flex justify-between items-start border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
      {/* Left Section */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-blue-600 font-semibold text-sm">
            #ORD-{orderShortId}
          </p>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
              statusColors[order.status?.toLowerCase()] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700 mb-1">
          <User size={16} />
          <p className="font-medium">
            {order.customerId?.name || "Unknown"} ({phoneShort})
          </p>
        </div>

        <div className="flex items-start gap-2 text-gray-500 text-sm mb-1">
          <Package size={15} />
          <p>{itemsSummary}</p>
        </div>

        <div className="flex items-start gap-2 text-gray-500 text-xs mb-1">
          <MapPin size={14} />
          <p>{order.deliveryAddress?.slice(0, 25)}...</p>
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Clock size={14} />
          <p>{order.timeAgo}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-800">
          Rs. {order.totalPrice.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {order.totalItems} items
        </p>
      </div>
    </div>
  );
};

export default Res_RecentOrderCard;
