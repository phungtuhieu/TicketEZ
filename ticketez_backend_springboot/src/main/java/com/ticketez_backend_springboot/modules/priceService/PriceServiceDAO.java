
package com.ticketez_backend_springboot.modules.priceService;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceServiceDAO extends JpaRepository<PriceService, Long> {
    List<PriceService> findAllByOrderByIdDesc();
}
