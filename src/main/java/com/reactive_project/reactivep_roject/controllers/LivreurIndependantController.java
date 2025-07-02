package com.reactive_project.reactivep_roject.controllers;

import com.reactive_project.reactivep_roject.model.LivreurIndependant;
import com.reactive_project.reactivep_roject.service.LivreurIndependantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/livreurIndependant")
public class LivreurIndependantController {
    @Autowired
    private LivreurIndependantService livreurIndependantService;

    @GetMapping("/{id}")
    public Mono<LivreurIndependant> getLivreurIndependant(@PathVariable long id){
        return livreurIndependantService.getLivreurIndependantById(id);
    }

    @GetMapping("/all")
    public Flux<LivreurIndependant> getAllLivreurIndependant(){
        return livreurIndependantService.getAllLivreursIndependants();


    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Map<String,String>>> deleteLivreurIndependant(@PathVariable long id){
        return livreurIndependantService.deleteLivreurIndependant(id).
                map(deleted->{
                    Map<String,String> response=new HashMap<>();
                    response.put("message","livreur independant supprime avec succes");
                    return ResponseEntity.ok(response);

                }).defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        Map.of("message","livreur independant non trouve")
                ));


    }

    @PostMapping("/creer")
    public Mono<LivreurIndependant> createLivreurIndependant(@RequestBody LivreurIndependant livreurIndependant){
        return livreurIndependantService.createLivreurIndependant(livreurIndependant);
    }

    @PutMapping("/modifier/{id}")

    public Mono<LivreurIndependant> updateLivreurIndependant(@PathVariable long id , @RequestBody LivreurIndependant livreurIndependant){
        return livreurIndependantService.updateLivreurIndependant(id,livreurIndependant);
    }
}
