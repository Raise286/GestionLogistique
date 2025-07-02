package com.reactive_project.reactivep_roject.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;

// Interface User
public interface User {
    Long getId();
    void setId(Long id);
    String getEmail();
    void setEmail(String email);
    String getPassword();
    void setPassword(String password);
    UserRole getRole();
    void setRole(UserRole role);

    enum UserRole {
        LIVREUR, CLIENT, ORGANISATION
    }
}
