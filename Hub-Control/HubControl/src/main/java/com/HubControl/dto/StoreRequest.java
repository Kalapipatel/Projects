package com.HubControl.dto;


public class StoreRequest {
    private String storeName;
    private String address;
    private int pincode;
    private boolean status;

    public StoreRequest(){}

    public StoreRequest(String storeName, String address, int pincode, boolean status) {
        this.storeName = storeName;
        this.address = address;
        this.pincode = pincode;
        this.status = status;
    }

    public String getStoreName() {
        return storeName;
    }

    public String getAddress() {
        return address;
    }

    public int getPincode() {
        return pincode;
    }

    public boolean isStatus() {
        return status;
    }
}
