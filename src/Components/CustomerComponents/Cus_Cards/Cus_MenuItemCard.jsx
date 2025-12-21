import React, { useState } from "react";
import { useCart } from "../../../App Global States/CartContext";
import { CircleCheck } from 'lucide-react';


const Cus_MenuItemCard = ({ item }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleBtnClick = () => {
    addToCart(item);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  return (
    <div className="card bg-white shadow-md hover:shadow-lg transition p-3">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-32 object-cover rounded-md"
      />
      <div className="mt-3">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-orange-600">${item.price}</span>
          <button
            onClick={handleBtnClick}
            className="btn btn-sm btn-outline bg-orange-500 hover:bg-orange-600 text-white border-none flex items-center gap-1"
          >
            {isAdded ? (
              <>
                <CircleCheck size={16} className="text-white" />
                Added
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cus_MenuItemCard;
