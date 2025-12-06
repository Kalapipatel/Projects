package com.HubControl.Service;

import com.HubControl.Entity.PickingTask;
import com.HubControl.dto.PickingTaskDTO;

public interface PickerService {

    public void setActiveStatus(int pickerId, int isActive);
    public PickingTaskDTO requestOrder(int pickerId, int storeId);
    public void pendingToPrecessing(int orderId);

}
