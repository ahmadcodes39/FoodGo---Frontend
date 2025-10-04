import React from "react";
import SideBar from "../Common/SideBar";
import { CalendarCheck2, LayoutDashboard, Package, Utensils } from "lucide-react";

const RestaurantLayout = ({ children, showSidebar }) => {
  const items = [
    { title: "Dashboard", icon: <LayoutDashboard />, destination:'/restaurant/dashboard'},
    { title: "Orders", icon: <Package /> , destination:'/restaurant/orders-page' },
    { title: "Menu", icon: <Utensils /> , destination:'/restaurant/menu-page'},
  ];
  const userInfo={
   name:"Syed Ahmad Ali Shah",
   profilePic:"/compressed.jpeg", 
  }

  return (
    <div className="flex">
      {showSidebar && <SideBar items={items} userInfo={userInfo}/>}
      <div className={`flex-1 overflow-auto ${showSidebar ? "ml-64" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default RestaurantLayout;
