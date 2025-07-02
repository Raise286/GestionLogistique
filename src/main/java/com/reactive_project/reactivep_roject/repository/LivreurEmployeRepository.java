package com.reactive_project.reactivep_roject.repository;

import com.reactive_project.reactivep_roject.model.LivreurEmploye;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface LivreurEmployeRepository extends R2dbcRepository<LivreurEmploye, Long> {

    Mono<LivreurEmploye> findByEmail(String email);

    @Query("SELECT * FROM livreurs_employes WHERE employee_id = :employeeId")
    Mono<LivreurEmploye> findByEmployeeId(String employeeId);

    @Query("SELECT * FROM livreurs_employes WHERE organization_id = :organizationId")
    Flux<LivreurEmploye> findByOrganizationId(Long organizationId);

    @Query("SELECT * FROM livreurs_employes WHERE organization_id = :organizationId AND status = :status")
    Flux<LivreurEmploye> findByOrganizationIdAndStatus(Long organizationId, String status);

    @Query("SELECT * FROM livreurs_employes WHERE organization_id = :organizationId AND is_active = true")
    Flux<LivreurEmploye> findActiveByOrganizationId(Long organizationId);

    @Query("SELECT * FROM livreurs_employes WHERE status = 'ONLINE' AND is_active = true")
    Flux<LivreurEmploye> findAvailableLivreurs();

    @Query("UPDATE livreurs_employes SET status = :status WHERE id = :id")
    Mono<Void> updateStatus(Long id, String status);

    @Query("UPDATE livreurs_employes SET current_lat = :lat, current_lng = :lng WHERE id = :id")
    Mono<Void> updateLocation(Long id, Double lat, Double lng);
}
