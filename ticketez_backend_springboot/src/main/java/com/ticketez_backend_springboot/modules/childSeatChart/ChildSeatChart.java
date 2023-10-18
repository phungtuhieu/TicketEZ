package com.ticketez_backend_springboot.modules.childSeatChart;

import com.ticketez_backend_springboot.modules.booking.Booking;
import com.ticketez_backend_springboot.modules.seatChart.SeatChart;
import com.ticketez_backend_springboot.modules.service.Service;
import com.ticketez_backend_springboot.modules.serviceBooking.ServiceBookingPK;
import com.ticketez_backend_springboot.modules.showtime.Showtime;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;



@Entity
@Table(name = "Child_Seat_Chart")
@Data
public class ChildSeatChart {
    
	@EmbeddedId
	ChildSeatChartPK childSeatChartPK;

	@ManyToOne
	@JoinColumn(name = "seat_chart_id", insertable = false, updatable = false)
	private SeatChart seatChart;

	@ManyToOne
	@JoinColumn(name = "showtime_id", insertable = false, updatable = false)
	private Showtime showTime;


}
