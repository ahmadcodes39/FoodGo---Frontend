import React from "react";

const Ad_actionCards = ({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  description,
  btnText,
  handleBtnClick,
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-5 rounded-xl shadow-sm border hover:shadow-md transition">
      <div className="flex gap-4 items-center">
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-full ${iconBg}`}
        >
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-lg text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <button
        className="px-4 py-2 text-sm font-medium bg-orangeBtn text-white rounded-md hover:bg-orange-600 transition"
        onClick={handleBtnClick}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Ad_actionCards;
