import React, { useEffect, useMemo, useState } from "react";
import { sampleComplaint } from "../../Components/Dummy Data/DummyData";
import TopHeading from "../../Components/Common/TopHeading";
import Cus_ComplaintCard from "../../Components/CustomerComponents/Cus_Cards/Cus_ComplaintCard";
import Header from "../../Components/Landing Page Components/Header";
import FilterButton from "../../Components/Common/FilterButton";
import { getMyComplaints } from "../../api/customerApi";
import toast from "react-hot-toast";
import Loading from "../../Components/LoadingSpinner/Loading";

const Cus_Complaint_Page = () => {
  const complaintStatus = ["All", "Reviewing", "Pending", "Resolved"];
  const [activeStatus, setActiveStatus] = useState("All");

  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    const getComplaints = async () => {
      try {
        const response = await getMyComplaints();
        const data = response.data;
        if (data.success) {
          setComplaints(data.complaints);
          // console.log("complaint data ",data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    getComplaints();
  }, []);
  const filteredComplaints = useMemo(() => {
    if (activeStatus === "All") return complaints;
    return complaints.filter((complaint) => complaint.status === activeStatus);
  }, [activeStatus, complaints]);

  if (!complaints) {
    return <Loading/>
  }
  return (
    <>
      <Header />
      <div className="mt-[70px] p-6 bg-base-200 min-h-screen">
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
            {complaintStatus.map((status) => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((c) => (
              <Cus_ComplaintCard key={c._id} complaint={c} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No complaints found for{" "}
              <span className="font-medium">{activeStatus}</span> status.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cus_Complaint_Page;
