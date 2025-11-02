import React from "react";
import Res_dashboardHeader from "../../Components/RestaurantComponents/Res_dashboardHeader";
import {
  Package,
  DollarSign,
  TrendingUp,
  Users,
  PlusCircle,
  ClipboardList,
} from "lucide-react";
import { motion } from "framer-motion";
import Res_KpiCards from "../../Components/RestaurantComponents/Cards/Res_KpiCards";
import Res_orderStatsCards from "../../Components/RestaurantComponents/Cards/Res_orderStatsCards";
import Res_orderTable from "../../Components/RestaurantComponents/Res_orderTable";
import QuickActions from "../../Components/Common/QuickActions";
import { useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import { ordersData,weeklyData,monthlyData,yearlyData } from "../../Components/Dummy Data/DummyData";
import ShowLineChart from "../../Components/Common/Charts/ShowLineChart";
import Res_menuItemModal from "../../Components/RestaurantComponents/Models/Res_menuItemModel";

const Res_Dashboard_Page = () => {
  const [activeTab, setActiveTab] = useState("Weekly");
  const tabs = ["Weekly", "Monthly", "Yearly"];

  const generalStats = [
    {
      title: "Today's Orders",
      value: 15,
      icon: Package,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      title: "Today's Sales",
      value: "$345.67",
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      title: "Average Order",
      value: "$23.04",
      icon: TrendingUp,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      title: "Customers",
      value: 42,
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
    },
  ];
  const orderStats = [
    {
      amount: 4,
      title: "Pending",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      amount: 3,
      title: "Confirmed",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      amount: 14,
      title: "Preparing",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
    {
      amount: 9,
      title: "On the way",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      amount: 42,
      title: "Delivered",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  const actions = [
    {
      title: "Add New Menu Item",
      icon: PlusCircle,
      color: "bg-green-100 text-green-600",
      modalId: "menu_modal", 
    },
    {
      title: "View All Orders",
      icon: ClipboardList,
      color: "bg-blue-100 text-blue-600",
      link: "/restaurant/orders-page",
    },
  ];

  
  const dataMap = {
    Weekly: weeklyData,
    Monthly: monthlyData,
    Yearly: yearlyData,
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      <Res_dashboardHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
        {generalStats.map((stat, index) => (
          <Res_KpiCards key={index} {...stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
        <div className="lg:col-span-2">
          <h2 className="pl-2 font-bold text-text-primary text-xl mb-4">
            Order Status
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {orderStats.map((stat, index) => (
              <Res_orderStatsCards key={index} {...stat} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <h2 className="mt-2 pl-2 font-bold text-text-primary text-xl mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <QuickActions actions={actions} />
          </div>
        </div>
      </div>
      <div className="mt-10 lg:flex-row flex-col  justify-between items-center p-4">
        <TopHeading title={"Revenue Overview"} />
        <div role="tablist" className="lg:mt-0 mt-5 flex gap-2 bg-gray-100 p-1 rounded-lg">
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
        <ShowLineChart data={dataMap[activeTab]} lineColor={"#f97316"} />
      </motion.div>
      <div>
        <h2 className=" pl-2 font-bold text-text-primary text-xl mb-4">
          Recent Orders
        </h2>
        <Res_orderTable ordersData={ordersData.slice(0, 5)} />
      </div>
      <Res_menuItemModal />
    </div>
  );
};

export default Res_Dashboard_Page;
