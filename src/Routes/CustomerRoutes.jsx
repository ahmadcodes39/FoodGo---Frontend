import React from "react";
import {  Route, Routes } from "react-router-dom";
import Cus_Menu_Page from "../Pages/CustomerPages/Cus_Menu_Page";
import Cus_Cart_Page from "../Pages/CustomerPages/Cus_Cart_Page";
import Cus_Home_Page from "../Pages/CustomerPages/Cus_Menu_Page"
const CustomerRoutes = () => {
  return (
     <>
     <Route path="/home" element={<Cus_Home_Page />} />
        <Route path="/:id/:name" element={<Cus_Menu_Page />} />
        {/* take user id in route */}
        <Route path="/cart" element={<Cus_Cart_Page />} />

     </>
  );
};

export default CustomerRoutes;
