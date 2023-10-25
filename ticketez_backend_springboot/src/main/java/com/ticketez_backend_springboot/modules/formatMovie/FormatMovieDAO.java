
package com.ticketez_backend_springboot.modules.formatMovie;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ticketez_backend_springboot.modules.movie.Movie;

public interface FormatMovieDAO extends JpaRepository<FormatMovie, Long> {
     @Query("SELECT DISTINCT f.movie FROM FormatMovie f")
    List<Movie> getDistinctFormats();

}
