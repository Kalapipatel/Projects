package com.HubControl.Service;

public interface InventoryService {

    void subtractQuantityFromInventory(int productId, int quantityPicked);
}
