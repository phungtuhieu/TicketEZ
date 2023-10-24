package com.ticketez_backend_springboot.modules.formatMovie;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ticketez_backend_springboot.modules.format.Format;
import com.ticketez_backend_springboot.modules.movie.Movie;
import com.ticketez_backend_springboot.modules.showtime.Showtime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Formats_Movies")
@Data
public class FormatMovie {
	// @EmbeddedId
	// FormatMoviePK formatMoviePK;
	@Id
	Long id;

	@ManyToOne
	@JoinColumn(name = "format_id", insertable = false, updatable = false)
	private Format format;

	@ManyToOne
	@JoinColumn(name = "movie_id", insertable = false, updatable = false)
	private Movie movie;

	@JsonIgnore		
	@OneToMany(mappedBy = "formatMovie")
	private List<Showtime> showtimes;

	
}