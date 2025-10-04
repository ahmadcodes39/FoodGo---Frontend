import React from "react";

const Cus_RestaurantHeader = ({ restaurant }) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden mb-6">
      {/* Cover Image + Logo */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" // dummy banner
          alt="Restaurant Banner"
          className="w-full h-48 object-cover"
        />
        <div className="absolute -bottom-10 left-6 flex items-center gap-4">
          <img
            src={restaurant.logo}
            alt={restaurant.name}
            className="w-20 h-20 rounded-full border-4 border-white shadow-md"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">{restaurant.name}</h1>
            <div className="flex flex-wrap gap-2 mt-1">
              {restaurant.cuisine.map((c, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-14 px-6 pb-6">
        <p className="text-gray-600 mb-3">{restaurant.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
          <p>
            <span className="font-semibold">📍 Address: </span>
            {restaurant.address}
          </p>
          <p>
            <span className="font-semibold">📞 Phone: </span>
            {restaurant.restaurantPhoneNumber}
          </p>
          <p>
            <span className="font-semibold">⏰ Opening Hours: </span>
            {restaurant.openingHours}
          </p>
          <p>
            <span className="font-semibold">🚚 Delivery Time: </span>
            {restaurant.deliveryTime}
          </p>
          <p>
            <span className="font-semibold">Delivery Available: </span>
            {restaurant.deliveryAvailable ? (
              <span className="text-green-600">Yes</span>
            ) : (
              <span className="text-red-600">No</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cus_RestaurantHeader;
