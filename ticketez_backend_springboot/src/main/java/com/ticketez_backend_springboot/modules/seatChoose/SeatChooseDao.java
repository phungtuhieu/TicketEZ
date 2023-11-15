package com.ticketez_backend_springboot.modules.seatChoose;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SeatChooseDao extends JpaRepository<SeatChoose, Long> {
     
    @Query("SELECT sb.seat.name FROM SeatChoose sb WHERE sb.seat.seatChart.id = :seatChartId AND sb.showtime.id = :showTimeId")
    List<String> findSeatNamesBySeatChartIdAndShowTimeId(@Param("seatChartId") Long seatChartId, @Param("showTimeId") Long showTimeId);
    
}
