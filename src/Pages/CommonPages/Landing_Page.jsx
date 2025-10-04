import React from "react";
import Header from "../../Components/Landing Page Components/Header";
import Hero from "../../Components/Landing Page Components/Hero";
import HowItWorks from "../../Components/Landing Page Components/HowItWorks";
import KeyFeatures from "../../Components/Landing Page Components/KeyFeatures";
import TopRestaurantsSection from "../../Components/Landing Page Components/TopRestaurantsSection";
import { Fish, Pizza, Coffee, Salad, Beef, Drumstick, IceCream, Cake, Sandwich, Soup } from "lucide-react";
import LastSection from "../../Components/Landing Page Components/LastSection";
import Footer from "../../Components/Common/Footer";

const Landing_Page = () => {
 const topRestaurants = [
  { icon: <Fish size={22} />, name: "Ocean Fresh", category: "Seafood" },
  { icon: <Pizza size={22} />, name: "Pizza Palace", category: "Italian" },
  { icon: <Coffee size={22} />, name: "Coffee Corner", category: "Cafe" },
  { icon: <Salad size={22} />, name: "Green Bowl", category: "Healthy" },
  { icon: <Beef size={22} />, name: "Steak House", category: "Grill" },
  { icon: <Drumstick size={22} />, name: "Fried Feast", category: "Chicken" },
  { icon: <IceCream size={22} />, name: "Cool Cones", category: "Desserts" },
  { icon: <Cake size={22} />, name: "Sweet Tooth", category: "Bakery" },
  { icon: <Sandwich size={22} />, name: "Quick Bites", category: "Snacks" },
  { icon: <Soup size={22} />, name: "Warm Bowls", category: "Soups" },
];
  return (
    <div>
      <Header />
      <Hero />
      <HowItWorks />
      <KeyFeatures />
      <TopRestaurantsSection restaurants={topRestaurants}/>
      <LastSection/>
      <Footer/>
    </div>
  );
};

export default Landing_Page;
