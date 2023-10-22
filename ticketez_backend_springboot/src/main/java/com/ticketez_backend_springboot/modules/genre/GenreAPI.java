package com.ticketez_backend_springboot.modules.genre;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ticketez_backend_springboot.modules.movie.Movie;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/genre")
public class GenreAPI {
@Autowired
    GenreDAO dao;

    @GetMapping
    public ResponseEntity<Page<Genre>> findAll(@RequestParam("pageNo") Optional<Integer> pageNo) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0), 5);
        Page<Genre> page = dao.findAll(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Genre> findById(@PathVariable("id") Long id) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping
    public ResponseEntity<Genre> post(@RequestBody Genre genre) {
        dao.save(genre);
        return ResponseEntity.ok(genre);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Genre> put(@PathVariable("id") Long id, @RequestBody Genre genre) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        dao.save(genre);
        return ResponseEntity.ok(genre);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        dao.deleteById(id);
        return ResponseEntity.ok().build();
    }
    // ----------------------------------------------------------------

    @PostMapping("/get/genre")
    public ResponseEntity<?> getDuLie(@RequestBody Movie movie) {
        try {
            if(movie.getId() == null ){
                    return new ResponseEntity<>("Lỗi ", HttpStatus.NOT_FOUND);
            }
            List<Genre> genre = dao.getGenres(movie);
            return ResponseEntity.ok(genre);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
