package com.ticketez_backend_springboot.modules.price;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ticketez_backend_springboot.dto.PriceSeatTypeDTO;

@Repository
public interface PriceDAO extends JpaRepository<Price, Long> {

        // @Query("SELECT p FROM Price p WHERE p.seatType.id IN (:ids) AND "
        // + "p.cinemaComplex.id = :cinemaClxId AND p.movie.id = :movieId "
        // + " AND p.status = true")
        // List<Price> getPriceListBySeatTypeIds(
        // @Param("ids") List<Long> ids,
        // @Param("cinemaClxId") Long cinemaClxId,
        // @Param("movieId") Long movieId);

        // // lấy price theo cinemacomplexId và movieID

        // Trong interface PriceDAO
        List<Price> findByCinemaComplexIdAndFormatMovie_Movie_Id(Long cinemaComplexId, Long movieId);

}
