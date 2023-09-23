package com.ticketez_backend_springboot.modules.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/api/service")
public class ServiceAPI {

	@Autowired
	private ServiceDAO dao;

	@GetMapping
	public ResponseEntity<List<Service>> getAll() {
		List<Service> services = dao.findAll();
		return ResponseEntity.ok(services);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Service> getOne(@PathVariable("id") Long id) {
		Optional<Service> serviceOptional = dao.findById(id);
		if (serviceOptional.isPresent()) {
			return ResponseEntity.ok(serviceOptional.get());
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@PostMapping
	public ResponseEntity<Service> post(@RequestBody Service service) {
		if (service == null) {
			return ResponseEntity.badRequest().body(null);
		}
		dao.save(service);
		return ResponseEntity.status(HttpStatus.CREATED).body(service);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Service> put(@PathVariable("id") Long id, @RequestBody Service service) {
		if (service == null) {
			return ResponseEntity.badRequest().body(null);
		}
		if (!dao.existsById(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		dao.save(service);
		return ResponseEntity.ok(service);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		dao.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
