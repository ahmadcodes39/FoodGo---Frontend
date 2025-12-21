import React from "react";
import Cus_RestaurantCard from "./Cus_Cards/Cus_RestaurantCard";

const Cus_RestaurantList = ({ restaurantsData }) => {
  const hasData = restaurantsData && restaurantsData.length > 0;

  return (
    <div className="py-10 px-6">
      <h2 className="text-2xl font-bold mb-6">Restaurants Near You</h2>

      {hasData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantsData.map((restaurant) => (
            <Cus_RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg mt-10">
          No restaurants found.
        </p>
      )}
    </div>
  );
};

export default Cus_RestaurantList;
