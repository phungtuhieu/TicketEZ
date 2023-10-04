package com.ticketez_backend_springboot.modules.movie;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieDAO extends JpaRepository<Movie,Long> {
    
}
