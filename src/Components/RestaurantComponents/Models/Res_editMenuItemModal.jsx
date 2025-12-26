import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { editMenuItem } from "../../../api/restaurantApi";
import toast from "react-hot-toast";

const Res_editMenuItemModal = ({ item, refreshContent }) => {
  const { id: restaurantId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
    preview: null,
  });
//   useEffect(()=>{
// console.log(item)
//   },[item.id])
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // loading state
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData({
      name: item?.name || "",
      price: item?.price || "",
      category: item?.category || "",
      image: item?.image || null,
      preview: null,
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
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

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    else if (!/^[A-Za-z\s]+$/.test(formData.name))
      newErrors.name = "Name should contain only letters and spaces.";

    if (!formData.price) newErrors.price = "Price is required.";
    else if (Number(formData.price) <= 0)
      newErrors.price = "Price must be positive.";

    if (!formData.category.trim()) newErrors.category = "Category is required.";
    else if (!/^[A-Za-z\s]+$/.test(formData.category))
      newErrors.category = "Category should contain only letters and spaces.";

    if (!formData.image) newErrors.image = "Logo is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!item || !item.id) {
      toast.error("Invalid menu item selected.");
      return;
    }

    try {
      setLoading(true);

      // if you need to send multipart/form-data for image
    const payload = new FormData();
payload.append("name", formData.name);
payload.append("price", formData.price);
payload.append("category", formData.category);

// ✅ Update here: send new file OR existing image URL
if (formData.image instanceof File) {
  payload.append("image", formData.image);
} else if (typeof formData.image === "string") {
  payload.append("imageUrl", formData.image); // existing image
}

await editMenuItem(restaurantId, item.id, payload);

      toast.success("Menu item updated successfully!");

      // refresh parent data
      if (refreshContent) await refreshContent();

      document.getElementById("edit_menu_modal").close();
    } catch (err) {
      console.error("Edit Menu Item Error:", err);
      // toast.error(err?.response?.data?.message || "Failed to update menu item");
    } finally {
      setLoading(false);
    }
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
              className={`w-full border ${
                errors.price ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 focus:ring-2 focus:ring-blueBtn focus:outline-none`}
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
              className={`w-full border ${
                errors.category ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 focus:ring-2 focus:ring-blueBtn focus:outline-none`}
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
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
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

            {/* Preview */}
            {formData.preview ? (
              <img src={formData.preview} alt="Preview" className="w-20 h-20 rounded mt-2 object-cover border" />
            ) : (
              formData.image && typeof formData.image === "string" && (
                <img src={formData.image} alt="Current" className="w-20 h-20 rounded mt-2 object-cover border" />
              )
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
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blueBtn hover:bg-blue-500"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Res_editMenuItemModal;
