package com.HubControl.dto;

public class LoginRequest {
    private String email;
    private String password;
    private int roleId; // 1: Admin, 2: Manager, 3: Picker

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public int getRoleId() { return roleId; }
    public void setRoleId(int roleId) { this.roleId = roleId; }
}
