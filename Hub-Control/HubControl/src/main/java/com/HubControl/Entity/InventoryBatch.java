package com.HubControl.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "inventory_batches")
public class InventoryBatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "batch_id")
    private int batchId;

    @Column(name = "batch_code", length = 100)
    private String batchCode;

    @Column(name = "quantity_received", nullable = false)
    private int quantityReceived;

    @Column(name = "quantity_remaining", nullable = false)
    private int quantityRemaining;

    @Column(name = "received_at", nullable = false)
    private LocalDateTime receivedAt = LocalDateTime.now();

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

//    @OneToMany(mappedBy = "pickedBatch")
//    private Set<PickingTaskItem> pickedItems;

    // --- Constructors ---
    public InventoryBatch() {}

    // --- Getters and Setters ---
    public int getBatchId() {
        return batchId;
    }

    public void setBatchId(int batchId) {
        this.batchId = batchId;
    }

    public String getBatchCode() {
        return batchCode;
    }

    public void setBatchCode(String batchCode) {
        this.batchCode = batchCode;
    }

    public int getQuantityReceived() {
        return quantityReceived;
    }

    public void setQuantityReceived(int quantityReceived) {
        this.quantityReceived = quantityReceived;
    }

    public int getQuantityRemaining() {
        return quantityRemaining;
    }

    public void setQuantityRemaining(int quantityRemaining) {
        this.quantityRemaining = quantityRemaining;
    }

    public LocalDateTime getReceivedAt() {
        return receivedAt;
    }

    public void setReceivedAt(LocalDateTime receivedAt) {
        this.receivedAt = receivedAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
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

//    public Set<PickingTaskItem> getPickedItems() {
//        return pickedItems;
//    }
//
//    public void setPickedItems(Set<PickingTaskItem> pickedItems) {
//        this.pickedItems = pickedItems;
//    }
}