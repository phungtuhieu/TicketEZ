package com.ticketez_backend_springboot.modules.seat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ticketez_backend_springboot.modules.seatChart.SeatChart;


public interface SeatDAO extends JpaRepository<Seat, Long> {

    List<Seat>  findBySeatChartId(Long SeatChartId);
    List<Seat> findBySeatChartIdAndSeatType_Id(Long seatChartId, Long seatTypeId);
    Seat findBySeatChartIdAndName(Long seatChartId, String name);


}
