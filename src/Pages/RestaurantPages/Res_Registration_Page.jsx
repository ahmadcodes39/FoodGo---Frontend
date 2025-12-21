import { ChefHat } from "lucide-react";
import React, { useState } from "react";
import { registerRestaurant } from "../../api/restaurantApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Res_Registration_Page = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    restaurantPhoneNumber: "",
    address: "",
    logo: "",
    license: "",
    cuisine: "",
    description: "",
    openingHours: "",
    deliveryAvailable: true,
    deliveryTime: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    // ✅ Restaurant Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Restaurant name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Restaurant name must contain only letters and spaces.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Restaurant name must be at least 3 characters long.";
    }

    // ✅ Phone Number Validation (Only digits, start with 03, 11 digits)
    const phone = formData.restaurantPhoneNumber.trim();
    if (!/^03\d{9}$/.test(phone)) {
      newErrors.restaurantPhoneNumber =
        "Phone number must start with 03 and contain exactly 11 digits (no spaces or letters).";
    }

    // ✅ Address Validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    // ✅ Logo and License Required
    if (!formData.logo) {
      newErrors.logo = "Restaurant logo is required.";
    }

    if (!formData.license) {
      newErrors.license = "Restaurant license is required.";
    }

    // ✅ Cuisine Validation (must be comma-separated entries)
    if (!formData.cuisine.trim()) {
      newErrors.cuisine = "At least one cuisine is required.";
    } else if (
      !/^([A-Za-z\s]+)(,\s*[A-Za-z\s]+)*$/.test(formData.cuisine.trim())
    ) {
      newErrors.cuisine =
        "Cuisine entries must be comma-separated words (e.g., Italian, Chinese, Pakistani).";
    }

    // ✅ Description Validation (10–500 chars)
    const descLength = formData.description.trim().length;
    if (descLength < 10) {
      newErrors.description =
        "Description must be at least 10 characters long.";
    } else if (descLength > 500) {
      newErrors.description = "Description must not exceed 500 characters.";
    }

    // ✅ Opening Hours Validation (like 9AM-11PM or 10:30AM - 8:15PM)
    const openingHoursRegex =
      /^([1-9]|1[0-2])(:[0-5][0-9])?\s?(AM|PM)\s*-\s*([1-9]|1[0-2])(:[0-5][0-9])?\s?(AM|PM)$/i;
    if (!formData.openingHours.trim()) {
      newErrors.openingHours = "Opening hours are required.";
    } else if (!openingHoursRegex.test(formData.openingHours.trim())) {
      newErrors.openingHours =
        "Invalid format. Example: '9AM-11PM' or '10:30AM - 8:15PM'.";
    }

    // ✅ Delivery Time (required if delivery available)
    if (formData.deliveryAvailable && !formData.deliveryTime.trim()) {
      newErrors.deliveryTime =
        "Please specify delivery time if delivery is available.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!validateForm()) {
      console.log("Validation failed", errors);
      setLoading(false);
      return;
    }
    if (!validateForm()) {
      console.log("Validation failed", errors);
      return;
    }
    try {
      const restaurantData = new FormData();
      restaurantData.append("name", formData.name);
      restaurantData.append(
        "restaurantPhoneNumber",
        formData.restaurantPhoneNumber
      );
      restaurantData.append("address", formData.address);
      restaurantData.append("cuisine", formData.cuisine);
      restaurantData.append("description", formData.description);
      restaurantData.append("openingHours", formData.openingHours);
      restaurantData.append("deliveryAvailable", formData.deliveryAvailable);
      restaurantData.append("deliveryTime", formData.deliveryTime);
      restaurantData.append("logo", formData.logo);
      restaurantData.append("license", formData.license);

      const response = await registerRestaurant(restaurantData);
      const data = response.data;
      if (data.success) {
        toast.success("Restaurant Register Successfuly");
        setFormData({
          name: "",
          restaurantPhoneNumber: "",
          address: "",
          cuisine: "",
          description: "",
          openingHours: "",
          deliveryAvailable: "",
          deliveryTime: "",
          logo: null,
          license: null,
        });

        document.getElementById("logoInput").value = "";
        document.getElementById("licenseInput").value = "";
        setLoading(false);
        navigate("/restaurant/register-status");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="card w-full max-w-2xl bg-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-orange-500">
            Register Your Restaurant{" "}
            <ChefHat size={28} className="hidden md:inline" />
          </h2>
          <p className="text-gray-600 mb-4">
            Fill in the details below to register your restaurant.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Restaurant Name */}
            <div>
              <label className="label">
                <span className="label-text">Restaurant Name *</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Spicy Hut"
                className={`input w-full ${
                  errors.name
                    ? "input-error"
                    : "focus:ring-2 focus:ring-orange-400"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="label">
                <span className="label-text">Phone Number *</span>
              </label>
              <input
                type="text"
                name="restaurantPhoneNumber"
                value={formData.restaurantPhoneNumber}
                onChange={handleChange}
                placeholder="10-15 digit phone number"
                className={`input w-full ${
                  errors.restaurantPhoneNumber
                    ? "input-error"
                    : "focus:ring-2 focus:ring-orange-400"
                }`}
              />
              {errors.restaurantPhoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.restaurantPhoneNumber}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="label">
                <span className="label-text">Address *</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
                className={`textarea w-full ${
                  errors.address
                    ? "textarea-error"
                    : "focus:ring-2 focus:ring-orange-400"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Logo */}
            <div>
              <label className="label">
                <span className="label-text">Restaurant Logo *</span>
              </label>
              <input
                type="file"
                name="logo"
                id="logoInput"
                accept="image/*"
                onChange={handleChange}
                className={`file-input w-full ${
                  errors.logo
                    ? "file-input-error"
                    : "focus:ring-2 focus:ring-orange-400"
                }`}
              />
              {errors.logo && (
                <p className="text-red-500 text-sm mt-1">{errors.logo}</p>
              )}
            </div>

            {/* License */}
            <div>
              <label className="label">
                <span className="label-text">License *</span>
              </label>
              <input
                type="file"
                name="license"
                id="licenseInput"
                accept="image/*"
                onChange={handleChange}
                className={`file-input w-full ${
                  errors.license
                    ? "file-input-error"
                    : "focus:ring-2 focus:ring-orange-400"
                }`}
              />
              {errors.license && (
                <p className="text-red-500 text-sm mt-1">{errors.license}</p>
              )}
            </div>

            {/* Cuisine */}
            <div>
              <label className="label">
                <span className="label-text">Cuisine *</span>
              </label>
              <input
                type="text"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                placeholder="e.g., Italian, Indian"
                className={`input w-full ${
                  errors.cuisine
                    ? "input-error"
                    : "focus:ring-2 focus:ring-orange-400"
                }`}
              />
              {errors.cuisine && (
                <p className="text-red-500 text-sm mt-1">{errors.cuisine}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Short description (max 500 chars)"
                maxLength="500"
                className={`textarea w-full ${
                  errors.description
                    ? "textarea-error"
                    : "focus:ring-2 focus:ring-orange-400"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Opening Hours */}
            <div>
              <label className="label">
                <span className="label-text">Opening Hours *</span>
              </label>
              <input
                type="text"
                name="openingHours"
                value={formData.openingHours}
                onChange={handleChange}
                placeholder="e.g., 9AM - 11PM"
                className={`input w-full ${
                  errors.openingHours
                    ? "input-error"
                    : "focus:ring-2 focus:ring-orange-400"
                }`}
              />
              {errors.openingHours && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.openingHours}
                </p>
              )}
            </div>

            {/* Delivery Options */}
            <div className="md:flex-row flex-col items-center gap-4">
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  name="deliveryAvailable"
                  checked={formData.deliveryAvailable}
                  onChange={handleChange}
                  className="checkbox checkbox-warning"
                />
                <span className="label-text">Delivery Available</span>
              </label>
              {formData.deliveryAvailable && (
                <div className="flex-1">
                  <input
                    type="text"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                    placeholder="e.g., 30-40 mins"
                    className={`input w-full md:mt-0 mt-5 ${
                      errors.deliveryTime
                        ? "input-error"
                        : "focus:ring-2 focus:ring-orange-400"
                    }`}
                  />
                  {errors.deliveryTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.deliveryTime}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-orange-500 hover:bg-orange-600 text-white"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Register Restaurant"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Res_Registration_Page;
