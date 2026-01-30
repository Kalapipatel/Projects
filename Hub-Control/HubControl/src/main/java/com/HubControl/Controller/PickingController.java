package com.HubControl.Controller;

import com.HubControl.Entity.PickStatus;
import com.HubControl.Entity.PickingTaskStatus;
import com.HubControl.Service.PickerService;
import com.HubControl.dto.PickingTaskDTO;
import com.HubControl.dto.TaskItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/picker")
public class PickingController {

    @Autowired
    private PickerService pickerService;

    @PutMapping("/{pickerId}/isActive/{isActive}")
    public ResponseEntity<String> updateActiveStatus(@PathVariable int pickerId, @PathVariable int isActive) {

        pickerService.setActiveStatus(pickerId, isActive);

        return ResponseEntity.ok("Picker active status updated successfully.");
    }

    @PostMapping("/{pickerId}/requestOrder/{storeId}")
    public ResponseEntity<PickingTaskDTO> requestOrder(@PathVariable int pickerId, @PathVariable int storeId){

        PickingTaskDTO taskDTO = pickerService.requestOrder(pickerId, storeId);
        return ResponseEntity.ok(taskDTO);
    }


    @PostMapping("/{pickerId}/{taskId}")
    public ResponseEntity<List<TaskItemDTO>> getTaskItems(@PathVariable int pickerId, @PathVariable int taskId){
        List<TaskItemDTO> taskItems = pickerService.getTaskItems(pickerId, taskId);

        return ResponseEntity.ok(taskItems);
    }

    @PutMapping("/{taskId}/{taskItemId}/{itemStatus}")
    public String changeItemStatus(@PathVariable int taskId, @PathVariable int taskItemId, @PathVariable PickStatus itemStatus){
        pickerService.changeItemStatus(taskId, taskItemId, itemStatus);
        return  itemStatus.toString();
    }

    @PutMapping("/{taskId}/{taskStatus}")
    public String changeTaskStatus(@PathVariable int taskId, @PathVariable PickingTaskStatus taskStatus){
        pickerService.changeTaskStatus(taskId, taskStatus);
        return  taskStatus.toString();
    }
}
