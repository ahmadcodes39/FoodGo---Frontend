import React, { useMemo, useState } from "react";
import { Res_sampleComplaint } from "../../Components/Dummy Data/DummyData";
import TopHeading from "../../Components/Common/TopHeading";
import Res_ComplaintCard from "../../Components/RestaurantComponents/Cards/Res_ComplaintCard"; 
import FilterButton from "../../Components/Common/FilterButton";

const Res_Complaint_Page = () => {
  const complaintStatus = ["All", "Reviewing","Pending", "Resolved"];
  const [activeStatus, setActiveStatus] = useState("All");

  const filteredComplaints = useMemo(() => {
    if (activeStatus === "All") return Res_sampleComplaint;
    return Res_sampleComplaint.filter(
      (complaint) => complaint.status === activeStatus
    );
  }, [activeStatus]);

  return (
    <>
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
    </>
  );
};

export default Res_Complaint_Page;
