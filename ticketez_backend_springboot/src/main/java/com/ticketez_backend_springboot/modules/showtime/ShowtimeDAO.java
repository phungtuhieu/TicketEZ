package com.ticketez_backend_springboot.modules.showtime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ShowtimeDAO extends JpaRepository<Showtime, Long> {
    @Query("SELECT s FROM Showtime s WHERE s.seatChart.id = :seatChartId")
    List<Showtime> findShowtimesBySeatChartId(@Param("seatChartId") Long seatChartId);

    
}
