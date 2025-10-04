import React from "react";
import KeyFeaturesCards from "./Cards/KeyFeaturesCards";
import {
  Users,
  Bolt,
  ShieldCheck,
  ChartNoAxesColumnIncreasing,
  Clock4,
  ChartSpline,
} from "lucide-react";

const KeyFeatures = () => {
  const customerFeatures = [
    {
      icon: <Users size={28} />,
      title: "Variety of Restaurants",
      description: "Choose from hundreds of local restaurants and cuisines",
      color: "bg-orange-500",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-50",
      textColor: "text-orange-500",
    },
    {
      icon: <Bolt size={28} />,
      title: "Fast Delivery",
      description: "Get your food delivered in 30 minutes or less",
      color: "bg-orange-500",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-50",
      textColor: "text-orange-500",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Secure Payments",
      description: "Safe and encrypted payment processing",
      color: "bg-orange-500",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-50",
      textColor: "text-orange-500",
    },
  ];

  const restaurantFeatures = [
    {
      icon: <ChartNoAxesColumnIncreasing size={20} />,
      title: "Menu Management",
      description: "Easy-to-use dashboard for updating menus and prices",
      color: "bg-green-500",
      borderColor: "border-green-200",
      iconBg: "bg-green-50",
      textColor: "text-green-500",
    },
    {
      icon: <Clock4 size={20} />,
      title: "Order Tracking",
      description: "Real-time order updates and delivery tracking",
      color: "bg-green-500",
      borderColor: "border-green-200",
      iconBg: "bg-green-50",
      textColor: "text-green-500",
    },
    {
      icon: <ChartSpline size={20} />,
      title: "Insights & Analytics",
      description: "Detailed reports to grow your restaurant business",
      color: "bg-green-500",
      borderColor: "border-green-200",
      iconBg: "bg-green-50",
      textColor: "text-green-500",
    },
  ];

  return (
    <div className="p-4">
      <div className="text-center">

      <h1 className="font-bold text-3xl">Key Features</h1>
      <p className="text-gray-500 mt-2">
        Everything you need for a seamless food deliveryexperience
      </p>
      </div>
      <h1 className="p-4 text-orange-500 font-bold text-xl mt-5">
        For Customers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5 mb-10">
        {customerFeatures.map((feature, index) => (
          <KeyFeaturesCards key={index} {...feature} />
        ))}
      </div>

      <h1 className="p-4 text-green-500 font-bold text-xl mt-5">
        For Restaurants
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5 mb-10">
        {restaurantFeatures.map((feature, index) => (
          <KeyFeaturesCards key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
