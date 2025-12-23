package com.HubControl.dto;

import java.util.List;

public class AdminDashboardDTO {
    private int totalRevenue;
    private int pendingOrders;
    private int processingOrders;
    private int completedOrders;

    private int totalStores;
    private int activeStores;
    private int totalManagers;
    private int activeManagers;
    private int totalPickers;
    private int activePickers;

    private List<Integer> weeklyData;

    public AdminDashboardDTO(){}

    public AdminDashboardDTO(int totalRevenue, int pendingOrders, int processingOrders, int completedOrders, int totalStores, int activeStores, int stores, int totalManagers, int activeManagers, int totalPickers, int activePickers, List<Integer> weeklyData) {
        this.totalRevenue = totalRevenue;
        this.pendingOrders = pendingOrders;
        this.processingOrders = processingOrders;
        this.completedOrders = completedOrders;
        this.totalStores = totalStores;
        this.activeStores = activeStores;
        this.totalManagers = totalManagers;
        this.activeManagers = activeManagers;
        this.totalPickers = totalPickers;
        this.activePickers = activePickers;
        this.weeklyData = weeklyData;
    }

    public int getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(int totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public int getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(int pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    public int getProcessingOrders() {
        return processingOrders;
    }

    public void setProcessingOrders(int processingOrders) {
        this.processingOrders = processingOrders;
    }

    public int getCompletedOrders() {
        return completedOrders;
    }

    public void setCompletedOrders(int completedOrders) {
        this.completedOrders = completedOrders;
    }

    public int getTotalStores() {
        return totalStores;
    }

    public void setTotalStores(int totalStores) {
        this.totalStores = totalStores;
    }

    public int getActiveStores() {
        return activeStores;
    }

    public void setActiveStores(int activeStores) {
        this.activeStores = activeStores;
    }

    public int getTotalManagers() {
        return totalManagers;
    }

    public void setTotalManagers(int totalManagers) {
        this.totalManagers = totalManagers;
    }

    public int getActiveManagers() {
        return activeManagers;
    }

    public void setActiveManagers(int activeManagers) {
        this.activeManagers = activeManagers;
    }

    public int getTotalPickers() {
        return totalPickers;
    }

    public void setTotalPickers(int totalPickers) {
        this.totalPickers = totalPickers;
    }

    public int getActivePickers() {
        return activePickers;
    }

    public void setActivePickers(int activePickers) {
        this.activePickers = activePickers;
    }

    public List<Integer> getWeeklyData() {
        return weeklyData;
    }

    public void setWeeklyData(List<Integer> weeklyData) {
        this.weeklyData = weeklyData;
    }
}
