package com.reactive_project.reactivep_roject.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
public abstract class BaseUser implements User {
    @Id
    protected Long id;

    @Column("email")
    protected String email;

    @Column("password")
    protected String password;

    @Column("role")
    protected UserRole role;

    public BaseUser() {}

    public BaseUser(String email, String password, UserRole role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public UserRole getRole() {
        return role;
    }

    @Override
    public void setRole(UserRole role) {
        this.role = role;
    }
}