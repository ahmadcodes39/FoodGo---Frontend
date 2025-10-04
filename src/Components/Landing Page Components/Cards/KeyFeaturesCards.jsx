import React from "react";

      
const KeyFeaturesCards = ({ icon, title, description,textColor, color, borderColor, iconBg }) => {
  return (
    <div className={`flex flex-col items-start p-6 border rounded-xl shadow-sm bg-white ${borderColor} border-1 hover:shadow-md transition-all duration-300`}>
      <div className={`p-2 ${iconBg} rounded-md ${textColor} text-2xl mb-3`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
};

export default KeyFeaturesCards;
