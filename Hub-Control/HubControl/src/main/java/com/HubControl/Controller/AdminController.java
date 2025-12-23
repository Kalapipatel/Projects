package com.HubControl.Controller;

import com.HubControl.Entity.Store;
import com.HubControl.Entity.User;
import com.HubControl.Service.AdminService;
import com.HubControl.dto.AdminDashboardDTO;
import com.HubControl.dto.AssignStoreRequest;
import com.HubControl.dto.StoreRequest;
import com.HubControl.dto.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/{adminId}/dashboard")
    public ResponseEntity<AdminDashboardDTO> getDashboardData(){
        AdminDashboardDTO dashboardDTO = adminService.getDashboardData();

        return ResponseEntity.ok(dashboardDTO);
    }

    // Store Management
    @PostMapping("/addStore")
    public ResponseEntity<Store> addStore(@RequestBody StoreRequest request) {
        Store newStore = adminService.addStore(request);
        return ResponseEntity.ok(newStore);
    }

    @GetMapping("/getAllStores")
    public ResponseEntity<List<Store>> getAllStores() {
        return ResponseEntity.ok(adminService.getAllStores());
    }

    @PutMapping("/updateStore/{storeId}")
    public ResponseEntity<Store> updateStore(@PathVariable int storeId, @RequestBody StoreRequest request) {
        Store updatedStore = adminService.updateStore(storeId, request);
        return ResponseEntity.ok(updatedStore);
    }

    @DeleteMapping("/deleteStore/{storeId}")
    public ResponseEntity<String> deleteStore(@PathVariable int storeId) {
        adminService.deleteStore(storeId);
        return ResponseEntity.ok("Store deleted successfully");
    }


    // User management
    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody UserRequest request) {
        return ResponseEntity.ok(adminService.addUser(request));
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/updateUser/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable int userId, @RequestBody UserRequest request) {
        return ResponseEntity.ok(adminService.updateUser(userId, request));
    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    // Mapping
    @PostMapping("/assignStore")
    public ResponseEntity<String> assignStore(@RequestBody AssignStoreRequest request) {
        adminService.assignStoresToUser(request);
        return ResponseEntity.ok("Stores assigned successfully");
    }
}

/*
 * john.doe@example.com / john_pass123
 * bob@example.com / 12345
 * sam@example.com / 12345
 * lucy.king@example.com / lucy_pass123
 */