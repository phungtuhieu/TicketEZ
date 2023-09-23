package com.ticketez_backend_springboot.modules.seatBooking;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatBookingDao extends JpaRepository<SeatBooking, Long> {

}
