import axios from 'axios';
import { store } from '../store'; 
import { logout } from '../modules/auth/authSlice'; // We will create this next

// 1. Production-Ready Configuration
const api = axios.create({
  // In Dev: '/api' triggers the Vite proxy to localhost:8080
  // In Prod: '/api' points to the same domain (e.g., hubcontrol.com/api)
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Crucial for CORS/Cookies if you use them
});

// 2. Request Interceptor: Attach Token from Redux (Single Source of Truth)
api.interceptors.request.use(
  (config) => {
    // Get token directly from Redux Store (more reliable than direct localStorage)
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: Global Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    // Auto-logout if unauthorized (401) or forbidden (403)
    if (status === 401 || status === 403) {
      console.warn("Session expired. Logging out...");
      store.dispatch(logout()); // Clears Redux & LocalStorage
      // React Router will detect the state change and redirect to login automatically
    }
    return Promise.reject(error);
  }
);

export default api;