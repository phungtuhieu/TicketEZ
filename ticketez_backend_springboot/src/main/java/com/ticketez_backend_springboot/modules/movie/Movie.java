package com.ticketez_backend_springboot.modules.movie;

import java.sql.Time;
import java.util.Date;
import java.util.List;

import com.ticketez_backend_springboot.modules.actorMovie.ActorMovie;
import com.ticketez_backend_springboot.modules.directorMovie.DirectorMovie;
import com.ticketez_backend_springboot.modules.formatMovie.FormatMovie;
import com.ticketez_backend_springboot.modules.genreMovie.GenreMovie;
import com.ticketez_backend_springboot.modules.movieStudio.MovieStudio;
import com.ticketez_backend_springboot.modules.mpaaRating.MPAARating;
import com.ticketez_backend_springboot.modules.price.Price;
import com.ticketez_backend_springboot.modules.showtime.Showtime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Movies")
@Data
public class Movie {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;
	private String description;
	private Time duration;
	private Date releaseDate;
	private String country;
	private Float rating;

	@ManyToOne
	@JoinColumn(name = "movie_studio_id")
	private MovieStudio movieStudio;

	@ManyToOne
	@JoinColumn(name = "MPAA_rating_id")
	private MPAARating mpaaRating;

	@OneToMany(mappedBy = "movie")
	private List<Showtime> showtimes;

	@OneToMany(mappedBy = "movie")
	private List<GenreMovie> genresMovies;

	@OneToMany(mappedBy = "movie")
	private List<FormatMovie> formatsMovies;

	@OneToMany(mappedBy = "movie")
	private List<DirectorMovie> directorsMovies;

	@OneToMany(mappedBy = "movie")
	private List<ActorMovie> actorsMovies;

	@OneToMany(mappedBy = "movie")
	private List<Price> prices;
}