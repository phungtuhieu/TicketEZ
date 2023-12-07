package com.ticketez_backend_springboot.modules.serviceChoose;

import com.ticketez_backend_springboot.modules.booking.Booking;
import com.ticketez_backend_springboot.modules.service.Service;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Service_Choose")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceChoose {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;

    private Double price;
}
