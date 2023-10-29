package com.ticketez_backend_springboot.modules.seatChart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface  SeatChartDAO extends JpaRepository<SeatChart,Long> {
    

    List <SeatChart> findByCinemaId(Long CinemaID);


    @Query("SELECT s FROM SeatChart s WHERE s.status = true")
    List<SeatChart> getStatusSeatChart();

}
