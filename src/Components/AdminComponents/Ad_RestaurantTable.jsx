import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { approveRestaurant, updateRestaurantStatus } from "../../api/adminApi";
import toast from "react-hot-toast";

const Ad_RestaurantTable = ({ data, isauthorize = true, adminNavigate ,  basePath = "admin" }) => {
  const [restaurantsData, setRestaurantData] = useState([]);
  const [updating, setUpdating] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setRestaurantData(data || []);
  }, [data]);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Approved: "bg-green-100 text-green-800 border-green-300",
    Rejected: "bg-red-100 text-red-800 border-red-300",
  };

  const operationalStatusColors = {
    active: "bg-green-100 text-green-800 border-green-300",
    warned: "bg-yellow-100 text-yellow-800 border-yellow-300",
    blocked: "bg-red-100 text-red-800 border-red-300",
  };

  const handleStatusChange = async (id, newStatus) => {
    // Update local state immediately for UI
    setRestaurantData((prev) =>
      prev.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, status: newStatus } : restaurant
      )
    );

    // Call API if status is approved or rejected
    if (newStatus === "Approved" || newStatus === "Rejected") {
      setUpdating((prev) => ({ ...prev, [id]: true }));
      try {
        const statusLower = newStatus.toLowerCase(); // API expects lowercase
        await approveRestaurant(id, statusLower);
        toast.success("Status updated successfully");
      } catch (error) {
        console.error("Failed to update status:", error);
        toast.error("Failed to update status");
        // Revert local state on error
        setRestaurantData((prev) =>
          prev.map((restaurant) =>
            restaurant.id === id ? { ...restaurant, status: prev.find(r => r.id === id)?.status || "Pending" } : restaurant
          )
        );
      } finally {
        setUpdating((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const handleOperationalStatusChange = async (id, newOperationalStatus) => {
    // Update local state immediately for UI
    setRestaurantData((prev) =>
      prev.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, operationalStatus: newOperationalStatus } : restaurant
      )
    );

    // Call API to update operational status
    setUpdating((prev) => ({ ...prev, [id]: true }));
    try {
      await updateRestaurantStatus(id, newOperationalStatus);
      toast.success("Operational status updated successfully");
    } catch (error) {
      console.error("Failed to update operational status:", error);
      toast.error("Failed to update operational status");
      // Revert local state on error
      setRestaurantData((prev) =>
        prev.map((restaurant) =>
          restaurant.id === id ? { ...restaurant, operationalStatus: prev.find(r => r.id === id)?.operationalStatus || "active" } : restaurant
        )
      );
    } finally {
      setUpdating((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleBtnClick = (item) => {
     navigate(`/${basePath}/${item.id}/restaurant-info`);
    // console.log("requested restaurant ", item);
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="table w-full border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr className="text-left">
            <th>RESTAURANT</th>
            <th>CONTACT</th>
            <th>VERIFICATION STATUS</th>
            <th>OPERATIONAL STATUS</th>
            <th>ORDERS</th>
            <th>REVENUE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {restaurantsData.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-500">
                No restaurants found
              </td>
            </tr>
          ) : (
            restaurantsData.map((restaurant) => (
              <tr key={restaurant.id} className="hover:bg-gray-50">
                {/* RESTAURANT */}
                <td className="min-w-[190px]">
                  <div className="flex items-center gap-3">
                    <img
                      src={restaurant.logo}
                      alt={restaurant.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex flex-col gap-2">
                      <span className="font-medium">{restaurant.name}</span>
                      <span>{restaurant.cusisine.slice(0, 2).join(", ")}</span>
                    </div>
                  </div>
                </td>

                {/* CONTACT */}
                <td>
                  <span className="flex flex-col gap-1">
                    {restaurant.ownerId.name}
                    {restaurant.ownerId.email.slice(0, 15)}
                  </span>
                </td>

                {/* VERIFICATION STATUS */}
                <td>
                  <span
                    className={`px-3 py-1 text-xs font-medium border rounded-full ${
                      statusColors[restaurant.status] ||
                      "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {restaurant.status}
                  </span>
                </td>

                {/* OPERATIONAL STATUS */}
                <td>
                  <span
                    className={`px-3 py-1 text-xs font-medium border rounded-full capitalize ${
                      operationalStatusColors[restaurant.operationalStatus] ||
                      "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {restaurant.operationalStatus || "active"}
                  </span>
                </td>

                <td>{restaurant.orders}</td>
                <td>{restaurant.revenue}</td>

                {/* ACTIONS */}
                <td>
                  <div className="flex gap-2 flex-col">
                    <button
                      onClick={() => handleBtnClick(restaurant)}
                      className="flex items-center justify-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      
                      View
                    </button>
                    {isauthorize && (
                      <div className="flex gap-2">
                        <select
                          value={restaurant.status}
                          onChange={(e) =>
                            handleStatusChange(restaurant.id, e.target.value)
                          }
                          disabled={updating[restaurant.id]}
                          className="select select-sm border-gray-300 rounded-md"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        <select
                          value={restaurant.operationalStatus || "active"}
                          onChange={(e) =>
                            handleOperationalStatusChange(restaurant.id, e.target.value)
                          }
                          disabled={updating[restaurant.id]}
                          className="select select-sm border-gray-300 rounded-md"
                        >
                          <option value="active">Active</option>
                          <option value="warned">Warned</option>
                          <option value="blocked">Blocked</option>
                        </select>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ad_RestaurantTable;
