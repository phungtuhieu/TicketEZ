package com.ticketez_backend_springboot.modules.movieProducer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface MovieProducerDAO  extends JpaRepository<MovieProducer,Long>  {
    @Query("SELECT o FROM MovieProducer o WHERE o.name LIKE CONCAT('%', :keyword, '%') ")
    Page<MovieProducer> findByKeyword(@Param("keyword") String search, Pageable pageable);
}
