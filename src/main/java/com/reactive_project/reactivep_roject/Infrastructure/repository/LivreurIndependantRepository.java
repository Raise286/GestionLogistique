package com.reactive_project.reactivep_roject.Infrastructure.repository;

import com.reactive_project.reactivep_roject.Infrastructure.model.LivreurIndependant;
import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.List;
import java.util.UUID;

public interface LivreurIndependantRepository extends CassandraRepository<LivreurIndependant, UUID> {

    LivreurIndependant findByEmail(String email);

    List<LivreurIndependant> findBySiret(String siret);

    List<LivreurIndependant> findByStatus(String status);

    List<LivreurIndependant> findByIsVerified(Boolean isVerified);

    List<LivreurIndependant> findByStatusAndIsVerified(String status, Boolean isVerified);
}
