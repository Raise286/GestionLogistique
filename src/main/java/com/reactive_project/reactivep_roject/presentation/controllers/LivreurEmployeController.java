package com.reactive_project.reactivep_roject.presentation.controllers;

import com.reactive_project.reactivep_roject.Infrastructure.model.LivreurEmploye;
import com.reactive_project.reactivep_roject.Application.service.LivreurEmployeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/livreurEmploye")
public class LivreurEmployeController {

    @Autowired
    private LivreurEmployeService livreurEmployeService;

    @GetMapping("/{id}")
    public ResponseEntity<LivreurEmploye> getLivreurEmploye(@PathVariable UUID id) {
        return livreurEmployeService.getLivreurEmployeById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/all")
    public List<LivreurEmploye> getAllLivreurEmploye() {
        return livreurEmployeService.getAllLivreurEmploye();
    }

    @PostMapping("/creer")
    public ResponseEntity<LivreurEmploye> createLivreurEmploye(@RequestBody LivreurEmploye newLivreurEmploye) {
        LivreurEmploye created = livreurEmployeService.createLivreurEmploye(newLivreurEmploye);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteLivreurEmploye(@PathVariable UUID id) {
        boolean deleted = livreurEmployeService.deleteLivreurEmployeById(id);
        Map<String, String> response = new HashMap<>();
        if (deleted) {
            response.put("message", "Livreur supprimé avec succès");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Livreur non trouvé");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PutMapping("/modifier/{id}")
    public ResponseEntity<LivreurEmploye> updateLivreurEmploye(
            @PathVariable UUID id,
            @RequestBody LivreurEmploye livreurEmployeDetails) {

        Optional<LivreurEmploye> updated = livreurEmployeService.updateLivreurEmploye(id, livreurEmployeDetails);

        return updated.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

}
