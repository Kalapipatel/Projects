import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/manager';

/**
 * PHASE 2: Fetch Initial Dashboard
 * API: GET /api/manager/{managerId}/dashboard
 * Returns: { managerName, stores[], stats: { ...initialStoreStats } }
 */
export const fetchManagerDashboard = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/dashboard`);
    return response.data;
  } catch (error) {
    console.error("Error fetching initial dashboard", error);
    throw error;
  }
};

/**
 * PHASE 2 & 4: Fetch Specific Store Stats
 * API: GET /api/manager/{managerId}/dashboard/{storeId}
 * Returns: { pendingOrders, inProgressOrders, activePickers, ... } (Only Stats)
 */
export const fetchStoreStats = async (userId, storeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/dashboard/${storeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching stats for store ${storeId}`, error);
    throw error;
  }
};

export const fetchStorePickers = async (storeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${storeId}/manage-pickers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pickers", error);
    throw error;
  }
};

export const fetchStoreInventory = async (storeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${storeId}/inventory`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory", error);
    throw error;
  }
};

export const fetchOrderQueue = async (storeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${storeId}/order-queue`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
    throw error;
  }
};