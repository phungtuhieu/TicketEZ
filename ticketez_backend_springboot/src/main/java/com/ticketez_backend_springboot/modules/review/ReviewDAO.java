package com.ticketez_backend_springboot.modules.review;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewDAO extends JpaRepository<Review,Long> {
    
}
