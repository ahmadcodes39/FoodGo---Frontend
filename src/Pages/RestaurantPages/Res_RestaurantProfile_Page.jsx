import React, { useRef, useState } from "react";
import { Save, UtensilsCrossed, Camera } from "lucide-react";

const Res_RestaurantProfile_Page = () => {
  const [formData, setFormData] = useState({
    name: "Spicy Hut",
    restaurantPhoneNumber: "03001234567",
    address: "123 Food Street, Lahore",
    cuisine: "Pakistani, BBQ",
    description: "Famous for traditional spicy dishes and great ambience.",
    openingHours: "9AM - 11PM",
    deliveryAvailable: true,
    deliveryTime: "30-40 mins",
    logo: "/burger.jpeg",
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // ✅ Image Upload Handlers
  const handleImageClick = () => fileInputRef.current.click();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, logo: imageUrl, logoFile: file }));
    }
  };

  // ✅ Input Change Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


const validateName = (name) => /^[A-Za-z\s]{3,}$/.test(name.trim());

const validatePhone = (phone) => /^03\d{9}$/.test(phone.trim());

const validateCuisine = (cuisine) =>
  /^([A-Za-z\s]+)(,\s*[A-Za-z\s]+)*$/.test(cuisine.trim());

const validateDescription = (desc) => {
  const len = desc.trim().length;
  return len >= 10 && len <= 500;
};

const validateOpeningHours = (hours) =>
  /^([1-9]|1[0-2])(:[0-5][0-9])?\s?(AM|PM)\s*-\s*([1-9]|1[0-2])(:[0-5][0-9])?\s?(AM|PM)$/i.test(
    hours.trim()
  );

const validateDeliveryTime = (time) =>
  /^\d{1,2}-\d{1,2}\s*(mins|minutes)$/i.test(time.trim());

const handleSubmit = (e) => {
  e.preventDefault();
  let valid = true;
  const newErrors = {};

  // Restaurant Name
  if (!formData.name.trim()) {
    newErrors.name = "Restaurant name is required.";
    valid = false;
  } else if (!validateName(formData.name)) {
    newErrors.name =
      "Restaurant name must be at least 3 characters and contain only letters and spaces.";
    valid = false;
  }

  // Phone
  if (!validatePhone(formData.restaurantPhoneNumber)) {
    newErrors.restaurantPhoneNumber =
      "Phone number must start with 03 and contain exactly 11 digits (no spaces or letters).";
    valid = false;
  }

  // Address
  if (!formData.address.trim()) {
    newErrors.address = "Address is required.";
    valid = false;
  }

  // Cuisine
  if (!formData.cuisine.trim()) {
    newErrors.cuisine = "Cuisine type is required.";
    valid = false;
  } else if (!validateCuisine(formData.cuisine)) {
    newErrors.cuisine =
      "Cuisine entries must be comma-separated words (e.g., Italian, Chinese, BBQ).";
    valid = false;
  }

  // Opening Hours
  if (!formData.openingHours.trim()) {
    newErrors.openingHours = "Opening hours are required.";
    valid = false;
  } else if (!validateOpeningHours(formData.openingHours)) {
    newErrors.openingHours =
      "Opening hours must be valid like '9AM - 11PM' or '10:30AM - 8:15PM'.";
    valid = false;
  }

  // Description
  if (!formData.description.trim()) {
    newErrors.description = "Description is required.";
    valid = false;
  } else if (!validateDescription(formData.description)) {
    newErrors.description =
      "Description must be between 10 and 500 characters.";
    valid = false;
  }

  // Delivery Time (if delivery available)
  if (formData.deliveryAvailable) {
    if (!formData.deliveryTime.trim()) {
      newErrors.deliveryTime = "Please provide estimated delivery time.";
      valid = false;
    } else if (!validateDeliveryTime(formData.deliveryTime)) {
      newErrors.deliveryTime =
        "Format must be like '30-40 mins' or '25-35 minutes'.";
      valid = false;
    }
  }

  setErrors(newErrors);
  if (!valid) return;

  console.log("✅ Updated Restaurant Profile:", formData);
};


  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
            <UtensilsCrossed size={30} />
            Restaurant Profile
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Upload */}
          <div className="md:col-span-2 flex justify-center mb-6">
            <div
              className="relative w-36 h-36 group cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={formData.logo}
                alt="Restaurant Logo"
                className="w-36 h-36 rounded-full object-cover border-4 border-orange-500 shadow-md transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Camera size={28} className="text-white" />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Restaurant Name */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Restaurant Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-400" : "focus:ring-orange-400"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="restaurantPhoneNumber"
              value={formData.restaurantPhoneNumber}
              onChange={handleChange}
              className={`border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 ${
                errors.restaurantPhoneNumber
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-orange-400"
              }`}
            />
            {errors.restaurantPhoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.restaurantPhoneNumber}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2 flex flex-col">
            <label className="font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              className={`border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 ${
                errors.address ? "border-red-500 focus:ring-red-400" : "focus:ring-orange-400"
              }`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Cuisine */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Cuisine</label>
            <input
              type="text"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className={`border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 ${
                errors.cuisine ? "border-red-500 focus:ring-red-400" : "focus:ring-orange-400"
              }`}
            />
            {errors.cuisine && <p className="text-red-500 text-sm mt-1">{errors.cuisine}</p>}
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Opening Hours</label>
            <input
              type="text"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              className={`border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 ${
                errors.openingHours
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-orange-400"
              }`}
            />
            {errors.openingHours && (
              <p className="text-red-500 text-sm mt-1">{errors.openingHours}</p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            <label className="font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 ${
                errors.description
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-orange-400"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Delivery Option */}
          <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="deliveryAvailable"
                checked={formData.deliveryAvailable}
                onChange={handleChange}
                className="checkbox checkbox-warning"
              />
              <span className="font-medium text-gray-700">Delivery Available</span>
            </label>

            {formData.deliveryAvailable && (
              <div className="flex-1">
                <input
                  type="text"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  placeholder="e.g., 30-40 mins"
                  className={`border rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                    errors.deliveryTime
                      ? "border-red-500 focus:ring-red-400"
                      : "focus:ring-orange-400"
                  }`}
                />
                {errors.deliveryTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.deliveryTime}</p>
                )}
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="btn bg-orange-500 hover:bg-orange-600 text-white w-full text-sm font-semibold flex items-center justify-center gap-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Res_RestaurantProfile_Page;
