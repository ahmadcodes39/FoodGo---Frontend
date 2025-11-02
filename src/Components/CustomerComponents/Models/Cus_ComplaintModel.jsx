import React from "react";

const Cus_ComplaintModel = () => {
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
        ></textarea>
        <div className="flex justify-end gap-3">
          <form method="dialog">
            <button className="btn bg-gray-100 text-gray-600 hover:bg-gray-200">
              Cancel
            </button>
          </form>
          <button className="btn bg-orange-500 hover:bg-orange-600 text-white">
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Cus_ComplaintModel;
