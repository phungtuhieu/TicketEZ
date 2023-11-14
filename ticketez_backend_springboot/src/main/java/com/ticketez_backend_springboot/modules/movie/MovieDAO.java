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
                        "    WHERE " +
                        "     CAST(s.endTime AS DATE) = CAST(CURRENT_DATE AS DATE) " +
                        "    GROUP BY fm.id " +
                        ") maxShowtimes ON fm.id = maxShowtimes.formatMovieId " +
                        "JOIN Showtime s ON s.formatMovie.id = fm.id AND s.endTime = maxShowtimes.maxEndTime")
        List<Movie> getMovieByShowtimeShowing();

        @Query(value = "SELECT DISTINCT m.* " +
                        "FROM Movies m " +
                        "JOIN Formats_Movies fm ON fm.movie_id = m.id " +
                        "JOIN ( " +
                        "    SELECT fm.movie_id, MAX(s.end_time) AS max_end_time " +
                        "    FROM Showtimes s " +
                        "    JOIN Formats_Movies fm ON s.format_movie_id = fm.id " +
                        "    WHERE  " +
                        "     s.end_time >= GETDATE() " +
                        "      AND s.end_time <= DATEADD(day, 10, GETDATE()) " +
                        "    GROUP BY fm.movie_id " +
                        ") max_showtimes ON fm.movie_id = max_showtimes.movie_id " +
                        "JOIN Showtimes s ON s.format_movie_id = fm.id AND s.end_time = max_showtimes.max_end_time", nativeQuery = true)
        List<Movie> getMovieByShowtimeUpcoming();

}
