package com.reactive_project.reactivep_roject.Application.service;

import com.reactive_project.reactivep_roject.Application.Enums.DeliveryStatus; // Import correctly
import com.reactive_project.reactivep_roject.Infrastructure.model.Delivery;
import com.reactive_project.reactivep_roject.Infrastructure.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    // CRUD Operations

    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    public Optional<Delivery> getDeliveryById(UUID id) {
        return deliveryRepository.findById(id);
    }

    public Delivery createDelivery(Delivery delivery) {
        delivery.setStatus(DeliveryStatus.PENDING); // ✅ Correct usage
        return deliveryRepository.save(delivery);
    }

    public Optional<Delivery> updateDelivery(UUID id, Delivery deliveryDetails) {
        Optional<Delivery> optionalDelivery = deliveryRepository.findById(id);
        if (optionalDelivery.isPresent()) {
            Delivery existingDelivery = optionalDelivery.get();

            existingDelivery.setClientId(deliveryDetails.getClientId());
            existingDelivery.setLivreurId(deliveryDetails.getLivreurId());
            existingDelivery.setOrganizationId(deliveryDetails.getOrganizationId());
            existingDelivery.setStatus(deliveryDetails.getStatus());
            existingDelivery.setOriginLat(deliveryDetails.getOriginLat());
            existingDelivery.setOriginLng(deliveryDetails.getOriginLng());
            existingDelivery.setDestinationLat(deliveryDetails.getDestinationLat());
            existingDelivery.setDestinationLng(deliveryDetails.getDestinationLng());
            existingDelivery.setOriginAddress(deliveryDetails.getOriginAddress());
            existingDelivery.setDestinationAddress(deliveryDetails.getDestinationAddress());
            existingDelivery.setUrgency(deliveryDetails.getUrgency());
            existingDelivery.setIsPerishable(deliveryDetails.getIsPerishable());
            existingDelivery.setIsFragile(deliveryDetails.getIsFragile());

            Delivery updated = deliveryRepository.save(existingDelivery);
            return Optional.of(updated);
        } else {
            return Optional.empty();
        }
    }

    public boolean deleteDelivery(UUID id) {
        Optional<Delivery> delivery = deliveryRepository.findById(id);
        if (delivery.isPresent()) {
            deliveryRepository.delete(delivery.get());
            return true;
        } else {
            return false;
        }
    }

    // Filtered queries

    public List<Delivery> getDeliveriesByLivreur(UUID livreurId) {
        return deliveryRepository.findByLivreurId(livreurId);
    }

    public List<Delivery> getDeliveriesByClient(UUID clientId) {
        return deliveryRepository.findByClientId(clientId);
    }

    public List<Delivery> getDeliveriesByStatus(DeliveryStatus status) {
        return deliveryRepository.findByStatus(status);
    }

    public List<Delivery> getDeliveriesByOrganization(UUID organizationId) {
        return deliveryRepository.findByOrganizationId(organizationId);
    }

    public List<Delivery> getPendingIndependentDeliveries() {
        return deliveryRepository.findByStatusAndOrganizationIdIsNull(DeliveryStatus.PENDING);
    }

    public List<Delivery> getPendingDeliveriesByOrganization(UUID organizationId) {
        return deliveryRepository.findByStatusAndOrganizationId(DeliveryStatus.PENDING, organizationId);
    }

    // Status management

    public void updateDeliveryStatus(UUID id, DeliveryStatus status) {
        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));

        delivery.setStatus(status);
        deliveryRepository.save(delivery);
    }

    public void acceptDelivery(UUID deliveryId, UUID livreurId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));

        delivery.setLivreurId(livreurId);
        delivery.setStatus(DeliveryStatus.ASSIGNED);
        deliveryRepository.save(delivery);
    }

    public void startDelivery(UUID deliveryId) {
        updateDeliveryStatus(deliveryId, DeliveryStatus.IN_PROGRESS);
    }

    public void completeDelivery(UUID deliveryId) {
        updateDeliveryStatus(deliveryId, DeliveryStatus.DELIVERED);
    }

    public void cancelDelivery(UUID deliveryId) {
        updateDeliveryStatus(deliveryId, DeliveryStatus.CANCELLED);
    }
}
