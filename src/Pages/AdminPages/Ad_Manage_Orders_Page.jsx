import React, { useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import FilterHeader from "../../Components/Common/FilterHeader";
import Ad_OrdersTable from "../../Components/AdminComponents/Ad_OrdersTable";

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
    "on the way",
    "delivered",
  ];
  const dummyOrders = [
    {
      id: "ORD123456",
      name: "Ali Khan",
      email: "ali.khan@example.com",
      restaurantName: "Pizza Mania",
      items: 3,
      total: 1200,
      date: "2025-09-30",
      time: "12:45 PM",
      status: "Pending",
    },
    {
      id: "ORD987654",
      name: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      restaurantName: "Burger Hub",
      items: 2,
      total: 850,
      date: "2025-09-29",
      time: "08:15 PM",
      status: "Preparing",
    },
    {
      id: "ORD567890",
      name: "Usman Ali",
      email: "usman.ali@example.com",
      restaurantName: "Biryani Point",
      items: 4,
      total: 1450,
      date: "2025-09-28",
      time: "02:30 PM",
      status: "Arriving",
    },
    {
      id: "ORD246810",
      name: "Maryam Fatima",
      email: "maryam.fatima@example.com",
      restaurantName: "Kebab Junction",
      items: 1,
      total: 500,
      date: "2025-09-27",
      time: "07:00 PM",
      status: "Delivered",
    },
  ];

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
      <Ad_OrdersTable data={dummyOrders}/>
    </div>
  );
};

export default Ad_Manage_Orders_Page;
