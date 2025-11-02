import React from "react";
import Res_Dashboard_Page from "./Pages/RestaurantPages/Res_Dashboard_Page";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Res_Orders_Page from "./Pages/RestaurantPages/Res_Orders_Page";
import RestaurantLayout from "./Components/AppLayouts/RestaurantLayout";
import Res_Menu_Page from "./Pages/RestaurantPages/Res_Menu_Page";
import Signup_Page from "./Pages/CommonPages/SignUp_Page";
import Login_Page from "./Pages/CommonPages/Login_Page";
// import Admin_Login_Page from "./Pages/AdminPages/Admin_Login_Page";
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
import Res_Analytics_Page from "./Pages/RestaurantPages/Res_Analytics_Page";
import Res_RestaurantProfile_Page from "./Pages/RestaurantPages/Res_RestaurantProfile_Page";
import Res_AccountSection_Page from "./Pages/RestaurantPages/Res_AccountSection_Page";
import Ad_SpecificRestaurantInfo from "./Pages/AdminPages/Ad_SpecificRestaurantInfo";
import Ad_Analytics_Page from "./Pages/AdminPages/Ad_Analytics_Page";
// import CMP_Login_Page from "./Pages/AdminPages/Sub Admins/ComplaintManagerPages/CMP_Login_Page";
import Res_Complaint_Page from "./Pages/RestaurantPages/Res_Complaint_Page";
import ComplaintManagerLayout from "./Components/AppLayouts/ComplaintManagerLayout";
import CMP_Dashboard_Page from "./Pages/AdminPages/Sub Admins/ComplaintManagerPages/CMP_Dashboard_Page";
import CMP_View_Restaurant_Page from "./Pages/AdminPages/Sub Admins/ComplaintManagerPages/CMP_View_Restaurant_Page";
import CMP_View_Customer_Page from "./Pages/AdminPages/Sub Admins/ComplaintManagerPages/CMP_View_Customer_Page";
import CMP_Complaints_Page from "./Pages/AdminPages/Sub Admins/ComplaintManagerPages/CMP_Complaints_Page";
import Cus_Restaurant_Page from "./Pages/CustomerPages/Cus_Restaurant_Page";
import Cus_ProfileSetting_Page from "./Pages/CustomerPages/Cus_ProfileSetting_Page";
import Cus_Orders_Page from "./Pages/CustomerPages/Cus_Orders_Page";
import Cus_Complaint_Page from "./Pages/CustomerPages/Cus_Complaint_Page";
// import VerificationManagerLayout from "./Components/AppLayouts/VerificationManagerLayout";
import VRF_Dashboard_Page from "./Pages/AdminPages/Sub Admins/VerificationManagerPages/VRF_Dashboard_Page";
import CommonLoginPage from "./Pages/CommonPages/CommonLoginPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login routes */}
        <Route path="/login" element={<Login_Page />} />
        <Route path="/admin/login" element={<CommonLoginPage role={"admin"} />} />
        <Route path="/complaint-manager/login" element={<CommonLoginPage role={"complaint-manager"} />} />
        <Route path="/verification-manager/login" element={<CommonLoginPage role={"verification-manager"} />} />
        {/* Sign Up Routes */}
        <Route path="/create-account" element={<Signup_Page />} />

        {/* Landing page */}
        <Route path="/" element={<Landing_Page />} />
        {/* Customer Routes */}
        <Route path="/home" element={<Cus_Home_Page />} />
        <Route path="/:id/:name" element={<Cus_Menu_Page />} />
        {/* take user id in route */}
        <Route path="/cart" element={<Cus_Cart_Page />} />
        <Route path="/restaurants" element={<Cus_Restaurant_Page />} />
        <Route path="/profile-setting" element={<Cus_ProfileSetting_Page />} />
        <Route path="/my-orders" element={<Cus_Orders_Page />} />
        <Route path="/my-complaints" element={<Cus_Complaint_Page />} />

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
        <Route
          path="/restaurant/analytics-page"
          element={
            <RestaurantLayout showSidebar={true}>
              <Res_Analytics_Page />
            </RestaurantLayout>
          }
        />
        <Route
          path="/restaurant/restaurant-profile"
          element={
            <RestaurantLayout showSidebar={true}>
              <Res_RestaurantProfile_Page />
            </RestaurantLayout>
          }
        />
        <Route
          path="/restaurant/account-settings"
          element={
            <RestaurantLayout showSidebar={true}>
              <Res_AccountSection_Page />
            </RestaurantLayout>
          }
        />
        <Route
          path="/restaurant/complaints"
          element={
            <RestaurantLayout showSidebar={true}>
              <Res_Complaint_Page />
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
        <Route
          path="/admin/:id/restaurant-info"
          element={
            <AdminLayout showSidebar={true}>
              <Ad_SpecificRestaurantInfo />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <AdminLayout showSidebar={true}>
              <Ad_Analytics_Page />
            </AdminLayout>
          }
        />

        {/* Complaint Manager Routes */}
        
        <Route
          path="/cm/restaurants"
          element={
            <ComplaintManagerLayout showSidebar={true}>
              <CMP_View_Restaurant_Page />
            </ComplaintManagerLayout>
          }
        />
        <Route
          path="/cm/customers"
          element={
            <ComplaintManagerLayout showSidebar={true}>
              <CMP_View_Customer_Page />
            </ComplaintManagerLayout>
          }
        />
        <Route
          path="/cm/complaints"
          element={
            <ComplaintManagerLayout showSidebar={true}>
              <CMP_Complaints_Page />
            </ComplaintManagerLayout>
          }
        />
        <Route
          path="/cm/:id/restaurant-info"
          element={
            <ComplaintManagerLayout showSidebar={true}>
              <Ad_SpecificRestaurantInfo isAuthorize={false} />
            </ComplaintManagerLayout>
          }
        />

        {/* Verification Manager Routes */}
        <Route path="/vrf/dashboard" element={<VRF_Dashboard_Page />} />
        <Route
          path="/vrf/:id/restaurant-info"
          element={<Ad_SpecificRestaurantInfo isAuthorize={true} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
