package com.ticketez_backend_springboot.modules.studio;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ticketez_backend_springboot.modules.movieStudio.MovieStudio;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Studios")
@Data
public class Studio {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String image;
	private Date founded_date;
	private String country;
	private String email;
	private String address;
	private String website;
	private String description;

	@JsonIgnore
	@OneToMany(mappedBy = "studio")
	private List<MovieStudio> movieStudios;

}