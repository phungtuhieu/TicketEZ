package com.ticketez_backend_springboot.modules.cinemaComplex;

import java.sql.Time;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ticketez_backend_springboot.modules.cinema.Cinema;
import com.ticketez_backend_springboot.modules.discount.Discount;
import com.ticketez_backend_springboot.modules.event.Event;
import com.ticketez_backend_springboot.modules.province.Province;
import com.ticketez_backend_springboot.modules.service.Service;

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
@Table(name = "Cinema_Complex")
@Data
public class CinemaComplex {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String address;
	private String phone;
	private Time openingTime;
	private Time closingTime;

	@ManyToOne
	@JoinColumn(name = "province_id")
	private Province province;

	@JsonIgnore
	@OneToMany(mappedBy = "cinemaComplex")
	private List<Event> events;

	@JsonIgnore
	@OneToMany(mappedBy = "cinemaComplex")
	private List<Service> services;

	@JsonIgnore
	@OneToMany(mappedBy = "cinemaComplex")
	private List<Discount> discounts;

	@JsonIgnore
	@OneToMany(mappedBy = "cinemaComplex")
	private List<Cinema> cinemas;
}