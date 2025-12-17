package com.HubControl.Service;

import com.HubControl.Entity.Inventory;
import com.HubControl.Entity.Order;
import com.HubControl.Entity.User;
import com.HubControl.dto.AlertDTO;
import com.HubControl.dto.ManagerDashboardDTO;
import com.HubControl.dto.StoreDashboardDTO;

import java.util.List;

public interface ManagerService {

    public int getActivePickers(int storeId);
    public int getTotalPickers(int storeId);
    public ManagerDashboardDTO getDashboardData(int managerId);
    public List<AlertDTO> getAlerts(int storeId);
    public StoreDashboardDTO getStoreData(int storeId);
    public List<User> getStorePickers(int storeId);
    public List<Inventory> getStoreInventory(int storeId);
    public List<Order> getOrderQueue(int storeId);
}
