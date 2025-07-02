package com.reactive_project.reactivep_roject.repository;

import com.reactive_project.reactivep_roject.model.*;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

// Repository pour Client
public interface ClientRepository extends R2dbcRepository<Client, Long> {

    Mono<Client> findByEmail(String email);

    @Query("SELECT * FROM clients WHERE phone = :phone")
    Mono<Client> findByPhone(String phone);

    @Query("SELECT * FROM clients WHERE first_name ILIKE :firstName AND last_name ILIKE :lastName")
    Flux<Client> findByFullName(String firstName, String lastName);
}
