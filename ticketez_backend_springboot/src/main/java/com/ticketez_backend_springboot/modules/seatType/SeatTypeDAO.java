package com.ticketez_backend_springboot.modules.seatType;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface SeatTypeDAO extends JpaRepository<SeatType, Long> {

    List<SeatType> findAllByOrderByIdDesc();

}
