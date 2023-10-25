package com.ticketez_backend_springboot.modules.formatMovie;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketez_backend_springboot.modules.format.Format;
import com.ticketez_backend_springboot.modules.movie.Movie;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/formatMovie")
public class FormatMovieAPI {

    @Autowired
    FormatMovieDAO dao;

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<FormatMovie> genreMovie = dao.findAll();
        return  ResponseEntity.ok(genreMovie);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @GetMapping("/getDistinctMovie")
    public ResponseEntity<?> getDistinctMovie() {
        List<Movie> distinctMovieIds = dao.getDistinctMovie();
        return ResponseEntity.ok(distinctMovieIds);
    }

    @GetMapping("/getDistinctFormat")
    public ResponseEntity<?> getDistinctFormats() {
        List<Format> distinctMovieIds = dao.getDistinctFormats();
        return ResponseEntity.ok(distinctMovieIds);
    }
    
}
