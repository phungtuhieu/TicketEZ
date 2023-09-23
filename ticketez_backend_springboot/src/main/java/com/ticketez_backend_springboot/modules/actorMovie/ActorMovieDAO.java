package com.ticketez_backend_springboot.modules.actorMovie;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ActorMovieDAO extends JpaRepository<ActorMovie, ActorMoviePK> {

}