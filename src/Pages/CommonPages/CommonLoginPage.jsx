import { ChefHat } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App Global States/userAuthContext";
import { loginUser } from "../../api/authApi";
import toast from "react-hot-toast";
import Loading from "../../Components/LoadingSpinner/Loading";
import { useNavigate } from "react-router-dom";

const CommonLoginPage = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [heading, setHeading] = useState("");
  const { setUser, setToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (role === "admin") setHeading("Admin");
    else if (role === "complaintManager") setHeading("Complaint Manager");
    else if (role === "verificationManager") setHeading("Verification Manager");
    else setHeading("User");
  }, [role]);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginUser({ email, password, role });
      const data = response.data;
      const token = data.token;
      if (data.success) {
        toast.success("Authenticated Successfully");
        setUser(data.user);
        setToken(token);

        setLoading(false);
        if (role == "admin") {
          navigate("/admin/dashboard");
        } else if (role == "verificationManager") {
          navigate("/vrf/dashboard");
        } else if (role == "complaintManager") {
          navigate("/cm/restaurants");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="flex items-center gap-2 justify-center text-3xl font-bold text-center text-orange-500 mb-2">
          FoodGo <ChefHat size={32} />
        </h1>

        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-1">
          {heading}
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Welcome back! Please sign in to your account.
        </p>

        <form onSubmit={handleFormSubmission} className="space-y-4">
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

          {(role === "complaint-manager" ||
            role === "verification-manager") && (
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={true}
                className="checkbox checkbox-warning"
              />
              <span className="label-text">Login as {heading}</span>
            </label>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2
    bg-orange-500 text-white py-2 rounded-md font-medium
    hover:bg-orange-600 
    disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200
`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommonLoginPage;
