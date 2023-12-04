package com.ticketez_backend_springboot.modules.review;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ticketez_backend_springboot.modules.account.Account;
import com.ticketez_backend_springboot.modules.movie.Movie;

public interface ReviewDAO extends JpaRepository<Review, Long> {
    List<Review> findAllByOrderByIdDesc();

    // @Query("SELECT r FROM Review r WHERE r.movie.id = :movieId ORDER BY
    // r.createDate DESC")
    // @Query("SELECT r FROM Review r JOIN Booking o WHERE r.movie.id = :movieId AND
    // o.status = 0 AND o.ticketStatus = 1 ORDER BY r.createDate DESC ")
    // List<Review> findAllByMovieId(@Param("movieId") Long movieId);
    @Query("SELECT r FROM Review r " +
            "JOIN Booking o ON r.account.id = o.account.id " +
            "JOIN Account a ON r.account.id = a.id " +
            "WHERE o.status = 0 AND o.ticketStatus = 1 AND r.movie.id = :movieId " +
            "ORDER BY r.createDate DESC")
    List<Review> findAllByMovieId(@Param("movieId") Long movieId);

    @Query("SELECT r FROM Review r " +
            "JOIN Booking o ON r.account.id = o.account.id " +
            " JOIN o.showtime.formatMovie fm " +
            "WHERE o.status = 0 AND o.ticketStatus = 1 AND fm.movie = :movie " +
            "AND o.account = :account")
    List<Review> findByCheckAccBooking(@Param("movie") Movie movie, @Param("account") Account account);

}
