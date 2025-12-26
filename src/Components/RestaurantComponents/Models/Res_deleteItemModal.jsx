import React from "react";

const Res_deleteItemModal = ({ selectedItem ,handleDeleteClick,loading }) => {
  return (
    <dialog id="delete_modal" className="modal">
      <div className="modal-box rounded-xl shadow-lg">
        <h3 className="font-bold text-lg text-red-600">Delete Confirmation</h3>
        <p className="py-4 text-gray-700">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{selectedItem?.name}</span> ? This
          action cannot be undone.
        </p>
        <div className="modal-action flex gap-3">
          <form method="dialog">
            <button className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
              Cancel
            </button>
          </form>
          <button
            className="px-4 py-2 rounded-md bg-redBtn text-white hover:bg-red-600"
            onClick={handleDeleteClick}
            disabled={loading}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Res_deleteItemModal;
