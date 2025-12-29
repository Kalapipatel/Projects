package com.HubControl.security;

import com.HubControl.Entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;


public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user){
        this.user = user;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String roleName = "ROLE_" + user.getRole().getRoleName().toUpperCase();

        return Collections.singletonList(new SimpleGrantedAuthority(roleName));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    public User getUser(){
        return user;
    }
}
