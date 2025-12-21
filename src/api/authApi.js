import api from "./axiosInstance";

export const registerUser = ({ name, email, phone, password, role }) =>
  api.post("/auth/signup", { name, email, phone, password, role });

export const loginUser = ({ email, password ,role}) =>
  api.post("/auth/login", { email, password ,role});

export const updateProfile = (formData) => api.put("/auth/update-profile", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});