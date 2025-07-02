package com.reactive_project.reactivep_roject.repository;


import com.reactive_project.reactivep_roject.model.Delivery;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface DeliveryRepository extends R2dbcRepository<Delivery, Long> {

    @Query("SELECT * FROM deliveries WHERE livreur_id = :livreurId")
    Flux<Delivery> findByLivreurId(Long livreurId);

    @Query("SELECT * FROM deliveries WHERE client_id = :clientId")
    Flux<Delivery> findByClientId(Long clientId);

    @Query("SELECT * FROM deliveries WHERE status = :status")
    Flux<Delivery> findByStatus(String status);

    @Query("SELECT * FROM deliveries WHERE organization_id = :organizationId")
    Flux<Delivery> findByOrganizationId(Long organizationId);

    @Query("SELECT * FROM deliveries WHERE status = 'PENDING' AND organization_id IS NULL")
    Flux<Delivery> findPendingIndependentDeliveries();

    @Query("SELECT * FROM deliveries WHERE status = 'PENDING' AND organization_id = :organizationId")
    Flux<Delivery> findPendingDeliveriesByOrganization(Long organizationId);

    @Query("UPDATE deliveries SET status = :status WHERE id = :id")
    Mono<Void> updateDeliveryStatus(Long id, String status);

    @Query("UPDATE deliveries SET status = :status, livreur_id = :livreurId WHERE id = :id")
    Mono<Void> assignDeliveryToLivreur(Long id, Long livreurId, String status);
}
