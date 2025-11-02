import React, { useState } from "react";
import Res_menuHeader from "../../Components/RestaurantComponents/Res_menuHeader";
import Res_menuTable from "../../Components/RestaurantComponents/Res_menuTable";
import { dummyMenuData } from "../../Components/Dummy Data/DummyData";
const Res_Menu_Page = () => {
  const menuStats = ["All", "Piza", "Pasta", "salad", "desert", "frink"];

  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleBtnClick = (text) => {
    setActiveStatus(text);
    console.log(`btn clicked ${text}`);
  };
  console.log("search query: ", searchQuery);

  const filteredData = dummyMenuData.filter((menu) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      menu.id?.toString().toLowerCase().includes(query) ||
      menu.name?.toLowerCase().includes(query) ||
      menu.category?.toLowerCase().includes(query) ||
      menu.price?.toString().includes(query);

    const matchesStatus =
      activeStatus === "All" || menu.status === activeStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <Res_menuHeader
        activeStatus={activeStatus}
        menuStats={menuStats}
        handleBtnClick={handleBtnClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Res_menuTable dummyMenuData={filteredData} />
    </div>
  );
};

export default Res_Menu_Page;
