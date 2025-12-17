package com.HubControl.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "picking_task_items")
public class PickingTaskItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_item_id")
    private int taskItemId;

    @Column(name = "quantity_picked", nullable = false)
    private int quantityPicked = 0;

    @Column(name = "price_per_unit",  precision = 10, scale = 2)
    private BigDecimal pricePerUnit;

    @Column(name = "total_price",  precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "pick_status", nullable = false, length = 20)
    private PickStatus pickStatus = PickStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", nullable = false)
    @JsonIgnore
    private PickingTask pickingTask;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_item_id", nullable = false, unique = true)
    @JsonIgnore
    private OrderItem orderItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnore
    private Product product;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "batch_id_picked")
//    private InventoryBatch pickedBatch;

    // --- Constructors ---
    public PickingTaskItem() {}

    // --- Getters and Setters ---
    public int getTaskItemId() {
        return taskItemId;
    }

    public void setTaskItemId(int taskItemId) {
        this.taskItemId = taskItemId;
    }

    public int getQuantityPicked() {
        return quantityPicked;
    }

    public void setQuantityPicked(int quantityPicked) {
        this.quantityPicked = quantityPicked;
    }

    public BigDecimal getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(BigDecimal pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public PickStatus getPickStatus() {
        return pickStatus;
    }

    public void setPickStatus(PickStatus pickStatus) {
        this.pickStatus = pickStatus;
    }

    public PickingTask getPickingTask() {
        return pickingTask;
    }

    public void setPickingTask(PickingTask pickingTask) {
        this.pickingTask = pickingTask;
    }

    public OrderItem getOrderItem() {
        return orderItem;
    }

    public void setOrderItem(OrderItem orderItem) {
        this.orderItem = orderItem;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

//    public InventoryBatch getPickedBatch() {
//        return pickedBatch;
//    }
//
//    public void setPickedBatch(InventoryBatch pickedBatch) {
//        this.pickedBatch = pickedBatch;
//    }
}