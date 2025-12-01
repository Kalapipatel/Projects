package com.HubControl.dto;

public class StoreDashboardDTO {
    private int pendingOrders;
    private int inProgressOrders;
    private int completedOrders;
    private int totalOrders;
    private int activePickers;
    private int totalPickers;

    public StoreDashboardDTO(){}

    public StoreDashboardDTO(int pendingOrders, int inProgressOrders, int completedOrders, int totalOrders, int activePickers, int totalPickers) {
        this.pendingOrders = pendingOrders;
        this.inProgressOrders = inProgressOrders;
        this.completedOrders = completedOrders;
        this.totalOrders = totalOrders;
        this.activePickers = activePickers;
        this.totalPickers = totalPickers;
    }

    public int getPendingOrders() {
        return pendingOrders;
    }
    public void setPendingOrders(int pendingOrders) {
        this.pendingOrders = pendingOrders;
    }
    public int getInProgressOrders() {
        return inProgressOrders;
    }
    public void setInProgressOrders(int inProgressOrders) {
        this.inProgressOrders = inProgressOrders;
    }
    public int getCompletedOrders() {
        return completedOrders;
    }
    public void setCompletedOrders(int completedOrders) {
        this.completedOrders = completedOrders;
    }
    public int getTotalOrders() {
        return totalOrders;
    }
    public void setTotalOrders(int totalOrders) {
        this.totalOrders = totalOrders;
    }
    public int getActivePickers() {
        return activePickers;
    }
    public void setActivePickers(int activePickers) {
        this.activePickers = activePickers;
    }
    public int getTotalPickers() {
        return totalPickers;
    }
    public void setTotalPickers(int totalPickers) {
        this.totalPickers = totalPickers;
    }



    public static class AlertDTO {
        private String msg;
        private String type; // ERROR, WARNING, INFO
        private String time;


        public String getMsg() {
            return msg;
        }
        public void setMsg(String msg) {
            this.msg = msg;
        }
        public String getType() {
            return type;
        }
        public void setType(String type) {
            this.type = type;
        }
        public String getTime() {
            return time;
        }
        public void setTime(String time) {
            this.time = time;
        }

    }
}
