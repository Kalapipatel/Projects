// export const requestNewOrder = async (pickerId) => {
//   console.log(`Fetching order for picker: ${pickerId}...`);

//   // --- MOCK RESPONSE (Simulating Backend Delay) ---
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // Logic: You can simulate success/failure here
//       const success = true; 
      
//       if (success) {
//           resolve({
//             taskId: 502,
//             taskStatus: "PROCESSING",
//             assignedAt: new Date().toISOString(),
//             completedAt: null,
            
//             // Nested Order Object
//             order: {
//               orderId: 9901,
//               orderNumber: "ORD-9901-XYZ",
//             },

//             // List of Items to Pick
//             pickingTaskItems: [
//               {
//                 pickingTaskItemId: 101,
//                 quantity: 2,
//                 pickedQuantity: 0, 
//                 status: "PENDING", 
//                 product: {
//                   productId: 55,
//                   name: "Wireless Mouse",
//                   sku: "WM-001",
//                   location: "Rack A-12",
//                   isFragile: false
//                 }
//               },
//               {
//                 pickingTaskItemId: 102,
//                 quantity: 1,
//                 pickedQuantity: 0,
//                 status: "PENDING",
//                 product: {
//                   productId: 89,
//                   name: "Curved Monitor 27",
//                   sku: "MN-27-CV",
//                   location: "Rack D-05",
//                   isFragile: true
//                 }
//               }
//             ]
//           });
//       } else {
//           reject("No orders available at this time.");
//       }
//     }, 800); // 0.8 second delay
//   });
// };



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