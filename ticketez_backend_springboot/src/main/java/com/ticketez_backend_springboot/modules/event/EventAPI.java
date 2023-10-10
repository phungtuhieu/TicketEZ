package com.ticketez_backend_springboot.modules.event;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/event")
public class EventAPI {

    @Autowired
	private EventDAO eventDAO;


     @GetMapping
    public ResponseEntity<List<Event>> findAll( ) {
        return ResponseEntity.ok(eventDAO.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> findById(@PathVariable("id") Long id) {
        if (!eventDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(eventDAO.findById(id).get());
    }

    @PostMapping
    public ResponseEntity<Event> post(@RequestBody Event event) {
        eventDAO.save(event);
        return ResponseEntity.ok(event);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> put(@PathVariable("id") Long id, @RequestBody Event event) {
        if (!eventDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        eventDAO.save(event);
        return ResponseEntity.ok(event);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        eventDAO.deleteById(id);
        return ResponseEntity.ok(true);
    }
    
}