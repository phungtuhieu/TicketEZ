package com.ticketez_backend_springboot.modules.actor;

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
@RequestMapping("/api/actor")
public class ActorAPI {
    @Autowired
    ActorDAO actorDAO;

    @GetMapping
    public ResponseEntity<List<Actor>> findAll() {
        return ResponseEntity.ok(actorDAO.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Actor> findById(@PathVariable("id") Long id) {
        if (!actorDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(actorDAO.findById(id).get());
    }

    @PostMapping
    public ResponseEntity<Actor> post(@RequestBody Actor actor) {
        actorDAO.save(actor);
        return ResponseEntity.ok(actor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Actor> put(@PathVariable("id") Long id, @RequestBody Actor actor) {
        if (!actorDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        actorDAO.save(actor);
        return ResponseEntity.ok(actor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        actorDAO.deleteById(id);
        return ResponseEntity.ok(true);
    }
}
