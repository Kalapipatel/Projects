package com.HubControl.dto;

public class LoginResponse {
    private String message;
    private String redirectPage; // "page1", "page2", or "page3"
    private int userId;
    private String username;
    private int roleId;
    private int isActive;

    public LoginResponse(String message, String redirectPage, int userId, String username, int roleId, int isActive) {
        this.message = message;
        this.redirectPage = redirectPage;
        this.userId = userId;
        this.username = username;
        this.roleId = roleId;
        this.isActive = isActive;
    }

    // Getters needed for JSON serialization
    public String getMessage() { return message; }
    public String getRedirectPage() { return redirectPage; }
    public int getUserId() { return userId; }
    public String getUsername() { return username; }
    public int getRoleId() {
        return roleId;
    }
    public int getIsActive() {
        return isActive;
    }

}
