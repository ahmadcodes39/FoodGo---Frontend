import React, { useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import {
  LogOutIcon,
  Users,
  Store,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  PackageIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Ad_KpiCards from "../../Components/AdminComponents/Cards/Ad_kpiCards";
import Ad_actionCards from "../../Components/AdminComponents/Cards/Ad_actionCards";
import { useNavigate } from "react-router-dom";
import Ad_revenueCharts from "../../Components/AdminComponents/Charts/Ad_revenueCharts";
import QuickActions from "../../Components/Common/QuickActions";
import Ad_ComplaintsTable from "../../Components/AdminComponents/Ad_ComplaintsTable";

const Ad_Dashboard_Page = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Weekly");
  const tabs = ["Weekly", "Monthly", "Yearly"];
  const handleActionClick = (action) => {
    if (action === "reviewRestaurants") {
      navigate("/admin/restaurants");
      console.log("Navigate to restaurant approval page");
    } else if (action === "monitorOrders") {
      navigate("/admin/orders");
      console.log("Navigate to active orders page");
    }
  };

  const generalStats = [
    {
      title: "Total Customers",
      value: 42,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      title: "Total Restaurants",
      value: 15,
      icon: Store,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      title: "Total Orders",
      value: 345,
      icon: ShoppingCart,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      title: "Total Revenue",
      value: "$23.04K",
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      title: "Pending Complaints",
      value: "12",
      icon: AlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
  ];
  const actionCard = [
    {
      icon: Store,
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-100",
      title: "Restaurants Approvals",
      description: "12 restaurants waiting for approval",
      btnText: "Review",
      action: "reviewRestaurants",
    },
    {
      icon: PackageIcon,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
      title: "Active Orders",
      description: "37 orders in progress",
      btnText: "Monitor",
      action: "monitorOrders",
    },
  ];
  // Weekly Data (7 days)
  const weeklyData = [
    { name: "Mon", revenue: 4200 },
    { name: "Tue", revenue: 3100 },
    { name: "Wed", revenue: 5400 },
    { name: "Thu", revenue: 2800 },
    { name: "Fri", revenue: 3900 },
    { name: "Sat", revenue: 2500 },
    { name: "Sun", revenue: 4600 },
  ];
  // Monthly Data (4 weeks)
  const monthlyData = [
    { name: "Week 1", revenue: 15400 },
    { name: "Week 2", revenue: 18900 },
    { name: "Week 3", revenue: 17600 },
    { name: "Week 4", revenue: 20100 },
  ];
  // Yearly Data (12 months)
  const yearlyData = [
    { name: "Jan", revenue: 62000 },
    { name: "Feb", revenue: 58000 },
    { name: "Mar", revenue: 73000 },
    { name: "Apr", revenue: 69000 },
    { name: "May", revenue: 81000 },
    { name: "Jun", revenue: 75000 },
    { name: "Jul", revenue: 87000 },
    { name: "Aug", revenue: 92000 },
    { name: "Sep", revenue: 86000 },
    { name: "Oct", revenue: 94000 },
    { name: "Nov", revenue: 99000 },
    { name: "Dec", revenue: 102000 },
  ];
  const dataMap = {
    Weekly: weeklyData,
    Monthly: monthlyData,
    Yearly: yearlyData,
  };

  const actions = [
    {
      title: "Manage Users",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
      link: "/admin/customers",
    },
    {
      title: "Manage Restaurants",
      icon: Store,
      color: "bg-orange-100 text-orange-600",
      link: "/admin/restaurants",
    },
    {
      title: "View Orders",
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600",
      link: "/admin/orders",
    },
    {
      title: "Complaints Section",
      icon: AlertTriangle,
      color: "bg-red-100 text-red-600",
      link: "/admin/complaints",
    },
  ];
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


  return (
    <div className="p-4 flex flex-col  bg-background-light">
      <div className="flex items-center justify-between">
        <TopHeading title={"Admin Dashboard"} />
        <button className="btn btn-sm bg-redBtn rounded-md text-white hover:bg-red-600 text-sm flex gap-2">
          <LogOutIcon size={15} /> Logout
        </button>
      </div>
      <div className="bg-gray-100 p-4 min-w-full shadow-md rounded-md">
        <p className="text-xl font-semibold">Welcome,</p>
        <p className="text-gray-500 text-sm">
          Her's what's happening with your app.
        </p>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {generalStats.map((stat, index) => (
          <Ad_KpiCards key={index} {...stat} />
        ))}
      </div>
      <div className="grid md:grid-cols-2 mt-5 gap-5">
        {actionCard.map((stat, index) => (
          <Ad_actionCards
            key={index}
            {...stat}
            handleBtnClick={() => handleActionClick(stat.action)}
          />
        ))}
      </div>
      <div className="mt-10 flex justify-between items-center p-4">
        <TopHeading title={"Revenue Overview"} />
        <div role="tablist" className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors 
              ${
                activeTab === tab
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=""
      >
        <Ad_revenueCharts data={dataMap[activeTab]} />
      </motion.div>
      <div className="mt-5">
        <TopHeading title={"Quick Actions"} />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6 mt-3">
          <QuickActions actions={actions} />
        </div>
      </div>
      <div className="mt-5">
        <TopHeading title={"Recent Complaints"}/>
        <Ad_ComplaintsTable complaint={complaints.slice(0,5)}/>
      </div>
    </div>
  );
};

export default Ad_Dashboard_Page;
