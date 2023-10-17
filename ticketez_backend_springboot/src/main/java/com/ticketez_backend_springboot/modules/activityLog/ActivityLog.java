package com.ticketez_backend_springboot.modules.activityLog;

import java.util.Date;

import com.ticketez_backend_springboot.modules.account.Account;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Activity_Logs")
@Data
public class ActivityLog {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Date timeStamp;
	private String description;
	private String result;
	private Integer activityType;
	private String ipAddress;
	private String browser;
	private String operatingSystem;
	private String device;

	@ManyToOne
	@JoinColumn(name = "account_id")
	private Account account;

}
