import React, { useEffect, useMemo, useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import Res_ComplaintCard from "../../Components/RestaurantComponents/Cards/Res_ComplaintCard"; 
import FilterButton from "../../Components/Common/FilterButton";
import { getResComplaints } from "../../api/restaurantApi";
import Loading from "../../Components/LoadingSpinner/Loading";
import { toast } from "react-toastify";

const Res_Complaint_Page = () => {
  const complaintStatusOptions = ["All", "Reviewing", "Pending", "Resolved"];
  const [activeStatus, setActiveStatus] = useState("All");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch complaints from API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const response = await getResComplaints();
        if (response.data.success) {
          // Map API complaints to a format usable by your card
          const formattedComplaints = response.data.complaints.map(({ complaint, order }) => ({
            ...complaint,
            order, // attach order to complaint object
          }));
          setComplaints(formattedComplaints);
        } else {
          toast.error(response.data.message || "Failed to fetch complaints.");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Something went wrong while fetching complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Filter complaints by active status
  const filteredComplaints = useMemo(() => {
    if (activeStatus === "All") return complaints;
    return complaints.filter((complaint) => complaint.status === activeStatus);
  }, [activeStatus, complaints]);

  if (loading) return <Loading />;

  return (
    <div className="p-4 bg-base-100 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <TopHeading title="My Complaints" />
          <p className="text-xs text-gray-600 pl-2">
            View and track your complaints
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {complaintStatusOptions.map((status) => (
            <FilterButton
              key={status}
              text={status}
              isActive={activeStatus === status}
              onBtnClick={() => setActiveStatus(status)}
            />
          ))}
        </div>
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((c) => (
            <Res_ComplaintCard key={c._id} complaint={c} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No complaints found for{" "}
            <span className="font-medium">{activeStatus}</span> status.
          </div>
        )}
      </div>
    </div>
  );
};

export default Res_Complaint_Page;
