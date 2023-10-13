package com.ticketez_backend_springboot.modules.actor;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ActorDAO extends JpaRepository<Actor, Long> {

    // @Query("SELECT a FROM Actor a ORDER BY a.id DESC")
    List<Actor> findAllByOrderByIdDesc();
}
