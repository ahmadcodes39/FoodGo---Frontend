import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App Global States/userAuthContext.jsx";
import Loading from "../Components/LoadingSpinner/Loading.jsx";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading />;

  // 🚫 BLOCKED USER → DO NOT REDIRECT
  if (user && user.status === "blocked") {
    return children;
  }

  // ✅ Logged in & active → redirect
  if (user) {
    switch (user.role) {
      case "customer":
        return <Navigate to="/home" replace />;

      case "restaurantOwner":
        if (!user.restaurantId) return children;
        return (
          <Navigate
            to={`/${user.restaurantId}/restaurant/dashboard`}
            replace
          />
        );

      case "admin":
        return <Navigate to="/admin/dashboard" replace />;

      case "complaintManager":
        return <Navigate to="/cm/restaurants" replace />;

      case "verificationManager":
        return <Navigate to="/vrf/dashboard" replace />;

      default:
        return children;
    }
  }

  return children;
};

export default PublicRoute;
