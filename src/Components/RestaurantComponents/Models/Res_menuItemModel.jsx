import React, { useState } from "react";

const Res_menuItemModal = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    logo: null,
  });

  const [errors, setErrors] = useState({});

  // ✅ Validation Logic
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should contain only letters and spaces.";
    }

    // Price validation
    if (!formData.price) {
      newErrors.price = "Price is required.";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    // Category validation
    if (!formData.category.trim()) {
      newErrors.category = "Category is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.category)) {
      newErrors.category = "Category should contain only letters and spaces.";
    }

    if (!formData.logo) {
  newErrors.logo = "Logo is required.";
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
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error as user types
  };

  // ✅ Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("New Menu Item:", formData);

    // Close modal after success
    document.getElementById("menu_modal").close();

    // Reset form
    setFormData({ name: "", price: "", category: "", logo: null });
  };

  return (
    <dialog id="menu_modal" className="modal">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-4 text-gray-800">
          Add New Menu Item
        </h3>

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
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
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
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
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
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Logo */}
          <div>
            <label className="block text-sm font-medium mb-1">Logo</label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-orangeBtn file:text-white hover:file:bg-orange-500 ${
                errors.logo ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.logo && (
              <p className="text-red-500 text-sm mt-1">{errors.logo}</p>
            )}
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
              className="px-4 py-2 rounded-md text-white transition bg-orangeBtn hover:bg-orange-500"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Res_menuItemModal;
