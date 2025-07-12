package com.reactive_project.reactivep_roject.Infrastructure.model;



import com.reactive_project.reactivep_roject.Application.Enums.DeliveryStatus;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;
import java.time.LocalDateTime;
import java.util.UUID;

@Table("deliveries")
public class Delivery {

    @PrimaryKey
    private UUID id;

    @Column("client_id")
    private Long clientId;

    @Column("livreur_id")
    private UUID livreurId;

    @Column("organization_id")
    private Long organizationId;

    @Column("status")
    private DeliveryStatus status;

    @Column("origin_lat")
    private Double originLat;

    @Column("origin_lng")
    private Double originLng;

    @Column("destination_lat")
    private Double destinationLat;

    @Column("destination_lng")
    private Double destinationLng;

    @Column("origin_address")
    private String originAddress;

    @Column("destination_address")
    private String destinationAddress;

    @Column("urgency")
    private String urgency;

    @Column("is_perishable")
    private Boolean isPerishable;

    @Column("is_fragile")
    private Boolean isFragile;

    @Column("created_at")
    private LocalDateTime createdAt;

    // Constructeurs
    public Delivery() {
        this.createdAt = LocalDateTime.now();
        this.status = DeliveryStatus.PENDING;
    }

    // Getters et Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public UUID getLivreurId() {
        return livreurId;
    }

    public void setLivreurId(UUID livreurId) {
        this.livreurId = livreurId;
    }

    public Long getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Long organizationId) {
        this.organizationId = organizationId;
    }

    public DeliveryStatus getStatus() {
        return status;
    }

    public void setStatus(DeliveryStatus status) {
        this.status = status;
    }

    public Double getOriginLat() {
        return originLat;
    }

    public void setOriginLat(Double originLat) {
        this.originLat = originLat;
    }

    public Double getOriginLng() {
        return originLng;
    }

    public void setOriginLng(Double originLng) {
        this.originLng = originLng;
    }

    public Double getDestinationLat() {
        return destinationLat;
    }

    public void setDestinationLat(Double destinationLat) {
        this.destinationLat = destinationLat;
    }

    public Double getDestinationLng() {
        return destinationLng;
    }

    public void setDestinationLng(Double destinationLng) {
        this.destinationLng = destinationLng;
    }

    public String getOriginAddress() {
        return originAddress;
    }

    public void setOriginAddress(String originAddress) {
        this.originAddress = originAddress;
    }

    public String getDestinationAddress() {
        return destinationAddress;
    }

    public void setDestinationAddress(String destinationAddress) {
        this.destinationAddress = destinationAddress;
    }

    public String getUrgency() {
        return urgency;
    }

    public void setUrgency(String urgency) {
        this.urgency = urgency;
    }

    public Boolean getIsPerishable() {
        return isPerishable;
    }

    public void setIsPerishable(Boolean isPerishable) {
        this.isPerishable = isPerishable;
    }

    public Boolean getIsFragile() {
        return isFragile;
    }

    public void setIsFragile(Boolean isFragile) {
        this.isFragile = isFragile;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


}