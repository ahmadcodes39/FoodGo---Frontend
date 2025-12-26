import React, { useState, useEffect } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import FilterHeader from "../../Components/Common/FilterHeader";
import Ad_CustomerTable from "../../Components/AdminComponents/Ad_CustomerTable";
import { getAllCustomers } from "../../api/adminApi";

const Ad_Manage_Customer_Page = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBtnClick = (text) => {
    setActiveStatus(text);
  };

  const customerStats = ["All", "Active", "Warned", "Blocked"];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getAllCustomers();
        setCustomers(response.data.customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const matchesStatus =
      activeStatus === "All" || customer.status.toLowerCase() === activeStatus.toLowerCase();

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      customer?.id?.toLowerCase().includes(query) ||
      customer?.name?.toLowerCase().includes(query) ||
      customer?.phone?.toLowerCase().includes(query) ||
      customer?.status?.toLowerCase().includes(query) ||
      new Date(customer.joinedDate)
        .toLocaleDateString("en-GB") // Format: DD/MM/YYYY
        .toLowerCase()
        .includes(query) ||
      customer?.email?.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="p-4">
        <TopHeading title={"Manage Customer"} />
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

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
      <Ad_CustomerTable data={filteredCustomers} />
    </div>
  );
};

export default Ad_Manage_Customer_Page;
