import api from "./axiosInstance";

export const getRestaurants = () => api.get("/admin/fetch-all-restaurants");

export const approveRestaurant = (restaurantId, status) =>
  api.post("/admin/approve-restaurant", { restaurantId, status });

export const fetchRestaurantInfo = (id) =>
  api.get(`/admin/${id}/restaurant-info`);

export const getAllCustomers = () => api.get("/admin/fetch-all-customers");

export const getCustomerProfile = (userId) =>
  api.get("/admin/get-customer-profile", { params: { userId } });

export const getAllOrders = () => api.get("/admin/orders/all");

export const getAllComplaints = () => api.get("/admin/get-complaints");

export const resolveComplaint = (
  complaintId,
  status,
  messageToCustomer,
  messageToRestaurant
) =>
  api.put("/admin/resolve-complaint", {
    complaintId,
    status,
    messageToCustomer,
    messageToRestaurant,
  });

export const updateCustomerStatus = (userId, status) =>
  api.put("/admin/update-user-status", { userId, status });

export const getDashboardStats = () => api.get("/admin/dashboard-stats");

export const getRevenueGrowth = (range) =>
  api.get(`/admin/revenue-growth`, {
    params: { range },
  });

export const getBusinessAnalytics = (range) =>
  api.get(`/admin/analytics`, {
    params: { range },
  });


