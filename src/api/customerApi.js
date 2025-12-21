import api from "./axiosInstance";

export const getCuisine = () => api.get("/customer/restaurant-cuisine");

export const getRestaurants = (page = 1, limit = 6) =>
  api.get(`/customer/restaurant-front-info?page=${page}&limit=${limit}`);

export const getRestaurantMenu = (restaurantId) =>
  api.get(`/customer/${restaurantId}/restaurant-info`);

export const getMyComplaints = () => api.get("/customer/complaints/my");

export const getOrders = () => api.get("/customer/my-orders");

export const makeAComplaint = ({
  reason,
  orderId,
  againstUser,
  againstRestaurant,
}) =>
  api.post("/customer/make-complaint", {
    reason,
    orderId,
    againstUser,
    againstRestaurant,
  });

  export const checkIsComplaint = ( orderId)=>api.get(`/customer/check-isComplaint?orderId=${orderId}`);

export const getIndividualComplaint = (complaintId) =>
  api.get(`/customer/complaints?complaintId=${complaintId}`);

export const placeOrder = (data) => api.post("/customer/place-order", data);


