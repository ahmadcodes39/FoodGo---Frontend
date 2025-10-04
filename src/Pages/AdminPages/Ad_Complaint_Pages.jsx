import React, { useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import FilterHeader from "../../Components/Common/FilterHeader";
import Ad_ComplaintsTable from "../../Components/AdminComponents/Ad_ComplaintsTable";
import Ad_FilterHeader from "../../Components/AdminComponents/Ad_FilterHeader";

const Ad_Complaint_Pages = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

 const complaints = [
  {
    _id: "64b92f0a8d3b5e1c7a9f1234",
    raisedBy: "John Doe",
    against: "Pizza Hut",
    orderId: "ORD123",
    reason: "Late delivery of order",
    complaintStatus: "Customer",
    status: "Pending",
  },
  {
    _id: "64b92f0a8d3b5e1c7a9f5678",
    raisedBy: "Alice Smith",
    against: "Burger King",
    orderId: "ORD456",
    reason: "Received wrong items",
    complaintStatus: "Customer",
    status: "Resolved",
  },
  {
    _id: "64b92f0a8d3b5e1c7a9f9876",
    raisedBy: "Michael Lee",
    against: "KFC",
    orderId: "ORD789",
    reason: "Food was cold",
    complaintStatus: "Restaurant",
    status: "Pending",
  },
  {
    _id: "64b92f0a8d3b5e1c7a9f1111",
    raisedBy: "Sarah Johnson",
    against: "McDonald's",
    orderId: "ORD101",
    reason: "Overcharged for items",
    complaintStatus: "Customer",
    status: "Pending",
  },
  {
    _id: "64b92f0a8d3b5e1c7a9f2222",
    raisedBy: "David Kim",
    against: "Domino's Pizza",
    orderId: "ORD202",
    reason: "Rude delivery person",
    complaintStatus: "Customer",
    status: "Resolved",
  },
  {
    _id: "64b92f0a8d3b5e1c7a9f3333",
    raisedBy: "Emily Brown",
    against: "Subway",
    orderId: "ORD303",
    reason: "Order was cancelled without notice",
    complaintStatus: "Customer",
    status: "Pending",
  },
  {
    _id: "64b92f0a8d3b5e1c7a9f4444",
    raisedBy: "Tom Wilson",
    against: "Taco Bell",
    orderId: "ORD404",
    reason: "Packaging was damaged",
    complaintStatus: "Restaurant",
    status: "Resolved",
  },
  {
    _id: "64b92f0a8d3b5e1c7a9f5555",
    raisedBy: "Sophia Martinez",
    against: "Starbucks",
    orderId: "ORD505",
    reason: "Items missing from order",
    complaintStatus: "Customer",
    status: "Pending",
  },
  {
    _id: "64b92f0a8d3b5e1c7a9f6666",
    raisedBy: "Chris Evans",
    against: "Dunkin Donuts",
    orderId: "ORD606",
    reason: "Poor food quality",
    complaintStatus: "Customer",
    status: "Resolved",
  },
  {
    _id: "64b92f0a8d3b5e1c7a9f7777",
    raisedBy: "Olivia Taylor",
    against: "Five Guys",
    orderId: "ORD707",
    reason: "Wrong customization in order",
    complaintStatus: "Customer",
    status: "Pending",
  },
];

  const handleBtnClick = (text) => {
    setActiveStatus(text);
  };

  // filtering
  const filteredData = complaints.filter((item) => {
    const matchesSearch =
      item.reason?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.raisedBy?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.against?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      activeStatus === "All" || item.status === activeStatus;

    const matchesRole =
      selectedRole === "All" || item.complaintStatus === selectedRole; 

    return matchesSearch && matchesStatus && matchesRole;
  });

  const complaintStats = ["All", "Pending", "Resolved"];

  return (
    <div className="p-4">
      <TopHeading title={"Complaints Management"} />
      <Ad_FilterHeader
        activeStatus={activeStatus}
        onBtnClick={handleBtnClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statuses={complaintStats}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
      <Ad_ComplaintsTable complaint={filteredData} />
    </div>
  );
};

export default Ad_Complaint_Pages;
