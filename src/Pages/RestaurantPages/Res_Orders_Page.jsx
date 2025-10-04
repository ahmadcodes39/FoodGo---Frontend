import React from "react";
import Res_orderHeader from "../../Components/RestaurantComponents/Res_orderHeader";
import Res_orderTable from "../../Components/RestaurantComponents/Res_orderTable";

const Res_Orders_Page = () => {
 const dummyOrderData = [
  {
    id: "#1001",
    customer: "John Doe",
    phone: "12896756145",
    address: "Main city 123 Lahore",
    total: 1200,
    status: "Pending",
    timeAgo:"10 min ago"
  },
  {
    id: "#1002",
    customer: "Ali Khan",
    phone: "923004567890",
    address: "DHA Phase 5, Karachi",
    total: 2500,
    status: "Preparing",
    timeAgo:"10 min ago"
  },
  {
    id: "#1003",
    customer: "Sarah Ahmed",
    phone: "923123456789",
    address: "Johar Town, Lahore",
    total: 1800,
    status: "On the way",
    timeAgo:"10 min ago"
  },
  {
    id: "#1004",
    customer: "Ahmed Raza",
    phone: "923009876543",
    address: "Gulberg, Islamabad",
    total: 3200,
    status: "Delivered",
    timeAgo:"10 min ago"
  },
];

  return (
    <div className="flex flex-col gap-6">
      <Res_orderHeader />
      <Res_orderTable dummyOrderData={dummyOrderData}/>
    </div>
  );
};

export default Res_Orders_Page;
