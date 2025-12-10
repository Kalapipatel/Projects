package com.HubControl.dto;

import java.time.LocalDateTime;

public class AlertDTO {
    private String type;
    private String message;
    private LocalDateTime time;

    public AlertDTO(){}

    public AlertDTO(String type, String message, LocalDateTime time) {
        this.type = type;
        this.message = message;
        this.time = time;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
