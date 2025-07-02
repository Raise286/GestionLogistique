package com.reactive_project.reactivep_roject.model;



import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.Column;
import java.time.LocalDate;

@Table("livreurs_employes")
public class LivreurEmploye extends Livreur {

    @Column("organization_id")
    private Long organizationId;

    @Column("employee_id")
    private String employeeId;

    @Column("hourly_rate")
    private Double hourlyRate;

    @Column("hire_date")
    private LocalDate hireDate;

    @Column("contract_type")
    private ContractType contractType;

    @Column("is_active")
    private Boolean isActive;

    // Constructeurs
    public LivreurEmploye() {
        super();
        this.hireDate = LocalDate.now();
        this.contractType = ContractType.CDI;
        this.isActive = true;
    }

    public LivreurEmploye(String email, String password, String firstName, String lastName,
                          Long organizationId, String employeeId) {
        super(email, password, firstName, lastName);
        this.organizationId = organizationId;
        this.employeeId = employeeId;
        this.hireDate = LocalDate.now();
        this.contractType = ContractType.CDI;
        this.isActive = true;
    }

    // Implémentation des méthodes abstraites
    @Override
    public LivreurType getType() {
        return LivreurType.EMPLOYE;
    }

    @Override
    public boolean isIndependent() {
        return false;
    }

    // Getters et Setters
    public Long getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Long organizationId) {
        this.organizationId = organizationId;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public Double getHourlyRate() {
        return hourlyRate;
    }

    public void setHourlyRate(Double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public LocalDate getHireDate() {
        return hireDate;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    // Méthodes spécifiques
    public boolean canAcceptDeliveries() {
        return isActive && isAvailable();
    }

    public Double calculateDailySalary(Integer hoursWorked) {
        return hourlyRate * hoursWorked;
    }

    public void activate() {
        this.isActive = true;
    }

    public void deactivate() {
        this.isActive = false;
    }

    public boolean belongsToOrganization(Long orgId) {
        return this.organizationId.equals(orgId);
    }

    // Enum pour le type de contrat
    public enum ContractType {
        CDI, CDD, STAGE, FREELANCE
    }
}
