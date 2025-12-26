import React, { useEffect, useState } from "react";
import Res_orderHeader from "../../Components/RestaurantComponents/Res_orderHeader";
import Res_orderTable from "../../Components/RestaurantComponents/Res_orderTable";
import { useParams } from "react-router-dom";
import {
  changeOrderStatus,
  getRestaurantOrders,
} from "../../api/restaurantApi";
import toast from "react-hot-toast";
import Loading from "../../Components/LoadingSpinner/Loading";

const Res_Orders_Page = () => {
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const orderStatus = [
    "All",
    "pending",
    "confirmed",
    "preparing",
    "arriving",
    "delivered",
  ];

  const { id: restaurantId } = useParams();

  // 🔹 REAL DATA STATE (no dummy)
  const [ordersData, setOrdersData] = useState([]);
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
const [loading,setLoading] = useState(false)
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true)
        const response = await getRestaurantOrders(restaurantId);
        const data = response.data;

        if (data.success) {
          const formattedOrders = data.orders.map((order) => ({
            ...order,
            customerId: order.customer, 
          }));

          setOrdersData(formattedOrders);
          setLoading(false)
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Failed to load orders");
        setLoading(false)
      }
    };

    fetchAllOrders();
  }, [restaurantId]);

  const handleBtnClick = (text) => setActiveStatus(text);

  // 🔹 FILTER LOGIC (NOW WORKS)
  const filteredData = ordersData.filter((order) => {
    const matchesStatus =
      activeStatus === "All" || order.status === activeStatus;

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      order.customerId?.name?.toLowerCase().includes(query) ||
      order.customerId?.phone?.toLowerCase().includes(query) ||
      order.deliveryAddress?.toLowerCase().includes(query) ||
      order.status?.toLowerCase().includes(query) ||
      order.paymentStatus?.toLowerCase().includes(query) ||
      order.totalPrice?.toString().includes(query);

    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (id, newStatus) => {
    const status = newStatus.toLowerCase();

    const previousOrders = [...ordersData];

    setOrdersData((prev) =>
      prev.map((order) => (order._id === id ? { ...order, status } : order))
    );

    setLoadingOrderId(id);

    try {
      const payload = {
        orderId: id,
        status,
      };

      const response = await changeOrderStatus(payload);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
    } catch (error) {
      // ✅ proper rollback
      setOrdersData(previousOrders);

      toast.error(
        error?.response?.data?.message || "Failed to update order status"
      );
    } finally {
      setLoadingOrderId(null);
    }
  };

  if (loading) {
    return <Loading/>
  }
  return (
    <div className="flex flex-col gap-6">
      <Res_orderHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statuses={orderStatus}
        activeStatus={activeStatus}
        handleBtnClick={handleBtnClick}
      />

      <Res_orderTable
        ordersData={filteredData}
        onStatusChange={handleStatusChange}
        loadingOrderId={loadingOrderId}
      />
    </div>
  );
};

export default Res_Orders_Page;
