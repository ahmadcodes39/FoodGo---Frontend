import { ShoppingCart, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../App Global States/CartContext";

const Cus_TopHeader = () => {
  const { totalQuantity } = useCart();
  return (
    <div className="flex items-center justify-between px-6 shadow-md bg-white sticky top-0 z-20 py-3">
      <Link
        to={"/"}
        className="text-2xl font-extrabold text-orange-500 tracking-wide"
      >
        FoodGo
      </Link>
      <div className="flex gap-3 items-center">
        <Link
          to="/cart"
          className="btn btn-ghost btn-circle hover:bg-orange-100"
        >
          <div className="">
            <ShoppingCart className="w-6 h-6 text-gray-700 relative" />
            <div className="absolute bottom-11 badge badge-outline bg-black text-white badge-md">
              {totalQuantity}
            </div>
          </div>
        </Link>
        <button className="btn btn-ghost btn-circle hover:bg-orange-100">
          <User className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Cus_TopHeader;
