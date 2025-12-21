import React, { useState } from "react";
import { addMenu } from "../../../api/restaurantApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Res_menuItemModal = () => {
  const { id } = useParams(); // ✅ fixed useParams
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // ✅ loading state

  // ✅ Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should contain only letters and spaces.";
    }

    if (!formData.price) {
      newErrors.price = "Price is required.";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.category)) {
      newErrors.category = "Category should contain only letters and spaces.";
    }

    if (!formData.image) {
      newErrors.image = "image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const menuData = new FormData();
      menuData.append("name", formData.name);
      menuData.append("price", formData.price);
      menuData.append("category", formData.category);
      menuData.append("image", formData.image);

      const response = await addMenu(id, menuData);
      if (response.data.success) {
        toast.success("Menu item added successfully");
        // Reset form
        setFormData({ name: "", price: "", category: "", image: null });
        document.getElementById("menu_modal").close();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false); // ✅ always reset loading
    }
  };

  return (
    <dialog id="menu_modal" className="modal">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Add New Menu Item</h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:outline-none ${
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orangeBtn"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:outline-none ${
                errors.price
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orangeBtn"
              }`}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:outline-none ${
                errors.category
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orangeBtn"
              }`}
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* image */}
          <div>
            <label className="block text-sm font-medium mb-1">image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-orangeBtn file:text-white hover:file:bg-orange-500 ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => document.getElementById("menu_modal").close()}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading} // ✅ disable button when loading
              className="px-4 py-2 rounded-md text-white transition bg-orangeBtn hover:bg-orange-500 flex items-center justify-center gap-2"
            >
              {loading && <span className="loading loading-spinner loading-sm"></span>}
              Add Item
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Res_menuItemModal;
