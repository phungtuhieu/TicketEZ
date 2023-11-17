package com.ticketez_backend_springboot.auth.payload.response;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {

  private String id;
  private String phone;
  private String fullname;
  private String address;
  private String email;
  // private String password; 
  private Date birthday;
  private String gender;
  private String image;
  private List<String> roles;
  private String token;
  private String type = "Bearer";

  public JwtResponse(String jwt, String id, String phone, String fullname, String email,
      String address, Date birthday, boolean gender, String image, String accessToken, String type, List<String> roles) {

    this.id = id;
    this.phone = phone;
    this.fullname = fullname;
    this.email = email;
    this.birthday = birthday;
    this.gender = gender ? "nam" : "nữ"; 
    this.image = image;
    this.roles = roles;
    this.token = accessToken;
    this.type = type;
  }

 
}
