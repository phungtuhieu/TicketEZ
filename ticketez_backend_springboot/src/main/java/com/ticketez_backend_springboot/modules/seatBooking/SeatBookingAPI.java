package com.ticketez_backend_springboot.modules.seatBooking;

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
@RequestMapping("/api/seatBooking")
public class SeatBookingAPI {
         @Autowired
         SeatBookingDao bookingDao;

         @GetMapping
         public ResponseEntity<List<SeatBooking>> findAll() {
                  return ResponseEntity.ok(bookingDao.findAll());
         }

         @GetMapping("/{id}")
         public ResponseEntity<SeatBooking> findById(@PathVariable("id") Long id) {
                  if (!bookingDao.existsById(id)) {
                           return ResponseEntity.notFound().build();
                  }
                  return ResponseEntity.ok(bookingDao.findById(id).get());
         }

         @PostMapping
         public ResponseEntity<SeatBooking> post(@RequestBody SeatBooking seatBooking) {
                  bookingDao.save(seatBooking);
                  return ResponseEntity.ok(seatBooking);
         }

         @PutMapping("/{id}")
         public ResponseEntity<SeatBooking> put(@PathVariable("id") Long id, @RequestBody SeatBooking seatBooking) {
                  if (!bookingDao.existsById(id)) {
                           return ResponseEntity.notFound().build();
                  }
                  bookingDao.save(seatBooking);
                  return ResponseEntity.ok(seatBooking);
         }

         @DeleteMapping("/{id}")
         public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
                  bookingDao.deleteById(id);
                  return ResponseEntity.ok(true);
         }
}
