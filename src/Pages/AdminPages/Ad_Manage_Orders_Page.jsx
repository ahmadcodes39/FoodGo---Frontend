import React, { useState, useEffect } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import FilterHeader from "../../Components/Common/FilterHeader";
import Ad_OrdersTable from "../../Components/AdminComponents/Ad_OrdersTable";
import { getAllOrders } from "../../api/adminApi";

const Ad_Manage_Orders_Page = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBtnClick = (text) => {
    setActiveStatus(text);
  };

  const ordersStats = [
    "All",
    "Pending",
    "Confirmed",
    "Preparing",
    "Arriving",
    "Delivered",
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  //filtering
  const filteredData = orders.filter((item) => {
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

  if (loading) {
    return (
      <div className="p-4">
        <TopHeading title={"Manage Orders"} />
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

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
