import React, { useContext, useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import ShowLineChart from "../../Components/Common/Charts/ShowLineChart";
import QuickActions from "../../Components/Common/QuickActions";
import Ad_ComplaintsTable from "../../Components/AdminComponents/Ad_ComplaintsTable";
import { getAllComplaints, getDashboardStats, getRevenueGrowth } from "../../api/adminApi";
import toast from "react-hot-toast";
import { AuthContext } from "../../App Global States/userAuthContext";
import Loading from "../../Components/LoadingSpinner/Loading";

const Ad_Dashboard_Page = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Weekly");
  const [revenueData, setRevenueData] = useState([]);
  const tabs = ["Weekly", "Monthly", "Yearly"];

  // KPI stats
  const [cardsStats, setCardsStats] = useState({
    totalCustomers: 0,
    totalRestaurants: 0,
    totaldOrders: 0,
    pendingComplaints: 0,
    totalRevenue: 0,
    activeOrdersCount: 0,
    pendingRestaurantsCount: 0,
  });

  /* ------------------ DASHBOARD STATS ------------------ */
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await getDashboardStats();
        const data = response.data;

        if (data.success) {
          const stats = data.stats;
          setCardsStats({
            totalCustomers: stats.totalCustomers || 0,
            totalRestaurants: stats.totalRestaurants || 0,
            totaldOrders: stats.totaldOrders || 0,
            pendingComplaints: stats.pendingComplaints || 0,
            totalRevenue: stats.totalRevenue || 0,
            activeOrdersCount: stats.activeOrdersCount || 0,
            pendingRestaurantsCount: stats.pendingRestaurantsCount || 0,
          });
        }
      } catch (error) {
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  /* ------------------ REVENUE GROWTH ------------------ */
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setChartLoading(true);
        const range = activeTab.toLowerCase(); // weekly | monthly | yearly
        const response = await getRevenueGrowth(range);

        if (response.data.success) {
          setRevenueData(response.data.revenueGrowth);
        }
      } catch (error) {
        toast.error("Failed to load revenue growth");
      } finally {
        setChartLoading(false);
      }
    };

    fetchRevenue();
  }, [activeTab]);

  /*-------------------Complaint Data--------------------*/
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllComplaints();
        const data = response.data;
        setComplaints(data.complaints || []);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "Failed to fetch complaints"
        );
        setLoading(false);
      }
    };
    getData();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await getAllComplaints();
      setComplaints(response.data.complaints || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch complaints"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  /* ------------------ ACTIONS ------------------ */
  const handleActionClick = (action) => {
    if (action === "reviewRestaurants") navigate("/admin/restaurants");
    if (action === "monitorOrders") navigate("/admin/orders");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/admin/login");
  };

  /* ------------------ UI CONFIG ------------------ */
  const generalStats = [
    {
      title: "Total Customers",
      value: cardsStats.totalCustomers,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      title: "Total Restaurants",
      value: cardsStats.totalRestaurants,
      icon: Store,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      title: "Total Orders",
      value: cardsStats.totaldOrders,
      icon: ShoppingCart,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      title: "Total Revenue",
      value: `$ ${cardsStats.totalRevenue}`,
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      title: "Pending Complaints",
      value: cardsStats.pendingComplaints,
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
      description: `${cardsStats.pendingRestaurantsCount} restaurants waiting for approval`,
      btnText: "Review",
      action: "reviewRestaurants",
    },
    {
      icon: PackageIcon,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
      title: "Active Orders",
      description: `${cardsStats.activeOrdersCount} orders in progress`,
      btnText: "Monitor",
      action: "monitorOrders",
    },
  ];

  const quickActions = [
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

  /* ------------------ LOADING ------------------ */
  if (loading) {
    return <Loading />;
  }

  /* ------------------ RENDER ------------------ */
  return (
    <div className="py-2 px-4 flex flex-col bg-background-light">
      {/* Header */}
      <div className="flex items-center justify-between">
        <TopHeading title="Admin Dashboard" />
        <button
          className="btn btn-sm bg-redBtn text-white rounded-md hover:bg-red-600 flex gap-2"
          onClick={handleLogout}
        >
          <LogOutIcon size={15} /> Logout
        </button>
      </div>

      {/* Welcome */}
      <div className="bg-gray-100 mt-5 p-4 rounded-md shadow-md">
        <p className="text-xl font-semibold">Welcome,</p>
        <p className="text-gray-500 text-sm">
          Here's what's happening with your app.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {generalStats.map((stat, i) => (
          <Ad_KpiCards key={i} {...stat} />
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5">
        {actionCard.map((card, i) => (
          <Ad_actionCards
            key={i}
            {...card}
            handleBtnClick={() => handleActionClick(card.action)}
          />
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="mt-10 flex justify-between items-center p-4">
        <TopHeading title="Revenue Overview" />
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
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
        {chartLoading ? (
          <Loading />
        ) : (
          <ShowLineChart data={revenueData} lineColor="#f97316" />
        )}
      </motion.div>

      {/* Quick Actions */}
      <div className="mt-5">
        <TopHeading title="Quick Actions" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
          <QuickActions actions={quickActions} />
        </div>
      </div>

      {/* Complaints */}
      <div className="mt-5">
        <TopHeading title="Recent Complaints" />
        <Ad_ComplaintsTable
          complaint={complaints.slice(0,5)}
          refreshComplaints={fetchComplaints}
        />
      </div>
    </div>
  );
};

export default Ad_Dashboard_Page;
