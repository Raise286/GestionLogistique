package com.reactive_project.reactivep_roject.Infrastructure.repository;

import com.reactive_project.reactivep_roject.Application.Enums.DeliveryStatus;
import com.reactive_project.reactivep_roject.Infrastructure.model.Delivery;
import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.List;
import java.util.UUID;

public interface DeliveryRepository extends CassandraRepository<Delivery, UUID> {
    List<Delivery> findByStatus(DeliveryStatus status);
    List<Delivery> findByClientId(UUID clientId);
    List<Delivery> findByLivreurId(UUID livreurId);
    List<Delivery> findByOrganizationId(UUID organizationId);
    List<Delivery> findByStatusAndOrganizationId(DeliveryStatus status, UUID organizationId);
    List<Delivery> findByStatusAndOrganizationIdIsNull(DeliveryStatus status);
}

