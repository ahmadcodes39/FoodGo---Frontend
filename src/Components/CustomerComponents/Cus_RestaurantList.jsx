import React from "react";
import Cus_RestaurantCard from "./Cus_Cards/Cus_RestaurantCard";

const dummyRestaurants = [
  {
    id: 1,
    logo: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",

    name: "Pizza Palace",
    cuisine: ["Italian", "Pizza"],
    openingHours: { open: "10:00", close: "23:00" },
    deliveryTime: "25-35 min",
  },
  {
    id: 2,
    logo: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",

    name: "Burger Bistro",
    cuisine: ["American", "Burgers"],
    openingHours: { open: "09:00", close: "21:00" },
    deliveryTime: "15-25 min",
  },
  {
    id: 3,
    logo: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",

    name: "Sushi Spot",
    cuisine: ["Japanese", "Sushi"],
    openingHours: { open: "11:00", close: "22:00" },
    deliveryTime: "30-40 min",
  },
  {
    id: 4,
    logo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    name: "Taco Town",
    cuisine: ["Mexican", "Tacos"],
    openingHours: "10AM - 12AM",
    deliveryTime: "20-30 mins",
  },
  {
    id: 5,
    logo: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    name: "Pasta Paradise",
    cuisine: ["Italian", "Pasta"],
    openingHours: "10AM - 11PM",
    deliveryTime: "25-35 mins",
  },
  {
    id: 6,
    logo: "https://images.unsplash.com/photo-1543362906-6e7e8b7fab60?auto=format&fit=crop&w=800&q=80",
    name: "Curry Corner",
    cuisine: ["Indian", "Curry"],
    openingHours: "11AM - 11PM",
    deliveryTime: "30-40 mins",
  },
];

const Cus_RestaurantList = () => {
  return (
    <div className="py-10 px-6">
      <h2 className="text-2xl font-bold mb-6">Restaurants Near You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyRestaurants.map((restaurant) => (
          <Cus_RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Cus_RestaurantList;
