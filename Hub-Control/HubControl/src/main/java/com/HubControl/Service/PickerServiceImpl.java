package com.HubControl.Service;

import com.HubControl.Entity.*;
import com.HubControl.Repo.*;
import com.HubControl.dto.PickingTaskDTO;
import com.HubControl.dto.TaskItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PickerServiceImpl implements PickerService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private PickingTaskRepository pickingTaskRepo;

    @Autowired
    private PickingTaskItemRepository pickingTaskItemRepo;


    @Autowired
    private InventoryService inventoryService;

    @Override
    public void setActiveStatus(int pickerId, int isActive) {
        boolean active = isActive == 1;
        int rowsUpdated = userRepo.updateActiveStatus(pickerId, active);

        if (rowsUpdated == 0) {
            throw new RuntimeException("Picker not found with ID: " + pickerId);
        }
    }

    @Override
    @Transactional
    public PickingTaskDTO requestOrder(int pickerId, int storeId){
        PickingTaskDTO taskDTO = new PickingTaskDTO();
        PickingTask task = new PickingTask();

        // get first pending order and add into picking task
        Order firstPendingOrder = orderRepo.findFirstByStore_StoreIdAndOrderStatusOrderByCreatedAtAsc(storeId, OrderStatus.PENDING);
        task.setOrder(firstPendingOrder);
        task.setStore(firstPendingOrder.getStore());

        // get picker and add into task
        Optional<User> pickerOptional = userRepo.findById(pickerId);
        if (pickerOptional.isEmpty()) {
            throw new RuntimeException("Manager not found with ID: " + pickerId);
        }
        User picker = pickerOptional.get();
        task.setPicker(picker);

        // saving picking task
        PickingTask savedTask =pickingTaskRepo.save(task);
        int generatedTaskId = savedTask.getTaskId();

        // after saving the task, order status will update from PENDING to PROCESSING
        orderStatusUpdate(firstPendingOrder.getOrderId(), OrderStatus.PROCESSING);

        // get order items and add into picking task items
        List<OrderItem> orderItems = firstPendingOrder.getOrderItems();
        List<PickingTaskItem> taskItems = new ArrayList<>();

        for(OrderItem item : orderItems){
            PickingTaskItem pickingItem = new PickingTaskItem();

            pickingItem.setPickingTask(savedTask);
            pickingItem.setOrderItem(item);
            pickingItem.setProduct(item.getProduct());
            pickingItem.setQuantityPicked(item.getQuantityRequested());
            pickingItem.setPricePerUnit(item.getPricePerUnit());

            // calculate total price and set into task item
            BigDecimal totalPrice = item.getPricePerUnit().multiply(BigDecimal.valueOf(item.getQuantityRequested()));
            pickingItem.setTotalPrice(totalPrice);

            PickingTaskItem savedTaskItem = pickingTaskItemRepo.save(pickingItem);
            taskItems.add(savedTaskItem);
        }

        task.setAssignedAt(LocalDateTime.now());

        // filling DTO
        taskDTO.setTaskId(generatedTaskId);
        taskDTO.setOrderId(task.getOrder().getOrderId());
        taskDTO.setAssignedAt(task.getAssignedAt());
        taskDTO.setNoOfItem(taskItems.size());
        taskDTO.setStoreName(task.getStore().getStoreName());
        taskDTO.setTaskStatus(PickingTaskStatus.PROCESSING);

        return taskDTO;
    }

    @Override
    public void orderStatusUpdate(int orderId, OrderStatus status){
        int rowsUpdated = orderRepo.updateOrderStatus(orderId, status);

        if (rowsUpdated == 0) {
            throw new RuntimeException("Order not found: " + orderId);
        }
    }

    @Override
    public List<TaskItemDTO> getTaskItems(int pickerId, int taskId){
        List<TaskItemDTO> taskItemDTOs = new ArrayList<>();
        List<PickingTaskItem> taskItems = pickingTaskItemRepo.findByPickingTask_TaskId(taskId);

        for(PickingTaskItem item : taskItems){
            TaskItemDTO dto = new TaskItemDTO();

            dto.setTaskItemId(item.getTaskItemId());
            dto.setProductId(item.getProduct().getProductId());
            dto.setProductName(item.getProduct().getProductName());
            dto.setQuantity(item.getQuantityPicked());

            taskItemDTOs.add(dto);
        }

        return taskItemDTOs;
    }

    @Override
    public void changeItemStatus(int taskId, int taskItemId, PickStatus itemStatus){
        int rowsUpdated = pickingTaskItemRepo.updatePickStatus(taskItemId, itemStatus);

        if (rowsUpdated == 0) {
            throw new RuntimeException("Order not found: " + taskItemId);
        }
    }

    @Override
    @Transactional // Critical: Updates Task, Inventory, AND Order. Must be atomic.
    public void changeTaskStatus(int taskId, PickingTaskStatus taskStatus){
        int rowsUpdated = pickingTaskRepo.updateTaskStatus(taskId, taskStatus);

        if (rowsUpdated == 0) {
            throw new RuntimeException("Order not found: " + taskId);
        }

        if(taskStatus == PickingTaskStatus.COMPLETED){
            Optional<PickingTask> optionalTask = pickingTaskRepo.findById(taskId);
            if (optionalTask.isEmpty()) {
                throw new RuntimeException("Manager not found with ID: " + taskId);
            }
            PickingTask task = optionalTask.get();

            List<PickingTaskItem> taskItems = task.getPickingTaskItems();
            BigDecimal total = BigDecimal.ZERO;

            for(PickingTaskItem item : taskItems){
                int productId = item.getProduct().getProductId();
                int quantityPicked = item.getQuantityPicked();

                inventoryService.subtractQuantityFromInventory(productId, quantityPicked);

                if(item.getPickStatus() == PickStatus.PICKED){
                    total = total.add(item.getTotalPrice());
                }

            }

            pickingTaskRepo.updateTotalOrderValue(taskId, total);
            orderStatusUpdate(task.getOrder().getOrderId(), OrderStatus.COMPLETED);
        }
    }
}
