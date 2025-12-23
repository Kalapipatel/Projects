package com.HubControl.dto;

import java.util.List;

public class AssignStoreRequest {
    private int userId;
    private List<Integer> storeIds;

    public AssignStoreRequest(){}

    public AssignStoreRequest(int userId, List<Integer> storeIds) {
        this.userId = userId;
        this.storeIds = storeIds;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public List<Integer> getStoreIds() {
        return storeIds;
    }

    public void setStoreIds(List<Integer> storeIds) {
        this.storeIds = storeIds;
    }
}
