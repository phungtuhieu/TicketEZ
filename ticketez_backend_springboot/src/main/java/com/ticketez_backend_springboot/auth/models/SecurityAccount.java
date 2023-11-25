package com.ticketez_backend_springboot.auth.models;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ticketez_backend_springboot.modules.accountRole.AccountRole;
import com.ticketez_backend_springboot.modules.activityLog.ActivityLog;
import com.ticketez_backend_springboot.modules.booking.Booking;
import com.ticketez_backend_springboot.modules.review.Review;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "Accounts", uniqueConstraints = {
        @UniqueConstraint(columnNames = "id"),
        @UniqueConstraint(columnNames = "email")
})
@Data
public class SecurityAccount {
    @Id
    private String id;
    private String phone;
    private String fullname;
    private String address;
    private String email;
    private String password;
    private Date birthday;
    private String gender;
    private String image;
    private Integer status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date")
    private Date createdDate;
    private boolean verified;
    private int points;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "Accounts_Roles", 
    joinColumns = @JoinColumn(name = "account_id"), 
    inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<SecurityRole> roles = new HashSet<>();

	@JsonIgnore
	@OneToMany(mappedBy = "account")
	private List<Review> reviews;

	@JsonIgnore
	@OneToMany(mappedBy = "account")
	private List<Booking> bookings;

	@JsonIgnore
	@OneToMany(mappedBy = "account")
	private List<AccountRole> accountRoles;

	@JsonIgnore
	@OneToMany(mappedBy = "account")
	private List<ActivityLog> activityLogs;

    public SecurityAccount() {}

    public SecurityAccount(String id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

}
