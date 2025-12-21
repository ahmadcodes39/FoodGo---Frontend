import React, { useEffect, useMemo, useState } from "react";
import Cus_RestaurantHeader from "../../Components/CustomerComponents/Cus_RestaurantHeader";
import Cus_RestaurantMenuSection from "../../Components/CustomerComponents/Cus_RestaurantMenuSection";
import FilterButton from "../../Components/Common/FilterButton";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Landing Page Components/Header";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getRestaurantMenu } from "../../api/customerApi";
import Loading from "../../Components/LoadingSpinner/Loading";

const Cus_Menu_Page = () => {
  const [menuStats, setMenuStats] = useState([]);
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [restaurantAddressInfo, setRestaurantAddressInfo] = useState({
    name: "",
    logo: "",
    address: "",
    description: "",
    cuisine: [],
    openingHours: "",
    restaurantPhoneNumber: "",
    deliveryAvailable: false,
    deliveryTime: "",
  });
  const [loading, setLoading] = useState(true); // <-- loading state
  const [activeStatus, setActiveStatus] = useState("All");

  const { id } = useParams();

  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      setLoading(true); // start loading
      try {
        const response = await getRestaurantMenu(id);
        const data = response.data;

        if (data.success) {
          setRestaurantMenu(data.restaurant.menu);
          setMenuStats(["All", ...data.categories]);
          setRestaurantAddressInfo({
            name: data.restaurant.name,
            address: data.restaurant.address,
            description: data.restaurant.description,
            logo: data.restaurant.logo,
            openingHours: data.restaurant.openingHours,
            restaurantPhoneNumber: data.restaurant.restaurantPhoneNumber,
            deliveryAvailable: data.restaurant.deliveryAvailable,
            deliveryTime: data.restaurant.deliveryTime,
            cuisine: data.restaurant.cuisine,
          });
        } else {
          toast.error(data.message || "Failed to fetch menu");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        console.log(error);
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchRestaurantMenu();
  }, [id]);

  // Filtering
  const filteredMenus = useMemo(() => {
    if (activeStatus === "All") return restaurantMenu;
    return restaurantMenu.filter(
      (item) => item.category.toLowerCase() === activeStatus.toLowerCase()
    );
  }, [activeStatus, restaurantMenu]);

  const onBtnClick = (text) => {
    setActiveStatus(text);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 mt-[90px]">
      <Header />
      <Cus_RestaurantHeader restaurant={restaurantAddressInfo} />

      <div className="flex justify-end gap-3 md:sticky md:top-16 z-10 bg-white p-5 flex-wrap">
        {menuStats.map((item, index) => (
          <FilterButton
            key={index}
            text={item}
            isActive={activeStatus === item}
            onBtnClick={() => onBtnClick(item)}
          />
        ))}
      </div>

      <Cus_RestaurantMenuSection menuItems={filteredMenus} />
      <Footer />
    </div>
  );
};

export default Cus_Menu_Page;
