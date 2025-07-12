package com.reactive_project.reactivep_roject.Application.service;

import com.reactive_project.reactivep_roject.Infrastructure.model.Client;
import com.reactive_project.reactivep_roject.Infrastructure.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getClientById(UUID id) {
        return clientRepository.findById(id);
    }

    public Client getClientByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    public Optional<Client> updateClient(UUID id, Client clientDetails) {
        Optional<Client> optionalClient = clientRepository.findById(id);

        if (optionalClient.isPresent()) {
            Client existingClient = optionalClient.get();

            existingClient.setEmail(clientDetails.getEmail());
            existingClient.setFirstName(clientDetails.getFirstName());
            existingClient.setLastName(clientDetails.getLastName());
            existingClient.setPhone(clientDetails.getPhone());
            existingClient.setAddress(clientDetails.getAddress());
            existingClient.setPassword(clientDetails.getPassword());

            Client updated = clientRepository.save(existingClient);
            return Optional.of(updated);
        } else {
            return Optional.empty();
        }
    }

    public boolean deleteClientById(UUID id) {
        Optional<Client> optionalClient = clientRepository.findById(id);
        if (optionalClient.isPresent()) {
            clientRepository.delete(optionalClient.get());
            return true;
        } else {
            return false;
        }
    }
}
