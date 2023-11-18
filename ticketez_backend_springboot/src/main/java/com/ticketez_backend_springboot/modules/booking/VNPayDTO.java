package com.ticketez_backend_springboot.modules.booking;

import com.ticketez_backend_springboot.modules.paymentInfo.PaymentInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VNPayDTO {
    String bookingId;
    String payUrl;
}
