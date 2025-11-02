import React, { useRef, useState } from "react";
import { User, Phone, Mail, Lock, Save, Camera } from "lucide-react";

const Res_AccountSection_Page = () => {
  const profilePic = useRef(null);

  // ✅ States for inputs
  const [profileImage, setProfileImage] = useState("/compressed.jpeg");
  const [formData, setFormData] = useState({
    fullName: "Zaid Khan",
    email: "zaid@example.com",
    phone: "0300-1234567",
    password: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  // ✅ Validation functions
  const validateName = (name) => /^[A-Za-z ]{3,}$/.test(name);
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^03[0-9]{9}$/.test(phone);
  const validatePassword = (password) =>
    password === "" || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);

  // ✅ Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Trigger file input
  const handleImageClick = () => {
    profilePic.current.click();
  };

  // ✅ Handle Save with validations
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { fullName: "", email: "", phone: "", password: "" };

    if (!validateName(formData.fullName)) {
      newErrors.fullName =
        "Full name must be at least 3 characters and contain only letters and spaces.";
      valid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone =
        "Phone number must be valid and start with 03 (e.g. 03001234567).";
      valid = false;
    }

    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters and include uppercase, lowercase, and a number.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    console.log("Updated Data:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      {/* Profile Image */}
      <div
        className="relative w-36 h-36 group cursor-pointer"
        onClick={handleImageClick}
      >
        <img
          src={profileImage}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-orange-500 shadow-md transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <Camera size={28} className="text-white" />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={profilePic}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Header */}
      <h2 className="mt-5 text-2xl font-bold text-orange-500 flex items-center gap-2">
        <User className="text-orange-500" />
        Account Settings
      </h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl"
      >
        {/* Full Name */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Full Name</span>
          </div>
          <label className="input flex items-center gap-2 border border-gray-300 rounded-lg focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
            <User size={18} className="text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="grow"
              placeholder="Enter full name"
            />
          </label>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </label>

        {/* Email */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Email Address</span>
          </div>
          <label className="input flex items-center gap-2 border border-gray-300 rounded-lg focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="grow"
              placeholder="Enter email address"
            />
          </label>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </label>

        {/* Phone Number */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Phone Number</span>
          </div>
          <label className="input flex items-center gap-2 border border-gray-300 rounded-lg focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
            <Phone size={18} className="text-gray-400" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="grow"
              placeholder="Enter phone number"
            />
          </label>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </label>

        {/* Password */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <label className="input flex items-center gap-2 border border-gray-300 rounded-lg focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
            <Lock size={18} className="text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="grow"
              placeholder="••••••••"
            />
          </label>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
          <div className="label">
            <span className="label-text-alt text-gray-500">
              Leave blank if you don’t want to change password
            </span>
          </div>
        </label>

        {/* Save Button */}
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="btn w-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2 text-sm font-semibold"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Res_AccountSection_Page;
