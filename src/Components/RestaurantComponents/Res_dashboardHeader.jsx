import { Bell, LogOutIcon, LucideMessageSquareWarning } from "lucide-react";
import React from "react";
import TopHeading from "../Common/TopHeading";
import { Link } from "react-router-dom";

const Res_dashboardHeader = () => {
  // You can later set this dynamically (true if unread notifications exist)
  const hasNotifications = true;

  return (
    <div className="flex flex-col bg-background-light">
      <div className="flex items-center justify-between">
        <TopHeading title={"Restaurant Dashboard"} />

        <div className="flex gap-3 items-center">
          <Link
            to={"/restaurant/complaints"}
            className="relative group"
          >
            <div className="p-2 rounded-full bg-white shadow-md hover:bg-orange-100 transition-all duration-300 cursor-pointer">
              <LucideMessageSquareWarning
                size={26}
                className="text-gray-700 group-hover:text-orange-500 transition-all duration-300"
              />
            </div>
            {hasNotifications && (
              <span className="absolute top-1 right-1 block w-2.5 h-2.5 bg-red-500 rounded-full border border-white animate-pulse"></span>
            )}
          </Link>

          <Link to={"/login"}>
            <button className="btn btn-sm sm:btn-md bg-redBtn rounded-md text-white hover:bg-red-600 text-sm flex gap-2 items-center shadow-md">
              <LogOutIcon size={16} className="hidden md:inline" /> Logout
            </button>
          </Link>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gray-100 mt-5 p-4 w-full shadow-md rounded-md">
        <p className="text-xl font-semibold">Welcome,</p>
        <p className="text-gray-500 text-sm">
          Here’s what’s happening with your restaurant today.
        </p>
      </div>
    </div>
  );
};

export default Res_dashboardHeader;
