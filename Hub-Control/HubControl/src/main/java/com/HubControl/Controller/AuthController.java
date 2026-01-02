package com.HubControl.Controller;

import com.HubControl.Entity.User;
import com.HubControl.Repo.UserRepository;
import com.HubControl.dto.LoginRequest;
import com.HubControl.dto.LoginResponse;
import com.HubControl.security.JwtUtils;
import com.HubControl.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to access this
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Required to check password manually

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        // 1. Requirement: Check if email is correct
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        User user = userOptional.get();

        // 2. Requirement: Check if password is correct
        // We use passwordEncoder.matches(rawPassword, encodedPassword)
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("your password is not correct");
        }

        // 3. Requirement: Check Role Matching
        // Logic: Admin(1) can login as Manager(2), but Manager(2) cannot login as Admin(1)
        int dbRoleId = user.getRole().getRoleId();
        int requestedRoleId = loginRequest.getRoleId();

        if (dbRoleId > requestedRoleId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("you are not login in from your role");
        }

        // 4. Authenticate using Spring Security (Standard Flow)
        // Since we already verified credentials, this should pass, but it's good practice
        // to set the SecurityContext for the filter chain.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // 5. Generate Token
        String jwtToken = jwtUtils.generateToken(userDetails);

        // 6. Determine Target Page
        String targetPage = "";
        switch (requestedRoleId) {
            case 1: targetPage = "adminLp"; break;
            case 2: targetPage = "managerLp"; break;
            case 3: targetPage = "pickerLp"; break;
            default: targetPage = "login";
        }

        boolean isActive = user.isActive();
        int active = isActive ? 1 : 0;

        // 7. Return Response
        return ResponseEntity.ok(new LoginResponse(
                jwtToken,
                targetPage,
                user.getUserId(),
                user.getUsername(),
                requestedRoleId, // Return the role they successfully logged in AS
                active
        ));
    }

}

//
//@Autowired
//private AuthenticationManager authenticationManager; // We configured this in SecurityConfig
//
//@Autowired
//private JwtUtils jwtUtils;
//
//@PostMapping("/login")
//public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
//
//    // 1. Authenticate using Spring Security
//    // This automatically calls UserDetailsService and checks the password hash
//    Authentication authentication = authenticationManager.authenticate(
//            new UsernamePasswordAuthenticationToken(
//                    loginRequest.getEmail(),
//                    loginRequest.getPassword()
//            )
//    );
//
//    // 2. If we reach here, login was successful!
//    SecurityContextHolder.getContext().setAuthentication(authentication);
//    CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
//
//    // 3. Generate Token
//    String jwtToken = jwtUtils.generateToken(userDetails);
//
//    // 4. Determine Target Page (Logic from your original code)
//    String targetPage = "";
//    int roleId = userDetails.getUser().getRole().getRoleId();
//    switch (roleId) {
//        case 1:
//            targetPage = "adminLp";
//            break;
//        case 2:
//            targetPage = "managerLp";
//            break;
//        case 3:
//            targetPage = "pickerLp";
//            break;
//        default:
//            targetPage = "login";
//    }
//
//    boolean isActive = userDetails.getUser().isActive();
//    int active = isActive ? 1 : 0;
//
//    // 5. Return Token + User Info
//    return ResponseEntity.ok(new LoginResponse(
//            jwtToken, // Send token instead of just "Success" message
//            targetPage,
//            userDetails.getUser().getUserId(),
//            userDetails.getUser().getUsername(),
//            userDetails.getUser().getRole().getRoleId(),
//            active
//    ));
//}