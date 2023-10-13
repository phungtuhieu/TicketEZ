package com.ticketez_backend_springboot.modules.movie;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieDAO extends JpaRepository<Movie,Long> {


    List<Movie> findAllByOrderByIdDesc();
    
}
