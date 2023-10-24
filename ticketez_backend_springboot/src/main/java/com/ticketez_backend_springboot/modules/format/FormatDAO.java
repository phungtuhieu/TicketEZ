package com.ticketez_backend_springboot.modules.format;

import java.util.List;
import java.util.Locale.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ticketez_backend_springboot.modules.movie.Movie;

public interface FormatDAO extends JpaRepository<Format,Long>{
       @Query("SELECT f FROM Format f ORDER BY f.id DESC ")
    List<Format> getAll();



    @Query("SELECT f FROM Format f JOIN f.formatMovies fm JOIN fm.movie m WHERE m = :movie")
    List<Format> getFormatByMovie(@Param("movie") Movie movie);
    

}   
