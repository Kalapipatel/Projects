export const requestNewOrder = async (pickerId) => {
  console.log(`Fetching order for picker: ${pickerId}...`);

  // --- MOCK RESPONSE (Simulating Backend Delay) ---
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Logic: You can simulate success/failure here
      const success = true; 
      
      if (success) {
          resolve({
            taskId: 502,
            taskStatus: "PROCESSING",
            assignedAt: new Date().toISOString(),
            completedAt: null,
            
            // Nested Order Object
            order: {
              orderId: 9901,
              orderNumber: "ORD-9901-XYZ",
            },

            // List of Items to Pick
            pickingTaskItems: [
              {
                pickingTaskItemId: 101,
                quantity: 2,
                pickedQuantity: 0, 
                status: "PENDING", 
                product: {
                  productId: 55,
                  name: "Wireless Mouse",
                  sku: "WM-001",
                  location: "Rack A-12",
                  isFragile: false
                }
              },
              {
                pickingTaskItemId: 102,
                quantity: 1,
                pickedQuantity: 0,
                status: "PENDING",
                product: {
                  productId: 89,
                  name: "Curved Monitor 27",
                  sku: "MN-27-CV",
                  location: "Rack D-05",
                  isFragile: true
                }
              }
            ]
          });
      } else {
          reject("No orders available at this time.");
      }
    }, 800); // 0.8 second delay
  });
};

export const updatePickerStatus = async (pickerId, status) => {
  // status: 1 for Online, 0 for Offline
  try {
    const response = await fetch(`http://localhost:8080/api/picker/${pickerId}/isActive/${status}`, {
      method: 'PUT', 
      headers: { 
        'Content-Type': 'application/json',
        // Include token if your backend requires security
        // 'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    });

    if (!response.ok) {
        throw new Error("Failed to update status");
    }
    return true; // Success
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};