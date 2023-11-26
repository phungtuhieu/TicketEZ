package com.ticketez_backend_springboot.auth.payload.request;

import java.util.Set;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class SignupRequest {
  @NotBlank
  private String id;

  private String fullname;

  @Email
  private String email;

  private Set<String> role;

  @NotBlank
  private String password;

}
