import React, { useEffect, useRef, useState } from "react";

const Res_editMenuItemModal = ({ item }) => {
   const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
    preview: null,
  });

  const fileInputRef = useRef(null); // reference to file input

  useEffect(() => {
    setFormData({
      name: item?.name || "",
      price: item?.price || "",
      category: item?.category || "",
      image: item?.image || null,
      preview: null, // reset preview when switching items
    });

    // clear file input field when switching items
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("updated data is: ", formData);
    document.getElementById("edit_menu_modal").close();
  };

  return (
    <dialog id="edit_menu_modal" className="modal">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Edit Menu Item</h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              requ
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blueBtn focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blueBtn focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blueBtn focus:outline-none"
            />
          </div>
          {/* image */}
          <div>
            <label className="block text-sm font-medium mb-1">Logo</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              ref={fileInputRef} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blueBtn file:text-white hover:file:bg-blue-500"
            />

            {/* preview */}
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
