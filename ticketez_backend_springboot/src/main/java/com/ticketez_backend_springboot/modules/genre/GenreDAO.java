package com.ticketez_backend_springboot.modules.genre;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface GenreDAO extends JpaRepository<Genre, Long>{
    @Query("SELECT o FROM Genre o WHERE o.name LIKE CONCAT('%', :keyword, '%') ")
    Page<Genre> findByKeyword(@Param("keyword") String search, Pageable pageable);
}
