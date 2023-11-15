package com.ticketez_backend_springboot.modules.price;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
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
@RequestMapping("/api/price")
public class PriceAPI {
    @Autowired
    PriceDAO priceDAO;

    @GetMapping
    public ResponseEntity<List<Price>> findAll() {
        return ResponseEntity.ok(priceDAO.findAll());
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<Price>> getAll() {
        return ResponseEntity.ok(priceDAO.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Price> findById(@PathVariable("id") Long id) {
        if (!priceDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(priceDAO.findById(id).get());
    }

    @PostMapping("/get/price-by-seattype")
    public ResponseEntity<?> getPriceListBySeatTypeIds(@RequestBody PriceFindDTO priceFindDTO) {
        try {
            List<Price> listPrice = priceDAO.getPriceListBySeatTypeIds(priceFindDTO.getSeatTypeIds(),
                    priceFindDTO.getCinemaClxId(), priceFindDTO.getMovieId());
            if (listPrice == null) {
                return new ResponseEntity<>("Không tìm thấy giá của các này", HttpStatus.CONFLICT);
            }
            return ResponseEntity.ok(listPrice);
        } catch (Exception e) {
            return new ResponseEntity<>("Không tìm thấy giá của các này", HttpStatus.CONFLICT);
        }
    }

    @PostMapping
    public ResponseEntity<Price> post(@RequestBody Price price) {
        priceDAO.save(price);
        return ResponseEntity.ok(price);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Price> put(@PathVariable("id") Long id, @RequestBody Price price) {
        if (!priceDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        priceDAO.save(price);
        return ResponseEntity.ok(price);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        priceDAO.deleteById(id);
        return ResponseEntity.ok(true);
    }
}
