import api from './api';

export const fetchManagerDashboard = async (userId) => {
  try {
    // URL: /api/manager/{userId}/dashboard
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