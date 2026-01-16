package com.HubControl.Controller;

import com.HubControl.Entity.Inventory;
import com.HubControl.Entity.Order;
import com.HubControl.Entity.User;
import com.HubControl.Service.ManagerService;
import com.HubControl.dto.ManagerDashboardDTO;
import com.HubControl.dto.StoreDashboardDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    @Autowired
    private ManagerService dashboardService;

    @GetMapping("/{managerId}/dashboard")
    public ManagerDashboardDTO getDashboard( @PathVariable int managerId) {

        // logic: if storeId is null, service picks the first store assigned to manager
        return dashboardService.getDashboardData(managerId);
    }

    @GetMapping("/{managerId}/dashboard/{storeId}")
    public StoreDashboardDTO getStoreData(@PathVariable int managerId, @PathVariable int storeId) {

        return dashboardService.getStoreData(storeId);
    }

    @GetMapping("/{storeId}/manage-pickers")
    public ResponseEntity<List<User>> getStorePickers(@PathVariable int storeId) {
        List<User> pickers = dashboardService.getStorePickers(storeId);
        return ResponseEntity.ok(pickers);
    }

    @GetMapping("/{storeId}/inventory")
    public ResponseEntity<List<Inventory>> getStoreInventory(@PathVariable int storeId) {
        List<Inventory> inventory = dashboardService.getStoreInventory(storeId);
        return ResponseEntity.ok(inventory);
    }

    @GetMapping("/{storeId}/order-queue")
    public ResponseEntity<List<Order>> getOrderQueue(@PathVariable int storeId) {
        List<Order> orderQueue = dashboardService.getOrderQueue(storeId);
        return ResponseEntity.ok(orderQueue);
    }
}
