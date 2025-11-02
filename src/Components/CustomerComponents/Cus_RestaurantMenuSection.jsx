import React from "react";
import Cus_MenuItemCard from "./Cus_Cards/Cus_MenuItemCard";
import { groupByCategory } from "../utility/helperFunctions";

const Cus_RestaurantMenuSection = ({ menuItems }) => {
  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg font-medium">
          No menu items found.
        </p>
      </div>
    );
  }

  const groupedMenu = groupByCategory(menuItems);

  return (
    <div className="space-y-8 px-6 pb-6">
      {Object.keys(groupedMenu).map((category) => (
        <div key={category}>
          <h2 className="text-xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedMenu[category].map((item) => (
              <Cus_MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cus_RestaurantMenuSection;
