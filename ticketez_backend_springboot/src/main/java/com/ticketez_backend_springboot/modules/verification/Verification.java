package com.ticketez_backend_springboot.modules.verification;

import java.util.Date;

import com.ticketez_backend_springboot.modules.account.Account;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Verification")
@Data
public class Verification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "account_id")
	private String accountId;
	private String code;
	@Column(name = "created_at")
	private Date createdAt;
	@Column(name = "expires_at")
	private Date expiresAt;
	private boolean active;
	@ManyToOne
	@JoinColumn(name = "account_id", referencedColumnName = "phone", insertable = false, updatable = false)
	private Account account;
}