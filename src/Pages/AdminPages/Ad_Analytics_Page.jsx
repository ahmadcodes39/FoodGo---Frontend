import React, { useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import Ad_AnalyticsCard from "../../Components/AdminComponents/Cards/Ad_AnalyticsCard";
import ShowLineChart from "../../Components/Common/Charts/ShowLineChart";

import {
  admin_analyticsData,
  admin_yearlyRevenueData,
  admin_weeklyRevenueData,
  admin_monthlyRevenueData,
  admin_yearlyOrdersData,
  admin_weeklyOrdersData,
  admin_monthlyOrdersData,
  topRestaurants,
} from "../../Components/Dummy Data/DummyData";
import Ad_ShowStackedAreaChart from "../../Components/AdminComponents/Charts/Ad_ShowStackedAreaChart";
import Ad_TopRestaurantTable from "../../Components/AdminComponents/Ad_TopRestaurantTable";
import Ad_ShowBarChart from "../../Components/AdminComponents/Charts/Ad_ShowBarChart";
import Ad_ShowPieChart from "../../Components/AdminComponents/Charts/Ad_ShowPieChart";
import Ad_ShowCircleChart from "../../Components/AdminComponents/Charts/Ad_ShowCircleChart";

const Ad_Analytics_Page = () => {
  const [activeFilter, setActiveFilter] = useState("Weekly");

  const OrdersdataMap = {
    Weekly: admin_weeklyOrdersData,
    Monthly: admin_monthlyOrdersData,
    Yearly: admin_yearlyOrdersData,
  };

  const RevenueDataMap = {
    Weekly: admin_weeklyRevenueData,
    Monthly: admin_monthlyRevenueData,
    Yearly: admin_yearlyRevenueData,
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between md:flex-row flex-col">
        <div>
          <TopHeading title="Business Analytics" />
          <p className="text-gray-500 text-xs pl-2 mb-3">
            Track your business performance
          </p>
        </div>

        {/* ✅ Single Dropdown */}
        <select
          className="select select-bordered w-full max-w-xs"
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {admin_analyticsData.map((stat) => (
          <Ad_AnalyticsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="mt-10">
        <TopHeading title="Orders Growth" />
        <p className="text-gray-500 text-xs pl-2 mb-3">
          Track your orders growth
        </p>

        {/* ✅ Dynamic data based on filter */}
        <ShowLineChart
          data={OrdersdataMap[activeFilter]}
          dataKey="orders"
          lineColor="#3b82f6"
        />
      </div>

      <div className="mt-10">
        <TopHeading title="Revenue Growth" />
        <p className="text-gray-500 text-xs pl-2 mb-3">
          Current vs previous period comparison
        </p>
        <Ad_ShowStackedAreaChart data={RevenueDataMap[activeFilter]} />
      </div>

      <div className="mt-10">
        <TopHeading title={"Top Restaurants"} />
        <p className="text-gray-500 text-xs pl-2 mb-3">
          Performance leaderboard
        </p>
        <Ad_TopRestaurantTable topRestaurants={topRestaurants} />
      </div>

      <div className="mt-10">
        <TopHeading title={"Restaurants Revenue"} />
        <p className="text-gray-500 text-xs pl-2 mb-3">
          Performance leaderboard
        </p>
        <Ad_ShowBarChart />
      </div>

      <div className="mt-10 grid md:grid-cols-2 grid-cols-1 gap-6">
        <div>
          <TopHeading title={"Order Status Distribution"} />
          <p className="text-gray-500 text-xs pl-2 mb-10">
            Current order breakdown
          </p>
          <Ad_ShowPieChart />
        </div>
       
        <div>
          <TopHeading title={"Customer Activity"} />
          <p className="text-gray-500 text-xs pl-2 mb-10">
            New vs returning customers
          </p>
          <Ad_ShowCircleChart />
        </div>
       
      </div>
    </div>
  );
};

export default Ad_Analytics_Page;
