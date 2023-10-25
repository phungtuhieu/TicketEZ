package com.ticketez_backend_springboot.modules.seatChart;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;


import java.util.List;
import java.util.Optional;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/seatchart")
public class SeatChartAPI {

    @Autowired
    private SeatChartDAO dao;

    @GetMapping("/getAll")
    public ResponseEntity<List<SeatChart>> getAll() {
        List<SeatChart> seatCharts = dao.findAll();
        return ResponseEntity.ok(seatCharts);
    }

    // Lấy danh sách rạp theo cụm rạp (theo ID của cụm rạp)
    @GetMapping("/by-cinema/{cinemaId}")
    public ResponseEntity<List<SeatChart>> getSeatChartsByCinema(
            @PathVariable("cinemaId") Long cinemaComplexId) {
        // Sử dụng repository để lấy danh sách rạp theo cụm rạp
        List<SeatChart> seatCharts = dao.findByCinemaId(cinemaComplexId);
        return ResponseEntity.ok(seatCharts);
    }


    @GetMapping("/{id}")
    public ResponseEntity<SeatChart> getOne(@PathVariable("id") Long id) {
        Optional<SeatChart> seatChartOptional = dao.findById(id);
        if (seatChartOptional.isPresent()) {
            return ResponseEntity.ok(seatChartOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<SeatChart> post(@RequestBody SeatChart seatChart) {
        if (seatChart == null) {
            return ResponseEntity.badRequest().body(null);
        }
        dao.save(seatChart);
        return ResponseEntity.status(HttpStatus.CREATED).body(seatChart);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeatChart> put(@PathVariable("id") Long id, @RequestBody SeatChart seatChart) {
        if (seatChart == null) {
            return ResponseEntity.badRequest().body(null);
        }
        if (!dao.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        dao.save(seatChart);
        return ResponseEntity.ok(seatChart);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        if (!dao.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        dao.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getStatusSeatChart")
    public ResponseEntity<List<SeatChart>> getStatusSeatChart() {
        List<SeatChart> seatCharts = dao.getStatusSeatChart();
        return ResponseEntity.ok(seatCharts);
    }
}
