package com.ticketez_backend_springboot.modules.account;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ticketez_backend_springboot.modules.accountRole.AccountRole;
import com.ticketez_backend_springboot.modules.activityLog.ActivityLog;
import com.ticketez_backend_springboot.modules.booking.Booking;
import com.ticketez_backend_springboot.modules.review.Review;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Accounts")
@Data
public class Account {
	@Id
	private String phone;
	private String fullname;
	private String email;
	private String password; 
	private Date birthday;
	private boolean gender;
	private String image;
	private boolean role;
	private boolean active;

	
	private boolean verified;
	private int points;

	@JsonIgnore
	@OneToMany(mappedBy = "account")
	private List<Review> reviews;
	
	@JsonIgnore
	@OneToMany(mappedBy = "account")
	private List<Booking> bookings;

	@JsonIgnore
	@OneToMany(mappedBy = "account")
	private List<AccountRole> accountRoles;

	@OneToMany(mappedBy = "account")
	private List<ActivityLog> activityLogs;
	
//	@OneToMany(mappedBy = "account")
//	private List<ServiceBooking> servicesBookings;

}
