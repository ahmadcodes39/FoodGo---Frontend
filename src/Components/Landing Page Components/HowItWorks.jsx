import React from "react";
import TopHeading from "../Common/TopHeading";
import CustomCard from "./Cards/CustomCard";
import {
  ChartBarDecreasingIcon,
  ChartColumn,
  Menu,
  Search,
  ShoppingBasket,
  ShoppingCart,
  Store,
  Truck,
} from "lucide-react";

const HowItWorks = () => {
  const customerCardsData = [
    {
      icon: Search,
      bgColor: "bg-orange-500",
      title: "Browse",
      description: "Explore restaurants and menus in your area",
    },
    {
      icon: ShoppingCart,
      bgColor: "bg-orange-500",
      title: "Order",
      description: "Select your favorite dishes and place your order",
    },
    {
      icon: Truck,
      bgColor: "bg-orange-500",
      title: "Delivered",
      description: "Get your food delivered hot and fresh to your door",
    },
  ];

  const restaurantData = [
    {
      icon: Store,
      bgColor: "bg-green-500",
      title: "Register",
      description: "Create your restaurant profile in minutes",
    },
    {
      icon: Menu,
      bgColor: "bg-green-500",
      title: "Add Menu",
      description: "Upload your menu items with photos and prices",
    },
    {
      icon: ChartColumn,
      bgColor: "bg-green-500",
      title: "Manage Orders",
      description: "Track orders and grow your business with insights",
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-20">
      {/* Heading */}
      <div className="flex flex-col items-center text-center gap-3 mt-20">
        <h1 className="font-bold text-3xl">How It Works</h1>
        <p className="text-gray-500 max-w-xl">
          Simple steps to get started, whether you're ordering or managing a restaurant
        </p>
      </div>

      {/* Customer Section */}
      <div className="mt-10 text-center">
        <h2 className="font-bold text-2xl">
          For <span className="text-orange-500">Customers</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
          {customerCardsData.map((card, index) => (
            <CustomCard key={index} {...card} />
          ))}
        </div>
      </div>

      {/* Restaurant Section */}
      <div className="mt-10 text-center">
        <h2 className="font-bold text-2xl">
          For <span className="text-green-500">Restaurant Owners</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5 mb-20">
          {restaurantData.map((card, index) => (
            <CustomCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
