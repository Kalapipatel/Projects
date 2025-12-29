package com.HubControl.dto;

public class LoginResponse {
    private String jwtToken;
    private String targetPage;
    private int userId;
    private String username;
    private int roleId;
    private int isActive;

    public LoginResponse(String jwtToken, String redirectPage, int userId, String username, int roleId, int isActive) {
        this.jwtToken = jwtToken;
        this.targetPage = redirectPage;
        this.userId = userId;
        this.username = username;
        this.roleId = roleId;
        this.isActive = isActive;
    }

    // Getters needed for JSON serialization

    public String getJwtToken() {
        return jwtToken;
    }
    public String getRedirectPage() { return targetPage; }
    public int getUserId() { return userId; }
    public String getUsername() { return username; }
    public int getRoleId() {
        return roleId;
    }
    public int getIsActive() {
        return isActive;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public void setRedirectPage(String redirectPage) {
        this.targetPage = redirectPage;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public void setIsActive(int isActive) {
        this.isActive = isActive;
    }
}
