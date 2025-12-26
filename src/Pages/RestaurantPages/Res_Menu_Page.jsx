import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import Res_menuHeader from "../../Components/RestaurantComponents/Res_menuHeader";
import Res_menuTable from "../../Components/RestaurantComponents/Res_menuTable";
import { getMenuCategories, getMenuItems } from "../../api/restaurantApi";
import Loading from "../../Components/LoadingSpinner/Loading";

const Res_Menu_Page = () => {
  const { id } = useParams();

  const [menuStats, setMenuStats] = useState(["All"]);
  const [menuItemData, setMenuItemData] = useState([]);
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH MENU ITEMS ----------------
  const fetchMenuItems = useCallback(async () => {
    const { data } = await getMenuItems(id);

    return data.menuItems?.map((item) => ({
      id: item._id,
      name: item.name,
      category: item.category || "Uncategorized",
      price: item.price,
      image: item.image,
      status: data.restaurant?.operationalStatus || "pending",
    })) || [];
  }, [id]);

  // ---------------- FETCH CATEGORIES ----------------
 const fetchMenuCategories = useCallback(async () => {
  const { data } = await getMenuCategories(id);

  const uniqueCategories = [
    "All",
    ...new Set((data.categories || []).map((c) => c.trim())),
  ];

  return uniqueCategories;
}, [id]);


  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [items, categories] = await Promise.all([
          fetchMenuItems(),
          fetchMenuCategories(),
        ]);

        setMenuItemData(items);
        setMenuStats(categories);
      } catch (err) {
        console.error("Menu fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchMenuItems, fetchMenuCategories]);

  // ---------------- REFRESH ----------------
  const refreshContent = async () => {
    setLoading(true);
    const [items, categories] = await Promise.all([
      fetchMenuItems(),
      fetchMenuCategories(),
    ]);
    setMenuItemData(items);
    setMenuStats(categories);
    setLoading(false);
  };

  // ---------------- FILTER (MEMOIZED) ----------------
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return menuItemData.filter((menu) => {
      const matchesSearch =
        menu.name?.toLowerCase().includes(query) ||
        menu.category?.toLowerCase().includes(query) ||
        menu.price?.toString().includes(query);

      const matchesCategory =
        activeStatus === "All" ||
        menu.category.toLowerCase() === activeStatus.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [menuItemData, searchQuery, activeStatus]);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-6">
      <Res_menuHeader
        activeStatus={activeStatus}
        menuStats={menuStats}
        handleBtnClick={setActiveStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        refreshContent={refreshContent}
      />

      <Res_menuTable
        dummyMenuData={filteredData}
        refreshContent={refreshContent}
      />
    </div>
  );
};

export default Res_Menu_Page;
