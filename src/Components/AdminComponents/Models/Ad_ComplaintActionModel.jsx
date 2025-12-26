import React, { useEffect, useState } from "react";
import { AlertTriangle, Ban, CheckCircle, Send, X } from "lucide-react";
import { resolveComplaint } from "../../../api/adminApi";
import toast from "react-hot-toast";

const Ad_ComplaintActionModel = ({ complaintStatus, complaintId ,refreshComplaints }) => {
  const [complaintAgainst, setComplaintAgainst] = useState("");
  const [customerMessage, setCustomerMessage] = useState("");
  const [restaurantMessage, setRestaurantMessage] = useState("");
  const [selectedAction, setSelectedAction] = useState("");

  useEffect(() => {
    if (complaintStatus) {
      const lowerStatus = complaintStatus.toLowerCase();
      if (lowerStatus.includes("customer")) {
        setComplaintAgainst("restaurant");
      } else if (lowerStatus.includes("restaurant")) {
        setComplaintAgainst("customer");
      } else {
        setComplaintAgainst("unknown");
      }
    }
  }, [complaintStatus]);

  const handleSend = async () => {
    try {
      if (!selectedAction) {
        toast.error("Please select an action");
        return;
      }

      await resolveComplaint(
        complaintId,
        selectedAction, // status
        customerMessage || "", // messageToCustomer
        restaurantMessage || "" // messageToRestaurant
      );

      toast.success("Complaint resolved successfully");
      refreshComplaints()

      document.getElementById("ad_complaint_Action_model")?.close();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to resolve complaint"
      );
    }
  };

  return (
    <dialog
      id="ad_complaint_Action_model"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box rounded-xl p-4 sm:p-6 bg-white max-w-full sm:max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Complaint Action Panel
          </h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">
              <X />
            </button>
          </form>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 mb-4">
          Complaint raised by{" "}
          <span className="font-medium">{complaintStatus}</span>. You’re taking
          action against the{" "}
          <span className="font-semibold text-orange-600">
            {complaintAgainst}
          </span>
          .
        </p>

        {/* Messages Section */}
        <div className="space-y-4">
          {/* Customer Section */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
              Message to Customer
            </h4>
            <textarea
              className="textarea textarea-bordered w-full text-sm sm:text-base"
              placeholder="Write message to customer..."
              value={customerMessage}
              onChange={(e) => setCustomerMessage(e.target.value)}
              rows="3"
            ></textarea>
          </div>

          {/* Restaurant Section */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
              Message to Restaurant
            </h4>
            <textarea
              className="textarea textarea-bordered w-full text-sm sm:text-base"
              placeholder="Write message to restaurant..."
              value={restaurantMessage}
              onChange={(e) => setRestaurantMessage(e.target.value)}
              rows="3"
            ></textarea>

            {/* Action Buttons */}
            {(complaintAgainst === "restaurant" ||
              complaintAgainst === "customer") && (
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  className={`btn btn-sm  bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-1 sm:gap-2 ${
                    selectedAction === "Warned" ? "ring-2 ring-yellow-400" : ""
                  }`}
                  onClick={() => setSelectedAction("Warned")}
                >
                  <AlertTriangle size={16} /> Warned
                </button>
                <button
                  className={`btn btn-sm  bg-red-500 hover:bg-red-600 text-white flex items-center gap-1 sm:gap-2 ${
                    selectedAction === "Blocked" ? "ring-2 ring-red-400" : ""
                  }`}
                  onClick={() => setSelectedAction("Blocked")}
                >
                  <Ban size={16} /> Blocked
                </button>
                <button
                  className={`btn btn-sm  bg-green-500 hover:bg-green-600 text-white flex items-center gap-1 sm:gap-2 ${
                    selectedAction === "None" ? "ring-2 ring-green-400" : ""
                  }`}
                  onClick={() => setSelectedAction("None")}
                >
                  <CheckCircle size={16} /> None
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Send Button */}
        <div className="modal-action mt-5">
          <button
            onClick={handleSend}
            disabled={
              !selectedAction ||
              (!customerMessage.trim() && !restaurantMessage.trim())
            }
            className="btn w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            <Send size={18} /> Send Message
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Ad_ComplaintActionModel;
