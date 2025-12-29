import api from './api';

// NOTE: Base URL is already set to 'http://localhost:8080/api' in api.js

export const requestNewOrder = async (pickerId, storeId) => {
  try {
    // POST /api/picker/{pickerId}/requestOrder/{storeId}
    const response = await api.post(`/picker/${pickerId}/requestOrder/${storeId}`);
    return response.data; // Returns PickingTaskDTO
  } catch (error) {
    console.error("Error requesting order:", error);
    throw error;
  }
};

export const updatePickerStatus = async (pickerId, status) => {
  try {
    // PUT /api/picker/{pickerId}/isActive/{status}
    await api.put(`/picker/${pickerId}/isActive/${status}`);
    return true;
  } catch (error) {
    console.error("Status update failed:", error);
    throw error;
  }
};

export const startPickingTask = async (pickerId, taskId) => {
  try {
    // POST /api/picker/{pickerId}/{taskId}
    const response = await api.post(`/picker/${pickerId}/${taskId}`);
    return response.data; // Returns List<TaskItemDTO>
  } catch (error) {
    console.error("Failed to start task:", error);
    throw error;
  }
};

export const updateItemStatus = async (taskId, itemId, status) => {
  try {
    // PUT /api/picker/{taskId}/{itemId}/{status}
    await api.put(`/picker/${taskId}/${itemId}/${status}`);
    return true;
  } catch (error) {
    console.error(`Error updating item ${itemId}:`, error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId, taskStatus) => {
  try {
    // PUT /api/picker/{taskId}/{taskStatus}
    const response = await api.put(`/picker/${taskId}/${taskStatus}`);
    return response.data; // Returns String message
  } catch (error) {
    console.error("Error finalizing task:", error);
    throw error;
  }
};