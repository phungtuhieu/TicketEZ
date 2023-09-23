package com.ticketez_backend_springboot.modules.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceDAO extends JpaRepository<Service, Long> {

}
