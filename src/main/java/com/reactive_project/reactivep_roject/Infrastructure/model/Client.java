package com.reactive_project.reactivep_roject.Infrastructure.model;



import com.reactive_project.reactivep_roject.Application.Enums.UserRole;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;

@Table("clients")
public class Client extends BaseUser {

    @Column("first_name")
    private String firstName;

    @Column("last_name")
    private String lastName;

    @Column("phone")
    private String phone;

    @Column("address")
    private String address;

    // Constructeurs
    public Client() {
        super();
        this.setRole(UserRole.CLIENT); // ✅ Proper way
    }

    public Client(String email, String password, String firstName, String lastName) {
        super(email, password, UserRole.CLIENT);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Getters et Setters
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }
}
