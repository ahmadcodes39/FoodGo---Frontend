import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Res_deleteItemModal from "./Models/Res_deleteItemModal";
import Res_menuItemModal from "./Models/Res_menuItemModel";
import Res_editMenuItemModal from "./Models/Res_editMenuItemModal";
import { deleteMenuItem } from "../../api/restaurantApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Res_menuTable = ({
  dummyMenuData,
  isActionAvailable = true,
  refreshContent,
}) => {
  const { id: restaurantId } = useParams();
  const [deleteItem, setDeleteItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleActionClick = (action, item) => {
    if (action === "Delete") {
      setDeleteItem(item);
      setTimeout(() => {
        document.getElementById("delete_modal").showModal();
      }, 0);
    } else if (action === "Edit") {
      setSelectedItem(item);
      setTimeout(() => {
        document.getElementById("edit_menu_modal").showModal();
      }, 0);
    } else if (action === "Add") {
      setSelectedItem(null);
      setTimeout(() => {
        document.getElementById("menu_modal").showModal();
      }, 0);
    }
  };

  const handleDeleteClick = async () => {
    if (!deleteItem) return;

    setLoading(true);
    try {
      const itemId = deleteItem?._id || deleteItem?.id;
      console.log("item to delete : ", deleteItem);
      await deleteMenuItem(restaurantId, itemId);
      toast.success("Menu item deleted successfully!");
      refreshContent();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete menu item"
      );
    } finally {
      setLoading(false);
      setDeleteItem(null);
      setTimeout(() => {
        document.getElementById("delete_modal").close();
      }, 0);
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="table w-full border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr className="text-left">
            <th>ITEM</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {dummyMenuData.length <= 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No menu items found
              </td>
            </tr>
          ) : (
            dummyMenuData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td>
                  <div className="flex lg:flex-row flex-col items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </td>
                <td>{item.category}</td>
                <td>
                  <b>${item.price}</b>
                </td>
                <td>
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 border border-green-300">
                    Active
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    {isActionAvailable && (
                      <button
                        onClick={() => handleActionClick("Edit", item)}
                        className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                      >
                        <Edit size={15} />
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleActionClick("Delete", item)}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      disabled={loading}
                    >
                      <Trash2 size={15} />
                      {loading && deleteItem?._id === item._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Res_deleteItemModal
        selectedItem={deleteItem}
        handleDeleteClick={handleDeleteClick}
        loading={loading}
      />
      <Res_editMenuItemModal
        item={selectedItem}
        refreshContent={refreshContent}
      />
    </div>
  );
};

export default Res_menuTable;
