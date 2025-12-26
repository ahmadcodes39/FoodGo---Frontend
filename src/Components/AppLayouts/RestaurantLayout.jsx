import React, { useContext, useEffect, useState } from "react";
import {
  Bell,
  ChartColumnDecreasing,
  LayoutDashboard,
  Package,
  Store,
  UserCog,
  Utensils,
  Menu,
  X,
  LucideMessageSquareWarning,
} from "lucide-react";
import SideBar from "../Common/SideBar";
import { AuthContext } from "../../App Global States/userAuthContext";

const RestaurantLayout = ({ children, showSidebar }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const items = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard />,
      destination: `/${user.restaurantId}/restaurant/dashboard`,
    },
    {
      title: "Orders",
      icon: <Package />,
      destination: `/${user.restaurantId}/restaurant/orders-page`,
    },
    {
      title: "Menu",
      icon: <Utensils />,
      destination: `/${user.restaurantId}/restaurant/menu-page`,
    },
    {
      title: "Analytics",
      icon: <ChartColumnDecreasing />,
      destination: `/${user.restaurantId}/restaurant/analytics-page`,
    },
    {
      title: "Account Settings",
      icon: <UserCog />,
      destination: `/${user.restaurantId}/restaurant/account-settings`,
    },
    {
      title: "Restaurant Profile",
      icon: <Store />,
      destination: `/${user.restaurantId}/restaurant/restaurant-profile`,
    },
    {
      title: "Complaints",
      icon: <LucideMessageSquareWarning />,
      destination: `/${user.restaurantId}/restaurant/complaints`,
      hasNotification: true,
    },
  ];

  // const userInfo = {
  //   name: "Syed Ahmad Ali Shah",
  //   profilePic: "/compressed.jpeg",
  // };

  // Close mobile sidebar on item click
  const handleSidebarItemClick = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex relative">
      {/* Desktop Sidebar */}
      {showSidebar && (
        <div className="hidden md:block">
          <SideBar items={items}  />
        </div>
      )}

      {/* Mobile Sidebar - Slide In */}
      {showSidebar && (
        <div
          className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
            md:hidden
            ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-2 rounded hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="-mt-10">
            <SideBar
              items={items}
              onItemClick={handleSidebarItemClick}
            />
          </div>
        </div>
      )}

      {/* Overlay for mobile */}
      {showSidebar && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 overflow-auto ${showSidebar ? "md:ml-64" : ""}`}>
        {/* Mobile Menu Button */}
        {showSidebar && (
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="md:hidden fixed top-4 left-4 z-50 p-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 flex items-center justify-center"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}

        {/* Page Content */}
        <div className="pt-16 md:pt-0">{children}</div>
      </div>
    </div>
  );
};

export default RestaurantLayout;
