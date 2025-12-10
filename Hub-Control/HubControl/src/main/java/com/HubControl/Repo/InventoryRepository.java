package com.HubControl.Repo;

import com.HubControl.Entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

    @Query(value = "SELECT * FROM inventory WHERE store_id = :storeId", nativeQuery = true)
    List<Inventory> findByStoreId(@Param("storeId") int storeId);

    @Modifying
    @Transactional
    @Query("UPDATE Inventory i SET i.quantityOnHand = i.quantityOnHand - :quantityPicked " +
            "WHERE i.product.productId = :productId")
    int subtractQuantityFromInventory(@Param("productId") int productId,
                         @Param("quantityPicked") int quantityPicked);

    @Query("SELECT i.product.productId, i.product.productName " +
            "FROM Inventory i " +
            "WHERE i.store.storeId = :storeId " +
            "AND i.quantityOnHand < i.lowStockThreshold")
    List<Object[]> findLowStockProducts(@Param("storeId") int storeId);

}
