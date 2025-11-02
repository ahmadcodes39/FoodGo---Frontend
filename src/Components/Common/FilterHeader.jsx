import React from "react";
import { Search } from "lucide-react";
import FilterButton from "./FilterButton";

const FilterHeader = ({
  searchQuery,
  setSearchQuery,
  statuses,
  activeStatus,
  onBtnClick,
}) => {
  return (
    <div className="bg-gray-100 p-4 w-full shadow-md rounded-md mt-5">
      <div
        className="
          flex flex-col lg:flex-row
          items-stretch lg:items-center 
          justify-between gap-3 w-full
        "
      >
        {/* Search Bar */}
        <div className="relative w-full lg:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search className="size-4" />
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID or customer name..."
            className="
              w-full pl-10 pr-4 py-2 rounded-full shadow-md border border-gray-200
              focus:outline-none focus:ring-0 focus:ring-orange-500 focus:border-orange-500
              placeholder-gray-400 text-sm
            "
          />
        </div>

        {/* Filter Buttons */}
        <div
          className="
            flex flex-wrap lg:flex-nowrap 
            gap-2 justify-start lg:justify-end
          "
        >
          {statuses.map((status, index) => (
            <FilterButton
              key={index}
              text={status}
              isActive={activeStatus === status}
              onBtnClick={() => onBtnClick(status)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterHeader;
