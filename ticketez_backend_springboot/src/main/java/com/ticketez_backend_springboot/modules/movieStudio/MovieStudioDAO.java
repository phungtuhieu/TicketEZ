package com.ticketez_backend_springboot.modules.movieStudio;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieStudioDAO extends JpaRepository<MovieStudio,Long> {
    
}
