// src/ProtectedRoute/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App Global States/userAuthContext.jsx";
import Loading from "../Components/LoadingSpinner/Loading";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  // Show loading spinner while fetching user
  if (loading) return <Loading />;

  // Check if user is authenticated
  if (!user) return <Navigate to="/login" />;

  // If role is specified, check user's role
  if (role && user.role !== role) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
