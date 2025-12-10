package com.HubControl.Service;

import com.HubControl.Entity.Inventory;
import com.HubControl.Entity.Order;
import com.HubControl.Entity.User;
import com.HubControl.Repo.InventoryRepository;
import com.HubControl.Repo.OrderRepository;
import com.HubControl.Repo.StoreRepository;
import com.HubControl.Repo.UserRepository;
import com.HubControl.dto.AlertDTO;
import com.HubControl.dto.ManagerDashboardDTO;
import com.HubControl.dto.StoreDashboardDTO;
import com.HubControl.dto.StoreUnderManagementDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ManagerDashboardServiceImpl implements ManagerDashboardService {

    @Autowired
    private StoreRepository storeRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private InventoryRepository inventoryRepo;


    @Override
    public int getActivePickers(int storeId){
        return userRepo.countActivePickersByStore(storeId);
    }

    @Override
    public int getTotalPickers(int storeId){
        return userRepo.countTotalPickersByStore(storeId);
    }

    @Override
    public ManagerDashboardDTO getDashboardData(int managerId){
        ManagerDashboardDTO dashboard = new ManagerDashboardDTO();

        // 1. Fetch Manager Details
        Optional<User> managerOptional = userRepo.findById(managerId);
        if (managerOptional.isEmpty()) {
            throw new RuntimeException("Manager not found with ID: " + managerId);
        }
        User manager = managerOptional.get();
        dashboard.setManagerName(manager.getUsername());

        // 2. Fetch Stores Summary
        List<StoreUnderManagementDTO> stores = storeRepo.findStoreSummariesByUserId(managerId);
        dashboard.setStores(stores);

        // 3. Handle Edge Case: Manager has no stores
        if (stores.isEmpty()) {
            // Return empty stats if no store is assigned
            dashboard.setStats(new StoreDashboardDTO());
            return dashboard;
        }

        // 4. Fill Order details (Defaulting to the first store found)
        int storeId = stores.get(0).getStoreId(); // .getFirst() is Java 21+, .get(0) is safer for older versions

        // getting and filling Store info
        StoreDashboardDTO storeDashboardDTO = getStoreData(storeId);

        dashboard.setStats(storeDashboardDTO);
        return dashboard;
    }

    @Override
    public StoreDashboardDTO getStoreData(int storeId){
        StoreDashboardDTO storeDashboardDTO = new StoreDashboardDTO();

        // calculating counts of different order according to their status
        List<Object[]> stats = orderRepo.countOrdersByStatus(storeId);

        int totalOrders = 0;

        // Iterate through the result set and populate DTO
        for (Object[] row : stats) {
            String status = row[0].toString();
            int count = ((Number) row[1]).intValue();

            totalOrders += count;

            switch (status) {
                case "PENDING":
                    storeDashboardDTO.setPendingOrders(count);
                    break;
                case "PROCESSING":
                    storeDashboardDTO.setInProgressOrders(count);
                    break;
                case "COMPLETED":
                    storeDashboardDTO.setCompletedOrders(count);
                    break;
            }
        }

        storeDashboardDTO.setTotalOrders(totalOrders);

        // 5. Fill picker stats
        storeDashboardDTO.setActivePickers(getActivePickers(storeId));
        storeDashboardDTO.setTotalPickers(getTotalPickers(storeId));

        // 6. Filling alerts
        storeDashboardDTO.setAlerts(getAlerts(storeId));

        return storeDashboardDTO;
    }

    @Override
    public List<AlertDTO> getAlerts(int storeId){
        List<AlertDTO> alerts = new ArrayList<>();

        // getting product id and product name from store=? whose quantity_on_hand < threshold
        List<Object[]> results = inventoryRepo.findLowStockProducts(storeId);

        for (Object[] row : results) {
            Integer productId = (Integer) row[0];
            String productName = (String) row[1];

            AlertDTO dto = new AlertDTO();
            dto.setType("Low Stock");
            dto.setMessage("Low Stock: " + productName + " (#" + productId + ")" );
            dto.setTime(LocalDateTime.now());

            alerts.add(dto);
        }

        return alerts;
    }

    @Override
    public List<User> getStorePickers(int storeId) {
        List<User> pickers = userRepo.findPickersByStoreId(storeId);
        return pickers;
    }

    @Override
    public List<Inventory> getStoreInventory(int storeId) {
        List<Inventory> inventory = inventoryRepo.findByStoreId(storeId);
        return inventory;
    }

    @Override
    public List<Order> getOrderQueue(int storeId) {
        List<Order> orderQueue = orderRepo.findOrderQueueByStoreId(storeId);
        return orderQueue;
    }
}