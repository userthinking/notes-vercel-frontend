import axios from "axios";

// Create axios instance with base configuration
const authAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5173",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (credentials) => {
  try {
    const response = await authAPI.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signupUser = async (credentials) => {
  try {
    const response = await authAPI.post("/signup", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  // Clear any stored tokens or user data
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = async () => {
  try {
    const response = await authAPI.get("/me");
    return response.data;
  } catch (error) {
    throw error;
  }
}; 