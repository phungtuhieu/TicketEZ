package com.ticketez_backend_springboot.modules.seatBooking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SeatBookingDao extends JpaRepository<SeatBooking, Long> {

    List<SeatBooking> findByBookingId(String bookingId);
    List<SeatBooking> findByStatus(int status);

    @Query("SELECT sb.seat.name FROM SeatBooking sb WHERE sb.booking.id = :bookingId")
    List<String> findSeatNamesByBookingId(@Param("bookingId") String bookingId);

    @Query("SELECT sb.seat.name FROM SeatBooking sb WHERE sb.seat.seatChart.id = :seatChartId AND sb.status = :status")
    List<String> findSeatNamesBySeatChartIdAndStatus(@Param("seatChartId") Long seatChartId, @Param("status") int status);
    

}
