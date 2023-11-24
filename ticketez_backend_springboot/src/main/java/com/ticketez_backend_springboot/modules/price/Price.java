package com.ticketez_backend_springboot.modules.price;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ticketez_backend_springboot.modules.cinemaComplex.CinemaComplex;
import com.ticketez_backend_springboot.modules.movie.Movie;
import com.ticketez_backend_springboot.modules.priceSeatType.PriceSeatType;
import com.ticketez_backend_springboot.modules.seat.Seat;
import com.ticketez_backend_springboot.modules.seatType.SeatType;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Price")
@Data
public class Price {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Date startDate;
	private Date endDate;
	private Boolean status;
	@JsonIgnore
	@OneToMany(mappedBy = "price", fetch = FetchType.EAGER)
	private List<PriceSeatType> priceSeatTypes;

	@ManyToOne
	@JoinColumn(name = "movie_id")
	private Movie movie;

	@ManyToOne
	@JoinColumn(name = "cinema_complex_id")
	private CinemaComplex cinemaComplex;

}
