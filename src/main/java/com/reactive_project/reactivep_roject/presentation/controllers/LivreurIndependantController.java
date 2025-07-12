package com.reactive_project.reactivep_roject.presentation.controllers;

import com.reactive_project.reactivep_roject.Infrastructure.model.LivreurIndependant;
import com.reactive_project.reactivep_roject.Application.service.LivreurIndependantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/livreurIndependant")
public class LivreurIndependantController {

    @Autowired
    private LivreurIndependantService livreurIndependantService;

    @GetMapping("/{id}")
    public ResponseEntity<LivreurIndependant> getLivreurIndependant(@PathVariable UUID id) {
        return livreurIndependantService.getLivreurIndependantById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.NOT_FOUND).build()
                );
    }

    @GetMapping("/all")
    public List<LivreurIndependant> getAllLivreurIndependants() {
        return livreurIndependantService.getAllLivreursIndependants();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteLivreurIndependant(@PathVariable UUID id) {
        boolean deleted = livreurIndependantService.deleteLivreurIndependant(id);
        Map<String, String> response = new HashMap<>();
        if (deleted) {
            response.put("message", "Livreur indépendant supprimé avec succès");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Livreur indépendant non trouvé");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/creer")
    public ResponseEntity<LivreurIndependant> createLivreurIndependant(
            @RequestBody LivreurIndependant livreurIndependant) {

        LivreurIndependant created = livreurIndependantService.createLivreurIndependant(livreurIndependant);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/modifier/{id}")
    public ResponseEntity<LivreurIndependant> updateLivreurIndependant(
            @PathVariable UUID id,
            @RequestBody LivreurIndependant updates) {

        return livreurIndependantService.updateLivreurIndependant(id, updates)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
