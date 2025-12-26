import React, { useEffect, useRef, useState } from "react";
import { UtensilsCrossed, Camera, FileText } from "lucide-react";
import { getRestaurantInfo, updateRestaurantDetails } from "../../api/restaurantApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Components/LoadingSpinner/Loading";

const Res_RestaurantProfile_Page = () => {
  const { id: restaurantId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    restaurantPhoneNumber: "",
    address: "",
    cuisine: "",
    description: "",
    openingHours: "",
    deliveryAvailable: false,
    deliveryTime: "",
    logo: "",
    license: "",
  });

  const fileInputLogoRef = useRef(null);
  const fileInputLicenseRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch restaurant details
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        setFetching(true);
        const response = await getRestaurantInfo(restaurantId);
        if (response.data.success) {
          const restaurant = response.data.restaurant;
          setFormData({
            name: restaurant.name || "",
            restaurantPhoneNumber: restaurant.restaurantPhoneNumber || "",
            address: restaurant.address || "",
            cuisine: restaurant.cuisine ? restaurant.cuisine.join(", ") : "",
            description: restaurant.description || "",
            openingHours: restaurant.openingHours || "",
            deliveryAvailable: restaurant.deliveryAvailable || false,
            deliveryTime: restaurant.deliveryTime || "",
            logo: restaurant.logo || "",
            license: restaurant.license || "",
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch restaurant details");
      } finally {
        setFetching(false);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // File upload handler
  const handleImageClick = (type) => {
    if (type === "logo") fileInputLogoRef.current.click();
    if (type === "license") fileInputLicenseRef.current.click();
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [type]: imageUrl,
        [`${type}File`]: file,
      }));
    }
  };

  // Validation functions
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

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};

    // Validations
    if (!formData.name.trim() || !validateName(formData.name)) {
      newErrors.name = "Restaurant name must be at least 3 letters and only letters/spaces.";
      valid = false;
    }
    if (!validatePhone(formData.restaurantPhoneNumber)) {
      newErrors.restaurantPhoneNumber =
        "Phone number must start with 03 and contain exactly 11 digits.";
      valid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
      valid = false;
    }
    if (!formData.cuisine.trim() || !validateCuisine(formData.cuisine)) {
      newErrors.cuisine = "Cuisine must be comma-separated words (e.g., Italian, BBQ).";
      valid = false;
    }
    if (!formData.openingHours.trim() || !validateOpeningHours(formData.openingHours)) {
      newErrors.openingHours = "Opening hours must be like '9AM - 11PM'.";
      valid = false;
    }
    if (!formData.description.trim() || !validateDescription(formData.description)) {
      newErrors.description = "Description must be 10-500 characters.";
      valid = false;
    }
    if (formData.deliveryAvailable) {
      if (!formData.deliveryTime.trim() || !validateDeliveryTime(formData.deliveryTime)) {
        newErrors.deliveryTime = "Format must be like '30-40 mins'.";
        valid = false;
      }
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      setLoading(true);
      const data = new FormData();

      // Append text fields
      [
        "name",
        "restaurantPhoneNumber",
        "address",
        "cuisine",
        "description",
        "openingHours",
        "deliveryAvailable",
        "deliveryTime",
      ].forEach((field) => {
        data.append(field, formData[field]);
      });

      // Append files if updated
      if (formData.logoFile) data.append("logo", formData.logoFile);
      if (formData.licenseFile) data.append("license", formData.licenseFile);

      const response = await updateRestaurantDetails(restaurantId, data);

      if (response.data.success) {
        toast.success("Restaurant profile updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
            <UtensilsCrossed size={30} />
            Restaurant Profile
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <label className="font-medium text-gray-700 mb-2">Logo</label>
            <div
              className="relative w-36 h-36 group cursor-pointer"
              onClick={() => handleImageClick("logo")}
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
                ref={fileInputLogoRef}
                onChange={(e) => handleImageChange(e, "logo")}
                className="hidden"
              />
            </div>
          </div>

         {/* License */}
          <div className="flex flex-col items-center mb-6">
            <label className="font-medium text-gray-700 mb-2">License</label>
            <div
              className="relative w-36 h-36 group cursor-pointer border-4 border-gray-300 rounded-lg flex items-center justify-center shadow-md"
              onClick={() => handleImageClick("license")}
            >
              {formData.license ? (
                <img
                  src={formData.license}
                  alt="License"
                  className="w-36 h-36 object-cover rounded-lg"
                />
              ) : (
                <FileText size={36} className="text-gray-500" />
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputLicenseRef}
                onChange={(e) => handleImageChange(e, "license")}
                className="hidden"
              />
            </div>
            {formData.license && (
              <a
                href={formData.license}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-sm text-blue-500 underline"
              >
                View License
              </a>
            )}
          </div>

          {/* Name */}
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

          {/* Phone */}
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
              disabled={loading}
              className="btn bg-orange-500 hover:bg-orange-600 text-white w-full text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving...": "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Res_RestaurantProfile_Page;
