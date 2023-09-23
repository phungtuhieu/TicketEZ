package com.ticketez_backend_springboot.modules.cinemaType;

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
@RequestMapping("/api/cinemaType")

public class CinemaTypeAPI {
         @Autowired
         CinemaTypeDAO cinemaTypeDAO;

         @GetMapping
         public ResponseEntity<List<CinemaType>> findAll() {
                  return ResponseEntity.ok(cinemaTypeDAO.findAll());
         }

         @GetMapping("/{id}")
         public ResponseEntity<CinemaType> findById(@PathVariable("id") Long id) {
                  if (!cinemaTypeDAO.existsById(id)) {
                           return ResponseEntity.notFound().build();
                  }
                  return ResponseEntity.ok(cinemaTypeDAO.findById(id).get());
         }

         @PostMapping
         public ResponseEntity<CinemaType> post(@RequestBody CinemaType cinemaType) {
                  cinemaTypeDAO.save(cinemaType);
                  return ResponseEntity.ok(cinemaType);
         }

         @PutMapping("/{id}")
         public ResponseEntity<CinemaType> put(@PathVariable("id") Long id, @RequestBody CinemaType cinemaType) {
                  if (!cinemaTypeDAO.existsById(id)) {
                           return ResponseEntity.notFound().build();
                  }
                  cinemaTypeDAO.save(cinemaType);
                  return ResponseEntity.ok(cinemaType);
         }

         @DeleteMapping("/{id}")
         public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
                  cinemaTypeDAO.deleteById(id);
                  return ResponseEntity.ok(true);
         }
}
