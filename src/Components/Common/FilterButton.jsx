import React from "react";

const FilterButton = ({ text, onBtnClick, isActive }) => {
  return (
    <button
      onClick={onBtnClick}
      className={`btn btn-sm rounded-md border transition-colors
        ${isActive ? "bg-orangeBtn text-white hover:bg-orangeBtn" : "bg-white text-black border-gray-300"}
        hover:bg-orange-300 hover:text-white`}
    >
      {text}
    </button>
  );
}; 

export default FilterButton;
