package com.ticketez_backend_springboot.modules.price;

import java.util.Date;

import com.ticketez_backend_springboot.modules.cinemaComplex.CinemaComplex;
import com.ticketez_backend_springboot.modules.movie.Movie;
import com.ticketez_backend_springboot.modules.seatType.SeatType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Price")
@Data
public class Price {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Double weekdayPrice;
	private Double weekendPrice;
	private Date startDate;
	private Date endDate;
	private Boolean status;

	@ManyToOne
	@JoinColumn(name = "seat_type_id")
	private SeatType seatType;

	@ManyToOne
	@JoinColumn(name = "movie_id")
	private Movie movie;

	@ManyToOne
	@JoinColumn(name = "cinema_complex_id")
	private CinemaComplex cinemaComplex;

}
