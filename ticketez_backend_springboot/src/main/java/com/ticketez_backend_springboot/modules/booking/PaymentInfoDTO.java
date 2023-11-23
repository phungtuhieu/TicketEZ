package com.ticketez_backend_springboot.modules.booking;

import java.util.List;

import com.ticketez_backend_springboot.modules.paymentInfo.PaymentInfo;
import com.ticketez_backend_springboot.modules.seatBooking.SeatBooking;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaymentInfoDTO {
    private PaymentInfo paymentInfo;
    private Booking booking;
    private List<SeatBooking> seatBookings;
    private Integer status;
}
