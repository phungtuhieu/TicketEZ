package com.ticketez_backend_springboot.modules.cinema;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaDAO extends JpaRepository<Cinema, Long> {

}
