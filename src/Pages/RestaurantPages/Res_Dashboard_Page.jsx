import React, { useContext, useEffect, useState } from "react";
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
import TopHeading from "../../Components/Common/TopHeading";
import ShowLineChart from "../../Components/Common/Charts/ShowLineChart";
import Res_menuItemModal from "../../Components/RestaurantComponents/Models/Res_menuItemModel";
import {
  getDashboardData,
  getRestaurantOrders,
  getDashboardAnalytics,
} from "../../api/restaurantApi";
import Loading from "../../Components/LoadingSpinner/Loading";
import { AuthContext } from "../../App Global States/userAuthContext";
import { useParams } from "react-router-dom";

const Res_Dashboard_Page = () => {
  const { user } = useContext(AuthContext);
  const { id: restaurantId } = useParams();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [activeTab, setActiveTab] = useState("Weekly");

  const tabs = ["Weekly", "Monthly", "Yearly"];
  const [chartLoading, setChartLoading] = useState(false);

  const orderStats = [
    {
      amount: dashboardData?.ordersByStatus?.pending ?? 0,
      title: "Pending",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      amount: dashboardData?.ordersByStatus?.confirmed ?? 0,
      title: "Confirmed",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      amount: dashboardData?.ordersByStatus?.preparing ?? 0,
      title: "Preparing",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
    {
      amount: dashboardData?.ordersByStatus?.arriving ?? 0,
      title: "On the way",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      amount: dashboardData?.ordersByStatus?.delivered ?? 0,
      title: "Delivered",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  /* ================= INITIAL DASHBOARD DATA ================= */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const statsRes = await getDashboardData(restaurantId);
        if (statsRes.data.success) {
          setDashboardData(statsRes.data);
        }

        const ordersRes = await getRestaurantOrders(restaurantId);
        if (ordersRes.data.success) {
          const sortedOrders = ordersRes.data.orders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
          setRecentOrders(sortedOrders);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId && user?._id) fetchDashboard();
  }, [restaurantId, user]);

  /* ================= ANALYTICS (CHART DATA) ================= */
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setChartLoading(true); 

        const range = activeTab.toLowerCase();
        const res = await getDashboardAnalytics(restaurantId, range);

        if (res.data.success) {
          const formatted = res.data.data.map((item) => ({
            label: item.label,
            revenue: item.revenue,
          }));
          setChartData(formatted);
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error("Analytics error:", error);
        setChartData([]);
      } finally {
        setChartLoading(false); 
      }
    };

    if (restaurantId) fetchAnalytics();
  }, [activeTab, restaurantId]);

  if (loading || !dashboardData) return <Loading />;

  /* ================= KPI CARDS ================= */
  const generalStats = [
    {
      title: "Today's Orders",
      value: dashboardData.totalOrders,
      icon: Package,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      title: "Today's Sales",
      value: `Rs. ${dashboardData.totalRevenue.toFixed(0)}`,
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      title: "Average Order",
      value: `Rs. ${dashboardData.averageRevenue.toFixed(0)}`,
      icon: TrendingUp,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      title: "Customers",
      value: dashboardData.totalCustomers,
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
    },
  ];

  // /* ================= ORDER STATUS ================= */
  // const orderStats = Object.entries(dashboardData.ordersByStatus).map(
  //   ([key, value]) => ({
  //     title: key.charAt(0).toUpperCase() + key.slice(1),
  //     amount: value,
  //   })
  // );

  /* ================= QUICK ACTIONS ================= */
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
      link: `/restaurant/${restaurantId}/orders-page`,
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <Res_dashboardHeader />

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {generalStats.map((stat, index) => (
          <Res_KpiCards key={index} {...stat} />
        ))}
      </div>

      {/* Order Status + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
        <div className="lg:col-span-2">
          <h2 className="pl-2 font-bold text-text-primary text-xl mb-4">
            Order Status
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {orderStats.map((stat, index) => (
              <Res_orderStatsCards key={index} {...stat} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <h2 className="mt-2 pl-2 font-bold text-text-primary text-xl mb-4">
            Quick Actions
          </h2>
          <QuickActions actions={actions} />
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="mt-10 flex flex-col lg:flex-row justify-between items-center p-4">
        <TopHeading title="Revenue Overview" />
        <div className="mt-5 lg:mt-0 flex gap-2 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-4 py-2 text-sm font-medium ${
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
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {chartLoading ? (
            <div className="w-full h-80 flex items-center justify-center bg-white rounded-xl shadow-md">
              <Loading />
            </div>
          ) : (
            <ShowLineChart data={chartData} lineColor="#f97316" />
          )}
        </motion.div>
      </motion.div>

      {/* Recent Orders */}
      <div>
        <h2 className="pl-2 font-bold text-text-primary text-xl mb-4">
          Recent Orders
        </h2>
        <Res_orderTable ordersData={recentOrders} />
      </div>

      <Res_menuItemModal />
    </div>
  );
};

export default Res_Dashboard_Page;
