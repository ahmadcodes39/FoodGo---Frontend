import React, { useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import Res_AnalyticsCards from "../../Components/RestaurantComponents/Cards/Res_AnalyticsCards";
import {
  mainStats,
  sideStats,
  weeklyData,
  monthlyData,
  yearlyData,
  weeklyOrdersData,
  monthlyOrdersData,
  yearlyOrdersData,
  topSellingData,
  leastSellingData,
  ordersData,
} from "../../Components/Dummy Data/DummyData";
import Res_AnalyticsSection from "../../Components/RestaurantComponents/Res_AnalyticsSection";
import Res_TopSellingItems from "../../Components/RestaurantComponents/Res_topSellingItems";
import Res_leastSellingItems from "../../Components/RestaurantComponents/Res_leastSellingItems";
import Res_RecentOrderCard from "../../Components/RestaurantComponents/Cards/Res_RecentOrdersCards";

const Res_Analytics_Page = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

  const revenueDataMap = {
    Weekly: weeklyData,
    Monthly: monthlyData,
    Yearly: yearlyData,
  };

  const orderDataMap = {
    Weekly: weeklyOrdersData,
    Monthly: monthlyOrdersData,
    Yearly: yearlyOrdersData,
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex md:flex-row flex-col justify-between items-center">
        <div>
          <TopHeading title={"Restaurant Analytics"} />
          <p className="text-gray-500 text-xs pl-2 mb-3">
            Track your restaurant performance
          </p>
        </div>
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mainStats.slice(0, 2).map((stat, index) => (
              <Res_AnalyticsCards key={index} {...stat} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mainStats.slice(2, 4).map((stat, index) => (
              <Res_AnalyticsCards key={index} {...stat} />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-1 grid grid-cols-1 gap-4">
          {sideStats.map((stat, index) => (
            <Res_AnalyticsCards key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Dynamic Chart Sections */}
      <Res_AnalyticsSection
        title="Revenue Overview"
        selectedPeriod={selectedPeriod}
        dataMap={revenueDataMap}
        dataKey="revenue"
        lineColor="#f97316"
      />
      <Res_AnalyticsSection
        title="Orders Overview"
        selectedPeriod={selectedPeriod}
        dataMap={orderDataMap}
        dataKey="orders"
        lineColor="#22c55e"
      />

      {/* Top and Least Selling */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Res_TopSellingItems title="Top Selling Items" items={topSellingData} />
        <Res_leastSellingItems
          title="Least Selling Items"
          items={leastSellingData}
        />
      </div>

      {/* Recent Orders */}
      <div className="p-4 bg-gray-50 rounded-xl mt-8">
        <TopHeading title={"Recent Orders"} />
        {ordersData.length > 0 ? (
          ordersData.slice(0, 5).map((order) => (
            <Res_RecentOrderCard key={order._id} order={order} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Res_Analytics_Page;
