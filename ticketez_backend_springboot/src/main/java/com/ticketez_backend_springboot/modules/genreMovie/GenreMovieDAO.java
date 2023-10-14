package com.ticketez_backend_springboot.modules.genreMovie;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreMovieDAO extends JpaRepository<GenreMovie, Long>{
    
}
