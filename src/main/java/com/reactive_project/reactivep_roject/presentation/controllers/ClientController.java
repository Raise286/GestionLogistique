package com.reactive_project.reactivep_roject.presentation.controllers;

import com.reactive_project.reactivep_roject.Infrastructure.model.Client;
import com.reactive_project.reactivep_roject.Application.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    // Get client by UUID
    @GetMapping("/{id}")
    public ResponseEntity<Client> getClient(@PathVariable UUID id) {
        return clientService.getClientById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all clients
    @GetMapping("/all")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    // ➕ Create client
    @PostMapping("/creer")
    public ResponseEntity<Client> createClient(@RequestBody Client newClient) {
        Client created = clientService.createClient(newClient);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Delete client
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteClient(@PathVariable UUID id) {
        boolean deleted = clientService.deleteClientById(id);
        Map<String, String> response = new HashMap<>();
        if (deleted) {
            response.put("message", "Client supprimé avec succès");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Client non trouvé");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // Update client
    @PutMapping("/modifier/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable UUID id, @RequestBody Client clientDetails) {
        return clientService.updateClient(id, clientDetails)
                .map(updated -> ResponseEntity.ok().body(updated))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
