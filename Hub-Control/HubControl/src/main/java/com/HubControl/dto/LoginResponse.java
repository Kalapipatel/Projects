package com.HubControl.dto;

public class LoginResponse {
    private String message;
    private String redirectPage; // "page1", "page2", or "page3"
    private int userId;
    private String username;

    public LoginResponse(String message, String redirectPage, int userId, String username) {
        this.message = message;
        this.redirectPage = redirectPage;
        this.userId = userId;
        this.username = username;
    }

    // Getters and Setters needed for JSON serialization
    public String getMessage() { return message; }
    public String getRedirectPage() { return redirectPage; }
    public int getUserId() { return userId; }
    public String getUsername() { return username; }
}
