import React from 'react'
import { MapPin, Search } from "lucide-react";
const Cus_HeroSection = () => {
 return (
    <div
      className="relative h-[350px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-orange-700 bg-opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        {/* App Name */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          FoodGo
        </h1>
        <p className="mt-2 text-white text-lg md:text-xl">
          Delicious food, delivered to you
        </p>

        {/* Search Box */}
        <div className="mt-6 flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Restaurant search */}
          <input
            type="text"
            placeholder="Search for restaurants or cuisines"
            className="input w-full md:flex-1 border-none focus:outline-none"
          />

          {/* Location input */}
          <div className="flex items-center px-3 border-t md:border-t-0 md:border-l border-gray-200">
            <MapPin size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Enter your location"
              className="input border-none focus:outline-none"
            />
          </div>

          {/* Search Button */}
          <button className="btn bg-orange-500 hover:bg-orange-600 text-white rounded-none">
            <Search size={18} className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cus_HeroSection
