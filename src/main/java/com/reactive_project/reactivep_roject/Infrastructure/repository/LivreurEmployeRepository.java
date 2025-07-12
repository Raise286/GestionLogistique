package com.reactive_project.reactivep_roject.Infrastructure.repository;

import com.reactive_project.reactivep_roject.Infrastructure.model.LivreurEmploye;
import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.List;
import java.util.UUID;

public interface LivreurEmployeRepository extends CassandraRepository<LivreurEmploye, UUID> {

    LivreurEmploye findByEmail(String email);

    LivreurEmploye findByEmployeeId(String employeeId);

    List<LivreurEmploye> findByOrganizationId(Long organizationId);

    List<LivreurEmploye> findByOrganizationIdAndStatus(Long organizationId, String status);

    List<LivreurEmploye> findByOrganizationIdAndIsActiveTrue(Long organizationId);

    List<LivreurEmploye> findByStatusAndIsActive(String status, Boolean isActive);
}
