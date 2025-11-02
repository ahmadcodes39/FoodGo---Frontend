import React, { useMemo, useState } from "react";
import Cus_RestaurantHeader from "../../Components/CustomerComponents/Cus_RestaurantHeader";
import Cus_RestaurantMenuSection from "../../Components/CustomerComponents/Cus_RestaurantMenuSection";
import FilterButton from "../../Components/Common/FilterButton";
import Footer from "../../Components/Common/Footer";
import { dummyMenu } from "../../Components/Dummy Data/DummyData";
import Header from "../../Components/Landing Page Components/Header";

const Cus_Menu_Page = () => {
  const dummyRestaurant = {
    name: "Pizza Palace",
    logo: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    cuisine: ["Italian", "Pizza"],
    description:
      "Authentic Italian pizza made with fresh ingredients and traditional recipes.",
    address: "123 Main Street, Lahore",
    restaurantPhoneNumber: "03001234567",
    openingHours: "10:00 AM - 11:00 PM",
    deliveryAvailable: true,
    deliveryTime: "25-35 min",
  };

  const menuStats = ["All", "Pizza", "Pasta", "Salads", "Dessert", "Drink"];

  const [activeStatus, setActiveStatus] = useState("All");

  //  Filtering 
  const filteredMenus = useMemo(() => {
    if (activeStatus === "All") return dummyMenu;
    return dummyMenu.filter(
      (item) => item.category.toLowerCase() === activeStatus.toLowerCase()
    );
  }, [activeStatus]);

  const onBtnClick = (text) => {
    setActiveStatus(text);
    console.log(`Button clicked: ${text}`);
  };

  return (
    <div className="flex flex-col gap-4 mt-[90px]">
      <Header />
      <Cus_RestaurantHeader restaurant={dummyRestaurant} />

      <div className="flex justify-end gap-3 md:sticky md:top-16 z-10 bg-white p-5 flex-wrap">
        {menuStats.map((item, index) => (
          <FilterButton
            key={index}
            text={item}
            isActive={activeStatus === item}
            onBtnClick={() => onBtnClick(item)}
          />
        ))}
      </div>

      <Cus_RestaurantMenuSection menuItems={filteredMenus} />
      <Footer />
    </div>
  );
};

export default Cus_Menu_Page;
