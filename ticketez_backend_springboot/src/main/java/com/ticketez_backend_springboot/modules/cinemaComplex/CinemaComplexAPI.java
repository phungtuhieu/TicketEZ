package com.ticketez_backend_springboot.modules.cinemaComplex;

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
@RequestMapping("/api/cinemaComplex")
public class CinemaComplexAPI {
    @Autowired
    CinemaComplexDao cinemaComplexDao;

    @GetMapping
    public ResponseEntity<List<CinemaComplex>> findAll() {
        return ResponseEntity.ok(cinemaComplexDao.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CinemaComplex> findById(@PathVariable("id") Long id) {
        if (!cinemaComplexDao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cinemaComplexDao.findById(id).get());
    }

    @PostMapping
    public ResponseEntity<CinemaComplex> post(@RequestBody CinemaComplex cinemaComplex) {
        cinemaComplexDao.save(cinemaComplex);
        return ResponseEntity.ok(cinemaComplex);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CinemaComplex> put(@PathVariable("id") Long id, @RequestBody CinemaComplex cinemaComplex) {
        if (!cinemaComplexDao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        cinemaComplexDao.save(cinemaComplex);
        return ResponseEntity.ok(cinemaComplex);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        cinemaComplexDao.deleteById(id);
        return ResponseEntity.ok(true);
    }
}
