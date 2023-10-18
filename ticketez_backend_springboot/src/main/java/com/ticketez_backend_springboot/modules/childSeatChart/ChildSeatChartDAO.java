package com.ticketez_backend_springboot.modules.childSeatChart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ticketez_backend_springboot.modules.seatChart.SeatChart;

public interface ChildSeatChartDAO extends JpaRepository<ChildSeatChart, ChildSeatChartPK> {

    // @Query("SELECT NEW
    // com.ticketez_backend_springboot.modules.childSeatChart.ShowTimeDTO(c.showTime.id,
    // c.showTime.startTime, c.showTime.endTime) FROM ChildSeatChart c WHERE
    // c.seatChart.id = :seatChartId")
    // List<ShowTimeDTO> findShowtimeInfoBySeatChartId(@Param("seatChartId") Long
    // seatChartId);

    @Query("SELECT csc FROM ChildSeatChart csc WHERE csc.childSeatChartPK.seatChartID = :seatChartId")
    List<ChildSeatChart> findBySeatChartId(Long seatChartId);

    @Query("SELECT new com.ticketez_backend_springboot.modules.childSeatChart.ShowTimeInfoDTO(" +
            "csc.childSeatChartPK.seatChartID, csc.showTime.id, csc.showTime.startTime, csc.showTime.endTime) " +
            "FROM ChildSeatChart csc " +
            "WHERE csc.childSeatChartPK.seatChartID = :seatChartId")
    List<ShowTimeInfoDTO> getShowTimeInfoBySeatChartId(@Param("seatChartId") Long seatChartId);

}
