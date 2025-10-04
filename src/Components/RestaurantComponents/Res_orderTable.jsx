import React, { useState } from "react";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Preparing: "bg-orange-100 text-orange-800 border-orange-300",
  "On the way": "bg-blue-100 text-blue-800 border-blue-300",
  Delivered: "bg-green-100 text-green-800 border-green-300",
};

const Res_orderTable = ({ dummyOrderData }) => {
  const [orders, setOrders] = useState(dummyOrderData);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="table w-full border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th>ORDER ID</th>
            <th>CUSTOMER</th>
            <th>ADDRESS</th>
            <th>TOTAL</th>
            <th>STATUS</th>
            <th>TIME</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="font-semibold">{item.id}</td>
              <td>
                <p className="flex flex-col items-start gap-1">
                  <span>{item.customer}</span>
                  <span className="text-sm text-gray-500">{item.phone}</span>
                </p>
              </td>
              <td>{item.address}</td>
              <td>
                <b>${item.total}</b>
              </td>
              <td>
                <div
                  className={`badge border px-3 py-1 rounded-full font-medium ${
                    statusColors[item.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {item.status}
                </div>
              </td>
              <td>{item.timeAgo}</td>
              <td>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className="select select-sm border-gray-300 rounded-md"
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="On the way">On the way</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Res_orderTable;
