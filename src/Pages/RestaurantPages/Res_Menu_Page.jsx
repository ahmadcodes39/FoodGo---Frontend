import React from "react";
import Res_menuHeader from "../../Components/RestaurantComponents/Res_menuHeader";
import Res_menuTable from "../../Components/RestaurantComponents/Res_menuTable";

const Res_Menu_Page = () => {
 const dummyMenuData = [
  {
    id:1,
    name: "Pasta",
    image: "pasta.jpeg",
    category: "Noodles",
    price: 1200,
  },
  {
    id:2,
    name: "Cheese Burger",
    image: "burger.jpeg",
    category: "Fast Food",
    price: 800,
  },
  {
    id:3,
    name: "Chicken Biryani",
    image: "biryani.jpeg",
    category: "Rice",
    price: 600,
  },
];

  return (
    <div className="flex flex-col gap-6">
      <Res_menuHeader />
      <Res_menuTable dummyMenuData={dummyMenuData}/>
    </div>
  );
};

export default Res_Menu_Page;
