import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import Ad_ordersDetailModel from "./Models/Ad_ordersDetailModel";

const Ad_OrdersTable = ({ data }) => {
  const [ordersData, setOrdersData] = useState([]);
  const [isBtnClick, setIsBtnClick] = useState(false);

  useEffect(() => {
    setOrdersData(data || []);
  }, [data]);

  const dummyOrder = {
    id: "1001",
    status: "Delivered",
    date: "May 15, 2023 at 10:30 AM",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "(123) 456-7890",
      address: "123 Main St, New York, NY",
    },
    restaurant: {
      name: "Pizza Palace",
      phone: "(987) 654-3210",
    },
    paymentMethod: "Credit Card (****4242)",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 12.99 },
      { name: "Coke", quantity: 2, price: 5.98 },
    ],
    total: 32.5,
  };

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Preparing: "bg-orange-100 text-orange-800 border-orange-300",
    Arriving: "bg-blue-100 text-blue-800 border-blue-300",
    Delivered: "bg-green-100 text-green-800 border-green-300",
  };

  const handleBtnClick = (item) => {
    setIsBtnClick(true);
    document.getElementById("ad_orders_detail_model").showModal();
    console.log("requested item ", item);
  };

  return (
    <div className="overflow-x-auto p-6">
      <div className="border rounded-xl shadow-sm">
        <table className="table w-full">
          <thead className="bg-gray-50 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-4 py-3">ORDER ID</th>
              <th className="px-4 py-3">CUSTOMER</th>
              <th className="px-4 py-3">RESTAURANT</th>
              <th className="px-4 py-3">ITEMS</th>
              <th className="px-4 py-3">TOTAL</th>
              <th className="px-4 py-3">DATE & TIME</th>
              <th className="px-4 py-3">STATUS</th>
              <th className="px-4 py-3">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {ordersData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No Orders found
                </td>
              </tr>
            ) : (
              ordersData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 border-b last:border-none"
                >
                  <td className="px-4 py-3 ">
                    {item.id.slice(0, 12)}...
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xs text-gray-500">
                        {item.email}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3">{item.restaurantName}</td>

                  <td className="px-4 py-3">
                    <span className="font-semibold text-xs">
                      {item.items} items
                    </span>
                  </td>

                  <td className="px-4 py-3 font-semibold text-gray-800">
                    ${item.total}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span>{new Date(item.date).toLocaleDateString("en-GB")}</span>
                      <span className="text-xs text-gray-400">{item.time}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium border rounded-full ${
                        statusColors[item.status] ||
                        "bg-gray-100 text-gray-700 border-gray-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleBtnClick(item)}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition"
                    >
                      <Eye size={15} />
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isBtnClick && <Ad_ordersDetailModel order={dummyOrder} /> }
    </div>
  );
};

export default Ad_OrdersTable;
