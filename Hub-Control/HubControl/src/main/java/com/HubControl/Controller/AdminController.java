package com.HubControl.Controller;

import com.HubControl.Service.AdminService;
import com.HubControl.dto.AdminDashboardDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}

/*
 * john.doe@example.com / john_pass123
 * bob.brown@example.com / bob_pass123
 * lucy.king@example.com / lucy_pass123
 */