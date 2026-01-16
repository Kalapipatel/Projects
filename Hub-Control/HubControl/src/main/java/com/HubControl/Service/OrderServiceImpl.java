package com.HubControl.Service;

import com.HubControl.Entity.Order;
import com.HubControl.Repo.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Override
    public Map<String, Integer> getCountOrdersByStatus(){

        List<Object[]> stats = orderRepo.countOrdersByStatus();
        Map<String, Integer> orderStats = new HashMap<>();

        int totalOrders = 0;

        // Iterate through the result set and populate DTO
        for (Object[] row : stats) {
            String status = row[0].toString();
            int count = ((Number) row[1]).intValue();

            totalOrders += count;

            switch (status) {
                case "PENDING":
                    orderStats.put("PENDING", count);
                    break;
                case "PROCESSING":
                    orderStats.put("PROCESSING", count);
                    break;
                case "COMPLETED":
                    orderStats.put("COMPLETED", count);
                    break;
            }
        }

        orderStats.put("TOTALORDERS", totalOrders);

        return orderStats;
    }

    @Override
    public Map<String, Integer> getCountOrdersByStatusOfStore(int storeId){

        List<Object[]> stats = orderRepo.countOrdersByStatusOfStore(storeId);
        Map<String, Integer> orderStats = new HashMap<>();

        int totalOrders = 0;

        // Iterate through the result set and populate DTO
        for (Object[] row : stats) {
            String status = row[0].toString();
            int count = ((Number) row[1]).intValue();

            totalOrders += count;

            switch (status) {
                case "PENDING":
                    orderStats.put("PENDING", count);
                    break;
                case "PROCESSING":
                    orderStats.put("PROCESSING", count);
                    break;
                case "COMPLETED":
                    orderStats.put("COMPLETED", count);
                    break;
            }
        }

        orderStats.put("TOTALORDERS", totalOrders);

        return orderStats;
    }

    @Override
    public List<Order> getOrderQueue(int storeId) {
        List<Order> orderQueue = orderRepo.findOrderQueueByStoreId(storeId);
        return orderQueue;
    }
}
