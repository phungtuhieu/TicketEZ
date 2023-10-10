package com.ticketez_backend_springboot.modules.director;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

@CrossOrigin("*")
@RestController
@RequestMapping("/api/director")
public class DirectorAPI {

    @Autowired
    DirectorDAO directorDAO;

    @GetMapping
    public ResponseEntity<List<Director>> findAll() {
        try {
            return ResponseEntity.ok(directorDAO.getAllDirectorDesc());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Director> findById(@PathVariable("id") Long id) {
        try {
            if (!directorDAO.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(directorDAO.findById(id).get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PostMapping
    public ResponseEntity<Director> post(@RequestBody Director director) {
        try {
            directorDAO.save(director);
            return ResponseEntity.ok(director);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<Director> put(@PathVariable("id") Long id, @RequestBody Director director) {
        try {
            if (!directorDAO.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            directorDAO.save(director);
            return ResponseEntity.ok(director);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        try {
            directorDAO.deleteById(id);
            return ResponseEntity.ok().body("Xoá đạo diễn thành công");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Không thể xóa đạo diễn do tài liệu tham khảo hiện có");
        }

    }

}
