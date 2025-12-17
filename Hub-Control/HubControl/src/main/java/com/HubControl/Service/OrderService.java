package com.HubControl.Service;

import com.HubControl.Entity.Order;

import java.util.List;
import java.util.Map;

public interface OrderService {

    public Map<String, Integer> getCountOrdersByStatus();
    public Map<String, Integer> getCountOrdersByStatusOfStore(int storeId);
    public List<Order> getOrderQueue(int storeId);
}
