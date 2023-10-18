package com.ticketez_backend_springboot.modules.childSeatChart;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class ChildSeatChartPK implements Serializable {

    @Column(name = "seat_chart_id", insertable = false, updatable = false)
    private Long seatChartID;

    @Column(name = "showtime_id", insertable = false, updatable = false)
    private Long showtimeID;

	  public ChildSeatChartPK() {
    }

    public ChildSeatChartPK(Long seatChartID, Long showtimeID) {
        this.seatChartID = seatChartID;
        this.showtimeID = showtimeID;
    }
}
