import { UtensilsCrossed } from "lucide-react";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/30 backdrop-blur-md shadow-md" : "bg-white/0"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold flex gap-2 items-center">
          <UtensilsCrossed className={"text-orange-500"} size={30} />
          <span className={"text-gray-800"}>FoodGo</span>
        </h1>

        <ul className={`flex gap-6 ${"text-gray-700"}`}>
          <li className="cursor-pointer hover:text-orange-500 font-medium">
            Home
          </li>
          <li className="cursor-pointer hover:text-orange-500 font-medium">
            Features
          </li>
          <li className="cursor-pointer hover:text-orange-500 font-medium">
            Restaurants
          </li>
          <li className="cursor-pointer hover:text-orange-500 font-medium">
            Contact
          </li>
        </ul>
        <div className="flex gap-3">
          <button
            className={`px-4 py-2 border rounded-md text-sm font-semibold transition ${"border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"}`}
          >
            Order Now
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-semibold transition ${"bg-green-500 text-white hover:bg-green-600"}`}
          >
            Register Restaurant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
