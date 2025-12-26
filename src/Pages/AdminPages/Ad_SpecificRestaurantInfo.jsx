import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import TopHeading from "../../Components/Common/TopHeading";
import Ad_RestaurantInfoCard from "../../Components/AdminComponents/Cards/Ad_RestaurantInfoCard";
import Ad_RestaurantLicenseCard from "../../Components/AdminComponents/Cards/Ad_RestaurantLicenseCard";
import Res_menuTable from "../../Components/RestaurantComponents/Res_menuTable";

import { fetchRestaurantInfo } from "../../api/adminApi";

const Ad_SpecificRestaurantInfo = ({ isAuthorize = true }) => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("Restaurant Info");
  const [restaurantData, setRestaurantData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Single source of truth
  const fetchRestaurant = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchRestaurantInfo(id);
      const data = response.data;

      if (data?.success) {
        setRestaurantData(data.restaurant);
        setMenuItems(data.restaurant?.menu || []);
      } else {
        toast.error("Failed to load restaurant data");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchRestaurant();
  }, [id, fetchRestaurant]);

  // 🔄 Used by delete/edit/add
  const refreshContent = async () => {
    await fetchRestaurant();
  };

  const tabs = isAuthorize
    ? ["Restaurant Info", "License", "Menu Items"]
    : ["Restaurant Info"];

  // 🔹 Loading
  if (loading) {
    return (
      <div className="p-4 min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // 🔹 Safety
  if (!restaurantData) {
    return (
      <div className="p-4 min-h-screen bg-base-200 text-center">
        <p className="text-red-500">Restaurant not found</p>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen bg-base-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <TopHeading title="Restaurant Details & Verification" />

        <div role="tablist" className="flex flex-wrap gap-2 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors
                ${
                  activeTab === tab
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant Info */}
      {activeTab === "Restaurant Info" && (
        <Ad_RestaurantInfoCard restaurant={restaurantData} />
      )}

      {isAuthorize && (
        <>
          {/* License */}
          {activeTab === "License" && (
            <Ad_RestaurantLicenseCard image={restaurantData.license} />
          )}

          {/* Menu Items */}
          {activeTab === "Menu Items" && (
            <div className="mt-8">
              <Res_menuTable
                dummyMenuData={menuItems}
                isActionAvailable={false}
                refreshContent={refreshContent}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Ad_SpecificRestaurantInfo;
