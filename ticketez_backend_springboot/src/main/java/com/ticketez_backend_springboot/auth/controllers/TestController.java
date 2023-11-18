package com.ticketez_backend_springboot.auth.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/user")
  @PreAuthorize("hasRole('USER') or hasRole('MOVIE_MANAGEMENT_ADMIN') or hasRole('SCHEDULING_PRICING_ADMIN')or hasRole('USER_MANAGEMENT_ADMIN')or hasRole('SUPER_ADMIN')")
  public String userAccess() {
    return "USER.";
  }

  @GetMapping("/spa")
  @PreAuthorize("hasRole('SCHEDULING_PRICING_ADMIN')")
  public String SCHEDULING_PRICING_ADMIN() {
    return "SCHEDULING_PRICING_ADMIN.";
  }

  @GetMapping("/mma")
  @PreAuthorize("hasRole('MOVIE_MANAGEMENT_ADMIN')")
  public String MOVIE_MANAGEMENT_ADMIN() {
    return "MOVIE_MANAGEMENT_ADMIN.";
  }

  @GetMapping("/uma")
  @PreAuthorize("hasRole('USER_MANAGEMENT_ADMIN')")
  public String USER_MANAGEMENT_ADMIN() {
    return "USER_MANAGEMENT_ADMIN.";
  }

  @GetMapping("/admin")
  @PreAuthorize("hasRole('SUPER_ADMIN')")
  public String SUPER_ADMIN() {
    return "SUPER_ADMIN.";
  }
}
