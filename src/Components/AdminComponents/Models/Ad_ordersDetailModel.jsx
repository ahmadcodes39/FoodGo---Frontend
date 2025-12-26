import { ChefHat, User2, Calendar, Package } from "lucide-react";
import React, { useEffect } from "react";

const Ad_ordersDetailModel = ({ order }) => {

  useEffect(()=>{
console.log(order)
  },[])

  if (!order) return null;

  const items = order.orderItems?.map(oi => ({
    name: oi.item?.name || "Unknown Item",
    quantity: oi.quantity || 1,
    price: oi.item?.price || 0,
    total: ((oi.item?.price || 0) * (oi.quantity || 1)),
  })) || [];

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  const statusColors = {
    Pending: "badge-warning",
    Confirmed: "badge-info",
    Preparing: "badge-secondary",
    Arriving: "badge-primary",
    Delivered: "badge-success",
  };

  return (
    <dialog id="ad_orders_detail_model" className="modal">
      <div className="modal-box w-11/12 max-w-6xl bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-2xl p-8 border border-blue-200">
        {/* Order Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-indigo-800">Order Details</h2>
            <p className="text-lg text-gray-600 mt-1">Order ID: {order.id}</p>
          </div>
          <span className={`badge text-white px-6 py-3 text-lg font-semibold rounded-full shadow-md ${statusColors[order.status] || "badge-neutral"}`}>
            {order.status}
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 mb-6 text-gray-700">
          <Calendar className="text-indigo-600" size={20} />
          <span className="text-lg">{new Date(order.date).toLocaleDateString("en-GB")} at {order.time}</span>
        </div>

        {/* Customer & Restaurant Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="card bg-white shadow-lg rounded-2xl p-6">
            <div className="card-title flex items-center gap-2 mb-4">
              <User2 className="text-blue-600" size={24} />
              <span className="text-xl font-semibold text-gray-800">Customer Information</span>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-lg text-gray-800">{order.name || "N/A"}</p>
              <p className="text-gray-600">{order.email || "N/A"}</p>
              <p className="text-gray-600">{order.phone || "N/A"}</p>
              <p className="text-gray-600 mt-3">
                <span className="font-medium">Delivery Address:</span> {order.address || "N/A"}
              </p>
            </div>
          </div>

          <div className="card bg-white shadow-lg rounded-2xl p-6">
            <div className="card-title flex items-center gap-2 mb-4">
              <ChefHat className="text-green-600" size={24} />
              <span className="text-xl font-semibold text-gray-800">Restaurant Information</span>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-lg text-gray-800">{order.restaurantName || "N/A"}</p>
              <p className="text-gray-600">{order.restaurantPhone || "N/A"}</p>
              <p className="text-gray-600 mt-3">
                <span className="font-medium">Payment Method:</span> card
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="card bg-white shadow-lg rounded-2xl p-6">
          <div className="card-title flex items-center gap-2 mb-4">
            <Package className="text-purple-600" size={24} />
            <span className="text-xl font-semibold text-gray-800">Order Items</span>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Item</th>
                  <th className="px-4 py-2 text-center">Quantity</th>
                  <th className="px-4 py-2 text-right">Price</th>
                  <th className="px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-center">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right font-semibold">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-bold">
                  <td colSpan="3" className="px-4 py-3 text-right">Grand Total</td>
                  <td className="px-4 py-3 text-right text-lg">${order.total?.toFixed(2) || "0.00"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-action mt-6">
          <button
            onClick={() => document.getElementById('ad_orders_detail_model').close()}
            className="btn btn-sm btn-primary btn-outline"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Ad_ordersDetailModel;
