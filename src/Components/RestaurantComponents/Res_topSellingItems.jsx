import React from "react";

const Res_TopSellingItems = ({ title = "Top Selling Items", items = [] }) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-200">
      <div className="card-body">
        {/* Heading */}
        <h2 className="card-title text-lg font-semibold mb-3">{title}</h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-xs uppercase">
                <th>Item Name</th>
                <th>Orders</th>
                <th>Revenue</th>
                <th className="text-center">Trend</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="hover">
                  <td className="font-medium">{item.name}</td>
                  <td>{item.orders}</td>
                  <td>Rs. {item.revenue.toLocaleString()}</td>
                  <td className="text-center">
                    <div
                      className={`badge badge-sm font-semibold ${
                        item.trend >= 0
                          ? "badge-success bg-green-100 text-green-700"
                          : "badge-error bg-red-100 text-red-700"
                      }`}
                    >
                      {item.trend >= 0 ? `+${item.trend}%` : `${item.trend}%`}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Res_TopSellingItems;
