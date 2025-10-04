import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * TopRestaurantsSection
 * - Accepts `restaurants` array prop: [{ icon, name, category }]
 * - Responsive: 1 / 2 / 3 / 4 cards per view (via min-w classes)
 * - Uses scroll-snap and programmatic scrollBy for 1-card-per-click movement
 */
const TopRestaurantsSection = ({ restaurants = [] }) => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Update arrow enabled/disabled states
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [restaurants.length]);

  // Compute the horizontal step: distance between the left edges of item 0 and item 1
  const getStep = () => {
    const el = containerRef.current;
    if (!el) return 0;
    const items = el.querySelectorAll(".carousel-item");
    if (items.length === 0) return el.clientWidth;
    if (items.length === 1) return items[0].offsetWidth;
    const r0 = items[0].getBoundingClientRect();
    const r1 = items[1].getBoundingClientRect();
    return Math.abs(r1.left - r0.left);
  };

  const scrollByStep = (dir = 1) => {
    const el = containerRef.current;
    if (!el) return;
    const step = Math.max(1, getStep()); // guard against 0
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="my-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Top Restaurants</h2>
        <p className="text-gray-500">Discover popular restaurants in your area</p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Carousel row */}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-4 py-4 snap-x snap-mandatory"
          // hide native scrollbar a bit for nicer look (works for Firefox + Webkit)
          style={{ scrollbarWidth: "none" }}
        >
          {restaurants.map((r, idx) => (
            <div
              key={idx}
              className="carousel-item snap-start flex-shrink-0
                         min-w-[80%] sm:min-w-[50%] md:min-w-[33.3333%] lg:min-w-[25%]
                         px-2"
            >
              <div
                className="w-full h-48 flex flex-col items-center justify-center
                           rounded-xl bg-white shadow transition-transform duration-300
                           hover:shadow-lg hover:scale-105 cursor-pointer"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-500 text-white mb-3">
                  {r.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{r.name}</h3>
                <p className="text-sm text-gray-500">{r.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Nav buttons */}
        <button
          onClick={() => scrollByStep(-1)}
          disabled={!canScrollLeft}
          aria-label="Previous"
          className={`absolute top-1/2 -translate-y-1/2 left-2 btn btn-circle btn-sm
            bg-white border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white
            ${!canScrollLeft ? "opacity-40 pointer-events-none" : ""}`}
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={() => scrollByStep(1)}
          disabled={!canScrollRight}
          aria-label="Next"
          className={`absolute top-1/2 -translate-y-1/2 right-2 btn btn-circle btn-sm
            bg-white border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white
            ${!canScrollRight ? "opacity-40 pointer-events-none" : ""}`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default TopRestaurantsSection;
