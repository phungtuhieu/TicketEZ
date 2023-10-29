package com.ticketez_backend_springboot.modules.cinemaComplex;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ticketez_backend_springboot.modules.format.Format;
import com.ticketez_backend_springboot.modules.movie.Movie;

public interface CinemaComplexDao extends JpaRepository<CinemaComplex, Long> {
        List<CinemaComplex> findAllByOrderByIdDesc();

        @Query("SELECT ccx FROM CinemaComplex ccx "
                        + "WHERE ccx.province.id = :provinceId AND"
                        + " ccx.cinemaChain.name like CONCAT('%', :cinemaChainName, '%') AND "
                        + " ccx.name like CONCAT('%', :searchNameCCX, '%') ")
        Page<CinemaComplex> getCinemaComplexByProvinceIdAndCinemaChainNameAndSearchNameCCX(Pageable pageable,
                        @Param("provinceId") Integer provinceId,
                        @Param("cinemaChainName") String cinemaChainName,
                        @Param("searchNameCCX") String searchNameCCX);


        @Query("SELECT ccx FROM CinemaComplex ccx WHERE EXISTS "
        
        +"(SELECT st FROM Showtime st JOIN st.cinema.cinemaComplex ccxs WHERE "
        +"ccx.id = ccxs.id "
        +"AND CAST(st.startTime AS DATE) = :date "
        +"AND ccxs.province.id = :provinceId "
        +"AND ccxs.cinemaChain.name like CONCAT('%', :cinemaChainName, '%') "
        +"AND st.formatMovie.movie = :movie"
        +" )"
)                     
        List<CinemaComplex> getCinemaComplexAndFormatShowtimesByMovie(
                        @Param("provinceId") Long provinceId,
                        @Param("cinemaChainName") String cinemaChainName,
                        @Param("movie") Movie movie,
                        @Param("date") LocalDate date);

}
