import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
// import { customerInfoData } from "../Dummy Data/DummyData";
import Ad_CustomerInfoModel from "./Models/Ad_CustomerInfoModel";
import { getCustomerProfile, updateCustomerStatus } from "../../api/adminApi";
import toast from "react-hot-toast";

const Ad_CustomerTable = ({ data }) => {
const [loadingUserId, setLoadingUserId] = useState(null);

  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer,setSelectedCustomer] = useState(null)
  useEffect(() => {
    setCustomerData(data || []);
  }, [data]);

  const statusColors = {
    Active: "bg-green-100 text-green-700 border-green-300",
    Warned: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Blocked: "bg-red-100 text-red-700 border-red-300",
  };

 

const handleStatusChange = async (id, newStatus) => {
  try {
    setLoadingUserId(id);

    await updateCustomerStatus(id, newStatus);

    setCustomerData((prev) =>
      prev.map((customer) =>
        customer.id === id ? { ...customer, status: newStatus } : customer
      )
    );

    toast.success("Customer status updated");
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to update status"
    );
  } finally {
    setLoadingUserId(null);
  }
};


  const handleBtnClick = async (item) => {
    try {
      const response = await getCustomerProfile(item.id);
      setSelectedCustomer({ ...response.data.profile, id: item.id });
      setTimeout(() => {
        document.getElementById("ad_customer_info_modal").showModal();
      }, 0);
    } catch (error) {
      console.error("Error fetching customer profile:", error);
    }
  };

  return (
    <div className="overflow-x-auto mt-8">
      <div className="border rounded-xl shadow-sm">
        <table className="table w-full">
          {/* Header */}
          <thead className="bg-gray-50 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-10 py-3">Contact</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Total Spent</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="text-sm">
            {customerData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No Customers found
                </td>
              </tr>
            ) : (
              customerData.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-gray-50 border-b last:border-none"
                >
                  {/* CUSTOMER */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.profilePic}
                        alt={customer.name}
                        className="w-12 h-12 object-cover rounded-full border"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{customer.name}</span>
                        <span className="text-xs text-gray-500">
                          {customer.id.slice(0, 10)}...
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* CONTACT */}
                  <td className="px-10 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{customer.name}</span>
                      <span className="text-xs text-gray-500">
                        {customer.phone}
                      </span>
                    </div>
                  </td>

                  {/* JOINED */}
                  <td className="px-4 py-3 text-gray-600">{new Date(customer.joinedDate).toLocaleDateString("en-GB")}</td>

                  {/* STATUS */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium border rounded-full ${
                        statusColors[customer.status] ||
                        "bg-gray-100 text-gray-700 border-gray-300"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  {/* ORDERS */}
                  <td className="px-4 py-3 font-medium">{customer.orders}</td>

                  {/* TOTAL SPENT */}
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {customer.totalSpent}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleBtnClick(customer)}
                        className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition"
                      >
                        <Eye size={15} />
                        View
                      </button>
                     <select
  value={customer.status}
  disabled={loadingUserId === customer.id}
  onChange={(e) =>
    handleStatusChange(customer.id, e.target.value)
  }
  className={`select select-sm border-gray-300 rounded-lg ${
    loadingUserId === customer.id ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  <option value="Active">Active</option>
  <option value="Warned">Warned</option>
  <option value="Blocked">Blocked</option>
</select>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Ad_CustomerInfoModel data={selectedCustomer}/>
    </div>
  );
};

export default Ad_CustomerTable;
