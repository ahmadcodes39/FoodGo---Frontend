import { ChefHat, User2, Users2 } from "lucide-react";
import React from "react";

const Ad_ordersDetailModel = ({ order }) => {
  if (!order) return null;
  return (
    <dialog id="ad_orders_detail_model" className="modal" open>
      <div className="modal-box w-11/12 max-w-5xl">
        {/* Order Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Order #{order.id}</h2>
          <span className="px-3 py-1 text-sm rounded-md bg-green-100 text-green-600">
            {order.status}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{order.date}</p>

        {/* Customer & Restaurant Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold  flex gap-3 mb-5"><User2/> Customer Information</h3>
            <p className="font-medium">{order.customer.name}</p>
            <p className="text-sm text-gray-600">{order.customer.email}</p>
            <p className="text-sm text-gray-600">{order.customer.phone}</p>
            <p className="text-sm text-gray-600 mt-2">
              Delivery Address: {order.customer.address}
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-5 flex gap-3"><ChefHat/> Restaurant Information</h3>
            <p className="font-medium">{order.restaurant.name}</p>
            <p className="text-sm text-gray-600">{order.restaurant.phone}</p>
            <p className="text-sm text-gray-600 mt-2">
              Payment Method: {order.paymentMethod}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Order Items</h3>
          <div className="border rounded-lg">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between px-4 py-2 border-b last:border-none"
              >
                <span>
                  {item.name}{" "}
                  <span className="text-gray-500">x{item.quantity}</span>
                </span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between px-4 py-2 font-semibold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="modal-action">
          <button
             onClick={()=>document.getElementById('ad_orders_detail_model').close()}
            className="btn btn-primary btn-outline"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Ad_ordersDetailModel;
