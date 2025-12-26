import api from "./axiosInstance";

export const registerRestaurant = (formData) =>
  api.post("/restaurant/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getRestaurantStatus = () => api.get("/restaurant/status");

export const addMenu = (restaurantId, formData) =>
  api.post(`restaurant/${restaurantId}/add-menu`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getMenuCategories = (id) =>
  api.get(`/restaurant/${id}/menu-categories`);

export const getMenuItems = (restaurantId) =>
  api.get(`/restaurant/${restaurantId}/get-menu`);

export const deleteMenuItem = (restaurantId, menuItemId) =>
  api.delete(`/restaurant/${restaurantId}/${menuItemId}/delete-menu`);

export const editMenuItem = (restaurantId, menuItemId, formData) =>
  api.put(`/restaurant/${restaurantId}/${menuItemId}/update-menu`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getRestaurantOrders = (restaurantId) =>
  api.get(`/restaurant/${restaurantId}/orders`);

export const changeOrderStatus = (data) =>
  api.post("/restaurant/update-order-status", data);

export const issueAComplaint = (data) =>
  api.post("/restaurant/make-complaint", data);

export const getRestaurantInfo = (restaurantId) =>
  api.get(`/restaurant/${restaurantId}/get-detail`);

export const updateRestaurantDetails = (restaurantId, data) =>
  api.put(`/restaurant/${restaurantId}/update-restaurant-details`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getResComplaints = () => api.get(`/restaurant/my-complaints`);

export const getDashboardData = (id) =>
  api.get(`/restaurant/${id}/dashboard-stats`);

export const getDashboardAnalytics = (id, range) =>
  api.get(`/restaurant/${id}/revenue`, {
    params: { range },
  });

export const getCompleteAnalytics = (id, range) =>
  api.get(`/restaurant/${id}/analytics`, {
    params: { range },
  });
