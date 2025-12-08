package com.HubControl.dto;

public class TaskItemDTO {
    private int taskItemId;
    private int productId;
    private String productName;
    private int quantity;

    public TaskItemDTO(){}

    public TaskItemDTO(int taskItemId, int productId, String productName, int quantity) {
        this.taskItemId = taskItemId;
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
    }

    public int getTaskItemId() {
        return taskItemId;
    }
    public void setTaskItemId(int taskItemId) {
        this.taskItemId = taskItemId;
    }
    public int getProductId() {
        return productId;
    }
    public void setProductId(int productId) {
        this.productId = productId;
    }
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
