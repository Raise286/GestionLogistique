package com.reactive_project.reactivep_roject.Application.service;

import com.reactive_project.reactivep_roject.Infrastructure.model.LivreurEmploye;
import com.reactive_project.reactivep_roject.Infrastructure.repository.LivreurEmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LivreurEmployeService {

    @Autowired
    private LivreurEmployeRepository livreurEmployeRepository;

    public List<LivreurEmploye> getAllLivreurEmploye() {
        return livreurEmployeRepository.findAll();
    }

    public Optional<LivreurEmploye> getLivreurEmployeById(UUID id) {
        return livreurEmployeRepository.findById(id);
    }

    public LivreurEmploye createLivreurEmploye(LivreurEmploye livreurEmploye) {
        return livreurEmployeRepository.save(livreurEmploye);
    }

    public boolean deleteLivreurEmployeById(UUID id) {
        Optional<LivreurEmploye> livreur = livreurEmployeRepository.findById(id);
        if (livreur.isPresent()) {
            livreurEmployeRepository.delete(livreur.get());
            return true;
        } else {
            return false;
        }
    }

    public Optional<LivreurEmploye> updateLivreurEmploye(UUID id, LivreurEmploye updates)
    {
        LivreurEmploye existing = livreurEmployeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("LivreurEmploye not found"));

        existing.setHireDate(updates.getHireDate());
        existing.setIsActive(updates.getIsActive());
        existing.setEmail(updates.getEmail());
        existing.setStatus(updates.getStatus());
        existing.setContractType(updates.getContractType());

        if (updates.getPassword() != null && !updates.getPassword().isEmpty()) {
            existing.setPassword(updates.getPassword());
        }

        return Optional.of(livreurEmployeRepository.save(existing));
    }
}
