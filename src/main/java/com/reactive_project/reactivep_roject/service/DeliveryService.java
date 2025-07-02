package com.reactive_project.reactivep_roject.service;


import com.reactive_project.reactivep_roject.model.Delivery;
import com.reactive_project.reactivep_roject.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    // CRUD Operations

    public Flux<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    public Mono<Delivery> getDeliveryById(Long id) {
        return deliveryRepository.findById(id);
    }

    public Mono<Delivery> createDelivery(Delivery delivery) {
        // S'assurer que le statut est PENDING par défaut
        delivery.setStatus(Delivery.DeliveryStatus.PENDING);
        return deliveryRepository.save(delivery);
    }

    public Mono<Delivery> updateDelivery(Long id, Delivery deliveryDetails) {
        return deliveryRepository.findById(id)
                .flatMap(existingDelivery -> {
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

                    return deliveryRepository.save(existingDelivery);
                });
    }

    // Dans DeliveryService.java - Correction de la méthode deleteDelivery

    public Mono<Boolean> deleteDelivery(Long id) {
        return deliveryRepository.findById(id)
                .flatMap(delivery -> deliveryRepository.delete(delivery)
                        .thenReturn(true))
                .switchIfEmpty(Mono.just(false)); // Retourne false si l'élément n'existe pas
    }

    // Méthodes spécifiques pour les livreurs

    public Flux<Delivery> getDeliveriesByLivreur(Long livreurId) {
        return deliveryRepository.findByLivreurId(livreurId);
    }

    public Flux<Delivery> getDeliveriesByClient(Long clientId) {
        return deliveryRepository.findByClientId(clientId);
    }

    public Flux<Delivery> getDeliveriesByStatus(Delivery.DeliveryStatus status) {
        return deliveryRepository.findByStatus(status.name());
    }

    public Flux<Delivery> getPendingDeliveries() {
        return deliveryRepository.findByStatus("PENDING");
    }

    public Flux<Delivery> getAssignedDeliveries() {
        return deliveryRepository.findByStatus("ASSIGNED");
    }

    public Flux<Delivery> getInProgressDeliveries() {
        return deliveryRepository.findByStatus("IN_PROGRESS");
    }

    public Flux<Delivery> getDeliveredDeliveries() {
        return deliveryRepository.findByStatus("DELIVERED");
    }

    public Flux<Delivery> getCancelledDeliveries() {
        return deliveryRepository.findByStatus("CANCELLED");
    }

    // Méthodes pour gérer les statuts de livraison

    public Mono<Void> updateDeliveryStatus(Long id, Delivery.DeliveryStatus status) {
        return deliveryRepository.updateDeliveryStatus(id, status.name());
    }

    public Mono<Void> acceptDelivery(Long deliveryId, Long livreurId) {
        return deliveryRepository.assignDeliveryToLivreur(deliveryId, livreurId, "ASSIGNED");
    }

    public Mono<Void> startDelivery(Long deliveryId) {
        return deliveryRepository.updateDeliveryStatus(deliveryId, "IN_PROGRESS");
    }

    public Mono<Void> completeDelivery(Long deliveryId) {
        return deliveryRepository.updateDeliveryStatus(deliveryId, "DELIVERED");
    }

    public Mono<Void> cancelDelivery(Long deliveryId) {
        return deliveryRepository.updateDeliveryStatus(deliveryId, "CANCELLED");
    }

    // Méthodes pour les organisations

    public Flux<Delivery> getDeliveriesByOrganization(Long organizationId) {
        return deliveryRepository.findByOrganizationId(organizationId);
    }

    public Flux<Delivery> getPendingIndependentDeliveries() {
        return deliveryRepository.findPendingIndependentDeliveries();
    }

    public Flux<Delivery> getPendingDeliveriesByOrganization(Long organizationId) {
        return deliveryRepository.findPendingDeliveriesByOrganization(organizationId);
    }
}
