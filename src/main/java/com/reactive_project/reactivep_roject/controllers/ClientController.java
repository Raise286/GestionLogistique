package com.reactive_project.reactivep_roject.controllers;

import com.reactive_project.reactivep_roject.model.Client;
import com.reactive_project.reactivep_roject.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/client")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Client>> getClient(@PathVariable Long id) {
        return clientService.getClientById(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public Flux<Client> getAllClient(){
        return clientService.getAllClients();

    }

    @PostMapping("/creer")
    public Mono<Client> createClient(@RequestBody Client newClient){
        return clientService.createClient(newClient);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Map<String, String>>> deleteClient(@PathVariable Long id) {
        return clientService.deleteClientById(id)
                .map(deleted -> {
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "Client supprimé avec succès");
                    return ResponseEntity.ok(response);
                })
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        Map.of("message", "Client non trouvé")
                ));
    }

    @PutMapping("/modifier/{id}")
        public Mono<Client> updateClient(@PathVariable long id, @RequestBody Client clientDetails){
            return clientService.updateClient(id,clientDetails);

    }
}
