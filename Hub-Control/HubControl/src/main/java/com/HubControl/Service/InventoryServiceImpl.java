package com.HubControl.Service;

import com.HubControl.Repo.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryServiceImpl implements InventoryService{
    
    @Autowired
    private InventoryRepository inventoryRepo;

    public void subtractQuantityFromInventory(int productId, int quantityPicked){
        int rows = inventoryRepo.subtractQuantityFromInventory(productId, quantityPicked);

        if (rows == 0) {
            throw new RuntimeException("Quantity: " + quantityPicked + " is not subtracted from product_id: " + productId);
        }
    }


}
