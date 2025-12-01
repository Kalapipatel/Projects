package com.HubControl.Repo;

import com.HubControl.Entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

    @Query(value = "SELECT * FROM inventory WHERE store_id = :storeId", nativeQuery = true)
    List<Inventory> findByStoreId(@Param("storeId") int storeId);
}
