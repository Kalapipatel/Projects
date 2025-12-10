package com.HubControl.dto;

public class StoreUnderManagementDTO {
    private int storeId;
    private String storeName;

    // Default Constructor
    public StoreUnderManagementDTO() {}

    // Constructor matching the JPQL Query
    public StoreUnderManagementDTO(int storeId, String storeName) {
        this.storeId = storeId;
        this.storeName = storeName;
    }

    public int getStoreId() {
        return storeId;
    }
    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }
    public String getStoreName() {
        return storeName;
    }
    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }
}
