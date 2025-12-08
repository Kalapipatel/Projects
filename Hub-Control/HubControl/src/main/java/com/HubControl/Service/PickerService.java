package com.HubControl.Service;

import com.HubControl.Entity.PickStatus;
import com.HubControl.Entity.PickingTask;
import com.HubControl.dto.PickingTaskDTO;
import com.HubControl.dto.TaskItemDTO;

import java.util.List;

public interface PickerService {

    public void setActiveStatus(int pickerId, int isActive);
    public PickingTaskDTO requestOrder(int pickerId, int storeId);
    public void orderStatusPendingToPrecessing(int orderId);
    public List<TaskItemDTO> getTaskItems(int pickerId, int taskId);
    public void changeItemStatus(int taskId, int taskItemId, PickStatus itemStatus);
}
