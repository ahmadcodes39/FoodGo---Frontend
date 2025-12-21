import React from "react";
import { CheckCircle, Hourglass } from "lucide-react";
import { getRestaurantStatus } from "../../api/restaurantApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RestaurantRequestPending = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 const checkStatus = async () => {
  setLoading(true);
  try {
    const response = await getRestaurantStatus();
    const status = response.data.status;
    // console.log(response)

    if (status === "approved") {
      navigate(`/${response.data.restaurantId}/restaurant/dashboard`);
    } else if (status === "rejected") {
      toast.error("Sorry, your request was rejected by Admin");
      localStorage.removeItem("token");
      navigate("/login");
    }else {
        toast(
          "Your request is still pending. Please check again later.",
          {
            icon: <Hourglass className="text-orange-500" />,
            style: {
              border: "1px solid #FFA500",
              padding: "16px",
              color: "#FFA500",
            },
          }
        )
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setLoading(false); // Always reset loading
  }
};


  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-50">
      <div
        className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-gray-200
      hover:shadow-2xl transition-all duration-300"
      >
        <div className="flex justify-center mb-4">
          <CheckCircle size={60} className="text-green-500 animate-pulse" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2 text-orange-500">
          Request Submitted Successfully
        </h1>

        <p className="text-center text-gray-700 text-[15px] leading-relaxed">
          Your restaurant registration request has been received. Our team is
          reviewing your information to ensure everything meets our guidelines.
        </p>

        <div className="border-t-2 border-orange-200 my-4"></div>

        <p className="text-center text-sm text-gray-600 px-4 leading-relaxed">
          Please allow up to{" "}
          <span className="font-semibold text-green-600">24 hours</span>
          for admin approval. Once approved, you will be notified and your
          restaurant profile will become active.
        </p>

        <div className="flex justify-center mt-6">
          <button
            className="btn bg-orange-500 hover:bg-orange-600 text-white btn-sm rounded-full normal-case"
            onClick={checkStatus}
            disabled={loading}
          >
            {loading?<span className="loading loading-spinner loading-sm"></span>:"Refresh Status"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantRequestPending;
