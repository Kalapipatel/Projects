
const API_BASE_URL = "http://localhost:8080/api/picker";

/**
 * Request a new order for the picker.
 * API: POST /api/picker/{pickerId}/requestOrder/{storeId}
 */
export const requestNewOrder = async (pickerId, storeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${pickerId}/requestOrder/${storeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
        // Handle specific backend errors (e.g., "No orders available")
        const errorText = await response.text();
        throw new Error(errorText || "Failed to assign order");
    }

    // Returns PickingTaskDTO: { taskId, orderId, assignedAt, noOfItem, storeName, taskStatus }
    return await response.json();
  } catch (error) {
    console.error("Error requesting order:", error);
    throw error;
  }
};

/**
 * Update Picker Active Status
 * API: PUT /api/picker/{pickerId}/isActive/{status}
 */
export const updatePickerStatus = async (pickerId, status) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${pickerId}/isActive/${status}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error("Failed to update status");
        return true;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

/**
 * Trigger Start Picking and get Task Items
 * Method: POST
 * URL: /api/picker/{pickerId}/{taskId}
 */
export const startPickingTask = async (pickerId, taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${pickerId}/${taskId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add Authorization header here if you use JWT
        // "Authorization": `Bearer ${token}` 
      },
    });

    if (!response.ok) {
      throw new Error(`Error starting task: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Returns List<TaskItemDTO>
  } catch (error) {
    console.error("Failed to fetch task items:", error);
    throw error;
  }
};

/**
 * Update Individual Item Status
 * URL: /api/picker/{taskId}/{itemId}/{status}
 */
export const updateItemStatus = async (taskId, itemId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${taskId}/${itemId}/${status}`, {
      method: "PUT", // Assumed POST based on context; could be PUT depending on your controller
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to update item ${itemId}`);
    }
    return true; // Success
  } catch (error) {
    console.error(`Error updating item ${itemId}:`, error);
    throw error;
  }
};


/**
 * Update the overall Task Status (e.g., COMPLETED or ISSUE)
 * Method: PUT
 * URL: /api/picker/{taskId}/{taskStatus}
 */
export const updateTaskStatus = async (taskId, taskStatus) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${taskId}/${taskStatus}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to update task status to ${taskStatus}`);
    }

    // The controller returns a String, so we read text() instead of json()
    return await response.text(); 
  } catch (error) {
    console.error("Error finalizing task:", error);
    throw error;
  }
};