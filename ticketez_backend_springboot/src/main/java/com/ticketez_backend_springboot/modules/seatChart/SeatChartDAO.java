package com.ticketez_backend_springboot.modules.seatChart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticketez_backend_springboot.modules.cinema.Cinema;

public interface  SeatChartDAO extends JpaRepository<SeatChart,Long> {
    

    List <SeatChart> findByCinemaId(Long CinemaID);
}
