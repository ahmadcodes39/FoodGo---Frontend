import React from "react";

const CustomCard = ({ icon: Icon, bgColor, title, description }) => {
  return (
    <div
      className="relative p-10 rounded-xl shadow-sm border transition flex flex-col items-center text-center"
      style={{
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(255,165,0,0.3)"; // light orange shadow
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"; // original shadow
      }}
    >
      {/* Top Icon */}
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 ${bgColor}`}
      >
        <Icon className="text-white w-6 h-6" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

export default CustomCard;
