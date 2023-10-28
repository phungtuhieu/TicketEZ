package com.ticketez_backend_springboot.modules.movie;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ticketez_backend_springboot.modules.cinemaComplex.CinemaComplex;

@Repository
public interface MovieDAO extends JpaRepository<Movie, Long> {

    @Query("SELECT m FROM Movie m WHERE EXISTS"
            + "(SELECT st FROM Showtime st WHERE m.id = st.formatMovie.movie.id "
            + "AND st.startTime >= CURRENT_TIMESTAMP "
            + "AND CAST(st.startTime AS DATE) = :date "
            + "AND st.cinema.cinemaComplex = :CinemaComplex "
            + ")")
    List<Movie> getMoviesByCinemaComplex(@Param("CinemaComplex") CinemaComplex CinemaComplex, @Param("date") LocalDate date);

    // @Query("SELECT m FROM Movie m WHERE EXISTS (SELECT st FROM Showtime st JOIN
    // st.cinema c JOIN c.cinemaComplex ccx WHERE m = st.movie AND ccx.id = 2 )")
    // List<Movie> findMoviesBy();

    List<Movie> findAllByOrderByIdDesc();

}
