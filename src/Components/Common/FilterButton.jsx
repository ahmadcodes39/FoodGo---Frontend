import React from "react";

const FilterButton = ({ text, onBtnClick, isActive }) => {
  return (
    <button
      onClick={onBtnClick}
      className={`btn btn-sm rounded-md border transition-colors px-3 py-1 text-sm
        ${isActive ? "bg-orangeBtn text-white hover:bg-orange-600" : "bg-white text-black border-gray-300"}
        hover:bg-orange-300 hover:text-white
        whitespace-nowrap`}
    >
      {text}
    </button>
  );
};

export default FilterButton;
