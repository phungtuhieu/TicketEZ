package com.ticketez_backend_springboot.modules.childSeatChart;

import java.util.Date;

import lombok.Data;


import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowTimeInfoDTO {
    private Long seatChartId; // Add seatChartId field
    private Long showTimeId;
    private Date startTime;
    private Date endTime;

    // Constructors, getters, and setters
}