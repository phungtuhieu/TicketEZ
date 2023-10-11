package com.ticketez_backend_springboot.modules.cinema;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticketez_backend_springboot.modules.cinemaComplex.CinemaComplex;

public interface CinemaDAO extends JpaRepository<Cinema, String> {

  List<Cinema> findByCinemaComplexId(Long cinemaComplexId);
}
