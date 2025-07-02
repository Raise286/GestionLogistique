package com.reactive_project.reactivep_roject.service;


import com.reactive_project.reactivep_roject.model.Client;
import com.reactive_project.reactivep_roject.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

// Service pour Client
@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;



    public Flux<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Mono<Client> getClientById(Long id) {

        return clientRepository.findById(id);
    }

    public Mono<Client> getClientByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    public Mono<Client> createClient(Client client) {

        return clientRepository.save(client);
    }

    public Mono<Client> updateClient(Long id, Client clientDetails) {
        return clientRepository.findById(id)
                .flatMap(existingClient -> {
                    existingClient.setEmail(clientDetails.getEmail());
                    existingClient.setFirstName(clientDetails.getFirstName());
                    existingClient.setLastName(clientDetails.getLastName());
                    existingClient.setPhone(clientDetails.getPhone());
                    existingClient.setAddress(clientDetails.getAddress());
                    existingClient.setPassword(clientDetails.getPassword());


                    return clientRepository.save(existingClient);
                });
    }

    public Mono<Boolean> deleteClientById(long id) {
        return clientRepository.findById(id)
                .flatMap(client ->
                        clientRepository.delete(client)
                                .thenReturn(true)
                );
    }

}