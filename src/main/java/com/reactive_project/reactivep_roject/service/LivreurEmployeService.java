package com.reactive_project.reactivep_roject.service;

import com.reactive_project.reactivep_roject.model.LivreurEmploye;
import com.reactive_project.reactivep_roject.repository.LivreurEmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
@Service
public class LivreurEmployeService {
    @Autowired
    private LivreurEmployeRepository livreurEmployeRepository;


    public Flux<LivreurEmploye> getAllLivreurEmploye(){
        return livreurEmployeRepository.findAll();
    }

    public Mono<LivreurEmploye> getLivreurEmployeById(long id){
        return livreurEmployeRepository.findById(id);
    }

    public Mono<LivreurEmploye> createLivreurEmploye(LivreurEmploye livreurEmploye){
        return livreurEmployeRepository.save(livreurEmploye);
    }
    public Mono<Boolean> deleteLivreurEmployeById(Long id) {
        return livreurEmployeRepository.findById(id)
                .flatMap(delivery -> livreurEmployeRepository.delete(delivery)
                        .thenReturn(true))
                .switchIfEmpty(Mono.just(false)); // Retourne false si l'élément n'existe pas
    }




    public Mono<LivreurEmploye> updateLivreurEmploye(LivreurEmploye livreurEmployeDetails,long id){
        return livreurEmployeRepository.findById(id).
                flatMap(existingLivreurEmploye->{
                    existingLivreurEmploye.setHireDate(livreurEmployeDetails.getHireDate());
                    existingLivreurEmploye.setIsActive(livreurEmployeDetails.getIsActive());
                    existingLivreurEmploye.setEmail(livreurEmployeDetails.getEmail());
                    existingLivreurEmploye.setStatus(livreurEmployeDetails.getStatus());
                    existingLivreurEmploye.setContractType(livreurEmployeDetails.getContractType());
                    if(livreurEmployeDetails.getPassword()!=null && !livreurEmployeDetails.getPassword().isEmpty()){
                        existingLivreurEmploye.setPassword(livreurEmployeDetails.getPassword());
                    }
                    return livreurEmployeRepository.save(existingLivreurEmploye);
                });
    }
}
