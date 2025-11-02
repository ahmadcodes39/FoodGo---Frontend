import React, { useState } from "react";
import TopHeading from "../../../../Components/Common/TopHeading";
import FilterHeader from "../../../../Components/Common/FilterHeader";
import Ad_RestaurantTable from "../../../../Components/AdminComponents/Ad_RestaurantTable";
import { restaurantsData } from "../../../../Components/Dummy Data/DummyData";
const CMP_View_Restaurant_Page = () => {
  const RestaurantStatus = ["All", "Pending", "Approved", "Rejected"];
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleBtnClick = (text) => {
    setActiveStatus(text);
  };

  // filtering
  const filteredRestaurants = restaurantsData.filter((restaurant) => {
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

  return (
    <div className="p-4">
      <div className="mb-4">
        <TopHeading title={"Owerview Restaurant"} />
      </div>
      <FilterHeader
        activeStatus={activeStatus}
        onBtnClick={handleBtnClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statuses={RestaurantStatus}
      />
      <Ad_RestaurantTable data={filteredRestaurants} isauthorize={false} basePath="cm"/>
    </div>
  );
};

export default CMP_View_Restaurant_Page;
 