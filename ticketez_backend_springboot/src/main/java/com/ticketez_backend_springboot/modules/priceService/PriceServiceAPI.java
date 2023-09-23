package com.ticketez_backend_springboot.modules.priceService;

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
@RequestMapping("/api/price-service")
public class PriceServiceAPI {

	@Autowired
	private PriceServiceDAO dao;

	@GetMapping
	public ResponseEntity<List<PriceService>> getAll() {
		List<PriceService> priceServices = dao.findAll();
		return ResponseEntity.ok(priceServices);
	}

	@GetMapping("/{id}")
	public ResponseEntity<PriceService> getOne(@PathVariable("id") Long id) {
		Optional<PriceService> priceServiceOptional = dao.findById(id);
		if (priceServiceOptional.isPresent()) {
			return ResponseEntity.ok(priceServiceOptional.get());
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@PostMapping
	public ResponseEntity<PriceService> post(@RequestBody PriceService priceService) {
		if (priceService == null) {
			return ResponseEntity.badRequest().body(null);
		}
		dao.save(priceService);
		return ResponseEntity.status(HttpStatus.CREATED).body(priceService);
	}

	@PutMapping("/{id}")
	public ResponseEntity<PriceService> put(@PathVariable("id") Long id, @RequestBody PriceService priceService) {
		if (priceService == null) {
			return ResponseEntity.badRequest().body(null);
		}
		if (!dao.existsById(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		dao.save(priceService);
		return ResponseEntity.ok(priceService);
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
