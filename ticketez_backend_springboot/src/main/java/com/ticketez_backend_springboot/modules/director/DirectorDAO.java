package com.ticketez_backend_springboot.modules.director;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectorDAO extends JpaRepository<Director,Long> {
    
}
