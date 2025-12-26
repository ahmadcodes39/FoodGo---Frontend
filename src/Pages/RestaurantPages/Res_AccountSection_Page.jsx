import React, { useContext, useEffect, useRef, useState } from "react";
import { User, Phone, Mail, Lock, Save, Camera } from "lucide-react";
import { updateProfile } from "../../api/authApi";
import toast from "react-hot-toast";
import { AuthContext } from "../../App Global States/userAuthContext";

const Res_AccountSection_Page = () => {
  const { user, setUser } = useContext(AuthContext);
  const profilePicRef = useRef(null);
  const [profileImage, setProfileImage] = useState("/compressed.jpeg");
  const [profileFile, setProfileFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
      });
      setProfileImage(user.profilePic || "/compressed.jpeg");
    }
  }, [user]);

  const [errors, setErrors] = useState({});

  /* ---------------- VALIDATIONS ---------------- */
  const validateName = (name) => /^[A-Za-z ]{3,}$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^03[0-9]{9}$/.test(phone);
  const validatePassword = (password) =>
    password === "" || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileFile(file);

    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};

    if (!validateName(formData.fullName)) {
      newErrors.fullName = "Name must be at least 3 letters.";
      valid = false;
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address.";
      valid = false;
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Phone must start with 03XXXXXXXXX.";
      valid = false;
    }
    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must include uppercase, lowercase & number.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("name", formData.fullName);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      if (formData.password) fd.append("password", formData.password);
      if (profileFile) fd.append("profilePic", profileFile);

      const response = await updateProfile(fd);

      if (response.data.success) {
        toast.success("Profile updated successfully");
        setFormData((prev) => ({ ...prev, password: "" }));

        if (response.data.user) {
          setUser(response.data.user);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      {/* Profile Image */}
      <div
        className="relative w-36 h-36 group cursor-pointer"
        onClick={() => profilePicRef.current.click()}
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
          ref={profilePicRef}
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
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 btn bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Res_AccountSection_Page;
