package com.ticketez_backend_springboot.modules.price;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceDAO extends JpaRepository<Price, Long> {

}
