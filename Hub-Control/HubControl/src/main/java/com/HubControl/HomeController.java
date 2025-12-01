package com.HubControl;

import com.HubControl.Entity.Role;
import com.HubControl.Repo.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping({"/", "/home"})
    public String home(){
        return "Welcome to new project";
    }

    @GetMapping("/role")
    public ResponseEntity<List<Role>> getAllRole(){
        List<Role> roleList = roleRepository.findAll();
        return new ResponseEntity<>(roleList, HttpStatus.OK);
    }
}
