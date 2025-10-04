import { Eye } from "lucide-react";
import React from "react";

const Ad_ComplaintsTable = ({ complaint }) => {
  const handleBtnClick = (complaint) => {
    console.log("requested complaints", complaint);
  };
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Resolved: "bg-green-100 text-green-800 border-green-300",
    Customer: "bg-blue-100 text-blue-800 border-blue-300",
    Restaurant: "bg-purple-100 text-purple-800 border-purple-300",
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>COMPLAINT ID</th>
            <th>RAISED BY</th>
            <th>AGAINST</th>
            <th>ORDER ID</th>
            <th>REASON / DESCRIPTION</th>
            <th>Complaint Status</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {complaint.length > 0 ? (
            complaint.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint._id.slice(0, 12)}...</td>

                <td>{complaint.raisedBy}</td>

                <td>{complaint.against}</td>

                <td>{complaint.orderId.slice(0, 12)}...</td>

                <td>{complaint.reason.slice(0, 12)}...</td>
                <td>
                  <span
                    className={`px-3 py-1 badge text-xs font-medium border rounded-full ${
                      statusColors[complaint.complaintStatus] ||
                      "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {complaint.complaintStatus}
                  </span>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 badge text-xs font-medium border rounded-full ${
                      statusColors[complaint.status] ||
                      "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {complaint.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => handleBtnClick(complaint)}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    <Eye size={15} />
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-4">
                No complaints found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ad_ComplaintsTable;
