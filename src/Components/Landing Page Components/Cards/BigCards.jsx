import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BigCards = ({
  title,
  description,
  buttonText,
  buttonLink,
  gradient,
  textColor,
  icon: Icon,
}) => {
  return (
    <div
      className={`flex flex-col justify-between rounded-xl p-8 shadow-lg ${gradient} text-left text-white`}
    >
      {/* Text Section */}
      <div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-sm opacity-90 leading-relaxed">{description}</p>
      </div>

      {/* Button Section */}
      <Link
        to={buttonLink}
        className={`md:w-1/2 w-fit flex items-center justify-center gap-2 btn mt-6 bg-white ${textColor} text-sm font-medium rounded-md hover:bg-gray-100 transition`}
      >
        {Icon && <Icon size={16} />}
        {buttonText}
        <ArrowRight size={14} />
      </Link>
    </div>
  );
};

export default BigCards;
