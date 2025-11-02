import React, { useState } from "react";
import Res_orderHeader from "../../Components/RestaurantComponents/Res_orderHeader";
import Res_orderTable from "../../Components/RestaurantComponents/Res_orderTable";
import { ordersData as initialOrders } from "../../Components/Dummy Data/DummyData";

const Res_Orders_Page = () => {
  const orderStatus = [
    "All",
    "pending",
    "confirmed",
    "preparing",
    "arriving",
    "delivered",
  ];

  const [ordersData, setOrdersData] = useState(initialOrders);
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleBtnClick = (text) => setActiveStatus(text);

  // ✅ This handles filtering dynamically
  const filteredData = ordersData.filter((order) => {
    const matchesStatus =
      activeStatus === "All" || order.status === activeStatus;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      order.customerId?.name?.toLowerCase().includes(query) ||
      order.customerId?.phone?.toLowerCase().includes(query) ||
      order.deliveryAddress?.toLowerCase().includes(query) ||
      order.status?.toLowerCase().includes(query) ||
      order.paymentStatus?.toLowerCase().includes(query) ||
      order.totalPrice?.toString().includes(query) ||
      order.timeAgo?.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  // ✅ Function to handle dropdown status change (passed to child)
  const handleStatusChange = (id, newStatus) => {
    setOrdersData((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status: newStatus.toLowerCase() } : order
      )
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Res_orderHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statuses={orderStatus}
        activeStatus={activeStatus}
        handleBtnClick={handleBtnClick}
      />
      
      <Res_orderTable
        ordersData={filteredData}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Res_Orders_Page;
