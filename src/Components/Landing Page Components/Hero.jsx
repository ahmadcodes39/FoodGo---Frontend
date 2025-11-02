import React, { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const foodImages = [
  { src: "landing 1.jpg", alt: "Gourmet burger with fries" },
  { src: "landing 2.jpg", alt: "Fresh sushi platter" },
  { src: "landing 3.jpg", alt: "Italian pizza with fresh basil" },
  { src: "landing 4.jpg", alt: "Thai noodles with shrimp" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const total = foodImages.length;

  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);

  return (
    <div className="bg-[#fff7f2]  md:min-h-[80vh] flex-col md:flex items-center justify-center px-10 md:py-16">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center mt-20">
        {/* Left Section */}
        <div>
          <h1 className="text-5xl font-extrabold leading-snug">
            Delicious food,{" "}
            <span className="text-orange-500">delivered fast</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Order meals in minutes or grow your restaurant business with our
            platform
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <Link to={"/create-account"} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md flex items-center gap-2">
              Order Now <ArrowRight size={18} />
            </Link >
            <Link to={"/create-account"} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-md">
              Register Restaurant
            </Link>
          </div>
        </div>

        {/* Right Section - Smooth Carousel */}
        <div className="relative w-full max-w-2xl mx-auto rounded-xl shadow-lg overflow-hidden">
          {/* Image Track */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {foodImages.map((image, idx) => (
              <img
                key={idx}
                src={image.src}
                alt={image.alt}
                className="w-full h-60 sm:h-72 md:h-[300px] object-cover flex-shrink-0 rounded-lg"
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="absolute left-3 right-3 top-1/2 flex -translate-y-1/2 justify-between md:left-5 md:right-5">
            <button
              onClick={prevSlide}
              className="bg-white hover:bg-orange-500 text-gray-700 hover:text-white w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full shadow transition"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="bg-white hover:bg-orange-500 text-gray-700 hover:text-white w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full shadow transition"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
