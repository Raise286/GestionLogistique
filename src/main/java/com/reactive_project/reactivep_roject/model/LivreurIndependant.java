package com.reactive_project.reactivep_roject.model;



import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.Column;

@Table("livreurs_independants")
public class LivreurIndependant extends Livreur {

    @Column("siret")
    private String siret;

    @Column("commission_rate")
    private Double commissionRate;

    @Column("bank_account")
    private String bankAccount;

    @Column("is_verified")
    private Boolean isVerified;

    // Constructeurs
    public LivreurIndependant() {
        super();
        this.commissionRate = 0.15; // 15% par défaut
        this.isVerified = false;
    }

    public LivreurIndependant(String email, String password, String firstName, String lastName, String siret) {
        super(email, password, firstName, lastName);
        this.siret = siret;
        this.commissionRate = 0.15;
        this.isVerified = false;
    }

    // Implémentation des méthodes abstraites
    @Override
    public LivreurType getType() {
        return LivreurType.INDEPENDANT;
    }

    @Override
    public boolean isIndependent() {
        return true;
    }

    // Getters et Setters
    public String getSiret() {
        return siret;
    }

    public void setSiret(String siret) {
        this.siret = siret;
    }

    public Double getCommissionRate() {
        return commissionRate;
    }

    public void setCommissionRate(Double commissionRate) {
        this.commissionRate = commissionRate;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public Boolean getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }

    // Méthodes spécifiques
    public boolean canAcceptDeliveries() {
        return isVerified && isAvailable();
    }

    public Double calculateEarnings(Double deliveryPrice) {
        return deliveryPrice * (1 - commissionRate);
    }

    public void verify() {
        this.isVerified = true;
    }

    public void unverify() {
        this.isVerified = false;
    }
}
