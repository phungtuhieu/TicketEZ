package com.ticketez_backend_springboot.modules.movie;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface MovieDAO extends JpaRepository<Movie,Long> {


    List<Movie> findAllByOrderByIdDesc();
    
}
