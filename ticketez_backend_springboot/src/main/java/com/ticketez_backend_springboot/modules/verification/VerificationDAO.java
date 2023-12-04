package com.ticketez_backend_springboot.modules.verification;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationDAO extends JpaRepository<Verification, Integer> {
    List<Verification> findByAccountId(String id);


}
