import React from "react";
import { Search } from "lucide-react";
import FilterButton from "../Common/FilterButton";

const Ad_FilterHeader = ({
  searchQuery,
  setSearchQuery,
  statuses,
  activeStatus,
  onBtnClick,
  selectedRole,
  setSelectedRole,
}) => {
  return (
    <div className="bg-gray-100 p-4 w-full shadow-md rounded-md">
      <div
        className="
          flex flex-col md:flex-col lg:flex-row
          md:items-stretch lg:items-center
          justify-between gap-4 w-full
        "
      >
        {/* Search Input */}
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

        {/* Filters and Role Dropdown */}
        <div
          className="
            flex flex-wrap justify-start lg:justify-end 
            gap-2 items-center mt-2 md:mt-0
          "
        >
          <label htmlFor="role" className="text-sm font-medium">
            Role:
          </label>
          <select
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="select select-sm border-gray-300 rounded-md focus:border-orange-500 focus:ring-0"
          >
            <option value="All">All</option>
            <option value="Customer">Customer</option>
            <option value="Restaurant">Restaurant</option>
          </select>

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

export default Ad_FilterHeader;
