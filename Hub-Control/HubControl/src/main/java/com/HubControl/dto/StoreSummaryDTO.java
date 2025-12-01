package com.HubControl.dto;

public class StoreSummaryDTO {
    private int storeId;
    private String storeName;

    // Default Constructor
    public StoreSummaryDTO() {}

    // Constructor matching the JPQL Query
    public StoreSummaryDTO(int storeId, String storeName) {
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
