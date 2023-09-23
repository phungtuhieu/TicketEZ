package com.ticketez_backend_springboot.modules.actorMovie;

import java.io.Serializable;

import com.ticketez_backend_springboot.modules.director.Director;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Setter
@Getter
public class ActorMoviePK implements Serializable {

    @Column(name = "actor_id", insertable = false, updatable = false)
    private Long actorId;

    @Column(name = "movie_id", insertable = false, updatable = false)
    private Long movieId;
}