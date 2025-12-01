package com.HubControl.Controller;

import com.HubControl.Repo.UserRepository;
import com.HubControl.dto.LoginRequest;
import com.HubControl.dto.LoginResponse;
import com.HubControl.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to access this
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        // 1. Find User by Email
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        User user = userOptional.get();

        // 2. Verify Password (Plaintext as requested)
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        // 3. Verify Role Hierarchy Logic
        // DB Roles: 1=Admin, 2=Manager, 3=Picker
        // Logic: A user can login as a requested role if their DB role ID is <= requested role ID
        // Admin (1) can be Manager (2) -> 1 <= 2 (True)
        // Manager (2) can be Admin (1) -> 2 <= 1 (False)

        int dbRoleId = user.getRole().getRoleId();
        int requestedRoleId = loginRequest.getRoleId();

        if (dbRoleId > requestedRoleId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Insufficient permissions to login as this role.");
        }

        // 4. Determine Redirection Page
        String targetPage = "";
        switch (requestedRoleId) {
            case 1: targetPage = "adminLp"; break; // Admin Dashboard
            case 2: targetPage = "managerLp"; break; // Manager Dashboard
            case 3: targetPage = "pickerLp"; break; // Picker Dashboard
            default: return ResponseEntity.badRequest().body("Invalid Role ID");
        }

        return ResponseEntity.ok(new LoginResponse("Login Successful", targetPage, user.getUserId(),user.getUsername()));
    }
}

/*
* john.doe@example.com / john_pass123
* bob.brown@example.com / bob_pass123
* lucy.king@example.com / lucy_pass123
* */