import React from "react";
import FilterButton from "../../Components/Common/FilterButton";
import { Search } from "lucide-react";
import TopHeading from "../Common/TopHeading";
import FilterHeader from "../Common/FilterHeader";
const Res_orderHeader = ({
  searchQuery,
  setSearchQuery,
  statuses,
  activeStatus,
  handleBtnClick,
}) => {
  return (
    <div className="flex flex-col p-4 bg-background-light">
      <TopHeading title={"Order Management"} />
      <FilterHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statuses={statuses}
        activeStatus={activeStatus}
        onBtnClick={handleBtnClick}
      />
    </div>
  );
};

export default Res_orderHeader;
