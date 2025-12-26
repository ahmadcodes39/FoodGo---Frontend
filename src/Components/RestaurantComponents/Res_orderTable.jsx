import React, { useState } from "react";
import Res_viewOrderModal from "./Models/Res_viewOrderModal";

// Status Colors
const statusColors = {
  confirmed: "bg-purple-100 text-purple-800 border-purple-300",
  preparing: "bg-orange-100 text-orange-800 border-orange-300",
  arriving: "bg-blue-100 text-blue-800 border-blue-300",
  delivered: "bg-green-200 text-green-900 border-green-400",
};

const paymentColors = {
  paid: "bg-green-100 text-green-800 border-green-300",
  pending: "bg-red-100 text-red-800 border-red-300",
};

// 🔹 Time formatter
const getTimeAgo = (date) => {
  const diff = Math.floor((new Date() - new Date(date)) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const Res_orderTable = ({ ordersData, onStatusChange, loadingOrderId }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleBtnClick = (item) => {
    setSelectedItem(item);
    setTimeout(() => {
      document.getElementById("view_order_model").showModal();
    }, 0);
  };

  return (
    <div className="overflow-x-auto p-4 border border-gray-200 rounded-lg shadow-md">
      {ordersData.length === 0 ? (
        <div className="text-center py-10 text-gray-500 font-medium">
          No orders found
        </div>
      ) : (
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>ADDRESS</th>
              <th>TOTAL</th>
              <th>ORDER STATUS</th>
              <th>PAYMENT STATUS</th>
              <th>TIME</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {ordersData.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                {/* Order ID */}
                <td className="font-semibold text-sm" title={order._id}>
                  {order._id.slice(0, 6)}...
                </td>

                {/* Customer */}
                <td>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {order.customerId?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {order.customerId?.phone}
                    </span>
                  </div>
                </td>

                {/* Address */}
                <td title={order.deliveryAddress}>
                  {order.deliveryAddress?.slice(0, 18)}...
                </td>

                {/* Total */}
                <td>
                  <b>Rs {order.totalPrice}</b>
                </td>

                {/* Order Status */}
                <td>
                  <div
                    className={`text-center py-1 text-xs font-medium border rounded-full ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </div>
                </td>

                {/* Payment Status */}
                <td>
                  <div
                    className={`text-center py-1 text-xs font-medium border rounded-full ${
                      paymentColors[order.paymentStatus]
                    }`}
                  >
                    {order.paymentStatus.toUpperCase()}
                  </div>
                </td>

                {/* Time */}
                <td>{getTimeAgo(order.createdAt)}</td>

                {/* Actions */}
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBtnClick(order)}
                      className="btn btn-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      View
                    </button>

                    <select
                      value={order.status}
                      disabled={loadingOrderId === order._id}
                      onChange={(e) =>
                        onStatusChange(order._id, e.target.value)
                      }
                      className={`select select-sm border-gray-300 ${
                        loadingOrderId === order._id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="arriving">Arriving</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Res_viewOrderModal item={selectedItem} />
    </div>
  );
};

export default Res_orderTable;
