import api from "./axiosInstance";

export const registerRestaurant = (formData) => api.post("/restaurant/register", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});

export const getRestaurantStatus = ()=>api.get("/restaurant/status")

export const addMenu = (restaurantId, formData) => 
    api.post(`restaurant/${restaurantId}/add-menu`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
