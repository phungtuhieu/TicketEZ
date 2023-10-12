package com.ticketez_backend_springboot.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO {
    private String phone;
	private String fullname;
	private String email;
	private Date birthday;
	private boolean gender;
	private String image;
	private boolean role;
	private boolean active;
	private boolean verified;

}
