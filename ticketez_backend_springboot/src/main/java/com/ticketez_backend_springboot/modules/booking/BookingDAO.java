package com.ticketez_backend_springboot.modules.booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ticketez_backend_springboot.dto.RevenueStatisticsDTO;
import com.ticketez_backend_springboot.dto.TotalDashboardAdmin;

@Repository
public interface BookingDAO extends JpaRepository<Booking, String> {
    public List<Booking> findByShowtimeId(Long showtimeId);

    // @Query("SELECT b.id FROM Booking b WHERE b.showtime.id = :showtimeId")
    // List<BookingDTO> findByShowtimeId(Long showtimeId);

    @Query("SELECT new com.ticketez_backend_springboot.dto.RevenueStatisticsDTO( " +
            " YEAR(b.createDate) as year, MONTH(b.createDate) as month , " +
            " SUM(sb.price) as amount ) " +
            " FROM Booking b " +
            " JOIN b.seatsBookings sb " +
            " GROUP BY YEAR(b.createDate), MONTH(b.createDate)"
            )
    List<RevenueStatisticsDTO> getRevenueStatisticsDTO();


        //  @Query("SELECT new com.ticketez_backend_springboot.dto.TotalDashboardAdmin( " +
        //                 " COUNT(DISTINCT k.id) AS total_tickets, " +
        //                 " COUNT(DISTINCT m.id) AS total_movies ) " +
        //                 " FROM Booking k " +
        //                 " JOIN " +
        //                 " k.showtime s" +
        //                 " JOIN " +
        //                 " s.formatMovie fm" +
        //                 " JOIN " +
        //                 " fm.movie m" + 
        //                 " WHERE k.ticketStatus = 1")
        // List<TotalDashboardAdmin> getTotalTicketsAndTotalMovies();

}
