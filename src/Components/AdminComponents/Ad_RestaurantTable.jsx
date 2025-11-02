import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Ad_RestaurantTable = ({ data, isauthorize = true, adminNavigate ,  basePath = "admin" }) => {
  const [restaurantsData, setRestaurantData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setRestaurantData(data || []);
  }, [data]);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Approved: "bg-green-100 text-green-800 border-green-300",
    Rejected: "bg-red-100 text-red-800 border-red-300",
  };

  const handleStatusChange = (id, newStatus) => {
    setRestaurantData((prev) =>
      prev.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, status: newStatus } : restaurant
      )
    );
  };

  const handleBtnClick = (item) => {
     navigate(`/${basePath}/${item.id}/restaurant-info`);
    console.log("requested restaurant ", item);
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="table w-full border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr className="text-left">
            <th>RESTAURANT</th>
            <th>CONTACT</th>
            <th>STATUS</th>
            <th>ORDERS</th>
            <th>REVENUE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {restaurantsData.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
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

                {/* STATUS */}
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

                <td>{restaurant.orders}</td>
                <td>{restaurant.revenue}</td>

                {/* ACTIONS */}
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBtnClick(restaurant)}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      <Eye size={15} />
                      View
                    </button>
                    {isauthorize && (
                      <select
                        value={restaurant.status}
                        onChange={(e) =>
                          handleStatusChange(restaurant.id, e.target.value)
                        }
                        className="select select-sm border-gray-300 rounded-md"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
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
