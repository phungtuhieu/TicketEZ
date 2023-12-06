package com.ticketez_backend_springboot.modules.serviceChoose;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceChooseDAO extends JpaRepository<ServiceChoose, Long> {

}
