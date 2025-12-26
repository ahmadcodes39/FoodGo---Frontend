import React, { useState, useEffect } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import FilterHeader from "../../Components/Common/FilterHeader";
import Ad_RestaurantTable from "../../Components/AdminComponents/Ad_RestaurantTable";
import Loading from "../../Components/LoadingSpinner/Loading";
import { getRestaurants } from "../../api/adminApi";
const Ad_Manage_Restaurant_Page = ({ basePath = "admin" }) => {
  const RestaurantStatus = ["All", "Pending", "Approved", "Rejected"];
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRestaurants();
        setRestaurants(response.data.restaurants);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBtnClick = (text) => {
    setActiveStatus(text);
  };

  // filtering
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesStatus =
      activeStatus === "All" || restaurant.status === activeStatus;

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      restaurant?.name?.toLowerCase().includes(query) ||
      restaurant?.ownerId?.name?.toLowerCase().includes(query) ||
      restaurant?.ownerId?.email?.toLowerCase().includes(query) ||
      restaurant?.status?.toLowerCase().includes(query) ||
      restaurant?.cusisine?.some((c) => c?.toLowerCase().includes(query));

    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <TopHeading title={"Manage Restaurant"} />
      </div>
      <FilterHeader
        activeStatus={activeStatus}
        onBtnClick={handleBtnClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statuses={RestaurantStatus}
      />
      <Ad_RestaurantTable data={filteredRestaurants} adminNavigate={true} basePath={basePath} />
    </div>
  );
};

export default Ad_Manage_Restaurant_Page;
