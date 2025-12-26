import React, { useState, useMemo, useEffect } from "react";
import Header from "../../Components/Landing Page Components/Header";
import Cus_FilterSection from "../../Components/CustomerComponents/Cus_FilterSection";
import Cus_RestaurantCard from "../../Components/CustomerComponents/Cus_Cards/Cus_RestaurantCard";
import TopHeading from "../../Components/Common/TopHeading";
import { getRestaurants } from "../../api/customerApi";
import Loading from "../../Components/LoadingSpinner/Loading";
import toast from "react-hot-toast";

const Cus_Restaurant_Page = () => {
  const [filters, setFilters] = useState({});
  const [restaurants, setRestaurants] = useState([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);

  // =====================================
  // LOAD RESTAURANTS WITH PAGINATION
  // =====================================
  const loadRestaurants = async () => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const response = await getRestaurants(page, limit);
      const data = response.data;

      if (data.success) {
        setRestaurants((prev) => {
          const combined = [...prev, ...data.restaurants];
          const unique = Array.from(
            new Map(combined.map((r) => [r._id, r])).values()
          );
          return unique;
        });

        setHasMore(page < data.totalPages);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, [page]);

  // =====================================
  // FILTER LOGIC
  // =====================================
const normalize = (str) => str?.trim().toLowerCase();

const filteredRestaurants = useMemo(() => {
  return restaurants.filter((restaurant) => {

    // Restaurant name
    if (
      filters.restaurantName &&
      !normalize(restaurant.name).includes(normalize(filters.restaurantName))
    ) return false;

    // Address
    if (
      filters.address &&
      !normalize(restaurant.address).includes(normalize(filters.address))
    ) return false;

    // Cuisine
    if (
      filters.cuisines?.length &&
      !filters.cuisines.some((c) =>
        restaurant.cuisine?.some(
          (r) => normalize(r) === normalize(c)
        )
      )
    ) return false;

    // Delivery only
    if (filters.deliveryOnly && !restaurant.deliveryAvailable) return false;

    // Delivery time
    if (filters.deliveryTime && restaurant.deliveryTime) {
      const [min, max] = filters.deliveryTime.split("-").map(Number);
      const times = restaurant.deliveryTime
        .replace("–", "-")
        .match(/\d+/g);

      if (times?.length === 2) {
        const avg = (+times[0] + +times[1]) / 2;
        if (avg < min || avg > max) return false;
      }
    }

    return true;
  });
}, [filters, restaurants]);



  const handleApplyFilters = (newFilters) => setFilters(newFilters);

  const handleLoadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  if (loading && page === 1) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <Cus_FilterSection onApplyFilters={handleApplyFilters} />

      <div className="py-10 px-6">
        <TopHeading title={"Explore Popular Restaurants"} />

        {filteredRestaurants.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Cus_RestaurantCard
                key={restaurant._id}
                restaurant={restaurant}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No restaurants found matching your filters.
          </p>
        )}

        {/* Load More Button */}
        {hasMore && filteredRestaurants.length > 0 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow transition-all"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cus_Restaurant_Page;
