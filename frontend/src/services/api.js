import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("fitkit-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getProducts = () => api.get("/products");
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (product) => api.post("/products", product);
export const updateProduct = (id, product) =>
  api.put(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const createOrder = (order) => api.post("/orders", order);
export const getMyOrders = () => api.get("/orders/my-orders");
export const registerUser = (user) => api.post("/auth/register", user);
export const loginUser = (credentials) => api.post("/auth/login", credentials);

export default api;
