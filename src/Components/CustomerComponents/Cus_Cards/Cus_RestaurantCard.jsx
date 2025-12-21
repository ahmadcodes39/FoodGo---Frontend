import React from "react";
import Cus_StatusChips from "../Cus_StatusChips";
import { Ban, CheckCheckIcon, CircleCheck, Clock, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Cus_RestaurantCard = ({ restaurant }) => {
  const { logo, name, cuisine, openingHours, deliveryTime, deliveryAvailable } =
    restaurant;

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      <div className="relative">
        <img src={logo} alt={name} className="h-44 w-full object-cover" />

        {/* Delivery Availability Badge */}
        <div
          className={`absolute top-3 right-3 flex items-center gap-1 text-[10px] font-medium px-2 py-[3px] rounded-md shadow-sm ${
            deliveryAvailable
              ? "bg-green-700 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          {deliveryAvailable ? (
            <>
              <CircleCheck size={12} /> <span>Delivery</span>
            </>
          ) : (
            <>
              <Ban size={12} /> <span>Pickup</span>
            </>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <Cus_StatusChips openingHours={openingHours} />
        </div>

        <p className="text-sm text-gray-500 mb-2">{cuisine.join(" • ")}</p>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Clock size={16} className="mr-1" />
          {deliveryTime}
        </div>

        <Link
          to={`/${restaurant._id}/${restaurant.name}`}
          className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2 rounded-lg font-medium transition"
        >
          View Menu
        </Link>
      </div>
    </div>
  );
};

export default Cus_RestaurantCard;
