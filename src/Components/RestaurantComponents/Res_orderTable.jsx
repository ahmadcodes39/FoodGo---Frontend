import React, { useState } from "react";
import Res_viewOrderModal from "./Models/Res_viewOrderModal";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  confirmed: "bg-purple-100 text-purple-800 border-purple-300",
  preparing: "bg-orange-100 text-orange-800 border-orange-300",
  arriving: "bg-blue-100 text-blue-800 border-blue-300",
  delivered: "bg-green-200 text-green-900 border-green-400",
};

const paymentColors = {
  paid: "bg-green-100 text-green-800 border-green-300",
  pending: "bg-red-100 text-red-800 border-red-300",
};

const Res_orderTable = ({ ordersData, onStatusChange }) => {
  const [selectedItem, setSelectedItem] = useState({});

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
                  {order._id?.slice(0, 5)}...
                </td>

                {/* Customer Info */}
                <td>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{order.customerId?.name}</span>
                    <span
                      className="text-sm text-gray-500"
                      title={order.customerId?.phone}
                    >
                      {order.customerId?.phone?.slice(0, 5)}...
                    </span>
                  </div>
                </td>

                {/* Address */}
                <td title={order.deliveryAddress}>
                  {order.deliveryAddress?.slice(0, 15)}...
                </td>

                {/* Total Price */}
                <td>
                  <b>{order.totalPrice}</b>
                </td>

                {/* Order Status */}
                <td>
                  <div
                    className={`text-center py-1 text-xs font-medium border rounded-full ${
                      statusColors[order.status?.toLowerCase()] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </div>
                </td>

                {/* Payment Status */}
                <td>
                  <div
                    className={`text-center py-1 text-xs font-medium border rounded-full ${
                      paymentColors[order.paymentStatus?.toLowerCase()] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.paymentStatus}
                  </div>
                </td>

                {/* Time */}
                <td>{order.timeAgo}</td>

                {/* Action */}
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBtnClick(order)}
                      className="btn btn-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      View
                    </button>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        onStatusChange(order._id, e.target.value)
                      }
                      className="select select-sm border-gray-300 rounded-md"
                    >
                      <option value="pending">Pending</option>
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
