import React from "react";

const Res_leastSellingItems = ({ title = "Least Selling Items", items = [] }) => {
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
                <th>Item</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Revenue</th>
                <th className="text-center">Performance</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="hover">
                  {/* Item Name + Image */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="text-gray-500">{item.category}</td>

                  {/* Total Sold */}
                  <td className="font-medium">{item.totalSold}</td>

                  {/* Revenue */}
                  <td>Rs. {item.revenue.toLocaleString()}</td>

                  {/* Badge showing it’s low performance */}
                  <td className="text-center">
                    <div className="badge badge-error bg-red-100 text-red-700 font-semibold">
                      Low
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

export default Res_leastSellingItems;
