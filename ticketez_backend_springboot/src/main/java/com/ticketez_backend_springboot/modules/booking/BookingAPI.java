package com.ticketez_backend_springboot.modules.booking;

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
@RequestMapping("/api/booking")
public class BookingAPI {

	@Autowired
	private BookingDAO dao;

	@GetMapping
	public ResponseEntity<List<Booking>> getAll() {
		List<Booking> bookings = dao.findAll();
		return ResponseEntity.ok(bookings);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Booking> getOne(@PathVariable("id") String id) {
		Optional<Booking> bookingOptional = dao.findById(id);
		if (bookingOptional.isPresent()) {
			return ResponseEntity.ok(bookingOptional.get());
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@PostMapping
	public ResponseEntity<Booking> post(@RequestBody Booking booking) {
		if (booking == null) {
			return ResponseEntity.badRequest().body(null);
		}
		dao.save(booking);
		return ResponseEntity.status(HttpStatus.CREATED).body(booking);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Booking> put(@PathVariable("id") String id, @RequestBody Booking booking) {
		if (booking == null) {
			return ResponseEntity.badRequest().body(null);
		}
		if (!dao.existsById(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		dao.save(booking);
		return ResponseEntity.ok(booking);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") String id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		dao.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
