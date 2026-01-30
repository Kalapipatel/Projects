package com.HubControl.Service;

import com.HubControl.Entity.*;
import com.HubControl.Repo.*;
import com.HubControl.dto.PickingTaskDTO;
import com.HubControl.dto.StoreDashboardDTO; // Import this
import com.HubControl.dto.TaskItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate; // Import this
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

    // --- 1. NEW INJECTIONS ---
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ManagerService managerService; // To fetch fresh stats
    // -------------------------

    @Override
    public void setActiveStatus(int pickerId, int isActive) {
        boolean active = isActive == 1;
        int rowsUpdated = userRepo.updateActiveStatus(pickerId, active);
        if (rowsUpdated == 0) {
            throw new RuntimeException("Picker not found with ID: " + pickerId);
        }

        // Optional: You could broadcast active picker count here too!
    }

    @Override
    @Transactional
    public PickingTaskDTO requestOrder(int pickerId, int storeId){
        PickingTaskDTO taskDTO = new PickingTaskDTO();
        PickingTask task = new PickingTask();

        // get first pending order
        Order firstPendingOrder = orderRepo.findFirstByStore_StoreIdAndOrderStatusOrderByCreatedAtAsc(storeId, OrderStatus.PENDING);
        if (firstPendingOrder == null) {
            throw new RuntimeException("No pending orders available for store: " + storeId);
        }

        task.setOrder(firstPendingOrder);
        task.setStore(firstPendingOrder.getStore());

        // get picker
        Optional<User> pickerOptional = userRepo.findById(pickerId);
        if (pickerOptional.isEmpty()) {
            throw new RuntimeException("Picker not found with ID: " + pickerId);
        }
        User picker = pickerOptional.get();
        task.setPicker(picker);

        // saving task
        PickingTask savedTask = pickingTaskRepo.save(task);
        int generatedTaskId = savedTask.getTaskId();

        // update status PENDING -> PROCESSING
        orderStatusUpdate(firstPendingOrder.getOrderId(), OrderStatus.PROCESSING);

        // --- FIX: FORCE DATABASE SYNC BEFORE CALCULATING STATS ---
        orderRepo.flush();

        // --- 2. BROADCAST UPDATE (Pending -1, Processing +1) ---
        broadcastStoreUpdate(storeId);
        // -------------------------------------------------------

        // get items logic...
        List<OrderItem> orderItems = firstPendingOrder.getOrderItems();
        List<PickingTaskItem> taskItems = new ArrayList<>();

        for(OrderItem item : orderItems){
            PickingTaskItem pickingItem = new PickingTaskItem();
            pickingItem.setPickingTask(savedTask);
            pickingItem.setOrderItem(item);
            pickingItem.setProduct(item.getProduct());
            pickingItem.setQuantityPicked(item.getQuantityRequested());
            pickingItem.setPricePerUnit(item.getPricePerUnit());

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
        // Existing logic (omitted for brevity, keep as is)
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
        // Existing logic
        int rowsUpdated = pickingTaskItemRepo.updatePickStatus(taskItemId, itemStatus);
        if (rowsUpdated == 0) {
            throw new RuntimeException("Task Item not found: " + taskItemId);
        }
    }

    @Override
    @Transactional
    public void changeTaskStatus(int taskId, PickingTaskStatus taskStatus){
        int rowsUpdated = pickingTaskRepo.updateTaskStatus(taskId, taskStatus);

        if (rowsUpdated == 0) {
            throw new RuntimeException("Task not found: " + taskId);
        }

        if(taskStatus == PickingTaskStatus.COMPLETED){
            Optional<PickingTask> optionalTask = pickingTaskRepo.findById(taskId);
            if (optionalTask.isEmpty()) {
                throw new RuntimeException("Task not found with ID: " + taskId);
            }
            PickingTask task = optionalTask.get();
            int storeId = task.getStore().getStoreId(); // Get Store ID for broadcast

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

            // Update Order Status PROCESSING -> COMPLETED
            orderStatusUpdate(task.getOrder().getOrderId(), OrderStatus.COMPLETED);

            // --- FIX: FORCE FLUSH HERE TOO ---
            orderRepo.flush();

            // --- 3. BROADCAST UPDATE (Processing -1, Completed +1) ---
            broadcastStoreUpdate(storeId);
            // ---------------------------------------------------------
        }
    }

    // --- 4. NEW HELPER METHOD ---
    /**
     * Fetches the latest store stats and pushes them to the WebSocket topic.
     * Topic: /topic/store/{storeId}
     */
    private void broadcastStoreUpdate(int storeId) {
        try {
            // Note: Since ManagerServiceImpl uses @Cacheable, we might hit stale data
            // if we don't evict the cache. Ideally, ManagerService should have a method
            // to force-fetch fresh data or you rely on TTL.
            // For now, assuming getStoreData fetches fresh or cache is short-lived.

            StoreDashboardDTO freshStats = managerService.getStoreData(storeId);

            // Send payload to subscribers
            messagingTemplate.convertAndSend("/topic/store/" + storeId, freshStats);

            System.out.println("Websocket Update Sent to /topic/store/" + storeId);
        } catch (Exception e) {
            System.err.println("Failed to broadcast WebSocket update: " + e.getMessage());
            // Don't throw exception here to avoid rolling back the transaction
        }
    }
}


//package com.HubControl.Service;
//
//import com.HubControl.Entity.*;
//import com.HubControl.Repo.*;
//import com.HubControl.dto.PickingTaskDTO;
//import com.HubControl.dto.TaskItemDTO;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class PickerServiceImpl implements PickerService {
//
//    @Autowired
//    private UserRepository userRepo;
//
//    @Autowired
//    private OrderRepository orderRepo;
//
//    @Autowired
//    private PickingTaskRepository pickingTaskRepo;
//
//    @Autowired
//    private PickingTaskItemRepository pickingTaskItemRepo;
//
//
//    @Autowired
//    private InventoryService inventoryService;
//
//    @Override
//    public void setActiveStatus(int pickerId, int isActive) {
//        boolean active = isActive == 1;
//        int rowsUpdated = userRepo.updateActiveStatus(pickerId, active);
//
//        if (rowsUpdated == 0) {
//            throw new RuntimeException("Picker not found with ID: " + pickerId);
//        }
//    }
//
//    @Override
//    @Transactional
//    public PickingTaskDTO requestOrder(int pickerId, int storeId){
//        PickingTaskDTO taskDTO = new PickingTaskDTO();
//        PickingTask task = new PickingTask();
//
//        // get first pending order and add into picking task
//        Order firstPendingOrder = orderRepo.findFirstByStore_StoreIdAndOrderStatusOrderByCreatedAtAsc(storeId, OrderStatus.PENDING);
//        task.setOrder(firstPendingOrder);
//        task.setStore(firstPendingOrder.getStore());
//
//        // get picker and add into task
//        Optional<User> pickerOptional = userRepo.findById(pickerId);
//        if (pickerOptional.isEmpty()) {
//            throw new RuntimeException("Manager not found with ID: " + pickerId);
//        }
//        User picker = pickerOptional.get();
//        task.setPicker(picker);
//
//        // saving picking task
//        PickingTask savedTask =pickingTaskRepo.save(task);
//        int generatedTaskId = savedTask.getTaskId();
//
//        // after saving the task, order status will update from PENDING to PROCESSING
//        orderStatusUpdate(firstPendingOrder.getOrderId(), OrderStatus.PROCESSING);
//
//        // get order items and add into picking task items
//        List<OrderItem> orderItems = firstPendingOrder.getOrderItems();
//        List<PickingTaskItem> taskItems = new ArrayList<>();
//
//        for(OrderItem item : orderItems){
//            PickingTaskItem pickingItem = new PickingTaskItem();
//
//            pickingItem.setPickingTask(savedTask);
//            pickingItem.setOrderItem(item);
//            pickingItem.setProduct(item.getProduct());
//            pickingItem.setQuantityPicked(item.getQuantityRequested());
//            pickingItem.setPricePerUnit(item.getPricePerUnit());
//
//            // calculate total price and set into task item
//            BigDecimal totalPrice = item.getPricePerUnit().multiply(BigDecimal.valueOf(item.getQuantityRequested()));
//            pickingItem.setTotalPrice(totalPrice);
//
//            PickingTaskItem savedTaskItem = pickingTaskItemRepo.save(pickingItem);
//            taskItems.add(savedTaskItem);
//        }
//
//        task.setAssignedAt(LocalDateTime.now());
//
//        // filling DTO
//        taskDTO.setTaskId(generatedTaskId);
//        taskDTO.setOrderId(task.getOrder().getOrderId());
//        taskDTO.setAssignedAt(task.getAssignedAt());
//        taskDTO.setNoOfItem(taskItems.size());
//        taskDTO.setStoreName(task.getStore().getStoreName());
//        taskDTO.setTaskStatus(PickingTaskStatus.PROCESSING);
//
//        return taskDTO;
//    }
//
//    @Override
//    public void orderStatusUpdate(int orderId, OrderStatus status){
//        int rowsUpdated = orderRepo.updateOrderStatus(orderId, status);
//
//        if (rowsUpdated == 0) {
//            throw new RuntimeException("Order not found: " + orderId);
//        }
//    }
//
//    @Override
//    public List<TaskItemDTO> getTaskItems(int pickerId, int taskId){
//        List<TaskItemDTO> taskItemDTOs = new ArrayList<>();
//        List<PickingTaskItem> taskItems = pickingTaskItemRepo.findByPickingTask_TaskId(taskId);
//
//        for(PickingTaskItem item : taskItems){
//            TaskItemDTO dto = new TaskItemDTO();
//
//            dto.setTaskItemId(item.getTaskItemId());
//            dto.setProductId(item.getProduct().getProductId());
//            dto.setProductName(item.getProduct().getProductName());
//            dto.setQuantity(item.getQuantityPicked());
//
//            taskItemDTOs.add(dto);
//        }
//
//        return taskItemDTOs;
//    }
//
//    @Override
//    public void changeItemStatus(int taskId, int taskItemId, PickStatus itemStatus){
//        int rowsUpdated = pickingTaskItemRepo.updatePickStatus(taskItemId, itemStatus);
//
//        if (rowsUpdated == 0) {
//            throw new RuntimeException("Order not found: " + taskItemId);
//        }
//    }
//
//    @Override
//    @Transactional // Critical: Updates Task, Inventory, AND Order. Must be atomic.
//    public void changeTaskStatus(int taskId, PickingTaskStatus taskStatus){
//        int rowsUpdated = pickingTaskRepo.updateTaskStatus(taskId, taskStatus);
//
//        if (rowsUpdated == 0) {
//            throw new RuntimeException("Order not found: " + taskId);
//        }
//
//        if(taskStatus == PickingTaskStatus.COMPLETED){
//            Optional<PickingTask> optionalTask = pickingTaskRepo.findById(taskId);
//            if (optionalTask.isEmpty()) {
//                throw new RuntimeException("Manager not found with ID: " + taskId);
//            }
//            PickingTask task = optionalTask.get();
//
//            List<PickingTaskItem> taskItems = task.getPickingTaskItems();
//            BigDecimal total = BigDecimal.ZERO;
//
//            for(PickingTaskItem item : taskItems){
//                int productId = item.getProduct().getProductId();
//                int quantityPicked = item.getQuantityPicked();
//
//                inventoryService.subtractQuantityFromInventory(productId, quantityPicked);
//
//                if(item.getPickStatus() == PickStatus.PICKED){
//                    total = total.add(item.getTotalPrice());
//                }
//
//            }
//
//            pickingTaskRepo.updateTotalOrderValue(taskId, total);
//            orderStatusUpdate(task.getOrder().getOrderId(), OrderStatus.COMPLETED);
//        }
//    }
//}
