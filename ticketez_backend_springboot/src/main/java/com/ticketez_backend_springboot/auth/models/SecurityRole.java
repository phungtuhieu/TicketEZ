package com.ticketez_backend_springboot.auth.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ticketez_backend_springboot.modules.accountRole.AccountRole;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class SecurityRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private SecurityERole name;

    private String description;


    @JsonIgnore
    @OneToMany(mappedBy = "role")
    private List<AccountRole> accountRoles;

    public SecurityRole() {
    }

    public SecurityRole(SecurityERole name) {
        this.name = name;
    }

    public SecurityRole(SecurityERole name, String description) {
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SecurityERole getName() {
        return name;
    }

    public void setName(SecurityERole name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
