package com.ticketez_backend_springboot.modules.review;

import java.util.List;

import org.hibernate.annotations.ParamDef;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewDAO extends JpaRepository<Review, Long> {
    List<Review> findAllByOrderByIdDesc();

    @Query("SELECT r FROM Review r WHERE r.movie.id = :movieId ORDER BY r.createDate DESC")
    List<Review> findAllByMovieId(@Param("movieId") Long movieId);

}
