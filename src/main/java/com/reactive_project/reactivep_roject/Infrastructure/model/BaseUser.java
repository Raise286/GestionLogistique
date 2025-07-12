package com.reactive_project.reactivep_roject.Infrastructure.model;

import com.reactive_project.reactivep_roject.Application.Enums.UserRole;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Column;

import java.util.UUID;

public abstract class BaseUser {

    @PrimaryKey
    private UUID id;

    @Column("email")
    private String email;

    @Column("password")
    private String password;

    @Column("role")
    private UserRole role;

    // Constructor
    public BaseUser() {}

    public BaseUser(String email, String password, UserRole role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Getters and Setters

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
}
