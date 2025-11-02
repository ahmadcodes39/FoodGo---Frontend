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
import { complaints } from "../../Components/Dummy Data/DummyData";
import Ad_KpiCards from "../../Components/AdminComponents/Cards/Ad_kpiCards";
import Ad_actionCards from "../../Components/AdminComponents/Cards/Ad_actionCards";
import { Link, useNavigate } from "react-router-dom";
import ShowLineChart from "../../Components/Common/Charts/ShowLineChart";
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


  return (
    <div className="py-2 px-4 flex flex-col bg-background-light">
      <div className="flex items-center justify-between">
        <TopHeading title={"Admin Dashboard"} />
        <Link to={"/admin/login"}>
        <button className="btn btn-sm sm:btn-md  bg-redBtn rounded-md text-white hover:bg-red-600 text-sm flex gap-2">
          <LogOutIcon size={15} className="hidden sm:inline" /> Logout
        </button>
        </Link>
      </div>
      <div className="bg-gray-100 mt-5 p-4 min-w-full shadow-md rounded-md">
        <p className="text-xl font-semibold">Welcome,</p>
        <p className="text-gray-500 text-sm">
          Her's what's happening with your app.
        </p>
      </div>
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {generalStats.map((stat, index) => (
          <Ad_KpiCards key={index} {...stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5">
        {actionCard.map((stat, index) => (
          <Ad_actionCards
            key={index}
            {...stat}
            handleBtnClick={() => handleActionClick(stat.action)}
          />
        ))}
      </div>
      <div className="mt-10 flex md:flex-row flex-col md:justify-between md:items-center p-4">
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
        <ShowLineChart data={dataMap[activeTab]} lineColor={"#f97316"}/>
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
