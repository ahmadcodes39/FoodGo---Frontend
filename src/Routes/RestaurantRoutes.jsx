import React from "react";
import {  Route, Routes } from "react-router-dom";
import RestaurantLayout from "../Components/AppLayouts/RestaurantLayout";
import Res_Dashboard_Page from "../Pages/RestaurantPages/Res_Dashboard_Page";
import Res_Registration_Page from "../Pages/RestaurantPages/Res_Registration_Page";
import Res_Orders_Page from "../Pages/RestaurantPages/Res_Orders_Page";
import Res_Menu_Page from "../Pages/RestaurantPages/Res_Menu_Page";

const RestaurantRoutes = () => {
  return (
        <Routes>
      <Route
        path="/restaurant/dashboard"
        element={
          <RestaurantLayout showSidebar={true}>
            <Res_Dashboard_Page />
          </RestaurantLayout>
        }
      />
        <Route
          path="/restaurant/register"
          element={<Res_Registration_Page />}
        />
        <Route
          path="/restaurant/orders-page"
          element={
            <RestaurantLayout showSidebar={true}>
              <Res_Orders_Page />
            </RestaurantLayout>
          }
        />
        <Route
          path="/restaurant/menu-page"
          element={
            <RestaurantLayout showSidebar={true}>
              <Res_Menu_Page />
            </RestaurantLayout>
          }
        />
      </Routes>
  );
};

export default RestaurantRoutes;
