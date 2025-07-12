package com.reactive_project.reactivep_roject.presentation.controllers;

import com.reactive_project.reactivep_roject.Infrastructure.model.Delivery;
import com.reactive_project.reactivep_roject.Application.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    @GetMapping("/{id}")
    public ResponseEntity<Delivery> getDelivery(@PathVariable UUID id) {
        return deliveryService.getDeliveryById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/all")
    public List<Delivery> getAllDelivery() {
        return deliveryService.getAllDeliveries();
    }

    @PostMapping("/create")
    public ResponseEntity<Delivery> createDelivery(@RequestBody Delivery newDelivery) {
        Delivery created = deliveryService.createDelivery(newDelivery);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteDelivery(@PathVariable UUID id) {
        boolean deleted = deliveryService.deleteDelivery(id);
        Map<String, String> response = new HashMap<>();
        if (deleted) {
            response.put("message", "Delivery supprimée avec succès");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Delivery non trouvée");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PutMapping("/modifier/{id}")
    public ResponseEntity<Delivery> updateDelivery(@PathVariable UUID id, @RequestBody Delivery deliveryDetails) {
        Optional<Delivery> updated = deliveryService.updateDelivery(id, deliveryDetails);
        return updated.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
