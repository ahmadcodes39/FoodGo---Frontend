import { ChefHat } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup_Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
  const validatePhone = (phone) => /^03\d{9}$/.test(phone);
  const validateName = (name) => /^[A-Za-z\s]{3,}$/.test(name.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "",
    };

    if (!validateName(name)) {
      newErrors.name =
        "Name must be at least 3 characters and contain only letters and spaces.";
      valid = false;
    }

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!validatePhone(phone)) {
      newErrors.phone = "Phone number must be a valid number starting with 03.";
      valid = false;
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 6 characters and include uppercase, lowercase, and a number.";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    if (!role) {
      newErrors.role = "Please select a role.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    const formData = { name, email, phone, password, role };
    console.log("Form submission:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="flex items-center gap-2 justify-center text-3xl font-bold text-center text-orange-500 mb-2">
        FoodGo <ChefHat size={32} />
      </h1>

      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-1">
        Create an Account
      </h2>
      <p className="text-gray-600 mb-6">
        Sign up to start ordering delicious food!
      </p>

      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-orange-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-orange-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03XXXXXXXXX"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-orange-500"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-orange-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-orange-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-gray-700 mb-1">Register As</label>
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={role === "customer"}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-radio text-orange-500"
                />
                <span className="ml-2 text-gray-700">Customer</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="restaurant"
                  checked={role === "restaurant"}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-radio text-orange-500"
                />
                <span className="ml-2 text-gray-700">Restaurant Owner</span>
              </label>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup_Page;
