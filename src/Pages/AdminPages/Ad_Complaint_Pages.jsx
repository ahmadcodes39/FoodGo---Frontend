import React, { useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import FilterHeader from "../../Components/Common/FilterHeader";
import Ad_ComplaintsTable from "../../Components/AdminComponents/Ad_ComplaintsTable";
import Ad_FilterHeader from "../../Components/AdminComponents/Ad_FilterHeader";
import { complaints } from "../../Components/Dummy Data/DummyData";
const Ad_Complaint_Pages = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  const handleBtnClick = (text) => {
    setActiveStatus(text);
  };

  // filtering 
const filteredData = complaints.filter((item) => {
  const query = searchQuery.toLowerCase();

  const matchesSearch =
    item.reason?.toLowerCase().includes(query) ||
    item.raisedBy?.name?.toLowerCase().includes(query) ||
    item.raisedBy?.email?.toLowerCase().includes(query) ||
    item.againstRestaurant?.name?.toLowerCase().includes(query) ||
    item.againstUser?.name?.toLowerCase().includes(query) ||
    item.orderId?._id?.toLowerCase().includes(query) ||
    item.orderId?.paymentMethod?.toLowerCase().includes(query) ||
    item.orderId?.paymentStatus?.toLowerCase().includes(query) ||
    new Date(item.createdAt)
      .toLocaleDateString("en-GB") // Format: DD/MM/YYYY
      .toLowerCase()
      .includes(query);

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
