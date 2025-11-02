import React, { useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import FilterHeader from "../../Components/Common/FilterHeader";
import Ad_OrdersTable from "../../Components/AdminComponents/Ad_OrdersTable";
import { dummyOrders } from "../../Components/Dummy Data/DummyData";
const Ad_Manage_Orders_Page = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const handleBtnClick = (text) => {
    setActiveStatus(text);
  };
  const ordersStats = [
    "All",
    "pending",
    "confirmed",
    "preparing",
    "arriving",
    "delivered",
  ];
  //filtering
const filteredData = dummyOrders.filter((item) => {
  const query = searchQuery.toLowerCase();

  const matchesSearch =
    item.id?.toLowerCase().includes(query) ||
    item.name?.toLowerCase().includes(query) ||
    item.email?.toLowerCase().includes(query) ||
    item.restaurantName?.toLowerCase().includes(query) ||
    item.time?.toLowerCase().includes(query) ||
    new Date(item.date)
      .toLocaleDateString("en-GB") // Format: DD/MM/YYYY
      .toLowerCase()
      .includes(query);

  const matchesStatus =
    activeStatus === "All" ||
    item.status?.toLowerCase() === activeStatus.toLowerCase();

  return matchesSearch && matchesStatus;
});


  return (
    <div className="p-4">
      <TopHeading title={"Manage Orders"} />
      <FilterHeader
        activeStatus={activeStatus}
        onBtnClick={handleBtnClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statuses={ordersStats}
      />
      <Ad_OrdersTable data={filteredData}/>
    </div>
  );
};

export default Ad_Manage_Orders_Page;
