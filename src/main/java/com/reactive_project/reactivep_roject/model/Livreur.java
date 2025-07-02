package com.reactive_project.reactivep_roject.model;



import org.springframework.data.relational.core.mapping.Column;

// Classe abstraite Livreur
public abstract class Livreur extends BaseUser {

    @Column("first_name")
    protected String firstName;

    @Column("last_name")
    protected String lastName;

    @Column("phone")
    protected String phone;

    @Column("status")
    protected LivreurStatus status;

    @Column("equipment")
    protected Equipment equipment;

    @Column("current_lat")
    protected Double currentLat;

    @Column("current_lng")
    protected Double currentLng;

    @Column("rating")
    protected Double rating;

    @Column("total_deliveries")
    protected Integer totalDeliveries;

    // Constructeurs
    public Livreur() {
        super();
        this.role = UserRole.LIVREUR;
        this.status = LivreurStatus.OFFLINE;
        this.rating = 0.0;
        this.totalDeliveries = 0;
    }

    public Livreur(String email, String password, String firstName, String lastName) {
        super(email, password, UserRole.LIVREUR);
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = LivreurStatus.OFFLINE;
        this.rating = 0.0;
        this.totalDeliveries = 0;
    }

    // Méthodes abstraites à implémenter par les sous-classes
    public abstract LivreurType getType();
    public abstract boolean isIndependent();

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

    public LivreurStatus getStatus() {
        return status;
    }

    public void setStatus(LivreurStatus status) {
        this.status = status;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

    public Double getCurrentLat() {
        return currentLat;
    }

    public void setCurrentLat(Double currentLat) {
        this.currentLat = currentLat;
    }

    public Double getCurrentLng() {
        return currentLng;
    }

    public void setCurrentLng(Double currentLng) {
        this.currentLng = currentLng;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getTotalDeliveries() {
        return totalDeliveries;
    }

    public void setTotalDeliveries(Integer totalDeliveries) {
        this.totalDeliveries = totalDeliveries;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    // Méthodes utilitaires
    public void goOnline() {
        this.status = LivreurStatus.ONLINE;
    }

    public void goOffline() {
        this.status = LivreurStatus.OFFLINE;
    }

    public void setBusy() {
        this.status = LivreurStatus.BUSY;
    }

    public boolean isAvailable() {
        return this.status == LivreurStatus.ONLINE;
    }

    public void updateLocation(Double lat, Double lng) {
        this.currentLat = lat;
        this.currentLng = lng;
    }

    public void incrementDeliveries() {
        this.totalDeliveries++;
    }

    // Enums
    public enum LivreurStatus {
        ONLINE, OFFLINE, BUSY
    }

    public enum Equipment {
        VELO, SCOOTER, VOITURE
    }

    public enum LivreurType {
        INDEPENDANT, EMPLOYE
    }
}