package com.ticketez_backend_springboot.modules.seat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatDAO extends JpaRepository<Seat, Long> {

}
