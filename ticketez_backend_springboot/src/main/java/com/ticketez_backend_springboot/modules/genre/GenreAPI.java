package com.ticketez_backend_springboot.modules.genre;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import com.ticketez_backend_springboot.modules.discountBooking.DiscountsBooking;
import com.ticketez_backend_springboot.modules.discountBooking.DiscountsBookingDAO;
import com.ticketez_backend_springboot.modules.discountBooking.DiscountsBookingPK;

@RestController
@RequestMapping("/api/genre")
public class GenreAPI {
    // @Autowired
	// private GenreDAO dao;

	// @GetMapping
	// public ResponseEntity<Page<Genre>> getAll(Pageable pageable) {
	// 	Page<Genre> discountsBookings = dao.findAll(pageable);
	// 	return ResponseEntity.ok(discountsBookings);
	// }

	// @GetMapping("/{bookingId}/{serviceId}")
	// public ResponseEntity<Genre> getOne(@PathVariable("bookingId") Long genreId,
	// 		@PathVariable("serviceId") Long serviceId) {
	// 	Optional<Genre> discountsBookingOptional = dao
	// 			.findById(new DiscountsBookingPK(genreId, serviceId));
	// 	if (discountsBookingOptional.isPresent()) {
	// 		return ResponseEntity.ok(discountsBookingOptional.get());
	// 	} else {
	// 		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	// 	}
	// }

	// @PostMapping
	// public ResponseEntity<DiscountsBooking> post(@RequestBody DiscountsBooking discountsBooking) {
	// 	if (discountsBooking == null) {
	// 		return ResponseEntity.badRequest().body(null);
	// 	}
	// 	dao.save(discountsBooking);
	// 	return ResponseEntity.status(HttpStatus.CREATED).body(discountsBooking);
	// }

	// @PutMapping("/{bookingId}/{serviceId}")
	// public ResponseEntity<DiscountsBooking> put(@PathVariable("bookingId") Long bookingId,
	// 		@PathVariable("serviceId") Long serviceId, @RequestBody DiscountsBooking discountsBooking) {
	// 	if (discountsBooking == null) {
	// 		return ResponseEntity.badRequest().body(null);
	// 	}
	// 	if (dao.existsById(new DiscountsBookingPK(bookingId, serviceId))) {
	// 		dao.save(discountsBooking);
	// 		return ResponseEntity.ok(discountsBooking);
	// 	} else {
	// 		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	// 	}
	// }

	// @DeleteMapping("/{bookingId}/{serviceId}")
	// public ResponseEntity<Void> delete(@PathVariable("bookingId") Long bookingId,
	// 		@PathVariable("serviceId") Long serviceId) {
	// 	if (dao.existsById(new DiscountsBookingPK(bookingId, serviceId))) {
	// 		dao.deleteById(new DiscountsBookingPK(bookingId, serviceId));
	// 		return ResponseEntity.noContent().build();
	// 	} else {
	// 		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	// 	}
	// }
}
