package com.ticketez_backend_springboot.modules.verification;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationDAO extends JpaRepository<Verification,Long> {
    
}
