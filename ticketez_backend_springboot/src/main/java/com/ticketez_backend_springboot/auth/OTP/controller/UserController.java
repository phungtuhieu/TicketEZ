package com.ticketez_backend_springboot.auth.OTP.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ticketez_backend_springboot.auth.OTP.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/otp")
public class UserController {

  @Autowired
  private UserService userService;


  // @PostMapping("/verify-account")
  // public ResponseEntity<String> verifyAccount(@RequestParam String id,
  //     @RequestParam String otp) {
  //   return new ResponseEntity<>(userService.verifyAccount(id, otp), HttpStatus.OK);
  // }
  
  @PutMapping("/regenerate-otp")
  public ResponseEntity<String> regenerateOtp(@RequestParam String email) {
    return new ResponseEntity<>(userService.regenerateOtp(email), HttpStatus.OK);
  }

}
