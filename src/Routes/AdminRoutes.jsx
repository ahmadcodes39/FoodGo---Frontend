import React from "react";
import {  Routes ,Route } from "react-router-dom";
import AdminLayout from "../Components/AppLayouts/AdminLayout";
import Admin_Login_Page from "../Pages/CommonPages/Admin_Login_Page";
import Ad_Dashboard_Page from "../Pages/AdminPages/Ad_Dashboard_Page";
import Ad_Manage_Restaurant_Page from "../Pages/AdminPages/Ad_Manage_Restaurant_Page";

const AdminRoutes = () => {
  return (
    
      <Routes>
        <Route path="/admin/login" element={<Admin_Login_Page />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout showSidebar={true}>
              <Ad_Dashboard_Page />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/restaurants"
          element={
            <AdminLayout showSidebar={true}>
              <Ad_Manage_Restaurant_Page />
            </AdminLayout>
          }
        />
      </Routes>
    
  );
};

export default AdminRoutes;
