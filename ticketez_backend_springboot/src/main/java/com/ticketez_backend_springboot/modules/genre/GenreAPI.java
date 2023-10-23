package com.ticketez_backend_springboot.modules.genre;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.ticketez_backend_springboot.modules.movie.Movie;



@RestController
@CrossOrigin("*")
@RequestMapping("/api/genre")
public class GenreAPI {
@Autowired
    GenreDAO dao;

    // @GetMapping("/get/all")
    // public ResponseEntity<?> findAll() {
    //     try {
    //        List<Genre> list = dao.findAll();
    //     return ResponseEntity.ok(list);
    //     } catch (Exception e) {
    //         return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    @GetMapping
        public ResponseEntity<?> findByPage(
                @RequestParam("page") Optional<Integer> pageNo,
                @RequestParam("limit") Optional<Integer> limit,
                @RequestParam("search") Optional<String> search) {
            try {
                if (pageNo.isPresent() && pageNo.get() == 0) {
                    return new ResponseEntity<>("Tài nguyên không tồn tại", HttpStatus.BAD_REQUEST);
                }
                Sort sort = Sort.by(Sort.Order.desc("id"));
                Pageable pageable = PageRequest.of(pageNo.orElse(1) - 1, limit.orElse(10), sort);
                Page<Genre> page = dao.findAll(pageable);
                ResponseDTO<Genre> responeDTO = new ResponseDTO<>();
                responeDTO.setData(page.getContent());
                responeDTO.setTotalItems(page.getTotalElements());
                responeDTO.setTotalPages(page.getTotalPages());
                return ResponseEntity.ok(responeDTO);
            } catch (Exception e) {
                return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    @GetMapping("/{id}")
    public ResponseEntity<Genre> findById(@PathVariable("id") Long id) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping
    public ResponseEntity<Genre> post(@RequestBody Genre genre) {
        dao.save(genre);
        return ResponseEntity.ok(genre);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Genre> put(@PathVariable("id") Long id, @RequestBody Genre genre) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        dao.save(genre);
        return ResponseEntity.ok(genre);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        dao.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
