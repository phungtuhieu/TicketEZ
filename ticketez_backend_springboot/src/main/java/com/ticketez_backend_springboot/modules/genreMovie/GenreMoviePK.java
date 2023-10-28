package com.ticketez_backend_springboot.modules.genreMovie;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Setter
@Getter
public class GenreMoviePK implements Serializable {


    @Column(name = "genre_id", insertable = false, updatable = false)
    private Long genre_id;

    @Column(name = "movie_id", insertable = false, updatable = false)
    private Long movieId;

}
