package com.ticketez_backend_springboot.modules.director;

import java.util.Date;
import java.util.List;

import com.ticketez_backend_springboot.modules.directorMovie.DirectorMovie;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Directors")
@Data
public class Director {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String fullname;
	private Date birthday;
	private String avatar;

	@OneToMany(mappedBy = "director")
	private List<DirectorMovie> directorsMovies;
}