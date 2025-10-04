import React from "react";
import Cus_StatusChips from "../Cus_StatusChips";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Cus_RestaurantCard = ({ restaurant }) => {
  const { logo, name, cuisine, openingHours, deliveryTime } = restaurant;

  return (
    <div className="card w-full bg-base-100 shadow-md hover:shadow-lg transition">
      <figure>
        <img src={logo} alt={name} className="h-40 w-full object-cover" />
      </figure>
      <div className="card-body">
        <div className="flex gap-3 items-center">
          <h3 className="card-title text-lg font-semibold">{name}</h3>
          <Cus_StatusChips openingHours={openingHours} />
        </div>
        <p className="text-sm text-gray-500">{cuisine.join(", ")}</p>
        <p className="mt-2 text-sm text-gray-600 flex gap-1 items-center"><Clock size={17}/> Delivery: {deliveryTime}</p>
        <div className="card-actions justify-end">
          <Link to={`${restaurant.id}/${restaurant.name}`} className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cus_RestaurantCard;
