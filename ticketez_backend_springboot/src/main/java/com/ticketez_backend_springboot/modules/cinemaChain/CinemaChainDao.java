package com.ticketez_backend_springboot.modules.cinemaChain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaChainDao extends JpaRepository<CinemaChain, Long> {
    // List<CinemaChain> findby
}
