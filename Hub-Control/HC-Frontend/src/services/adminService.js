import api from './api';

// --- DASHBOARD ---
export const fetchAdminDashboard = async (userId) => {
  try {
    const response = await api.get(`/admin/${userId}/dashboard`);
    return response.data;
  } catch (err) {
    console.error('Dashboard API failed:', err);
    throw err;
  }
};

// --- STORE MANAGEMENT ---

// Get all stores
export const getAllStores = async () => {
  try {
    const response = await api.get('/admin/getAllStores');
    return response.data;
  } catch (err) {
    console.error("Failed to fetch stores", err);
    throw err;
  }
};

// Delete a store
export const deleteStore = async (storeId) => {
  try {
    const response = await api.delete(`/admin/deleteStore/${storeId}`);
    return response.data;
  } catch (err) {
    console.error("Delete store failed:", err);
    throw err;
  }
};

// Add New Store
export const addStore = async (storeData) => {
  try {
    const response = await api.post('/admin/addStore', storeData);
    return response.data;
  } catch (err) {
    console.error("Add store failed:", err);
    throw err;
  }
};

// Update Existing Store (Requires ID in URL)
export const updateStore = async (storeId, storeData) => {
  try {
    const response = await api.put(`/admin/updateStore/${storeId}`, storeData);
    return response.data;
  } catch (err) {
    console.error("Update store failed:", err);
    throw err;
  }
};

// --- USER MANAGEMENT ---

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/getAllUsers');
    return response.data;
  } catch (err) {
    console.error("Failed to fetch users", err);
    throw err;
  }
};

// Add a new user
export const addUser = async (userData) => {
  try {
    const response = await api.post('/admin/addUser', userData);
    return response.data;
  } catch (err) {
    console.error("Add user failed:", err);
    throw err;
  }
};

// Update an existing user
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/admin/updateUser/${userId}`, userData);
    return response.data;
  } catch (err) {
    console.error("Update user failed:", err);
    throw err;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/deleteUser/${userId}`);
    return response.data;
  } catch (err) {
    console.error("Delete user failed:", err);
    throw err;
  }
};

// --- PRODUCT MANAGEMENT ---

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await api.get('/admin/getAllProducts');
    return response.data;
  } catch (err) {
    console.error("Failed to fetch products", err);
    throw err;
  }
};

// Search products
export const searchProducts = async (keyword) => {
  try {
    const response = await api.get(`/admin/searchProducts?keyword=${keyword}`);
    return response.data;
  } catch (err) {
    console.error("Search products failed", err);
    throw err;
  }
};

// Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await api.post('/admin/addProduct', productData);
    return response.data;
  } catch (err) {
    console.error("Add product failed", err);
    throw err;
  }
};

// Update an existing product
export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/admin/updateProduct/${productId}`, productData);
    return response.data;
  } catch (err) {
    console.error("Update product failed", err);
    throw err;
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/admin/deleteProduct/${productId}`);
    return response.data;
  } catch (err) {
    console.error("Delete product failed", err);
    throw err;
  }
};

// --- ASSIGNMENT ---

// Assign stores to a user
export const assignStoresToUser = async (userId, storeIds) => {
  try {
    const response = await api.post('/admin/assignStore', {
      userId: userId,
      storeIds: storeIds
    });
    return response.data;
  } catch (err) {
    console.error("Assign stores failed:", err);
    throw err;
  }
};