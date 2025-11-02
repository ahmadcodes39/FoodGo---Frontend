import React from "react";

const Ad_TopRestaurantTable = ({topRestaurants}) => {
 

  const getStatusColor = (status) => {
   switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border border-green-400";
      case "Warned":
        return "bg-yellow-100 text-yellow-700 border border-yellow-400";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-400";
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4 cursor-default">
      <table className="table w-full">
        {/* Table Head */}
        <thead className="bg-gray-50 text-gray-600 text-sm">
          <tr>
            <th className="font-semibold">#</th>
            <th className="font-semibold">Restaurant Name</th>
            <th className="font-semibold">Total Orders</th>
            <th className="font-semibold">Total Revenue</th>
            <th className="font-semibold">Status</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {topRestaurants.map((restaurant, index) => (
            <tr
              key={restaurant.id}
              className={`hover:bg-gray-50 transition ${
                index < 3 ? "bg-gray-50/50" : ""
              }`}
            >
              <td>
                <div className="flex items-center justify-center">
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${
                      index < 3
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>
              </td>

              <td className="font-medium text-gray-800">
                {restaurant.name}
              </td>

              <td className="text-gray-600">{restaurant.orders.toLocaleString()}</td>

              <td className="font-semibold text-gray-800">
                {restaurant.revenue}
              </td>

              <td>
                <div className={`badge px-3 py-2 text-sm ${getStatusColor(restaurant.status)}`}>
                  {restaurant.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ad_TopRestaurantTable;
