package com.ticketez_backend_springboot.modules.serviceBooking;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Setter
@Getter
@Data
public class ServiceBookingPK implements Serializable {
	@Column(name = "booking_id", insertable = false, updatable = false)
	private Long bookingID;

	@Column(name = "service_id", insertable = false, updatable = false)
	private Long serviceID;

	// Thêm constructor chấp nhận hai tham số Long
	public ServiceBookingPK(Long bookingID, Long serviceID) {
		this.bookingID = bookingID;
		this.serviceID = serviceID;
	}
}