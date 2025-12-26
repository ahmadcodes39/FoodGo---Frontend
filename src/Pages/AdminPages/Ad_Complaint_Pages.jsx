import React, { useEffect, useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import FilterHeader from "../../Components/Common/FilterHeader";
import Ad_ComplaintsTable from "../../Components/AdminComponents/Ad_ComplaintsTable";
import Ad_FilterHeader from "../../Components/AdminComponents/Ad_FilterHeader";
import { getAllComplaints } from "../../api/adminApi";
import toast from "react-hot-toast";
const Ad_Complaint_Pages = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBtnClick = (text) => {
    setActiveStatus(text);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllComplaints();
        const data = response.data;
        setComplaints(data.complaints || []);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "Failed to fetch complaints"
        );
        setLoading(false);
      }
    };
    getData();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await getAllComplaints();
      setComplaints(response.data.complaints || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch complaints"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // filtering
  const filteredData = complaints.filter((item) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      item.reason?.toLowerCase().includes(query) ||
      item.raisedBy?.name?.toLowerCase().includes(query) ||
      item.raisedBy?.email?.toLowerCase().includes(query) ||
      item.againstRestaurant?.name?.toLowerCase().includes(query) ||
      item.againstUser?.name?.toLowerCase().includes(query) ||
      item.orderId?._id?.toLowerCase().includes(query) ||
      item.orderId?.paymentMethod?.toLowerCase().includes(query) ||
      item.orderId?.paymentStatus?.toLowerCase().includes(query) ||
      new Date(item.createdAt)
        .toLocaleDateString("en-GB") // Format: DD/MM/YYYY
        .toLowerCase()
        .includes(query);

    const matchesStatus =
      activeStatus === "All" || item.status === activeStatus;

    const matchesRole =
      selectedRole === "All" || item.complaintStatus === selectedRole;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const complaintStats = ["All", "Pending", "Resolved"];

  return (
    <div className="p-4">
      <TopHeading title={"Complaints Management"} />
      <Ad_FilterHeader
        activeStatus={activeStatus}
        onBtnClick={handleBtnClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statuses={complaintStats}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <Ad_ComplaintsTable complaint={filteredData} refreshComplaints={fetchComplaints} />
      )}
    </div>
  );
};

export default Ad_Complaint_Pages;
