import React, { useState, useMemo, useEffect } from "react";
import Header from "../../Components/Landing Page Components/Header";
import { orderStatus } from "../../Components/Dummy Data/DummyData";
import TopHeading from "../../Components/Common/TopHeading";
import FilterButton from "../../Components/Common/FilterButton";
import Cus_OrderCard from "../../Components/CustomerComponents/Cus_Cards/Cus_OrderCard";
import Cus_ViewOrderModel from "../../Components/CustomerComponents/Models/Cus_ViewOrderModel";
import { getOrders } from "../../api/customerApi";
import Loading from "../../Components/LoadingSpinner/Loading";
import toast from "react-hot-toast";

const Cus_Orders_Page = () => {
  const [activeStatus, setActiveStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]); 
  const [loading,setLoading] = useState(false)


  const filteredOrders = useMemo(() => {
    if (activeStatus === "all") return orders;
    return orders.filter((order) => order.status === activeStatus);
  }, [activeStatus, orders]);

  // ⬇️ Fetch API orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const response = await getOrders();
        setOrders(response.data.orders); 
    setLoading(false)

      } catch (error) {
        toast.error(error?.response?.data?.message)
        console.log(
          error?.response?.data?.message || "Something went wrong fetching orders"
        );
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setTimeout(() => {
      document.getElementById("cus_viewOrder_modal").showModal();
    }, 0);
  };
  if (loading) {
    return <Loading/>
  }

  return (
    <>
      <Header />
      <div className="mt-[70px] p-6 bg-base-200">

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <TopHeading title="My Orders" />
            <p className="text-xs text-gray-600 pl-2">
              View and manage your food delivery orders
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {orderStatus.map((status) => (
              <FilterButton
                key={status}
                text={status}
                isActive={activeStatus === status}
                onBtnClick={() => setActiveStatus(status)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Cus_OrderCard
                key={order._id}
                order={order}
                onViewDetails={() => handleViewDetails(order)}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No orders found for{" "}
              <span className="font-medium">{activeStatus}</span> status.
            </div>
          )}
        </div>
      </div>

      <Cus_ViewOrderModel order={selectedOrder} />
    </>
  );
};

export default Cus_Orders_Page;
