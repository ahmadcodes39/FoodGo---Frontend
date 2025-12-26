import React, { useEffect, useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import Res_AnalyticsCards from "../../Components/RestaurantComponents/Cards/Res_AnalyticsCards";
import Res_AnalyticsSection from "../../Components/RestaurantComponents/Res_AnalyticsSection";
import Res_TopSellingItems from "../../Components/RestaurantComponents/Res_topSellingItems";
import Res_leastSellingItems from "../../Components/RestaurantComponents/Res_leastSellingItems";
import Res_RecentOrderCard from "../../Components/RestaurantComponents/Cards/Res_RecentOrdersCards";
import { useParams } from "react-router-dom";
import { getCompleteAnalytics, getRestaurantOrders } from "../../api/restaurantApi";
import toast from "react-hot-toast";
import { DollarSign, ShoppingCart, BarChart3, CheckCircle, Users, RotateCcw } from "lucide-react";
import Loading from "../../Components/LoadingSpinner/Loading";

const Res_Analytics_Page = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const { id } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [revenueDataMap, setRevenueDataMap] = useState({
    weekly: [],
    monthly: [],
    yearly: [],
  });
  const [orderDataMap, setOrderDataMap] = useState({
    weekly: [],
    monthly: [],
    yearly: [],
  });
  const [topSellingData, setTopSellingData] = useState([]);
  const [leastSellingData, setLeastSellingData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await getCompleteAnalytics(id, selectedPeriod.toLowerCase());
        const data = response.data;
        if (data.success) {
          setAnalytics(data.analytics);
          setRevenueDataMap(prev => ({ ...prev, [selectedPeriod.toLowerCase()]: data.revenueChart || [] }));
          setOrderDataMap(prev => ({ ...prev, [selectedPeriod.toLowerCase()]: data.orderGrowthChart || [] }));
          setTopSellingData(data.sellingItems?.top5 || []);
          setLeastSellingData(data.sellingItems?.lowest5 || []);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [id, selectedPeriod]);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsOrdersLoading(true);
      try {
        const res = await getRestaurantOrders(id);
        if (res.data.success) {
          setOrders(res.data.orders.slice(0, 5));
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [id]);

  const mainStats = analytics ? [
    {
      title: "Total Revenue",
      value: `Rs. ${analytics.totalRevenue.toFixed(2)}`,
      icon: <DollarSign size={20} className="text-white" />,
      bg: "bg-green-50",
      iconBg: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: analytics.totalOrders,
      icon: <ShoppingCart size={20} className="text-white" />,
      bg: "bg-blue-50",
      iconBg: "bg-blue-500",
    },
    {
      title: "Average Revenue",
      value: `Rs. ${analytics.averageRevenue.toFixed(2)}`,
      icon: <BarChart3 size={20} className="text-white" />,
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-500",
    },
    {
      title: "Delivered Orders",
      value: analytics.deliveredOrders,
      icon: <CheckCircle size={20} className="text-white" />,
      bg: "bg-purple-50",
      iconBg: "bg-purple-500",
    },
  ] : [];

  const sideStats = analytics ? [
    {
      title: "Total Customers",
      value: analytics.totalCustomers,
      icon: <Users size={20} className="text-white" />,
      bg: "bg-indigo-50",
      iconBg: "bg-indigo-500",
    },
    {
      title: "Confirmed Orders",
      value: analytics.confirmedOrders,
      icon: <RotateCcw size={20} className="text-white" />,
      bg: "bg-pink-50",
      iconBg: "bg-pink-500",
    },
  ] : [];

  return (
    <div className="p-4">
      {!analytics || isOrdersLoading ? (
        <Loading />
      ) : (
        <>
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
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
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
            isLoading={isLoading}
          />
          <Res_AnalyticsSection
            title="Orders Overview"
            selectedPeriod={selectedPeriod}
            dataMap={orderDataMap}
            dataKey="orders"
            lineColor="#22c55e"
            isLoading={isLoading}
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
            {orders.length > 0 ? (
              orders.map((order) => (
                <Res_RecentOrderCard key={order._id} order={order} />
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">No orders found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Res_Analytics_Page;
