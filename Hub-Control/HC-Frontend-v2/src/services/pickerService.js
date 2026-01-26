import api from './api';

// Base URL is already '/api', so we target '/picker/...'

export const requestNewOrder = async (pickerId, storeId) => {
  try {
    const response = await api.post(`/picker/${pickerId}/requestOrder/${storeId}`);
    return response.data; // Returns PickingTaskDTO
  } catch (error) {
    console.error("Error requesting order:", error);
    throw error;
  }
};

export const updatePickerStatus = async (pickerId, status) => {
  try {
    // status: true/false -> convert to 1/0 or string 'true'/'false' if backend expects
    // Assuming backend endpoint is /picker/{pickerId}/isActive/{status}
    await api.put(`/picker/${pickerId}/isActive/${status}`);
    return true;
  } catch (error) {
    console.error("Status update failed:", error);
    throw error;
  }
};

export const startPickingTask = async (pickerId, taskId) => {
  try {
    const response = await api.post(`/picker/${pickerId}/${taskId}`);
    return response.data; // Returns List<TaskItemDTO>
  } catch (error) {
    console.error("Failed to start task:", error);
    throw error;
  }
};

export const updateItemStatus = async (taskId, itemId, status) => {
  try {
    await api.put(`/picker/${taskId}/${itemId}/${status}`);
    return true;
  } catch (error) {
    console.error(`Error updating item ${itemId}:`, error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId, taskStatus) => {
  try {
    const response = await api.put(`/picker/${taskId}/${taskStatus}`);
    return response.data; // Returns String message
  } catch (error) {
    console.error("Error finalizing task:", error);
    throw error;
  }
};