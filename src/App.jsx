import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { AuthContext } from "./App Global States/userAuthContext.jsx";
import PublicRoute from "./ProtectedRoute/publicRoute.jsx";
// Customer Pages
import Cus_Home_Page from "./Pages/CustomerPages/Cus_Home_Page";
import Cus_Menu_Page from "./Pages/CustomerPages/Cus_Menu_Page";
import Cus_Cart_Page from "./Pages/CustomerPages/Cus_Cart_Page";
import Cus_ProfileSetting_Page from "./Pages/CustomerPages/Cus_ProfileSetting_Page";
import Cus_Orders_Page from "./Pages/CustomerPages/Cus_Orders_Page";
import Cus_Complaint_Page from "./Pages/CustomerPages/Cus_Complaint_Page";
import Landing_Page from "./Pages/CommonPages/Landing_Page";
import Login_Page from "./Pages/CommonPages/Login_Page";
import Signup_Page from "./Pages/CommonPages/SignUp_Page";
import CommonLoginPage from "./Pages/CommonPages/CommonLoginPage";

// Restaurant Pages
import RestaurantLayout from "./Components/AppLayouts/RestaurantLayout";
import Res_Dashboard_Page from "./Pages/RestaurantPages/Res_Dashboard_Page";
import Res_Orders_Page from "./Pages/RestaurantPages/Res_Orders_Page";
import Res_Menu_Page from "./Pages/RestaurantPages/Res_Menu_Page";
import Res_Analytics_Page from "./Pages/RestaurantPages/Res_Analytics_Page";
import Res_RestaurantProfile_Page from "./Pages/RestaurantPages/Res_RestaurantProfile_Page";
import Res_AccountSection_Page from "./Pages/RestaurantPages/Res_AccountSection_Page";
import Res_Complaint_Page from "./Pages/RestaurantPages/Res_Complaint_Page";
import Res_Registration_Page from "./Pages/RestaurantPages/Res_Registration_Page";

// Admin Pages
import AdminLayout from "./Components/AppLayouts/AdminLayout";
import Ad_Dashboard_Page from "./Pages/AdminPages/Ad_Dashboard_Page";
import Ad_Manage_Restaurant_Page from "./Pages/AdminPages/Ad_Manage_Restaurant_Page";
import Ad_Complaint_Pages from "./Pages/AdminPages/Ad_Complaint_Pages";
import Ad_Manage_Customer_Page from "./Pages/AdminPages/Ad_Manage_Customer_Page";
import Ad_Manage_Orders_Page from "./Pages/AdminPages/Ad_Manage_Orders_Page";
import Ad_SpecificRestaurantInfo from "./Pages/AdminPages/Ad_SpecificRestaurantInfo";
import Ad_Analytics_Page from "./Pages/AdminPages/Ad_Analytics_Page";

// Complaint Manager Pages
import ComplaintManagerLayout from "./Components/AppLayouts/ComplaintManagerLayout";
import VerificationManagerLayout from "./Components/AppLayouts/VerificationManagerLayout";
// import CMP_Dashboard_Page from "./Pages/AdminPages/Sub Admins/ComplaintManagerPages/CMP_Dashboard_Page";
import CMP_View_Restaurant_Page from "./Pages/AdminPages/Sub Admins/ComplaintManagerPages/CMP_View_Restaurant_Page";
import CMP_View_Customer_Page from "./Pages/AdminPages/Sub Admins/ComplaintManagerPages/CMP_View_Customer_Page";
import CMP_Complaints_Page from "./Pages/AdminPages/Sub Admins/ComplaintManagerPages/CMP_Complaints_Page";

// Verification Manager Pages
import VRF_Dashboard_Page from "./Pages/AdminPages/Sub Admins/VerificationManagerPages/VRF_Dashboard_Page";
import Cus_Restaurant_Page from "./Pages/CustomerPages/Cus_Restaurant_Page.jsx";
import RestaurantRequestPending from "./Components/RestaurantComponents/RestaurantRequestPending.jsx";
import RestaurantStatusGuard from "./Components/RestaurantComponents/RestaurantStatusGuard.jsx";
import PaymentSuccess from "./Components/CustomerComponents/PaymentSuccess.jsx";
import PaymentCancel from "./Components/CustomerComponents/PaymentCancel.jsx.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Landing_Page />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login_Page />
            </PublicRoute>
          }
        />
        <Route
          path="/create-account"
          element={
            <PublicRoute>
              <Signup_Page />
            </PublicRoute>
          }
        />

        {/* Customer Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute role="customer">
              <Cus_Home_Page />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id/:name"
          element={
            <ProtectedRoute role="customer">
              <Cus_Menu_Page />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute role="customer">
              <Cus_Cart_Page />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-setting"
          element={
            <ProtectedRoute role="customer">
              <Cus_ProfileSetting_Page />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute role="customer">
              <Cus_Orders_Page />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute role="customer">
              <Cus_Complaint_Page />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurants"
          element={
            <ProtectedRoute role="customer">
              <Cus_Restaurant_Page />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-success"
          element={
            <ProtectedRoute role="customer">
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-cancel"
          element={
            <ProtectedRoute role="customer">
              <PaymentCancel />
            </ProtectedRoute>
          }
        />

        {/* Restaurant Routes */}
        <Route
          path="/restaurant/register"
          element={
            <ProtectedRoute role="restaurantOwner">
              <Res_Registration_Page />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant/register-status"
          element={
            <ProtectedRoute role="restaurantOwner">
              <RestaurantStatusGuard>
                <RestaurantRequestPending />
              </RestaurantStatusGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/:id/restaurant/dashboard"
          element={
            <ProtectedRoute role="restaurantOwner">
              <RestaurantLayout showSidebar={true}>
                <Res_Dashboard_Page />
              </RestaurantLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id/restaurant/orders-page"
          element={
            <ProtectedRoute role="restaurantOwner">
              <RestaurantLayout showSidebar={true}>
                <Res_Orders_Page />
              </RestaurantLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id/restaurant/menu-page"
          element={
            <ProtectedRoute role="restaurantOwner">
              <RestaurantLayout showSidebar={true}>
                <Res_Menu_Page />
              </RestaurantLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id/restaurant/analytics-page"
          element={
            <ProtectedRoute role="restaurantOwner">
              <RestaurantLayout showSidebar={true}>
                <Res_Analytics_Page />
              </RestaurantLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id/restaurant/restaurant-profile"
          element={
            <ProtectedRoute role="restaurantOwner">
              <RestaurantLayout showSidebar={true}>
                <Res_RestaurantProfile_Page />
              </RestaurantLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id/restaurant/account-settings"
          element={
            <ProtectedRoute role="restaurantOwner">
              <RestaurantLayout showSidebar={true}>
                <Res_AccountSection_Page />
              </RestaurantLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id/restaurant/complaints"
          element={
            <ProtectedRoute role="restaurantOwner">
              <RestaurantLayout showSidebar={true}>
                <Res_Complaint_Page />
              </RestaurantLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<CommonLoginPage role="admin" />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout showSidebar={true}>
                <Ad_Dashboard_Page />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/restaurants"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout showSidebar={true}>
                <Ad_Manage_Restaurant_Page />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout showSidebar={true}>
                <Ad_Complaint_Pages />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout showSidebar={true}>
                <Ad_Manage_Customer_Page />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout showSidebar={true}>
                <Ad_Manage_Orders_Page />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/:id/restaurant-info"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout showSidebar={true}>
                <Ad_SpecificRestaurantInfo />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout showSidebar={true}>
                <Ad_Analytics_Page />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Complaint Manager */}
        <Route
          path="/cm/login"
          element={<CommonLoginPage role="complaintManager" />}
        />

        <Route
          path="/cm/restaurants"
          element={
            <ProtectedRoute role="complaintManager">
              <ComplaintManagerLayout showSidebar={true}>
                <CMP_View_Restaurant_Page />
              </ComplaintManagerLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cm/customers"
          element={
            <ProtectedRoute role="complaintManager">
              <ComplaintManagerLayout showSidebar={true}>
                <CMP_View_Customer_Page />
              </ComplaintManagerLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cm/complaints"
          element={
            <ProtectedRoute role="complaintManager">
              <ComplaintManagerLayout showSidebar={true}>
                <CMP_Complaints_Page />
              </ComplaintManagerLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cm/:id/restaurant-info"
          element={
            <ProtectedRoute role="complaintManager">
              <ComplaintManagerLayout showSidebar={true}>
                <Ad_SpecificRestaurantInfo />
              </ComplaintManagerLayout>
            </ProtectedRoute>
          }
        />

        {/* Verification Manager */}
        <Route
          path="/vrf/login"
          element={<CommonLoginPage role="verificationManager" />}
        />

        <Route
          path="/vrf/dashboard"
          element={
            <ProtectedRoute role="verificationManager">
              <VRF_Dashboard_Page />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vrf/:id/restaurant-info"
          element={
            <ProtectedRoute role="verificationManager">
              <VerificationManagerLayout showSidebar={true}>
                <Ad_SpecificRestaurantInfo isAuthorize={true} />
              </VerificationManagerLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
