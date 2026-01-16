package com.HubControl.Controller;

import com.HubControl.Entity.Product;
import com.HubControl.Entity.Store;
import com.HubControl.Entity.User;
import com.HubControl.Service.AdminService;
import com.HubControl.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

    // --- Product Management Endpoints ---

    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody ProductRequest request) {
        return ResponseEntity.ok(adminService.addProduct(request));
    }

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(adminService.getAllProducts());
    }

    @GetMapping("/searchProducts")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        return ResponseEntity.ok(adminService.searchProducts(keyword));
    }

    @PutMapping("/updateProduct/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable int productId, @RequestBody ProductRequest request) {
        return ResponseEntity.ok(adminService.updateProduct(productId, request));
    }

    @DeleteMapping("/deleteProduct/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable int productId) {
        try {
            adminService.deleteProduct(productId);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (DataIntegrityViolationException e) {
            // This catches the foreign key constraint error
            return ResponseEntity.status(409).body("Cannot delete product: It is already associated with existing Orders or Inventory.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred.");
        }
    }
}
