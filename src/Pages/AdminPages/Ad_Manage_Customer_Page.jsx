import React, { useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import FilterHeader from "../../Components/Common/FilterHeader";
import Ad_CustomerTable from "../../Components/AdminComponents/Ad_CustomerTable";

const Ad_Manage_Customer_Page = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const handleBtnClick = (text) => {
    setActiveStatus(text);
  };
  const customerStats = ["All", "Active", "Warned", "Blocked"];
  const dummyCustomers = [
  {
    id: "64b92f0a8d3b5e1c7a9f1234",
    name: "John Doe",
    email: "john.doe@example.com",
    profilePic: "/dummyPic.jpeg",
    joined: "2023-05-10",
    status: "Active",
    phone:"1234278261",
    orders: 15,
    totalSpent: "$320.50",
  },
  {
    id: "64b92f0a8d3b5e1c7a9f5678",
    name: "Alice Smith",
    email: "alice.smith@example.com",
    profilePic: "/user.png",
    joined: "2023-08-21",
    status: "Warned",
    phone:"23145678940",
    orders: 8,
    totalSpent: "$150.00",
  },
  {
    id: "64b92f0a8d3b5e1c7a9f9876",
    name: "Michael Lee",
    email: "michael.lee@example.com",
    profilePic: "/dummyPic.jpeg",
    joined: "2022-12-02",
    status: "Blocked",
    phone:"23145678940",
    orders: 3,
    totalSpent: "$40.99",
  },
  {
    id: "64b92f0a8d3b5e1c7a9f4321",
    name: "Sophia Johnson",
    email: "sophia.j@example.com",
    profilePic: "/user.png",
    joined: "2023-09-12",
    status: "Active",
    phone:"23145678940",
    orders: 20,
    totalSpent: "$540.75",
  },
  {
    id: "64b92f0a8d3b5e1c7a9f8765",
    name: "David Brown",
    email: "david.brown@example.com",
    profilePic: "/dummyPic.jpeg",
    joined: "2024-01-05",
    status: "Warned",
    phone:"23145678940",
    orders: 5,
    totalSpent: "$85.30",
  },
];


  const filteredRestaurants = dummyCustomers.filter((customer) => {
    const matchesStatus =
      activeStatus === "All" || customer.status === activeStatus;

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      customer?.name?.toLowerCase().includes(query) ||
      customer?.phone?.toLowerCase().includes(query) ||
      customer?.joined?.toLowerCase().includes(query) ||
      customer?.email?.toLowerCase().includes(query) 

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
      <Ad_CustomerTable data={filteredRestaurants}/>
    </div>
  );
};

export default Ad_Manage_Customer_Page;
