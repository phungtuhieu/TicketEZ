package com.ticketez_backend_springboot.dto;


import java.util.List;

import com.ticketez_backend_springboot.modules.booking.Booking;
import com.ticketez_backend_springboot.modules.paymentInfo.PaymentInfo;
import com.ticketez_backend_springboot.modules.seatBooking.SeatBooking;

import lombok.Data;

@Data
public class BookingAnPaymentInfoAndSeatBookings {
    Booking booking;
    PaymentInfo paymentInfo;
    List<SeatBooking> seatBookings;
}
