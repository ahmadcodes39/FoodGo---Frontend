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
    <>
      <div className="flex items-center justify-center flex-col gap-3 mt-20">
        <h1 className="font-bold text-3xl">How It Works</h1>
        <p className="text-gray-500">
          Simple steps to get started, whether you're ordering or managing a
          restaurant
        </p>
        <h1 className="mt-10 font-bold text-2xl ">
          For <span className="text-orange-500">Customers</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 mt-5">
        {customerCardsData.map((card, index) => (
          <CustomCard key={index} {...card} />
        ))}
      </div>
      <h1 className="mt-5 font-bold text-2xl text-center">
          For <span className="text-green-500">Restaurant Owners</span>
        </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 mt-5">
        {restaurantData.map((card, index) => (
          <CustomCard key={index} {...card} />
        ))}
      </div>
    </>
  );
};

export default HowItWorks;
