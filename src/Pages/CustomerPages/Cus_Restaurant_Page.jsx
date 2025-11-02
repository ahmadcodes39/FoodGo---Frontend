import React, { useState, useMemo } from "react";
import Header from "../../Components/Landing Page Components/Header";
import Cus_FilterSection from "../../Components/CustomerComponents/Cus_FilterSection";
import { dummyRestaurants } from "../../Components/Dummy Data/DummyData";
import Cus_RestaurantCard from "../../Components/CustomerComponents/Cus_Cards/Cus_RestaurantCard";
import TopHeading from "../../Components/Common/TopHeading";

const Cus_Restaurant_Page = () => {
  const [filters, setFilters] = useState({});
  const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 10);
  const handleApplyFilters = (newFilters) => setFilters(newFilters);

  // 🔍 Apply filters with useMemo for performance
  const filteredRestaurants = useMemo(() => {
    return dummyRestaurants.filter((restaurant) => {
      // 1️⃣ Restaurant Name
      if (
        filters.restaurantName &&
        !restaurant.name.toLowerCase().includes(filters.restaurantName.toLowerCase())
      )
        return false;

      // 2️⃣ Address
      if (
        filters.address &&
        !restaurant.address.toLowerCase().includes(filters.address.toLowerCase())
      )
        return false;

      // 3️⃣ Cuisine
      if (
        filters.cuisines &&
        filters.cuisines.length > 0 &&
        !filters.cuisines.some((c) =>
          restaurant.cuisine.map((r) => r.toLowerCase()).includes(c.toLowerCase())
        )
      )
        return false;

      // 4️⃣ Delivery Only
      if (filters.deliveryOnly && !restaurant.deliveryAvailable) return false;

      // 5️⃣ Delivery Time (e.g., "0-20", "20-35")
      if (filters.deliveryTime) {
        const [min, max] = filters.deliveryTime.split("-").map(Number);
        const restaurantTime = restaurant.deliveryTime.match(/\d+/g);
        if (restaurantTime) {
          const avgTime =
            (parseInt(restaurantTime[0]) + parseInt(restaurantTime[1])) / 2;
          if (avgTime < min || avgTime > max) return false;
        }
      }

      // 6️⃣ Price Range
      if (filters.maxPrice && restaurant.maxPrice > filters.maxPrice) return false;

      return true;
    });
  }, [filters]);

  const visibleRestaurants = filteredRestaurants.slice(0, visibleCount);

  return (
    <div>
      <Header />
      <Cus_FilterSection onApplyFilters={handleApplyFilters} />

      <div className="py-10 px-6">
        <TopHeading title={"Explore Popular Restaurants"} />

        {visibleRestaurants.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleRestaurants.map((restaurant) => (
              <Cus_RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No restaurants found matching your filters.
          </p>
        )}

        {visibleCount < filteredRestaurants.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow transition-all"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cus_Restaurant_Page;
