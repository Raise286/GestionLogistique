package com.reactive_project.reactivep_roject.service;

import com.reactive_project.reactivep_roject.model.Livreur;
import com.reactive_project.reactivep_roject.model.LivreurIndependant;
import com.reactive_project.reactivep_roject.repository.LivreurIndependantRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class LivreurIndependantService {

    @Autowired
    private LivreurIndependantRepository livreurIndependantRepository;



    public Flux<LivreurIndependant> getAllLivreursIndependants() {
        return livreurIndependantRepository.findAll();
    }

    public Mono<LivreurIndependant> getLivreurIndependantById(Long id) {
        return livreurIndependantRepository.findById(id);
    }

    public Mono<LivreurIndependant> getLivreurIndependantByEmail(String email) {
        return livreurIndependantRepository.findByEmail(email);
    }

    public Mono<LivreurIndependant> createLivreurIndependant(LivreurIndependant livreur) {

        return livreurIndependantRepository.save(livreur);
    }

    public Mono<LivreurIndependant> updateLivreurIndependant(Long id, LivreurIndependant livreurDetails) {
        return livreurIndependantRepository.findById(id)
                .flatMap(existingLivreur -> {
                    existingLivreur.setEmail(livreurDetails.getEmail());
                    existingLivreur.setFirstName(livreurDetails.getFirstName());
                    existingLivreur.setLastName(livreurDetails.getLastName());
                    existingLivreur.setPhone(livreurDetails.getPhone());
                    existingLivreur.setEquipment(livreurDetails.getEquipment());
                    existingLivreur.setSiret(livreurDetails.getSiret());
                    existingLivreur.setCommissionRate(livreurDetails.getCommissionRate());
                    existingLivreur.setBankAccount(livreurDetails.getBankAccount());
                    existingLivreur.setPassword(livreurDetails.getPassword());


                    return livreurIndependantRepository.save(existingLivreur);
                });
    }

    public Mono<Boolean> deleteLivreurIndependant(Long id) {
        return livreurIndependantRepository.findById(id).
                flatMap(livreurIndependant->livreurIndependantRepository.delete(livreurIndependant)).
                thenReturn(true).
                switchIfEmpty(Mono.just(false));
    }

    public Flux<LivreurIndependant> getAvailableLivreurs() {
        return livreurIndependantRepository.findAvailableLivreurs();
    }

    public Mono<Void> updateLivreurStatus(Long id, Livreur.LivreurStatus status) {
        return livreurIndependantRepository.updateStatus(id, status.name());
    }

    public Mono<Void> updateLivreurLocation(Long id, Double lat, Double lng) {
        return livreurIndependantRepository.updateLocation(id, lat, lng);
    }
}
