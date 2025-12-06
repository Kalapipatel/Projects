package com.HubControl.Controller;

import com.HubControl.Entity.PickingTask;
import com.HubControl.Service.PickerService;
import com.HubControl.dto.PickingTaskDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/picker")
@CrossOrigin(origins = "http://localhost:3000")
public class PickerController {

    @Autowired
    private PickerService pickerService;

    @PutMapping("/{pickerId}/isActive/{isActive}")
    public ResponseEntity<String> updateActiveStatus(@PathVariable int pickerId, @PathVariable int isActive) {

        pickerService.setActiveStatus(pickerId, isActive);

        return ResponseEntity.ok("Picker active status updated successfully.");
    }

    @GetMapping("/{pickerId}/requestOrder/{storeId}")
    public ResponseEntity<PickingTaskDTO> requestOrder(@PathVariable int pickerId, @PathVariable int storeId){

        PickingTaskDTO taskDTO = pickerService.requestOrder(pickerId, storeId);
        return ResponseEntity.ok(taskDTO);
    }
}


/*
 * john.doe@example.com / john_pass123
 * bob.brown@example.com / bob_pass123
 * lucy.king@example.com / lucy_pass123  / 14
 * */