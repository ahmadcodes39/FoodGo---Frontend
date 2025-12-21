import React, { useEffect, useMemo, useState } from "react";
import Cus_HeroSection from "../../Components/CustomerComponents/Cus_HeroSection";
import Cus_RestaurantList from "../../Components/CustomerComponents/Cus_RestaurantList";
import FilterButton from "../../Components/Common/FilterButton";
import { Filter } from "lucide-react";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Landing Page Components/Header";
// import { dummyRestaurants } from "../../Components/Dummy Data/DummyData";
import { getCuisine, getRestaurants } from "../../api/customerApi";
import toast from "react-hot-toast";
import Loading from "../../Components/LoadingSpinner/Loading";

const Cus_Home_Page = () => {
  const [searchRestaurantQuery, setSearchRestaurantQuery] = useState("");
  const [searchAddressQuery, setSearchAddressQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [filterItems, setFilterItems] = useState(["All"]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRestaurantsData = async () => {
      setLoading(true); 
      try {
        const response = await getRestaurants();
        const data = response.data;
        if (data.success) {
          setRestaurants(data.restaurants);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false); 
      }
    };
    getRestaurantsData();
  }, []);

  useEffect(() => {
    const getCuisines = async () => {
      setLoading(true); 
      try {
        const response = await getCuisine();
        const data = response.data;
        if (data.success) {
          setFilterItems(["All", ...data.cuisine]);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false); 
      }
    };
    getCuisines();
  }, []);

  const filterRestaurants = useMemo(() => {
    const restaurantQuery = searchRestaurantQuery.toLowerCase();
    const addressQuery = searchAddressQuery.toLowerCase();

    return restaurants.filter((restaurant) => {
      const matchesCuisine =
        activeStatus === "All" ||
        restaurant.cuisine.some(
          (c) => c.toLowerCase() === activeStatus.toLowerCase()
        );

      const matchesSearch =
        restaurant.name.toLowerCase().includes(restaurantQuery) ||
        restaurant.cuisine.some((c) =>
          c.toLowerCase().includes(restaurantQuery)
        );

      const matchesAddress = restaurant.address
        ? restaurant.address.toLowerCase().includes(addressQuery)
        : true;

      return matchesCuisine && matchesSearch && matchesAddress;
    });
  }, [activeStatus, searchRestaurantQuery, searchAddressQuery, restaurants]);

  const onBtnClick = (text) => {
    setActiveStatus(text);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col gap-5 mt-[90px]">
      <Header />

      <Cus_HeroSection
        setSearchRestaurantQuery={setSearchRestaurantQuery}
        setSearchAddressQuery={setSearchAddressQuery}
      />

      {/* Cuisine Filters */}
      <div className="flex flex-wrap items-center gap-3 px-4 md:px-6">
        <div className="flex items-center gap-2 py-4 w-full md:w-auto">
          <Filter className="text-orange-500" />
          <h2 className="font-bold text-base md:text-lg">Filter by Cuisine</h2>
        </div>

        {filterItems.map((item, index) => (
          <FilterButton
            key={index}
            text={item}
            isActive={activeStatus === item}
            onBtnClick={() => onBtnClick(item)}
          />
        ))}
      </div>

      <Cus_RestaurantList restaurantsData={filterRestaurants} />

      <Footer />
    </div>
  );
};

export default Cus_Home_Page;
