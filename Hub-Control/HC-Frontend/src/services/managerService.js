// src/services/managerService.js
import api from './api'; // Import the configured interceptor

/**
 * MANAGER SERVICE
 * Uses the centralized API client which automatically attaches
 * Authorization: Bearer <token> to every request.
 */

// NOTE: Base URL is already '/api' in api.js.
// So we just need '/manager/...'

export const fetchManagerDashboard = async (userId) => {
  try {
    // Effective URL: http://localhost:8080/api/manager/{userId}/dashboard
    const response = await api.get(`/manager/${userId}/dashboard`);
    return response.data;
  } catch (error) {
    console.error("Error fetching initial dashboard", error);
    throw error;
  }
};

export const fetchStoreStats = async (userId, storeId) => {
  try {
    const response = await api.get(`/manager/${userId}/dashboard/${storeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching stats for store ${storeId}`, error);
    throw error;
  }
};

export const fetchStorePickers = async (storeId) => {
  try {
    const response = await api.get(`/manager/${storeId}/manage-pickers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pickers", error);
    throw error;
  }
};

export const fetchStoreInventory = async (storeId) => {
  try {
    const response = await api.get(`/manager/${storeId}/inventory`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory", error);
    throw error;
  }
};

export const fetchOrderQueue = async (storeId) => {
  try {
    const response = await api.get(`/manager/${storeId}/order-queue`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
    throw error;
  }
};