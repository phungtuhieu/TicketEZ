package com.ticketez_backend_springboot.modules.genreMovie;

import com.ticketez_backend_springboot.modules.genre.Genre;
import com.ticketez_backend_springboot.modules.movie.Movie;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Genres_Movies")
@Data
public class GenreMovie {

	 @EmbeddedId
	GenreMoviePK genreMoviePK;

	@ManyToOne
	@JoinColumn(name = "genre_id", insertable = false, updatable = false)
	private Genre genre;

	@ManyToOne
	@JoinColumn(name = "movie_id", insertable = false, updatable = false)
	private Movie movie;
}