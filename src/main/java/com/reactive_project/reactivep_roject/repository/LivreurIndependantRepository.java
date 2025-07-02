package com.reactive_project.reactivep_roject.repository;

import com.reactive_project.reactivep_roject.model.LivreurIndependant;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface LivreurIndependantRepository extends R2dbcRepository<LivreurIndependant, Long> {

    Mono<LivreurIndependant> findByEmail(String email);

    @Query("SELECT * FROM livreurs_independants WHERE siret = :siret")
    Mono<LivreurIndependant> findBySiret(String siret);

    @Query("SELECT * FROM livreurs_independants WHERE status = :status")
    Flux<LivreurIndependant> findByStatus(String status);

    @Query("SELECT * FROM livreurs_independants WHERE is_verified = :isVerified")
    Flux<LivreurIndependant> findByVerificationStatus(Boolean isVerified);

    @Query("SELECT * FROM livreurs_independants WHERE status = 'ONLINE' AND is_verified = true")
    Flux<LivreurIndependant> findAvailableLivreurs();

    @Query("UPDATE livreurs_independants SET status = :status WHERE id = :id")
    Mono<Void> updateStatus(Long id, String status);

    @Query("UPDATE livreurs_independants SET current_lat = :lat, current_lng = :lng WHERE id = :id")
    Mono<Void> updateLocation(Long id, Double lat, Double lng);
}