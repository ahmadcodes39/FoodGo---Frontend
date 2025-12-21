import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { makeAComplaint } from "../../../api/customerApi";

const Cus_ComplaintModel = ({
  dataForComplaint,
  setDataForComplaint,
  setActive,
}) => {
  const [reason, setReason] = useState(dataForComplaint.reason || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const myFun = async () => {
      const complaintData = { ...dataForComplaint, reason };
      const response = await makeAComplaint(complaintData);
      const data = response.data;
        if (data.success) {
        setActive(true);
        }
    };
    myFun();
  }, []);
  const doAComplaint = async () => {
    setLoading(true);
    if (!reason) {
      toast.error("Please provide a reason for the complaint");
      setLoading(false);
      return;
    }
    const complaintData = { ...dataForComplaint, reason };
    try {
      const response = await makeAComplaint(complaintData);
      const data = response.data;

      if (data.success) {
        toast.success("Complaint Submitted Successfully");
        setActive(true);
        // Close modal
        const modal = document.getElementById("cus_complaint_modal");
        modal?.close();
        // Reset reason
        setReason("");
        setDataForComplaint((prev) => ({ ...prev, reason: "" }));
        setLoading(false);
        document.getElementById("cus_complaint_modal").close();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <dialog id="cus_complaint_modal" className="modal">
      <div className="modal-box rounded-2xl p-6">
        <h3 className="font-bold text-lg mb-4 text-gray-800">
          Submit Complaint
        </h3>
        <textarea
          className="textarea textarea-bordered w-full mb-4"
          rows={4}
          placeholder="Describe your issue with this order..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-3">
          <form method="dialog">
            <button
              className="btn bg-gray-100 text-gray-600 hover:bg-gray-200"
              disabled={loading}
            >
              Cancel
            </button>
          </form>
          <button
            className="btn bg-orange-500 hover:bg-orange-600 text-white"
            onClick={doAComplaint}
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Cus_ComplaintModel;
