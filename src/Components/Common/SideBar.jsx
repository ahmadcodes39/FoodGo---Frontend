import React, { useContext } from "react";
import { ChefHat, UtensilsCrossed, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App Global States/userAuthContext";

const SideBar = ({ items,onItemClick }) => {
  const {user, setToken, setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="w-64 flex flex-col justify-between shadow-2xl p-4 min-h-screen fixed top-0 left-0 bg-white">
      <div>
        <h1 className="text-xl lg:pl-1 font-bold flex items-center justify-end  sm:justify-normal gap-1 text-orange-500 mb-6">
          <UtensilsCrossed />
          FoodGo
        </h1>

        <ul className="flex flex-col gap-2 w-full">
          {items.map((item, index) => (
            <NavLink
              to={item.destination}
              key={index}
                onClick={onItemClick}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md p-2 w-full transition-all duration-150 
        ${
          isActive
            ? "bg-orange-500 text-white shadow-md"
            : "hover:bg-orange-300 hover:text-white text-gray-700"
        }`
              }
            >
              <div className="relative flex items-center">
                <div className="relative">
                  {item.icon}
                  {/* 🔴 Red dot only if hasNotification */}
                  {item.hasNotification && (
                    <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
              </div>
              <span>{item.title}</span>
            </NavLink>
          ))}
        </ul>
      </div>

      <div>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-md p-2 w-full transition-all duration-150 hover:bg-red-500 hover:text-white text-gray-700 mb-3 border border-red-400"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 p-2 rounded-md bg-gray-50 shadow-sm">
          <div className="relative">
            <img
              src={user.profilePic}
              alt="profile"
              className="w-12 h-12 object-cover rounded-full border border-gray-300"
            />
            <span className="absolute bottom-1 right-1 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <p className="font-medium text-gray-800">{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
