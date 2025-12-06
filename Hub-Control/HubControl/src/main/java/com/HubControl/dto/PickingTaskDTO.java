package com.HubControl.dto;

import com.HubControl.Entity.PickingTaskStatus;

import java.time.LocalDateTime;

public class PickingTaskDTO {

    private int orderId;
    private LocalDateTime assignedAt;
    private int noOfItem;
    private String storeName;
    private PickingTaskStatus taskStatus;

    public PickingTaskDTO(){}

    public PickingTaskDTO(int orderId, LocalDateTime assignedAt, int noOfItem, String storeName, PickingTaskStatus taskStatus) {
        this.orderId = orderId;
        this.assignedAt = assignedAt;
        this.noOfItem = noOfItem;
        this.storeName = storeName;
        this.taskStatus = taskStatus;
    }

    public int getOrderId() {
        return orderId;
    }
    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }
    public int getNoOfItem() {
        return noOfItem;
    }
    public String getStoreName() {
        return storeName;
    }
    public PickingTaskStatus getTaskStatus() {
        return taskStatus;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }
    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }
    public void setNoOfItem(int noOfItem) {
        this.noOfItem = noOfItem;
    }
    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }
    public void setTaskStatus(PickingTaskStatus taskStatus) {
        this.taskStatus = taskStatus;
    }

}
