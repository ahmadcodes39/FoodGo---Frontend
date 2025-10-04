import { ChefHat } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login_Page = () => {
  // -------------------- STATES --------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // default role

  // -------------------- HANDLER --------------------
  const handleFormSubmission = (e) => {
    e.preventDefault();

    const formData = {
      role,
      email,
      password,
    };

    if (role === "customer") {
      console.log("submission for customer:", formData);
    } else if (role === "restaurant owner") {
      console.log("submission for restaurant owner:", formData);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Brand */}
        <h1 className="flex items-center gap-2 justify-center text-3xl font-bold text-center text-orange-500 mb-2">
          FoodGo <ChefHat size={32} />
        </h1>

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-1">
          Login
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Welcome back! Please sign in to your account.
        </p>

        {/* Form */}
        <form onSubmit={handleFormSubmission} className="space-y-4">
          {/* Role Selector */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="customer">Customer</option>
              <option value="restaurant owner">Restaurant Owner</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md font-medium hover:bg-orange-600 transition"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/create-account" className="text-orange-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login_Page;
