package com.ticketez_backend_springboot.modules.priceService;

import java.util.Date;

import com.ticketez_backend_springboot.modules.service.Service;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Price_Services")
@Data
public class PriceService {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private float price;
	private Date startDate;
	private Date endDate;

	@ManyToOne
	@JoinColumn(name = "service_id")
	private Service service;

}