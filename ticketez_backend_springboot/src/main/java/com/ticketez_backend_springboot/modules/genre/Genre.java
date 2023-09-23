package com.ticketez_backend_springboot.modules.genre;

import java.util.List;

import com.ticketez_backend_springboot.modules.genreMovie.GenreMovie;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Genres")
@Data
public class Genre {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String description;

	@OneToMany(mappedBy = "genre")
	private List<GenreMovie> genresMovies;
}