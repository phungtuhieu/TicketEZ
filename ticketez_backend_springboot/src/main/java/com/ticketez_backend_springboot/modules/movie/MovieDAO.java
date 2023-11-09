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
        List<Movie> getMoviesByCinemaComplex(@Param("CinemaComplex") CinemaComplex CinemaComplex,
                        @Param("date") LocalDate date);

        List<Movie> findAllByOrderByIdDesc();

        @Query("SELECT m FROM Movie m WHERE EXISTS "
                        + "(SELECT st FROM Showtime st WHERE m.id = st.formatMovie.movie.id AND st.status = 2 "
                        + "AND CAST(CURRENT_TIMESTAMP AS DATE) BETWEEN  CAST(st.startTime AS DATE) AND  CAST(st.endTime AS DATE)  )")
        List<Movie> getMoviesExistsMovieIdShowtimes();

        @Query("SELECT DISTINCT m " +
                        "FROM Movie m " +
                        "JOIN m.formatsMovies fm " +
                        "JOIN ( " +
                        "    SELECT fm.id AS formatMovieId, MAX(s.endTime) AS maxEndTime " +
                        "    FROM Showtime s " +
                        "    JOIN s.formatMovie fm " +
                        "    WHERE s.status = 2 " +
                        "      AND CAST(s.endTime AS DATE) = CAST(CURRENT_DATE AS DATE) " +
                        "    GROUP BY fm.id " +
                        ") maxShowtimes ON fm.id = maxShowtimes.formatMovieId " +
                        "JOIN Showtime s ON s.formatMovie.id = fm.id AND s.endTime = maxShowtimes.maxEndTime")
        List<Movie> getMovieByShowtimeShowing();

        @Query("SELECT DISTINCT m " +
                        "FROM Movie m " +
                        "JOIN m.formatsMovies fm " +
                        "JOIN ( " +
                        "    SELECT fm.id AS formatMovieId, MAX(s.endTime) AS maxEndTime " +
                        "    FROM Showtime s " +
                        "    JOIN s.formatMovie fm " +
                        "    WHERE s.status = 1 " +
                        "      AND CAST(s.endTime AS date) >= CAST(CURRENT_DATE AS DATE) " +
                        "      AND CAST(s.endTime AS date) <= DATE_ADD(CURRENT_DATE, 10, 'day') " +
                        "    GROUP BY fm.id " +
                        ") maxShowtimes ON fm.id = maxShowtimes.formatMovieId " +
                        "JOIN Showtime s ON s.formatMovie.id = fm.id AND s.endTime = maxShowtimes.maxEndTime")
        List<Movie> getMovieByShowtimeUpcoming();

}
