package com.ticketez_backend_springboot.modules.movieStudio;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieStudioDAO extends JpaRepository<MovieStudio,Long> {
     @Query("SELECT m FROM MovieStudio m WHERE m.name LIKE CONCAT('%', :keyword, '%') ")
    Page<MovieStudio> findByKeyword(@Param("keyword") String search, Pageable pageable);

}
