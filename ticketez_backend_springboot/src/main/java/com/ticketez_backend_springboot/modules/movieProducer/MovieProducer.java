package com.ticketez_backend_springboot.modules.movieProducer;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ticketez_backend_springboot.modules.movie.Movie;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Movie_Producers")
@Data
public class MovieProducer {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String country;
	private String email;
	private String description;

	@JsonIgnore
	@OneToMany(mappedBy = "movieProducer")
	private List<Movie> movies;
}
