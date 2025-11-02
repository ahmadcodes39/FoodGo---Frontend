import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UtensilsCrossed,
  ShoppingCart,
  User,
  ClipboardList,
  AlertTriangle,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { useCart } from "../App Global States/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // demo only
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalQuantity } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => setIsLoggedIn(false);

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-[#fff9f5]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <UtensilsCrossed className="text-orange-500 mr-2" size={26} />
          <Link to="/home" className="text-xl font-bold text-gray-800">
            FoodGo
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/home" className="hover:text-orange-500 font-bold">
            Home
          </Link>
          <Link to="/restaurants" className="hover:text-orange-500 font-bold">
            Restaurants
          </Link>
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link to="/cart" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <ShoppingCart size={20} />
                  {totalQuantity > 0 && (
                    <span className="badge badge-sm indicator-item bg-orange-500 text-white border-none">
                      {totalQuantity}
                    </span>
                  )}
                </div>
              </Link>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <User size={22} className="text-gray-700" />
                </div>
                <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56">
                  <li>
                    <Link to="/my-orders" className="flex items-center gap-2">
                      <ClipboardList size={16} /> My Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-complaints" className="flex items-center gap-2">
                      <AlertTriangle size={16} /> Complaints
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile-setting" className="flex items-center gap-2">
                      <Settings size={16} /> Profile Settings
                    </Link>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full justify-center bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
              >
                Order Now
              </Link>
              <Link
                to="/login"
                className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
              >
                Register Restaurant
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md transition-all duration-200">
          <ul className="flex flex-col py-3 px-5 space-y-3 text-gray-800 font-medium">
            {/* Main Links */}
            <li className="flex items-center gap-2">
              <Home size={18} /> 
              <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="flex items-center gap-2">
              <ShoppingCart size={18} /> 
              <Link to="/restaurants" onClick={() => setMenuOpen(false)}>Restaurants</Link>
            </li>

            {isLoggedIn ? (
              <>
                <li className="flex items-center gap-2">
                  <ClipboardList size={18} /> 
                  <Link to="/my-orders" onClick={() => setMenuOpen(false)}>My Orders</Link>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle size={18} /> 
                  <Link to="/my-complaints" onClick={() => setMenuOpen(false)}>Complaints</Link>
                </li>
                <li className="flex items-center gap-2">
                  <Settings size={18} /> 
                  <Link to="/profile-setting" onClick={() => setMenuOpen(false)}>Profile Settings</Link>
                </li>
               
                <li className="flex items-center gap-2">
                  <ShoppingCart size={18} /> 
                  <Link to="/cart" onClick={() => setMenuOpen(false)}>
                    Cart
                  </Link>
                  {totalQuantity > 0 && (
                    <span className="ml-auto badge badge-sm bg-orange-500 text-white">{totalQuantity}</span>
                  )}
                </li>
                <li className="pt-2">
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2">
                  <User size={18} /> 
                  <Link to="/features" onClick={() => setMenuOpen(false)}>Features</Link>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle size={18} /> 
                  <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                </li>
                <div className="flex flex-col gap-2 pt-3">
                  <Link
                    to="/order-now"
                    onClick={() => setMenuOpen(false)}
                    className="btn btn-outline btn-sm border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    Order Now
                  </Link>
                  <Link
                    to="/register-restaurant"
                    onClick={() => setMenuOpen(false)}
                    className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
                  >
                    Register Restaurant
                  </Link>
                </div>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
