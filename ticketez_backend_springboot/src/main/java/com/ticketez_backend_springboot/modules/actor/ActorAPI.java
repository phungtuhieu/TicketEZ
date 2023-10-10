package com.ticketez_backend_springboot.modules.actor;

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
@RequestMapping("/api/actor")
public class ActorAPI {
    @Autowired
    ActorDAO actorDAO;

    @GetMapping
    public ResponseEntity<List<Actor>> findAll() {
        try {
            return ResponseEntity.ok(actorDAO.getAllActorDesc());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Actor> findById(@PathVariable("id") Long id) {
        try {
            if (!actorDAO.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(actorDAO.findById(id).get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PostMapping
    public ResponseEntity<Actor> post(@RequestBody Actor actor) {
        try {
            actorDAO.save(actor);
            return ResponseEntity.ok(actor);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<Actor> put(@PathVariable("id") Long id, @RequestBody Actor actor) {
        try {
            if (!actorDAO.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            actorDAO.save(actor);
            return ResponseEntity.ok(actor);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        try {
            actorDAO.deleteById(id);
            return ResponseEntity.ok().body("Xoá diễn viên thành công");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Không thể xóa diễn viên do tài liệu tham khảo hiện có");
        }

    }
}
