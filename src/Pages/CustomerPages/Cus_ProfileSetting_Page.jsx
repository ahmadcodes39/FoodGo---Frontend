import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
import Header from "../../Components/Landing Page Components/Header";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../App Global States/userAuthContext";
import { updateProfile } from "../../api/authApi";
import toast from "react-hot-toast";
import Loading from "../../Components/LoadingSpinner/Loading";
import { useNavigate } from "react-router-dom";

const Cus_ProfileSetting_Page = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    profilePic: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // console.log(user);
    setFormData({
      profilePic: user?.profilePic,
      fullName: user?.name,
      email: user?.email,
      phone: user?.phone,
      password: user?.password,
      confirmPassword: user?.password,
    });
  }, [user]);

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const validate = () => {
    const newErrors = {};

    if (formData.fullName.trim().length < 3)
      newErrors.fullName = "Name must be at least 3 characters long.";
    else if (!/^[A-Za-z\s]+$/.test(formData.fullName))
      newErrors.fullName = "Name must contain only letters and spaces.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address.";

    // ✅ Updated phone number validation
    const phone = formData.phone.trim(); // remove leading/trailing spaces
    if (!/^03\d{9}$/.test(phone))
      newErrors.phone =
        "Phone number must start with 03 and contain exactly 11 digits (no spaces or letters).";

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    // Only validate password if user entered something
    if (formData.password) {
      if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          "Password must be at least 6 characters and include uppercase, lowercase, and a number.";
      }

      // Check confirm password only if password is entered
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      try {
        const data = new FormData();
        data.append("name", formData.fullName);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        if (formData.password) data.append("password", formData.password);
        if (fileInputRef.current.files[0])
          data.append("profilePic", fileInputRef.current.files[0]);

        const response = await updateProfile(data);
        if (response.data.success) {
          toast.success(response.data.message);
          setLoading(false);
          navigate('/home')
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="mt-[70px] md:mt-[20px] min-h-screen flex justify-center items-center bg-gray-100 py-10 px-4 overflow-y-auto md:overflow-y-hidden">
        <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden max-w-5xl w-full">
          <div className="md:w-1/3 bg-gradient-to-br from-orange-500 to-orange-600 text-white flex flex-col items-center justify-center p-6">
            <div
              className="relative w-36 h-36 group cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={formData.profilePic}
                alt="profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
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

            <h3 className="text-lg font-semibold mt-4">{formData.fullName}</h3>
            <p className="text-sm text-orange-100">{formData.email}</p>
          </div>

          {/* Right Section - Form */}
          <div className="md:w-2/3 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Profile Settings
            </h2>
            <p className="text-gray-500 mb-6">
              Update your account information below.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Full Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-xs text-gray-600">
                    Leave empty to keep current password
                  </p>

                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cus_ProfileSetting_Page;
