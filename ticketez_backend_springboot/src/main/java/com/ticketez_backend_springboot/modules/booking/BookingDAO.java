package com.ticketez_backend_springboot.modules.booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingDAO extends JpaRepository<Booking, String> {
    public List<Booking> findByShowtimeId(Long showtimeId);

    // @Query("SELECT b.id FROM Booking b WHERE b.showtime.id = :showtimeId")
    // List<BookingDTO> findByShowtimeId(Long showtimeId);
}
