package com.ticketez_backend_springboot.modules.director;

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
@RequestMapping("/api/director")
public class DirectorAPI {
    
    @Autowired
    DirectorDAO directorDAO;

    @GetMapping
    public ResponseEntity<List<Director>> findAll( ) {
        return ResponseEntity.ok(directorDAO.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Director> findById(@PathVariable("id") Long id) {
        if (!directorDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(directorDAO.findById(id).get());
    }

    @PostMapping
    public ResponseEntity<Director> post(@RequestBody Director director) {
        directorDAO.save(director);
        return ResponseEntity.ok(director);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Director> put(@PathVariable("id") Long id, @RequestBody Director director) {
        if (!directorDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        directorDAO.save(director);
        return ResponseEntity.ok(director);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        directorDAO.deleteById(id);
        return ResponseEntity.ok(true);
    }

}
