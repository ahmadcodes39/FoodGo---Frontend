import React, { useState } from "react";
import Cus_HeroSection from "../../Components/CustomerComponents/Cus_HeroSection";
import Cus_RestaurantList from "../../Components/CustomerComponents/Cus_RestaurantList";
import FilterButton from "../../Components/Common/FilterButton";
import { Filter, ShoppingCart, User } from "lucide-react";
import Footer from "../../Components/Common/Footer";
import Cus_TopHeader from "../../Components/CustomerComponents/Cus_TopHeader";

const Cus_Landing_Page = () => {
  const filterItems = [
    "All",
    "Italian",
    "Pasta",
    "American",
    "Japanese",
    "Mexican",
    "Pakistani",
    "Chinese",
    "Thai",
  ];

  const [activeStatus, setActiveStatus] = useState("All");

  const omBtnClick = (text) => {
    setActiveStatus(text);
    console.log(`btn clicked ${text}`);
  };

  return ( 
    <div className="flex flex-col gap-5">
      <Cus_TopHeader />
      <Cus_HeroSection />

      <div className="flex items-center gap-4 px-6 flex-wrap">
        <div className="flex items-center gap-2 py-5">
          <Filter className="text-orange-500" />
          <h2 className="font-bold">Filter by Cuisine</h2>
        </div>
        {filterItems.map((item, index) => (
          <FilterButton
            key={index}
            text={item}
            isActive={activeStatus === item}
            onBtnClick={() => omBtnClick(item)}
          />
        ))}
      </div>
      <Cus_RestaurantList />
      <Footer />
    </div>
  );
};

export default Cus_Landing_Page;
