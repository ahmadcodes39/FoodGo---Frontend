import React, { useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import FilterHeader from "../../Components/Common/FilterHeader";
import Ad_RestaurantTable from "../../Components/AdminComponents/Ad_RestaurantTable";

const Ad_Manage_Restaurant_Page = () => {
  const RestaurantStatus = ["All", "Pending", "Approved", "Rejected"];
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleBtnClick = (text) => {
    setActiveStatus(text);
  };

  const restaurantsData = [
    {
      id: 1,
      logo: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=100&h=100&fit=crop",
      name: "Bella Italia",
      cusisine: ["Italian", "Pizza", "Pasta"],
      ownerId: { name: "Mario Rossi", email: "mario.rossi@example.com" },
      status: "Pending",
      orders: 150,
      revenue: "$12,500",
    },
    {
      id: 2,
      logo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop",
      name: "Tokyo Sushi",
      cusisine: ["Japanese", "Sushi", "Ramen"],
      ownerId: { name: "Aiko Tanaka", email: "aiko.tanaka@example.com" },
      status: "Approved",
      orders: 230,
      revenue: "$18,900",
    },
    {
      id: 3,
      logo: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop",
      name: "Burger Hub",
      cusisine: ["American", "Fast Food"],
      ownerId: { name: "John Smith", email: "john.smith@example.com" },
      status: "Rejected",
      orders: 95,
      revenue: "$7,200",
    },
    {
      id: 4,
      logo: "/biryani.jpeg",
      name: "Green Bowl",
      cusisine: ["Vegetarian", "Healthy", "Salads"],
      ownerId: { name: "Priya Sharma", email: "priya.sharma@example.com" },
      status: "Approved",
      orders: 310,
      revenue: "$22,300",
    },
    {
      id: 5,
      logo: "/pasta.jpeg",
      name: "Texas BBQ",
      cusisine: ["BBQ", "Grill", "American"],
      ownerId: { name: "Robert Brown", email: "robert.brown@example.com" },
      status: "Pending",
      orders: 120,
      revenue: "$10,800",
    },
  ];

  // ✅ Apply filters here
  const filteredRestaurants = restaurantsData.filter((restaurant) => {
    const matchesStatus =
      activeStatus === "All" || restaurant.status === activeStatus;

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      restaurant?.name?.toLowerCase().includes(query) ||
      restaurant?.ownerId?.name?.toLowerCase().includes(query) ||
      restaurant?.ownerId?.email?.toLowerCase().includes(query) ||
      restaurant?.cusisine?.some((c) => c?.toLowerCase().includes(query));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <TopHeading title={"Manage Restaurant"} />
      </div>
      <FilterHeader
        activeStatus={activeStatus}
        onBtnClick={handleBtnClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statuses={RestaurantStatus}
      />
      <Ad_RestaurantTable data={filteredRestaurants} />
    </div>
  );
};

export default Ad_Manage_Restaurant_Page;
