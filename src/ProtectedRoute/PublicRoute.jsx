// src/ProtectedRoute/PublicRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App Global States/userAuthContext.jsx";
import Loading from "../Components/LoadingSpinner/Loading.jsx";

const PublicRoute = ({ children, roleRedirect }) => {
  const { user, loading } = useContext(AuthContext);

  // Show loading spinner while fetching user
  if (loading) return <Loading />;

  // If user is authenticated, redirect based on role
  if (user) {
    if (user.role === "customer") return <Navigate to="/home" />;
    if (user.role === "restaurantOwner") return <Navigate to="/restaurant/dashboard" />;
    if (user.role === "admin") return <Navigate to="/admin/dashboard" />;
    if (user.role === "complaint-manager") return <Navigate to="/cm/restaurants" />;
    if (user.role === "verification-manager") return <Navigate to="/vrf/dashboard" />;
  }

  return children;
};

export default PublicRoute;
