import React, { useState, useEffect } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import Ad_AnalyticsCard from "../../Components/AdminComponents/Cards/Ad_AnalyticsCard";
import ShowLineChart from "../../Components/Common/Charts/ShowLineChart";
import Ad_ShowStackedAreaChart from "../../Components/AdminComponents/Charts/Ad_ShowStackedAreaChart";
import Ad_TopRestaurantTable from "../../Components/AdminComponents/Ad_TopRestaurantTable";
import Ad_ShowBarChart from "../../Components/AdminComponents/Charts/Ad_ShowBarChart";
import Ad_ShowPieChart from "../../Components/AdminComponents/Charts/Ad_ShowPieChart";
import Ad_ShowCircleChart from "../../Components/AdminComponents/Charts/Ad_ShowCircleChart";
import Loading from "../../Components/LoadingSpinner/Loading";
import { getBusinessAnalytics } from "../../api/adminApi";
import { Users, UtensilsCrossed, ShoppingBag, DollarSign, Clock } from "lucide-react";

const Ad_Analytics_Page = () => {
  const [activeFilter, setActiveFilter] = useState("weekly");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [activeFilter]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBusinessAnalytics(activeFilter);
      if (response.data.success) {
        setAnalyticsData(response.data);
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setError("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  // Prepare analytics cards data
  const getAnalyticsCardsData = () => {
    if (!analyticsData) return [];
    
    const { summary } = analyticsData;
    return [
      {
        title: "Total Customers",
        amount: summary?.totalCustomer?.toLocaleString() || "0",
        icon: <Users size={22} />,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-700",
      },
      {
        title: "Total Restaurants",
        amount: summary?.totalRestaurants?.toLocaleString() || "0",
        icon: <UtensilsCrossed size={22} />,
        iconBg: "bg-green-100",
        iconColor: "text-green-700",
      },
      {
        title: "New Customers",
        amount: summary?.newCustomers?.toLocaleString() || "0",
        icon: <Users size={22} />,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-700",
      },
      {
        title: "Admin Revenue",
        amount: `$${summary?.adminRevenueCurrent?.toFixed(2) || "0"}`,
        icon: <DollarSign size={22} />,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-700",
      },
      {
        title: "Pending Restaurants",
        amount: summary?.totalPendingRestaurants?.toLocaleString() || "0",
        icon: <Clock size={22} />,
        iconBg: "bg-red-100",
        iconColor: "text-red-700",
      },
    ];
  };

  // Prepare order status data from todayOrders
  const getOrderStatusData = () => {
    if (!analyticsData?.todayOrders) return [];
    
    const { todayOrders } = analyticsData;
    return [
      { name: "Pending", value: todayOrders.pending || 0 },
      { name: "Confirmed", value: todayOrders.confirmed || 0 },
      { name: "Preparing", value: todayOrders.preparing || 0 },
      { name: "Arriving", value: todayOrders.arriving || 0 },
      { name: "Delivered", value: todayOrders.delivered || 0 },
    ];
  };

  // Prepare customer activity data
  const getCustomerActivityData = () => {
    if (!analyticsData?.summary) return [];
    
    const { summary } = analyticsData;
    return [
      { 
        name: "New Customers", 
        value: summary.newCustomers || 0,
        percentage: summary.newCustomerPercentage || 0
      },
      { 
        name: "Returning", 
        value: summary.returningCustomers || 0,
        percentage: summary.returningCustomerPercentage || 0
      },
    ];
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-4 flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button 
            onClick={fetchAnalytics}
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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

        {/* Filter Dropdown */}
        <select
          className="select select-bordered w-full max-w-xs"
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {getAnalyticsCardsData().map((stat) => (
          <Ad_AnalyticsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="mt-10">
        <TopHeading title="Orders Growth" />
        <p className="text-gray-500 text-xs pl-2 mb-3">
          Track your orders growth
        </p>
        <ShowLineChart
          data={analyticsData?.orderGrowth || []}
          dataKey="orders"
          lineColor="#3b82f6"
        />
      </div>

      <div className="mt-10">
        <TopHeading title="Revenue Growth" />
        <p className="text-gray-500 text-xs pl-2 mb-3">
          Current vs previous period comparison
        </p>
        <Ad_ShowStackedAreaChart data={analyticsData?.revenueGrowth || []} />
      </div>

      <div className="mt-10">
        <TopHeading title={"Top Restaurants"} />
        <p className="text-gray-500 text-xs pl-2 mb-3">
          Performance leaderboard
        </p>
        <Ad_TopRestaurantTable topRestaurants={analyticsData?.topRestaurants || []} />
      </div>

      <div className="mt-10">
        <TopHeading title={"Restaurants Revenue"} />
        <p className="text-gray-500 text-xs pl-2 mb-3">
          Performance leaderboard
        </p>
        <Ad_ShowBarChart data={analyticsData?.restaurantsRevenue || []} />
      </div>

      <div className="mt-10 grid md:grid-cols-2 grid-cols-1 gap-6">
        <div>
          <TopHeading title={"Order Status Distribution"} />
          <p className="text-gray-500 text-xs pl-2 mb-10">
            Current order breakdown
          </p>
          <Ad_ShowPieChart data={getOrderStatusData()} />
        </div>
       
        <div>
          <TopHeading title={"Customer Activity"} />
          <p className="text-gray-500 text-xs pl-2 mb-10">
            New vs returning customers
          </p>
          <Ad_ShowCircleChart data={getCustomerActivityData()} />
        </div>
       
      </div>
    </div>
  );
};

export default Ad_Analytics_Page;
