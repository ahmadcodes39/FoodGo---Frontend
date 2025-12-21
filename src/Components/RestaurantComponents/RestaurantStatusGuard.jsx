import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getRestaurantStatus } from "../../api/restaurantApi"; 
import Loading from "../LoadingSpinner/Loading";

const RestaurantStatusGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await getRestaurantStatus();
        setStatus(response.data.status);
      } catch (error) {
        setStatus("none"); 
      }
      setLoading(false);
    };

    fetchStatus();
  }, []);

  if (loading) return <Loading />;

  if (status === "none") return <Navigate to="/" />;

  if (status === "approved") return <Navigate to="/restaurant/dashboard" />;

  if (status === "pending") return children;
};

export default RestaurantStatusGuard;
