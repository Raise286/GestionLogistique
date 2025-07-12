package com.reactive_project.reactivep_roject.Application.service;

import com.reactive_project.reactivep_roject.Application.Enums.LivreurStatus;
import com.reactive_project.reactivep_roject.Infrastructure.model.Livreur;
import com.reactive_project.reactivep_roject.Infrastructure.model.LivreurIndependant;
import com.reactive_project.reactivep_roject.Infrastructure.repository.LivreurIndependantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LivreurIndependantService {

    @Autowired
    private LivreurIndependantRepository livreurIndependantRepository;

    public List<LivreurIndependant> getAllLivreursIndependants() {
        return livreurIndependantRepository.findAll();
    }

    public Optional<LivreurIndependant> getLivreurIndependantById(UUID id) {
        return livreurIndependantRepository.findById(id);
    }

    public LivreurIndependant getLivreurIndependantByEmail(String email) {
        return livreurIndependantRepository.findByEmail(email);
    }

    public LivreurIndependant createLivreurIndependant(LivreurIndependant livreur) {
        return livreurIndependantRepository.save(livreur);
    }

    public Optional<LivreurIndependant> updateLivreurIndependant(UUID id, LivreurIndependant livreurDetails) {
        LivreurIndependant existing = livreurIndependantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("LivreurIndependant not found"));

        existing.setEmail(livreurDetails.getEmail());
        existing.setFirstName(livreurDetails.getFirstName());
        existing.setLastName(livreurDetails.getLastName());
        existing.setPhone(livreurDetails.getPhone());
        existing.setEquipment(livreurDetails.getEquipment());
        existing.setSiret(livreurDetails.getSiret());
        existing.setCommissionRate(livreurDetails.getCommissionRate());
        existing.setBankAccount(livreurDetails.getBankAccount());
        existing.setPassword(livreurDetails.getPassword());

        return Optional.of(livreurIndependantRepository.save(existing));
    }

    public boolean deleteLivreurIndependant(UUID id) {
        Optional<LivreurIndependant> livreur = livreurIndependantRepository.findById(id);
        if (livreur.isPresent()) {
            livreurIndependantRepository.delete(livreur.get());
            return true;
        } else {
            return false;
        }
    }

    public List<LivreurIndependant> getAvailableLivreurs() {
        return livreurIndependantRepository.findByStatusAndIsVerified("ONLINE", true);
    }

    public void updateLivreurStatus(UUID id, LivreurStatus status) {
        LivreurIndependant livreur = livreurIndependantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livreur not found"));
        livreur.setStatus(status);
        livreurIndependantRepository.save(livreur);
    }

    public void updateLivreurLocation(UUID id, Double lat, Double lng) {
        LivreurIndependant livreur = livreurIndependantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livreur not found"));
        livreur.setCurrentLat(lat);
        livreur.setCurrentLng(lng);
        livreurIndependantRepository.save(livreur);
    }
}
