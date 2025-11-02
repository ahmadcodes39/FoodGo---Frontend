import React, { useEffect, useRef, useState } from "react";

const Res_editMenuItemModal = ({ item }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
    preview: null,
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData({
      name: item?.name || "",
      price: item?.price || "",
      category: item?.category || "",
      image: item?.image || null,
      preview: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
        preview: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ✅ Validation (same logic as your add modal)
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

    // Logo (image) validation
    if (!formData.image) {
      newErrors.image = "Logo is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // console.log("Updated data:", formData);
    document.getElementById("edit_menu_modal").close();
  };

  return (
    <dialog id="edit_menu_modal" className="modal">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Edit Menu Item</h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 focus:ring-2 focus:ring-blueBtn focus:outline-none`}
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
              className={`w-full border ${
                errors.price ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 focus:ring-2 focus:ring-blueBtn focus:outline-none`}
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
              className={`w-full border ${
                errors.category ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 focus:ring-2 focus:ring-blueBtn focus:outline-none`}
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
              name="image"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleChange}
              className={`w-full border ${
                errors.image ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blueBtn file:text-white hover:file:bg-blue-500`}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}

            {/* Preview */}
            {formData.preview && (
              <img
                src={formData.preview}
                alt="Preview"
                className="w-20 h-20 rounded mt-2 object-cover border"
              />
            )}
            {!formData.preview &&
              formData.image &&
              typeof formData.image === "string" && (
                <img
                  src={formData.image}
                  alt="Current"
                  className="w-20 h-20 rounded mt-2 object-cover border"
                />
              )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => document.getElementById("edit_menu_modal").close()}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-white transition bg-blueBtn hover:bg-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Res_editMenuItemModal;
