package com.HubControl.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "picking_tasks")
public class PickingTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private int taskId;

    @Enumerated(EnumType.STRING)
    @Column(name = "task_status", nullable = false, length = 20)
    private PickingTaskStatus taskStatus = PickingTaskStatus.NEW;

    @Column(name = "assigned_at")
    private LocalDateTime assignedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "picker_id")
    private User picker;

    @OneToMany(mappedBy = "pickingTask", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PickingTaskItem> pickingTaskItems;

    // --- Constructors ---
    public PickingTask() {}

    // --- Getters and Setters ---
    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public PickingTaskStatus getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(PickingTaskStatus taskStatus) {
        this.taskStatus = taskStatus;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public User getPicker() {
        return picker;
    }

    public void setPicker(User picker) {
        this.picker = picker;
    }

    public List<PickingTaskItem> getPickingTaskItems() {
        return pickingTaskItems;
    }

    public void setPickingTaskItems(List<PickingTaskItem> pickingTaskItems) {
        this.pickingTaskItems = pickingTaskItems;
    }
}