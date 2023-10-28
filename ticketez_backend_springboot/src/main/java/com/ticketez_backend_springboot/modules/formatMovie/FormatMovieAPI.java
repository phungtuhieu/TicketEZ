package com.ticketez_backend_springboot.modules.formatMovie;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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
    
}
