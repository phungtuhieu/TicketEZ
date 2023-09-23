package com.ticketez_backend_springboot.modules.showtime;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowtimeDAO extends JpaRepository<Showtime, Long> {

}
