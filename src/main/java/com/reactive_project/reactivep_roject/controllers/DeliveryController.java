package com.reactive_project.reactivep_roject.controllers;

import com.reactive_project.reactivep_roject.model.Delivery;
import com.reactive_project.reactivep_roject.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {
    @Autowired
    private DeliveryService deliveryService;


    @GetMapping("/{id}")
    public Mono<ResponseEntity<Delivery>> getDelivery(@PathVariable long id){

        return deliveryService.getDeliveryById(id).
            map(ResponseEntity::ok).
                defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public Flux<Delivery> getAllDelivery(){

        return deliveryService.getAllDeliveries();
    }

    @PostMapping("/create")
    public Mono<Delivery> createDelivery(@RequestBody Delivery newDelivery){
        return deliveryService.createDelivery(newDelivery);
    }

    // Dans DeliveryController.java - Correction de la méthode deleteDelivery

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Map<String, String>>> deleteDelivery(@PathVariable long id){
        return deliveryService.deleteDelivery(id)
                .map(deleted -> {
                    Map<String, String> response = new HashMap<>();
                    if (deleted) {
                        response.put("message", "Delivery supprimée avec succès");
                        return ResponseEntity.ok(response);
                    } else {
                        response.put("message", "Delivery non trouvée");
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                    }
                });
    }

    @PutMapping("/modifier/{id}")
    public Mono<Delivery> updateDelivery(@PathVariable long id,@RequestBody Delivery deliveryDetails){
       return  deliveryService.updateDelivery(id,deliveryDetails);
    }
}
