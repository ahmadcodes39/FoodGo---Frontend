import React from "react";
import { useParams } from "react-router-dom";

const Ad_RestaurantInfoCard = ({ restaurant }) => {
  const { id } = useParams();

  const getBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "badge bg-yellow-600 text-white border-yellow-700";
      case "approved":
        return "badge bg-green-600 text-white border-green-700";
      case "rejected":
        return "badge bg-red-600 text-white border-red-700";
      case "active":
        return "badge bg-blue-600 text-white border-blue-700";
      case "warned":
        return "badge bg-orange-600 text-white border-orange-700";
      case "blocked":
        return "badge bg-red-800 text-white border-red-900";
      default:
        return "badge bg-gray-600 text-white border-gray-700";
    }
  };

  return (
    <div
      className="
        mt-8 flex flex-col md:flex-col lg:flex-row 
        bg-base-100 rounded-xl p-6 gap-6 shadow-md
      "
    >
      {/* Left - Logo */}
      <div
        className="
          flex justify-center md:justify-center lg:justify-start 
          w-full lg:w-auto
        "
      >
        <img
          src={restaurant.logo}
          alt={restaurant.name}
          className="
            w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 
            object-cover rounded-full border-4 border-orange-500 shadow-md
          "
        />
      </div>

      {/* Right - Info */}
      <div className="flex-1 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center lg:text-left">
          {restaurant.name}
        </h2>
        <p className="text-gray-600 text-center lg:text-left">
          {restaurant.address}
        </p>

        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mt-4 
            text-sm sm:text-base
          "
        >
          <p>
            <strong>Phone:</strong> {restaurant.restaurantPhoneNumber}
          </p>
          <p>
            <strong>Opening Hours:</strong> {restaurant.openingHours}
          </p>
          <p>
            <strong>Delivery Time:</strong> {restaurant.deliveryTime}
          </p>

          <p>
            <strong>Delivery:</strong>{" "}
            <span
              className={`badge ${
                restaurant.deliveryAvailable
                  ? "badge-success text-white"
                  : "badge-error text-white"
              }`}
            >
              {restaurant.deliveryAvailable ? "Available" : "Not Available"}
            </span>
          </p>

          <p>
            <strong>Operational Status:</strong>{" "}
            <span className={getBadgeClass(restaurant.operationalStatus)}>
              {restaurant.operationalStatus}
            </span>
          </p>

          <p>
            <strong>Verification Status:</strong>{" "}
            <span className={getBadgeClass(restaurant.verificationStatus)}>
              {restaurant.verificationStatus}
            </span>
          </p>

          <p className="sm:col-span-2">
            <strong>Cuisine:</strong> {restaurant.cuisine.join(", ")}
          </p>
        </div>

        <div className="mt-4">
          <p className="font-medium text-gray-800">Description:</p>
          <p className="text-gray-700 mt-1">{restaurant.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Ad_RestaurantInfoCard;
