import React, { useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import FilterHeader from "../../Components/Common/FilterHeader";
import Ad_CustomerTable from "../../Components/AdminComponents/Ad_CustomerTable";
import { dummyCustomers } from "../../Components/Dummy Data/DummyData";
const Ad_Manage_Customer_Page = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const handleBtnClick = (text) => {
    setActiveStatus(text);
  };
  const customerStats = ["All", "Active", "Warned", "Blocked"];


  const filteredRestaurants = dummyCustomers.filter((customer) => {
    const matchesStatus =
      activeStatus === "All" || customer.status === activeStatus;

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      customer?.id?.toLowerCase().includes(query) ||
      customer?.name?.toLowerCase().includes(query) ||
      customer?.phone?.toLowerCase().includes(query) ||
      customer?.status?.toLowerCase().includes(query) ||
      new Date(customer.joined)
      .toLocaleDateString("en-GB") // Format: DD/MM/YYYY
      .toLowerCase()
      .includes(query)||
      customer?.email?.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4">
      <TopHeading title={"Manage Customer"} />
      <FilterHeader
        activeStatus={activeStatus}
        onBtnClick={handleBtnClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statuses={customerStats}
      />
      <Ad_CustomerTable data={filteredRestaurants} />
    </div>
  );
};

export default Ad_Manage_Customer_Page;
