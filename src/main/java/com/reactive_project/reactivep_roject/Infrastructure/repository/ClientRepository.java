package com.reactive_project.reactivep_roject.Infrastructure.repository;

import com.reactive_project.reactivep_roject.Infrastructure.model.Client;
import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.List;
import java.util.UUID;

public interface ClientRepository extends CassandraRepository<Client, UUID> {

    Client findByEmail(String email);

    Client findByPhone(String phone);

    // Cassandra can't do partial/ILIKE searches without indexing & search tools
    // So use exact match only with equals
    List<Client> findByFirstNameAndLastName(String firstName, String lastName);
}
