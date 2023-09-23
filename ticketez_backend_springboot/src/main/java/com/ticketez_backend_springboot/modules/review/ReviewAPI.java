package com.ticketez_backend_springboot.modules.review;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@CrossOrigin("*")
@RestController
@RequestMapping("/api/review")
public class ReviewAPI {

    @Autowired
    ReviewDAO reviewDAO;

    @GetMapping
    public ResponseEntity<List<Review>> findAll( ) {
        return ResponseEntity.ok(reviewDAO.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> findById(@PathVariable("id") Long id) {
        if (!reviewDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reviewDAO.findById(id).get());
    }

    @PostMapping
    public ResponseEntity<Review> post(@RequestBody Review review) {
        reviewDAO.save(review);
        return ResponseEntity.ok(review);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> put(@PathVariable("id") Long id, @RequestBody Review review) {
        if (!reviewDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        reviewDAO.save(review);
        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        reviewDAO.deleteById(id);
        return ResponseEntity.ok(true);
    }

}
