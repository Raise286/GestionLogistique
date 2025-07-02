package com.reactive_project.reactivep_roject.controllers;

import com.reactive_project.reactivep_roject.model.LivreurEmploye;
import com.reactive_project.reactivep_roject.service.LivreurEmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/livreurEmploye")
public class LivreurEmployeController {

    @Autowired
    private LivreurEmployeService livreurEmployeService;

    @GetMapping("/{id}")
    public Mono<LivreurEmploye> getLivreurEmploye(@PathVariable long id){
        return livreurEmployeService.getLivreurEmployeById(id);

    }

    @GetMapping("/all")
    public Flux<LivreurEmploye> getAllLivreurEmploye(){
        return livreurEmployeService.getAllLivreurEmploye();
    }
    @PostMapping("/creer")
    public Mono<LivreurEmploye> createLivreurEmploye(@RequestBody LivreurEmploye newLivreurEmploye){
        return livreurEmployeService.createLivreurEmploye(newLivreurEmploye);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Map<String, String>>> deleteLivreurEmploye(@PathVariable long id){

        return livreurEmployeService.deleteLivreurEmployeById(id).
                map(deleted->{
                    Map<String,String> response =new HashMap<>();
                    response.put("message","livreur supprime avec succes");
                    return ResponseEntity.ok(response);
                }).
                defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                        "message","livreur non trouve"
                        )

                ));

    }

    @PutMapping("/modifier/{id}")
    public Mono<LivreurEmploye> updateLivreurEmploye(@RequestBody LivreurEmploye livreurEmployeDetails,@PathVariable long id){
        return livreurEmployeService.updateLivreurEmploye(livreurEmployeDetails,id);
    }
}
