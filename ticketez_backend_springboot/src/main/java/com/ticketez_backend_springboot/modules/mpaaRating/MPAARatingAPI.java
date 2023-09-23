package com.ticketez_backend_springboot.modules.mpaaRating;

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
@RequestMapping("/api/mpaaRating")
public class MPAARatingAPI {

    @Autowired
    MPAARatingDAO mpaaRatingDAO;

    @GetMapping
    public ResponseEntity<List<MPAARating>> findAll() {
        return ResponseEntity.ok(mpaaRatingDAO.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MPAARating> findById(@PathVariable("id") Long id) {
        if (!mpaaRatingDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mpaaRatingDAO.findById(id).get());
    }

    @PostMapping
    public ResponseEntity<MPAARating> post(@RequestBody MPAARating mpaaRating) {
        mpaaRatingDAO.save(mpaaRating);
        return ResponseEntity.ok(mpaaRating);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MPAARating> put(@PathVariable("id") Long id, @RequestBody MPAARating mpaaRating) {
        if (!mpaaRatingDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        mpaaRatingDAO.save(mpaaRating);
        return ResponseEntity.ok(mpaaRating);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        mpaaRatingDAO.deleteById(id);
        return ResponseEntity.ok(true);
    }

}
