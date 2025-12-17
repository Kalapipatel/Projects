package com.HubControl.Repo;

import com.HubControl.Entity.Order;
import com.HubControl.Entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    // Fetches count of orders grouped by status for a specific store
    // Returns a list of arrays: [Status (Enum/String), Count (Long)]
    @Query("SELECT o.orderStatus, COUNT(o) FROM Order o WHERE o.store.storeId = :storeId GROUP BY o.orderStatus")
    List<Object[]> countOrdersByStatusOfStore(@Param("storeId") int storeId);

    @Query("SELECT o.orderStatus, COUNT(o) FROM Order o GROUP BY o.orderStatus")
    List<Object[]> countOrdersByStatus();

    @Query(value = "SELECT * FROM orders WHERE store_id = :storeId ORDER BY created_at DESC", nativeQuery = true)
    List<Order> findOrderQueueByStoreId(@Param("storeId") int storeId);

    Order findFirstByStore_StoreIdAndOrderStatusOrderByCreatedAtAsc(int storeId, OrderStatus orderStatus);

    @Transactional
    @Modifying
    @Query("UPDATE Order o SET o.orderStatus = :status WHERE o.orderId = :orderId")
    int updateOrderStatus(@Param("orderId") int orderId, @Param("status") OrderStatus status);


}
