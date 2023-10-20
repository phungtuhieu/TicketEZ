package com.ticketez_backend_springboot.modules.seatBooking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SeatBookingDao extends JpaRepository<SeatBooking, Long> {

    List<SeatBooking> findByBookingId(String bookingId);

    @Query("SELECT sb.seat.name FROM SeatBooking sb WHERE sb.booking.id = :bookingId")
    List<String> findSeatNamesByBookingId(@Param("bookingId") String bookingId);

}
