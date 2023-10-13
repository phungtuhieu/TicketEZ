package com.ticketez_backend_springboot.modules.cinemaComplex;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaComplexDao extends JpaRepository<CinemaComplex, Long> {
    List<CinemaComplex> findAllByOrderByIdDesc();
}
