import React, { useState } from "react";
import FilterButton from "../../Components/Common/FilterButton";
import { PlusCircle, Search } from "lucide-react";
import Res_menuItemModal from "./Models/Res_menuItemModel";
import TopHeading from "../Common/TopHeading";
import FilterHeader from "../Common/FilterHeader";
const Res_menuHeader = () => {
  const menuStats = ["All", "Piza", "Pasta", "salad", "desert", "frink"];

  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleBtnClick = (text) => {
    setActiveStatus(text);
    console.log(`btn clicked ${text}`);
  };
  console.log("search query: ",searchQuery)
  return (
    <div className="flex flex-col p-4 bg-background-light ">
      <div className="flex items-center justify-between">
        <TopHeading title={"Menu Management"} />
        <button
          onClick={() => document.getElementById("menu_modal").showModal()}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
             bg-orangeBtn text-white rounded-md shadow-md 
             hover:bg-orange-500 active:scale-95 
             focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
             transition-transform duration-150"
        >
          <PlusCircle size={19} /> Add Menu
        </button>
      </div>
      <FilterHeader
        activeStatus={activeStatus}
        statuses={menuStats}
        onBtnClick={handleBtnClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Res_menuItemModal />
    </div>
  );
};

export default Res_menuHeader;
