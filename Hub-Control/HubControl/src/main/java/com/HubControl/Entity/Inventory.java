package com.HubControl.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory", uniqueConstraints = {
        @UniqueConstraint(name = "uq_product_store", columnNames = {"product_id", "store_id"})
})
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_id")
    private int inventoryId;

    @Column(name = "quantity_on_hand", nullable = false)
    private int quantityOnHand = 0;

    @Column(name = "low_stock_threshold", nullable = false)
    private int lowStockThreshold = 10;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "inventory"}) // Fixes Serialization Error
//    @JsonBackReference
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "inventory"}) // Fixes Serialization & Loop
    private Store store;

    // --- Constructors ---
    public Inventory() {}

    // --- Getters and Setters ---
    public int getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(int inventoryId) {
        this.inventoryId = inventoryId;
    }

    public int getQuantityOnHand() {
        return quantityOnHand;
    }

    public void setQuantityOnHand(int quantityOnHand) {
        this.quantityOnHand = quantityOnHand;
    }

    public int getLowStockThreshold() {
        return lowStockThreshold;
    }

    public void setLowStockThreshold(int lowStockThreshold) {
        this.lowStockThreshold = lowStockThreshold;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }
}