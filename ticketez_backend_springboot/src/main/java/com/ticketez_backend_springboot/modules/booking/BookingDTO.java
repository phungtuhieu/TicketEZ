package com.ticketez_backend_springboot.modules.booking;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ticketez_backend_springboot.modules.seat.Seat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    Booking booking;
    List<Seat> seats;
    List<SeatTypePriceDTO> listPrice;
}
