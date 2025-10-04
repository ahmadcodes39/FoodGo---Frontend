import React from "react";
import BigCards from "./Cards/BigCards";
import { Menu, Store, UtensilsCrossed, UtilityPole } from "lucide-react";

const LastSection = () => {
  const cardData = [
    {
      title: "Hungry? Start ordering now",
      description:
        "Browse hundreds of restaurants and get your favorite food delivered fast",
      buttonText: "Order Now",
      buttonLink: "/order",
      gradient: "bg-gradient-to-r from-orange-600 to-orange-400",
      textColor: "text-orange-500",
      icon: UtensilsCrossed,   // ✅ pass component, not JSX
    },
    {
      title: "Own a restaurant? Grow with us",
      description:
        "Join our platform and reach thousands of hungry customers in your area",
      buttonText: "Register Restaurant",
      buttonLink: "/register-restaurant",
      gradient: "bg-gradient-to-r from-green-600 to-green-400",
      textColor: "text-green-500",
      icon: Store,   // ✅ pass component
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 p-4">
      {cardData.map((card, idx) => (
        <BigCards key={idx} {...card} />
      ))}
    </div>
  );
};

export default LastSection;
