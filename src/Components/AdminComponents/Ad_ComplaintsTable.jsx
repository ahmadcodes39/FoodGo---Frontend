import { Eye } from "lucide-react";
import React, { useState } from "react";
import Ad_ComplaintSectionModel from "./Models/Ad_ComplaintSectionModel";

const Ad_ComplaintsTable = ({ complaint,refreshComplaints }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const handleBtnClick = (complaint) => {
    setSelectedComplaint(complaint);
    setTimeout(() => {
      document
        .getElementById(`ad_complain_section_model_${complaint._id}`)
        .showModal();
    }, 0);
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
            <th>REASON</th>
            <th>ISSUE DATE</th>
            <th>Complaint Status</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {complaint.length > 0 ? (
            complaint.map((c) => (
              <tr key={c._id}>
                <td>{c._id.slice(0, 5)}...</td>
                <td>{c.raisedBy?.name || "N/A"}</td>
                <td>
                  {c.againstRestaurant?.name || c.againstUser?.name || "N/A"}
                </td>
                <td>{c.orderId?._id?.slice(0, 5) || "N/A"}...</td>
                <td>{c.reason.slice(0, 5)}...</td>
                <td>{new Date(c.createdAt).toLocaleDateString("en-GB")}</td>

                <td>
                  <span
                    className={`px-3 py-1 badge text-xs font-medium border rounded-full ${
                      statusColors[c.complaintStatus] ||
                      "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {c.complaintStatus}
                  </span>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 badge text-xs font-medium border rounded-full ${
                      statusColors[c.status] ||
                      "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => handleBtnClick(c)}
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
              <td colSpan="9" className="text-center text-gray-500 py-4">
                No complaints found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Ad_ComplaintSectionModel complaintData={selectedComplaint} refreshComplaints={refreshComplaints} />
    </div>
  );
};

export default Ad_ComplaintsTable;
