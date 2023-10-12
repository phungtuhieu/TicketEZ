package com.ticketez_backend_springboot.modules.cinema;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaDAO extends JpaRepository<Cinema, Long> {

  List<Cinema> findByCinemaComplexId(Long cinemaComplexId);
}
