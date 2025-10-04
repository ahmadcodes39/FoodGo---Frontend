import React, { useState } from "react";
import FilterButton from "../../Components/Common/FilterButton";
import { Search } from "lucide-react";
import TopHeading from "../Common/TopHeading";
import FilterHeader from "../Common/FilterHeader";
const Res_orderHeader = () => {
  const orderStatus = [
    "All",
    "pending",
    "confirmed",
    "preparing",
    "on the way",
    "delivered",
  ];

  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleBtnClick = (text) => {
    setActiveStatus(text);
    console.log(`btn clicked ${text}`);
  };
  // run a function on a search query input 
  console.log("search query ",searchQuery)
  return (
    <div className="flex  flex-col p-4 bg-background-light ">
      <TopHeading title={"Order Management"} />
      <FilterHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statuses={orderStatus}
        activeStatus={activeStatus}
        onBtnClick={handleBtnClick}
      />
    </div>
  );
};

export default Res_orderHeader;
