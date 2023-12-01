package com.ticketez_backend_springboot.auth.controllers;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketez_backend_springboot.auth.models.SecurityAccount;
import com.ticketez_backend_springboot.auth.models.SecurityERole;
import com.ticketez_backend_springboot.auth.models.SecurityRole;
import com.ticketez_backend_springboot.auth.payload.request.LoginRequest;
import com.ticketez_backend_springboot.auth.payload.request.SignupRequest;
import com.ticketez_backend_springboot.auth.payload.response.JwtResponse;
import com.ticketez_backend_springboot.auth.payload.response.MessageResponse;
import com.ticketez_backend_springboot.auth.repository.AccountRepository;
import com.ticketez_backend_springboot.auth.repository.RoleRepository;
import com.ticketez_backend_springboot.auth.security.jwt.JwtUtils;
import com.ticketez_backend_springboot.auth.security.services.UserDetailsImpl;
import com.ticketez_backend_springboot.modules.account.Account;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  AccountRepository accountRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @GetMapping("/getAll")
  public ResponseEntity<List<SecurityAccount>> findAll() {
    List<SecurityAccount> accounts = accountRepository.findAll();
    return ResponseEntity.ok(accounts);
  }

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    // SecurityAccount securityAccount =
    // accountRepository.findByIdAndPassword(loginRequest.getId(),
    // encoder.encode(loginRequest.getPassword()));
    // // if (securityAccount == null) {
    // // return new ResponseEntity<>("sai thông tin",HttpStatus.UNAUTHORIZED);

    // // }
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getId(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    String jwt = jwtUtils.generateJwtToken(authentication);
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());
    return ResponseEntity.ok(new JwtResponse(
        jwt,
        userDetails.getId(),
        userDetails.getPhone(),
        userDetails.getFullname(),
        userDetails.getEmail(),
        userDetails.getAddress(),
        userDetails.getBirthday(),
        userDetails.getGender(),
        userDetails.getImage(),
        jwt,
        "Bearer",
        roles));

  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (accountRepository.existsById(signUpRequest.getId())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Lỗi: Tên người dùng đã được sử dụng!"));
    }

    if (accountRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Lỗi: Email đã được sử dụng!"));
    }
    if (accountRepository.existsByFullname(signUpRequest.getFullname())) {

    }
    SecurityAccount account = new SecurityAccount(
        signUpRequest.getId(),
        signUpRequest.getFullname(),
        signUpRequest.getEmail(),

        encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<SecurityRole> roles = new HashSet<>();

    if (strRoles == null) {
      SecurityRole USER = roleRepository.findByName(SecurityERole.USER)
          .orElseThrow(() -> new RuntimeException("Lỗi: Không tìm thấy vai trò"));
      roles.add(USER);
    } else {
      strRoles.forEach(role -> {

        switch (role) {
          case "SUPER_ADMIN":
            SecurityRole SUPER_ADMIN = roleRepository.findByName(SecurityERole.SUPER_ADMIN)
                .orElseThrow(() -> new RuntimeException("Lỗi: Không tìm thấy vai trò"));
            roles.add(SUPER_ADMIN);

            break;
          case "MOVIE_MANAGEMENT_ADMIN":
            SecurityRole MOVIE_MANAGEMENT_ADMIN = roleRepository.findByName(SecurityERole.MOVIE_MANAGEMENT_ADMIN)
                .orElseThrow(() -> new RuntimeException("Lỗi: Không tìm thấy vai trò"));
            roles.add(MOVIE_MANAGEMENT_ADMIN);

            break;
          case "SCHEDULING_PRICING_ADMIN":
            SecurityRole SCHEDULING_PRICING_ADMIN = roleRepository.findByName(SecurityERole.SCHEDULING_PRICING_ADMIN)
                .orElseThrow(() -> new RuntimeException("Lỗi: Không tìm thấy vai trò"));
            roles.add(SCHEDULING_PRICING_ADMIN);

            break;
          case "USER_MANAGEMENT_ADMIN":
            SecurityRole USER_MANAGEMENT_ADMIN = roleRepository.findByName(SecurityERole.USER_MANAGEMENT_ADMIN)
                .orElseThrow(() -> new RuntimeException("Lỗi: Không tìm thấy vai trò"));
            roles.add(USER_MANAGEMENT_ADMIN);

            break;
          default:
            SecurityRole USER = roleRepository.findByName(SecurityERole.USER)
                .orElseThrow(() -> new RuntimeException("Lỗi: Không tìm thấy vai trò"));
            roles.add(USER);
        }
      });
    }
    // ngay tao
    account.setCreatedDate(new Date());

    account.setRoles(roles);
    accountRepository.save(account);

    return ResponseEntity.ok(new MessageResponse("Người dùng đã đăng ký thành công!"));
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateUser(@PathVariable("id") String id, @RequestBody Map<String, Object> updates) {
    if (!accountRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }

    SecurityAccount existingAccount = accountRepository.findById(id).orElse(null);
    if (existingAccount == null) {
      return ResponseEntity.notFound().build();
    }

    if (updates.containsKey("phone")) {
      existingAccount.setPhone((String) updates.get("phone"));
    }
    if (updates.containsKey("fullname")) {
      existingAccount.setFullname((String) updates.get("fullname"));
    }
    if (updates.containsKey("email")) {
      existingAccount.setEmail((String) updates.get("email"));
    }
    if (updates.containsKey("address")) {
      existingAccount.setAddress((String) updates.get("address"));
    }
    if (updates.containsKey("gender")) {
      existingAccount.setGender((String) updates.get("gender"));
    }

    SecurityAccount updatedAccount = accountRepository.save(existingAccount);
    return ResponseEntity.ok(updatedAccount);

    
  }

  @GetMapping("/signout")
  public ResponseEntity<?> logoutUser(HttpServletRequest request) {
    SecurityContextHolder.getContext().setAuthentication(null);
    return ResponseEntity.ok(new MessageResponse("Đăng xuất thành công!"));
  }

}