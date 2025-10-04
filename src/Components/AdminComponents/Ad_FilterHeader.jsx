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
  setSelectedRole
}) => {
  return (
    <div className="bg-gray-100 p-4 min-w-full shadow-md rounded-md">
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="relative w-full max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search className="size-4" />
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID or customer name..."
            className="w-full pl-10 pr-4 py-2 rounded-full shadow-md border border-gray-200 
              focus:outline-none focus:ring-0 focus:ring-orange-500 focus:border-orange-500 
              placeholder-gray-400 text-sm"
          />
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <label htmlFor="role" className="label">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)} 
              className="select select-sm border-gray-300 rounded-md"
            >
              <option value="All">All</option>
              <option value="Customer">Customer</option>
              <option value="Restaurant">Restaurant</option>
            </select>
          </div>
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
