// src/services/api.js
import axios from 'axios';

// 1. Create a centralized Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Centralized Base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Auto-Attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: Handle Token Expiry (Optional but recommended)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      // Token invalid or expired
      console.warn("Session expired or invalid token. Redirecting to login...");
      localStorage.clear();
      // Optional: Force page reload or redirect to landing
      // window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);

export default api;