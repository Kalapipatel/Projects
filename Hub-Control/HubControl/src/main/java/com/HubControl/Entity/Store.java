package com.HubControl.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "stores")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private int storeId;

    @Column(name = "store_name", nullable = false, length = 150)
    private String storeName;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "pincode")
    private int pincode;

    @Column(name = "status")
    private boolean status = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToMany(mappedBy = "stores")
    @JsonIgnore // Prevents Infinite Loop (Store -> User -> Store...)
    private Set<User> users;

    @OneToMany(mappedBy = "store")
    @JsonIgnore
    private Set<Inventory> inventory;

    @OneToMany(mappedBy = "store")
    @JsonIgnore
    private Set<InventoryBatch> batches;

    @OneToMany(mappedBy = "store")
    @JsonIgnore
    private Set<Order> orders;

    @OneToMany(mappedBy = "store")
    @JsonIgnore
    private Set<PickingTask> pickingTasks;

    // --- Constructors ---
    public Store() {}

    public Store(int storeId, String storeName, String address, int pincode, boolean status, LocalDateTime createdAt, Set<User> users, Set<Inventory> inventory, Set<InventoryBatch> batches, Set<Order> orders, Set<PickingTask> pickingTasks) {
        this.storeId = storeId;
        this.storeName = storeName;
        this.address = address;
        this.pincode = pincode;
        this.status = status;
        this.createdAt = createdAt;
        this.users = users;
        this.inventory = inventory;
        this.batches = batches;
        this.orders = orders;
        this.pickingTasks = pickingTasks;
    }

    // --- Getters and Setters ---
    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getPincode() {
        return pincode;
    }

    public void setPincode(int pincode) {
        this.pincode = pincode;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<Inventory> getInventory() {
        return inventory;
    }

    public void setInventory(Set<Inventory> inventory) {
        this.inventory = inventory;
    }

    public Set<InventoryBatch> getBatches() {
        return batches;
    }

    public void setBatches(Set<InventoryBatch> batches) {
        this.batches = batches;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public Set<PickingTask> getPickingTasks() {
        return pickingTasks;
    }

    public void setPickingTasks(Set<PickingTask> pickingTasks) {
        this.pickingTasks = pickingTasks;
    }
}
