package com.ticketez_backend_springboot.modules.movie;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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


@CrossOrigin("*")
@RestController
@RequestMapping("/api/movie")
public class MovieAPI {
    @Autowired
    MovieDAO dao;
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> findAll(@RequestParam("page") Optional<Integer> pageNo,
    @RequestParam("limit") Optional<Integer> limit) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0), limit.orElse(5));
        Page<Movie> page = dao.findAll(pageable);
        Map<String, Object> resp = new HashMap<>();
        resp.put("page", pageNo);
        resp.put("limit", limit);
        resp.put("totalItem", page.getContent().size() );
        resp.put("data", page.getContent());
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> findById(@PathVariable("id") Long id) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping
    public ResponseEntity<Movie> post(@RequestBody Movie movie) {
        dao.save(movie);
        return ResponseEntity.ok(movie);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movie> put(@PathVariable("id") Long id, @RequestBody Movie movie) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        dao.save(movie);
        return ResponseEntity.ok(movie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        dao.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
