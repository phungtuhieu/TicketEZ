package com.ticketez_backend_springboot.modules.price;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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
        // @Query("SELECT p FROM Price p " +
        // "JOIN FETCH p.cinemaComplex cc " +
        // "JOIN FETCH p.movie m " +
        // "WHERE cc.id = :cinemaComplexId AND m.id = :movieId")
        // List<Price> findPricesByCinemaComplexIdAndMovieId(@Param("cinemaComplexId")
        // Long cinemaComplexId,
        // @Param("movieId") Long movieId);

        // List<Price> findByCinemaComplexIdAndMovieId(Long cinemaComplexId, Long
        // movieId);

}
