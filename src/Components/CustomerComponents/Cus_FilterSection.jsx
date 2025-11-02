import React, { useState } from "react";
import { Search, MapPin, Truck } from "lucide-react";

const Cus_FilterSection = ({ onApplyFilters }) => {
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [priceRange, setPriceRange] = useState(50);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");

  const cuisines = [
    "Italian",
    "Chinese",
    "BBQ",
    "Fast Food",
    "Dessert",
    "Seafood",
  ];

  // ✅ Added missing toggleCuisine function
  const toggleCuisine = (cuisine) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((item) => item !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleApplyFilters = () => {
    const filters = {
      restaurantName,
      address,
      cuisines: selectedCuisines,
      deliveryOnly,
      deliveryTime,
      maxPrice: priceRange * 100, // 0 to 10,000 range
    };
    onApplyFilters(filters);
  };

  const handleClearFilters = () => {
    setDeliveryOnly(false);
    setSelectedCuisines([]);
    setPriceRange(50);
    setDeliveryTime("");
    setRestaurantName("");
    setAddress("");
    onApplyFilters({}); // clear all filters in parent
  };

  return (
    <section className="bg-base-200 py-8 px-6 md:px-10 rounded-2xl shadow-sm mt-[70px]">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-orange-500">
          Find Your Next Favorite Meal 🍝
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Search and filter restaurants based on your taste and preferences.
        </p>
      </div>

      {/* Search Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <label className="input input-bordered flex items-center gap-2 bg-white">
          <Search size={16} />
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="grow"
            placeholder="Search by restaurant name"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 bg-white">
          <MapPin size={16} />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="grow"
            placeholder="Search by address"
          />
        </label>
      </div>

      {/* Cuisine Filter */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-2">Cuisine</h3>
        <div className="flex flex-wrap gap-2">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => toggleCuisine(cuisine)}
              className={`px-3 py-1 text-sm rounded-full border ${
                selectedCuisines.includes(cuisine)
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-orange-50"
              } transition`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Delivery Toggle */}
        <div className="flex items-center justify-between sm:justify-start gap-3 bg-white p-3 rounded-lg border">
          <span className="text-gray-700 font-medium flex items-center gap-2">
            <Truck size={16} /> Delivery Only
          </span>
          <input
            type="checkbox"
            className="toggle toggle-warning"
            checked={deliveryOnly}
            onChange={() => setDeliveryOnly(!deliveryOnly)}
          />
        </div>

        {/* Delivery Time */}
        <div className="bg-white p-3 rounded-lg border">
          <label className="label p-0 mb-1">
            <span className="label-text text-gray-700 font-medium">
              Delivery Time
            </span>
          </label>
          <select
            className="select select-bordered w-full bg-white"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
          >
            <option value="">Any</option>
            <option value="0-20">Under 20 min</option>
            <option value="20-35">20 - 35 min</option>
            <option value="35-60">35 - 60 min</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="bg-white p-3 rounded-lg border">
          <label className="label p-0 mb-2">
            <span className="label-text text-gray-700 font-medium">
              Price Range (₨)
            </span>
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="range range-warning range-sm"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₨0</span>
              <span className="font-semibold text-orange-500">
                ₨{priceRange * 100}
              </span>
              <span>₨10,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
        <button
          onClick={handleApplyFilters}
          className="btn bg-orange-500 hover:bg-orange-600 text-white px-8"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClearFilters}
          className="btn border border-orange-500 text-orange-500 hover:bg-orange-100 px-8"
        >
          Clear All Filters
        </button>
      </div>
    </section>
  );
};

export default Cus_FilterSection;
