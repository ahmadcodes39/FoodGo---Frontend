import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../App Global States/userAuthContext.jsx";
import Loading from "../Components/LoadingSpinner/Loading";
import BlockedAccess from "../Components/Common/BlockedAccess";

const ROLE_LOGIN_ROUTE = {
  admin: "/admin/login",
  complaintManager: "/cm/login",
  verificationManager: "/vrf/login",
  customer: "/login",
  restaurantOwner: "/login",
};

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loading />;

  // ❌ Not logged in
  if (!user) {
    const loginRoute = ROLE_LOGIN_ROUTE[role] || "/login";
    return (
      <Navigate
        to={loginRoute}
        replace
        state={{ from: location }}
      />
    );
  }

  // ❌ Role mismatch
  if (role && user.role !== role) {
    const loginRoute = ROLE_LOGIN_ROUTE[role] || "/login";
    return <Navigate to={loginRoute} replace />;
  }

  // 🚫 BLOCKED USER CHECK (⭐ NEW ⭐)
  // Apply only to customer & restaurantOwner
  if (
    (user.role === "customer" || user.role === "restaurantOwner") &&
    user.status === "blocked"
  ) {
    return (
      <BlockedAccess
        title="Access Restricted"
        message="Your account has been temporarily blocked."
        reason={user?.blockReason || "Violation of platform policies"}
        role={user.role}
      />
    );
  }

  // 🚫 BLOCKED RESTAURANT OPERATIONAL STATUS CHECK
  // Check if restaurant is blocked by operational status
  if (
    user.role === "restaurantOwner" &&
    user.operationalStatus === "blocked"
  ) {
    return (
      <BlockedAccess
        title="Restaurant Access Blocked"
        message="Your restaurant has been temporarily blocked from operations."
        reason="Your restaurant's operational status has been suspended. Please contact support for assistance."
        role={user.role}
      />
    );
  }

  // ✅ Authorized
  return children;
};

export default ProtectedRoute;
