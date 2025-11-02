import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  TriangleAlert,
  Store,
  ChartNoAxesCombined,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";
import SideBar from "../Common/SideBar";

const AdminLayout = ({ children, showSidebar }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const items = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard />,
      destination: "/admin/dashboard",
    },
    {
      title: "Restaurants",
      icon: <Store />,
      destination: "/admin/restaurants",
    },
    { title: "Customers", icon: <Users />, destination: "/admin/customers" },
    { title: "Orders", icon: <ShoppingCart />, destination: "/admin/orders" },
    {
      title: "Analytics",
      icon: <ChartNoAxesCombined />,
      destination: "/admin/analytics",
    },
    {
      title: "Complaints",
      icon: <TriangleAlert />,
      destination: "/admin/complaints",
    },
  ];

  const userInfo = {
    name: "Syed Ahmad Ali Shah",
    profilePic: "/compressed.jpeg",
  };

  // Close mobile sidebar when any item is clicked
  const handleSidebarItemClick = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex relative">
      {/* Desktop Sidebar - Unchanged */}
      {showSidebar && (
        <div className="hidden md:block">
          <SideBar items={items} userInfo={userInfo} />
        </div>
      )}

      {/* Mobile Sidebar - Slide in/out */}
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
            {/* Pass onItemClick to close sidebar on navigation */}
            <SideBar
              items={items}
              userInfo={userInfo}
              onItemClick={handleSidebarItemClick}
            />
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {showSidebar && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-auto ${showSidebar ? "md:ml-64" : ""}`}>
        {/* Mobile Toggle Button - Orange */}
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

export default AdminLayout;
