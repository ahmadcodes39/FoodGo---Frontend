import React from "react";
import { Calendar, DollarSign, ShoppingCart, Star, MapPin, ChefHat } from "lucide-react";

const Ad_CustomerInfoModel = ({ data }) => {
  if (!data) return null;

  const statusBadgeColors = {
    pending: "badge-warning",
    confirmed: "badge-success",
    preparing: "badge-info",
    arriving: "badge-secondary",
    delivered: "badge-primary",
  };

  return (
    <dialog id="ad_customer_info_modal" className="modal">
      <div className="modal-box max-w-2xl bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-2xl p-8 border border-blue-200">
        {/* Header */}
        <h3 className="text-3xl font-bold text-center mb-6 text-indigo-800 border-b-2 border-indigo-300 pb-4">
          Customer Profile
        </h3>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="avatar mb-4">
            <div className="w-32 h-32 rounded-full ring-4 ring-indigo-300 ring-offset-4 ring-offset-white shadow-lg">
              <img
                src={
                  data.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="object-cover"
              />
            </div>
          </div>

          <h4 className="text-2xl font-bold text-gray-800 mb-2">{data.name}</h4>
          <p className="text-lg text-gray-600 mb-1">{data.email}</p>
          <p className="text-lg text-gray-600 mb-4">{data.phone}</p>

          <span
            className={`badge text-white px-6 py-3 text-sm font-semibold rounded-full shadow-md ${
              data.status?.toLowerCase() === "active"
                ? "badge-success"
                : data.status?.toLowerCase() === "blocked"
                ? "badge-error"
                : "badge-warning"
            }`}
          >
            {data.status}
          </span>
        </div>

        {/* Account Details Card */}
        <div className="card bg-white shadow-lg rounded-2xl p-6 mb-6">
          <div className="card-title flex items-center gap-2 mb-4">
            <Calendar className="text-indigo-600" size={20} />
            <span className="text-xl font-semibold text-gray-800">Account Details</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <span>ID:</span>
              </span>
              <span className="font-semibold text-gray-800 break-all text-right">{data.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <Calendar size={16} />
                Joined:
              </span>
              <span className="font-semibold text-gray-800">{new Date(data.joinedDate).toLocaleDateString("en-GB")}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <ShoppingCart size={16} />
                Total Orders:
              </span>
              <span className="font-semibold text-gray-800">{data.totalOrders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <DollarSign size={16} />
                Total Spent:
              </span>
              <span className="font-semibold text-gray-800">${data.totalSpent?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center md:col-span-2">
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <Calendar size={16} />
                Last Order:
              </span>
              <span className="font-semibold text-gray-800">
                {data.lastOrderDate ? new Date(data.lastOrderDate).toLocaleDateString("en-GB") : "No orders yet"}
              </span>
            </div>
          </div>
        </div>

        {/* Order Statistics Card */}
        <div className="card bg-white shadow-lg rounded-2xl p-6 mb-6">
          <div className="card-title flex items-center gap-2 mb-4">
            <Star className="text-yellow-500" size={20} />
            <span className="text-xl font-semibold text-gray-800">Order Statistics</span>
          </div>
          <div className="mb-4">
            <span className="text-gray-600 font-medium mb-2 block">Orders by Status:</span>
            <div className="flex flex-wrap gap-3">
              {Object.entries(data.ordersByStatus || {}).map(([status, count]) => (
                <span key={status} className={`badge text-white px-4 py-2 font-medium ${statusBadgeColors[status] || "badge-neutral"}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}: {count}
                </span>
              ))}
            </div>
          </div>

          {data.mostOrderedRestaurant && (
            <div className="mb-4">
              <span className="text-gray-600 font-medium mb-2 block flex items-center gap-2">
                <MapPin size={16} />
                Most Ordered Restaurant:
              </span>
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                <img
                  src={data.mostOrderedRestaurant.logo || "https://via.placeholder.com/40"}
                  alt={data.mostOrderedRestaurant.name}
                  className="w-12 h-12 rounded-lg object-cover border"
                />
                <div>
                  <span className="font-semibold text-gray-800">{data.mostOrderedRestaurant.name}</span>
                  <p className="text-sm text-gray-600">{data.mostOrderedRestaurant.orderCount} orders</p>
                </div>
              </div>
            </div>
          )}

          {data.mostOrderedItem && (
            <div>
              <span className="text-gray-600 font-medium mb-2 block flex items-center gap-2">
                <ChefHat size={16} />
                Most Ordered Item:
              </span>
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                <img
                  src={data.mostOrderedItem.image || "https://via.placeholder.com/40"}
                  alt={data.mostOrderedItem.name}
                  className="w-12 h-12 rounded-lg object-cover border"
                />
                <div>
                  <span className="font-semibold text-gray-800">{data.mostOrderedItem.name}</span>
                  <p className="text-sm text-gray-600">${data.mostOrderedItem.price} - {data.mostOrderedItem.orderCount} orders</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <form method="dialog" className="w-full mt-6">
          <button className="btn btn-primary btn-outline w-full text-lg rounded-xl py-3 font-semibold">
            Close
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default Ad_CustomerInfoModel;
