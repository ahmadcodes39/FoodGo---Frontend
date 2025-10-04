import React, { useState } from "react";
import Cus_RestaurantHeader from "../../Components/CustomerComponents/Cus_RestaurantHeader";
import Cus_RestaurantMenuSection from "../../Components/CustomerComponents/Cus_RestaurantMenuSection";
import FilterButton from "../../Components/Common/FilterButton";
import Footer from "../../Components/Common/Footer";
import Cus_TopHeader from "../../Components/CustomerComponents/Cus_TopHeader";
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
  const dummyMenu = [
    {
      id: 1,
      name: "Margherita Pizza",
      category: "Pizza",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      description: "Classic pizza with fresh mozzarella and basil.",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      category: "Pizza",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      description: "Loaded with pepperoni and cheese.",
    },
    {
      id: 3,
      name: "Spaghetti Carbonara",
      category: "Pasta",
      price: 13.5,
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      description: "Rich pasta with bacon, egg, and parmesan.",
    },
    {
      id: 4,
      name: "Caesar Salad",
      category: "Salads",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      description: "Crispy romaine with creamy dressing.",
    },
  ];
  const menuStats = ["All", "Piza", "Pasta", "salad", "desert", "Drink"];

  const [activeStatus, setActiveStatus] = useState("All");

  const omBtnClick = (text) => {
    setActiveStatus(text);
    console.log(`btn clicked ${text}`);
  };

  return (
    <div className="flex gap-4 flex-col ">
      <Cus_TopHeader />
      <Cus_RestaurantHeader restaurant={dummyRestaurant} />
      <div className="flex justify-end gap-3 md:sticky md:top-16 z-10 bg-white p-5">
        {menuStats.map((item, index) => (
          <FilterButton
            key={index}
            text={item}
            isActive={activeStatus === item}
            onBtnClick={() => omBtnClick(item)}
          />
        ))}
      </div>
      <Cus_RestaurantMenuSection menuItems={dummyMenu} />
      <Footer />
    </div>
  );
};

export default Cus_Menu_Page;
