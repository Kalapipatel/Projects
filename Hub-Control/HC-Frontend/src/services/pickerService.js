// src/services/pickerService.js

export const requestNewOrder = async (pickerId) => {
  console.log(`Fetching order for picker: ${pickerId}...`);

  /* --- REAL API CALL (Uncomment when backend is ready) ---
   try {
     const response = await fetch(`/api/picker/${pickerId}/requestOrder`, {
       method: 'POST', // or GET depending on your controller
       headers: { 'Content-Type': 'application/json' }
     });
     if (!response.ok) throw new Error("No orders available");
     return await response.json();
   } catch (error) {
     throw error;
   }
  */

  // --- MOCK RESPONSE (Matching PickingTask Entity) ---
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        taskId: 502,
        taskStatus: "PROCESSING", // Enum: PROCESSING, COMPLETED, ISSUE
        assignedAt: new Date().toISOString(),
        completedAt: null,
        
        // Nested Order Object (@OneToOne)
        order: {
          orderId: 9901,
          orderNumber: "ORD-9901-XYZ",
          // ... other order fields
        },

        // List of PickingTaskItems (@OneToMany)
        pickingTaskItems: [
          {
            pickingTaskItemId: 101,
            quantity: 2,
            pickedQuantity: 0, // Frontend tracking
            status: "PENDING", 
            // Assuming PickingTaskItem has a Product relationship
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
    }, 800);
  });
};