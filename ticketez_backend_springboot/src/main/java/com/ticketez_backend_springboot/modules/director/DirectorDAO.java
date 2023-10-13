package com.ticketez_backend_springboot.modules.director;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DirectorDAO extends JpaRepository<Director, Long> {
    List<Director> findAllByOrderByIdDesc();

}
