package com.ticketez_backend_springboot.auth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticketez_backend_springboot.auth.models.SecurityAccount;


public interface AccountRepository extends JpaRepository<SecurityAccount, String> {

    List<SecurityAccount> findAllByOrderByCreatedDateDesc();

    Optional<SecurityAccount> findById(String id);

    boolean existsById(String id);

    Boolean existsByEmail(String email);

    SecurityAccount findByIdAndPassword (String id , String password);



}
