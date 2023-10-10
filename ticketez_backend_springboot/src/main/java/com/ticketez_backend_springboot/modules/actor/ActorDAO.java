package com.ticketez_backend_springboot.modules.actor;

import org.springframework.data.jpa.repository.JpaRepository;
public interface ActorDAO extends JpaRepository<Actor, Long> {
  
}
