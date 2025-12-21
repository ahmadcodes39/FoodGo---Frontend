import { ChefHat } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../App Global States/userAuthContext";

const Login_Page = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const validateName = (name) => /^[A-Za-z\s]{3,}$/.test(name.trim());

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: "", email: "", password: "", role: "" };

    if (!validateName(name)) {
      newErrors.name =
        "Name must be at least 3 characters and contain only letters and spaces.";
      valid = false;
    }

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    if (!role) {
      newErrors.role = "Please select a role.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    // const formData = { name, role, email, password };
    const loadingToast = toast.loading("Processing...");
    try {
      const formData = { email, password, role };
      // console.log("login data ", formData)
      const response = await loginUser(formData);
      const data = response.data;

      if (data.success) {
        toast.success("Authenticated Successfully", { id: loadingToast });

        const token = data.token;
        const loggedInUser = data.user;

        localStorage.setItem("token", token);

        setToken(token);
        setUser(loggedInUser);

        if (loggedInUser.isOnBoarded) {
          navigate("/home");
        } else {
          navigate("/restaurant/register");
        }
      } else {
        toast.error(data.message || "Authentication failed", {
          id: loadingToast,
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message, { id: loadingToast });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="flex items-center gap-2 justify-center text-3xl font-bold text-center text-orange-500 mb-2">
          FoodGo <ChefHat size={32} />
        </h1>

        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-1">
          Login
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Welcome back! Please sign in to your account.
        </p>

        <form onSubmit={handleFormSubmission} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 ${
                errors.name
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-orange-400"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 ${
                errors.role
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-orange-400"
              }`}
            >
              <option value="customer">Customer</option>
              <option value="restaurantOwner">Restaurant Owner</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 ${
                errors.email
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-orange-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 ${
                errors.password
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-orange-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md font-medium hover:bg-orange-600 transition"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/create-account"
            className="text-orange-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login_Page;
