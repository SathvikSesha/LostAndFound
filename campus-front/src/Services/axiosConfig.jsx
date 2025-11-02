import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9999",
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // Use per-tab token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
