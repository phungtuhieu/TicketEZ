package com.ticketez_backend_springboot.modules.studio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudioDAO extends JpaRepository<Studio, Long> {
    // @Query("SELECT m FROM MovieStudio m WHERE m.name LIKE CONCAT('%', :keyword,
    // '%') ")
    // Page<Studio> findByKeyword(@Param("keyword") String search, Pageable
    // pageable);

}
