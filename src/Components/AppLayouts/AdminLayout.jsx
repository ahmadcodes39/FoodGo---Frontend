import { LayoutDashboard, Users, ShoppingCart, TriangleAlert, Store } from "lucide-react";
import React from "react";
import SideBar from "../Common/SideBar";

const AdminLayout = ({ children, showSidebar }) => {
  const items = [
    { title: "Dashboard", icon: <LayoutDashboard />, destination: "/admin/dashboard" },
    { title: "Restaurants", icon: <Store />, destination: "/admin/restaurants" },
    { title: "Customers", icon: <Users />, destination: "/admin/customers" },
    { title: "Orders", icon: <ShoppingCart />, destination: "/admin/orders" },
    { title: "Complaints", icon: <TriangleAlert />, destination: "/admin/complaints" },
  ];
  const userInfo = {
    name: "Syed Ahmad Ali Shah",
    profilePic: "/compressed.jpeg",
  };

  return (
    <div className="flex">
      {showSidebar && <SideBar items={items} userInfo={userInfo} />}
      <div className={`flex-1 overflow-auto ${showSidebar ? "ml-64" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
