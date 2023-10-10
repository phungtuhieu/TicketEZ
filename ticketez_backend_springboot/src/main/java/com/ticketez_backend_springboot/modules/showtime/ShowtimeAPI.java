package com.ticketez_backend_springboot.modules.showtime;

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
@RequestMapping("/api/showtime")
public class ShowtimeAPI {

         @Autowired
         ShowtimeDAO showtimeDAO;

         @GetMapping
         public ResponseEntity<List<Showtime>> findAll() {
                  return ResponseEntity.ok(showtimeDAO.findAll());
         }

         @GetMapping("/{id}")
         public ResponseEntity<Showtime> findById(@PathVariable("id") Long id) {
                  if (!showtimeDAO.existsById(id)) {
                           return ResponseEntity.notFound().build();
                  }
                  return ResponseEntity.ok(showtimeDAO.findById(id).get());
         }

         @PostMapping
         public ResponseEntity<Showtime> post(@RequestBody Showtime showtime) {
                  showtimeDAO.save(showtime);
                  return ResponseEntity.ok(showtime);
         }

         @PutMapping("/{id}")
         public ResponseEntity<Showtime> put(@PathVariable("id") Long id, @RequestBody Showtime showtime) {
                  if (!showtimeDAO.existsById(id)) {
                           return ResponseEntity.notFound().build();
                  }
                  showtimeDAO.save(showtime);
                  return ResponseEntity.ok(showtime);
         }

         @DeleteMapping("/{id}")
         public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
                  showtimeDAO.deleteById(id);
                  return ResponseEntity.ok(true);
         }
}
