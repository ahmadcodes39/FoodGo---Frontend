import React from "react";
import Res_Dashboard_Page from "./Pages/RestaurantPages/Res_Dashboard_Page";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Res_Orders_Page from "./Pages/RestaurantPages/Res_Orders_Page";
import RestaurantLayout from "./Components/AppLayouts/RestaurantLayout";
import Res_Menu_Page from "./Pages/RestaurantPages/Res_Menu_Page";
import Signup_Page from "./Pages/CommonPages/SignUp_Page";
import Login_Page from "./Pages/CommonPages/Login_Page";
import Admin_Login_Page from "./Pages/CommonPages/Admin_Login_Page";
import Res_Registration_Page from "./Pages/RestaurantPages/Res_Registration_Page";
import Cus_Home_Page from "./Pages/CustomerPages/Cus_Home_Page";
import Cus_Menu_Page from "./Pages/CustomerPages/Cus_Menu_Page";
import Cus_Cart_Page from "./Pages/CustomerPages/Cus_Cart_Page";
import AdminLayout from "./Components/AppLayouts/AdminLayout";
import Ad_Manage_Restaurant_Page from "./Pages/AdminPages/Ad_Manage_Restaurant_Page";
import Ad_Dashboard_Page from "./Pages/AdminPages/Ad_Dashboard_Page";
import Ad_Complaint_Pages from "./Pages/AdminPages/Ad_Complaint_Pages";
import Ad_Manage_Customer_Page from "./Pages/AdminPages/Ad_Manage_Customer_Page";
import Ad_Manage_Orders_Page from "./Pages/AdminPages/Ad_Manage_Orders_Page";
import Landing_Page from "./Pages/CommonPages/Landing_Page";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login routes */}
        <Route path="/login" element={<Login_Page />} />
        <Route path="/admin/login" element={<Admin_Login_Page />} />
        {/* Sign Up Routes */}
        <Route path="/create-account" element={<Signup_Page />} />

        {/* Landing page */}
        <Route path="/" element={<Landing_Page/>}/>
        {/* Customer Routes */}
        <Route path="/home" element={<Cus_Home_Page />} />
        <Route path="/:id/:name" element={<Cus_Menu_Page />} />
        {/* take user id in route */}
        <Route path="/cart" element={<Cus_Cart_Page />} />

        {/* Restaurant Routes */}
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
          path="/restaurant/dashboard"
          element={
            <RestaurantLayout showSidebar={true}>
              <Res_Dashboard_Page />
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
        {/* Admin Routes */}
        <Route
          path="/admin/restaurants"
          element={
            <AdminLayout showSidebar={true}>
              <Ad_Manage_Restaurant_Page />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout showSidebar={true}>
              <Ad_Dashboard_Page />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <AdminLayout showSidebar={true}>
              <Ad_Complaint_Pages />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <AdminLayout showSidebar={true}>
              <Ad_Manage_Customer_Page />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminLayout showSidebar={true}>
              <Ad_Manage_Orders_Page />
            </AdminLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
