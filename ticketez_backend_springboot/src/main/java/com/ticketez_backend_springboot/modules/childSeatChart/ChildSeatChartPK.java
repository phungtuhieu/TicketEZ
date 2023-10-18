package com.ticketez_backend_springboot.modules.childSeatChart;

import java.io.Serializable;

import com.ticketez_backend_springboot.modules.seatChart.SeatChart;
import com.ticketez_backend_springboot.modules.showtime.Showtime;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Setter
@Getter
@Data
public class ChildSeatChartPK implements Serializable {


	@JoinColumn(name = "seat_chart_id", insertable = false, updatable = false)
	private Long seatChartID;

	
	@JoinColumn(name = "showtime_id", insertable = false, updatable = false)
	private Long showtimeID;

    // Thêm constructor chấp nhận hai tham số Long
    public ChildSeatChartPK(Long seatChartID, Long showTimeiD) {
		this.seatChartID = seatChartID;
		this.showtimeID = showTimeiD;
	}
}
