package com.ticketez_backend_springboot.modules.showtime;

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

import com.ticketez_backend_springboot.dto.ResponseDTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/showtime")
public class ShowtimeAPI {

    @Autowired
    ShowtimeDAO showtimeDAO;

    @GetMapping
    public ResponseEntity<ResponseDTO<Showtime>> findAll(@RequestParam("page") Optional<Integer> pageNo,
            @RequestParam("limit") Optional<Integer> limit) {
        try {

            if (pageNo.isPresent() && pageNo.get() == 0) {
                return ResponseEntity.notFound().build();
            }
            Sort sort = Sort.by(Sort.Order.desc("id"));
            Pageable pageable = PageRequest.of(pageNo.orElse(1) - 1, limit.orElse(10), sort);
            Page<Showtime> page = showtimeDAO.findAll(pageable);
            ResponseDTO<Showtime> responseDTO = new ResponseDTO<>();
            responseDTO.setData(page.getContent());
            responseDTO.setTotalItems(page.getTotalElements());
            responseDTO.setTotalPages(page.getTotalPages());
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {
            showtimeDAO.deleteById(id);
            return ResponseEntity.ok().body("Xoá xuất chiếu thành công");
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Không thể xoá vì dính khoá ngoại", HttpStatus.CONFLICT);
        }

    }
}
