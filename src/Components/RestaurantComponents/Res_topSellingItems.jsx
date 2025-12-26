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
                <th>Item</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10">
                          <img
                            src={item.itemImage}
                            alt={item.itemName}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{item.itemName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-500">{item.itemCategory}</td>
                  <td className="font-medium">{item.orders}</td>
                  <td>Rs. {item.revenue.toLocaleString()}</td>
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
