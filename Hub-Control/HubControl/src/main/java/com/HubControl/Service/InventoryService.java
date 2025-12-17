package com.HubControl.Service;

public interface InventoryService {

    public void subtractQuantityFromInventory(int productId, int quantityPicked);
}
