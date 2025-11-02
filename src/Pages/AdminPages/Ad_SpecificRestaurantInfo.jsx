import React, { useState } from "react";
import TopHeading from "../../Components/Common/TopHeading";
import Ad_RestaurantInfoCard from "../../Components/AdminComponents/Cards/Ad_RestaurantInfoCard";
import Ad_RestaurantLicenseCard from "../../Components/AdminComponents/Cards/Ad_RestaurantLicenseCard";
import {
  dummyMenuData,
  restaurant,
} from "../../Components/Dummy Data/DummyData";
import Res_menuTable from "../../Components/RestaurantComponents/Res_menuTable";

const Ad_SpecificRestaurantInfo = ({ isAuthorize = true }) => {
  const [activeTab, setActiveTab] = useState("Restaurant Info");
console.log("isAuthorize:", isAuthorize);

  const tabs = isAuthorize
    ? ["Restaurant Info", "License", "Menu Items"]
    : ["Restaurant Info"];

  return (
    <div className="p-4 min-h-screen bg-base-200">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <TopHeading title={"Restaurant Details & Verification"} />
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

      {activeTab === "Restaurant Info" && (
        <Ad_RestaurantInfoCard restaurant={restaurant} />
      )}

      {isAuthorize && (
        <>
          {activeTab === "License" && (
            <Ad_RestaurantLicenseCard image={restaurant.license} />
          )}
          {activeTab === "Menu Items" && (
            <div className="mt-8">
              <Res_menuTable
                dummyMenuData={dummyMenuData}
                isActionAvailable={false}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Ad_SpecificRestaurantInfo;
