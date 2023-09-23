package com.ticketez_backend_springboot.modules.event;

import java.util.Date;

import com.ticketez_backend_springboot.modules.cinemaComplex.CinemaComplex;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Events")
@Data
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String description;
	private Date startDate;
	private Date endDate;
	private String banner;
	private boolean status;

	@ManyToOne
	@JoinColumn(name = "cinema_complex_id")
	private CinemaComplex cinemaComplex;

}