package com.ticketez_backend_springboot.modules.childSeatChart;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

import com.ticketez_backend_springboot.modules.cinemaComplex.CinemaComplex;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/child-seat-chart")
public class ChildSeatChartAPI {
    @Autowired
    ChildSeatChartDAO dao;

    @GetMapping("/{seatChartId}")
    public ResponseEntity<List<?>> findById(@PathVariable("seatChartId") Long id) {
        return ResponseEntity.ok(dao.getShowTimeInfoBySeatChartId(id));

    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ChildSeatChart>> findAll() {
        List<ChildSeatChart> seats = dao.findAll();
        return ResponseEntity.ok(seats);
    }
}
