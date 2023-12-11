package com.ticketez_backend_springboot.auth.controllers;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ticketez_backend_springboot.auth.OTP.config.AuthOtp;
import com.ticketez_backend_springboot.auth.OTP.util.EmailUtil;
import com.ticketez_backend_springboot.auth.OTP.util.OtpUtil;
import com.ticketez_backend_springboot.auth.models.SecurityAccount;
import com.ticketez_backend_springboot.auth.models.SecurityERole;
import com.ticketez_backend_springboot.auth.models.SecurityRole;
import com.ticketez_backend_springboot.auth.payload.request.ChangePasswordRequest;
import com.ticketez_backend_springboot.auth.payload.request.LoginRequest;
import com.ticketez_backend_springboot.auth.payload.request.SignupRequest;
import com.ticketez_backend_springboot.auth.payload.response.JwtResponseDTO;
import com.ticketez_backend_springboot.auth.payload.response.MessageResponse;
import com.ticketez_backend_springboot.auth.payload.response.UserDto;
import com.ticketez_backend_springboot.auth.repository.AccountRepository;
import com.ticketez_backend_springboot.auth.repository.RoleRepository;
import com.ticketez_backend_springboot.auth.security.jwt.JwtUtils;
import com.ticketez_backend_springboot.auth.security.services.UserDetailsImpl;
import com.ticketez_backend_springboot.dto.AccountDTO;
import com.ticketez_backend_springboot.modules.account.Account;
import com.ticketez_backend_springboot.modules.actor.Actor;
import com.ticketez_backend_springboot.modules.verification.Verification;
import com.ticketez_backend_springboot.modules.verification.VerificationDAO;

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
  private VerificationDAO verificationDAO;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  private OtpUtil otpUtil;

  @Autowired
  private EmailUtil emailUtil;

  @GetMapping("/getAll")
  public ResponseEntity<List<SecurityAccount>> findAll() {
    List<SecurityAccount> accounts = accountRepository.findAll();
    return ResponseEntity.ok(accounts);
  }

  @GetMapping("/{email}")
  public ResponseEntity<SecurityAccount> findByEmail(@PathVariable String email) {
    Optional<SecurityAccount> optionalAccount = accountRepository.findByEmail(email);

    return optionalAccount.map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    SecurityAccount securityAccount = accountRepository.findById(loginRequest.getId())
        .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng với id: " + loginRequest.getId()));
    if (!securityAccount.isVerified()) {
      return ResponseEntity
          .status(HttpStatus.FORBIDDEN)
          .body("Tài khoản chưa được xác thực. Vui lòng xác thực email của bạn.");
    }

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getId(), loginRequest.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    String jwt = jwtUtils.generateJwtToken(authentication);

    List<String> roles = userDetails.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponseDTO(
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

  @PostMapping("/verify-account")
  public ResponseEntity<?> verifyOtp(@RequestBody LoginRequest loginRequest) {
    SecurityAccount securityAccount = accountRepository.findById(loginRequest.getId())
        .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với id này: " + loginRequest.getId()));

    List<Verification> verifications = verificationDAO.findByAccountId(securityAccount.getId());

    boolean isOtpValid = false;
    for (Verification verification : verifications) {
      if (verification.getCode().equals(loginRequest.getOtp()) &&
          Duration.between(verification.getCreatedAt(),
              LocalDateTime.now()).getSeconds() < 60) {
        verification.setActive(true);
        verification.setExpiresAt(LocalDateTime.now());
        verificationDAO.save(verification);
        securityAccount.setVerified(true);
        accountRepository.save(securityAccount);
        isOtpValid = true;
        break;
      }
    }
    if (isOtpValid) {
      return ResponseEntity.ok().body("Tài khoản đã được xác thực thành công.");
    } else {
      return ResponseEntity.badRequest().body("Đăng nhập thất bại: OTP không chính xác hoặc đã hết hạn");
    }
  }

  @PutMapping("/regenerate-otp")
  public ResponseEntity<String> regenerateOtp(@RequestParam String email) {
    Optional<SecurityAccount> securityAccountOpt = accountRepository.findByEmail(email);

    if (!securityAccountOpt.isPresent()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy người dùng với email này: " + email);
    }
    SecurityAccount securityAccount = securityAccountOpt.get();

    String otp = otpUtil.generateOtp();

    try {
      emailUtil.sendOtpEmail(email, otp);
    } catch (MessagingException e) {
      return ResponseEntity.badRequest().body("Không thể gửi OTP qua email, vui lòng thử lại sau.");
    }
    List<Verification> verifications = verificationDAO.findByAccountId(securityAccount.getId());
    if (!verifications.isEmpty()) {
      for (Verification verification : verifications) {
        verification.setCode(otp);
        verification.setCreatedAt(LocalDateTime.now());
        verificationDAO.save(verification);
      }
    } else {

    }
    return ResponseEntity.ok("Mã OTP đã được cập nhật. Vui lòng xác minh tài khoản trong vòng 1 phút.");
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (accountRepository.existsById(signUpRequest.getId())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Tên người dùng đã tồn tại!"));
    }

    if (accountRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Email đã được sử dụng!"));
    }
    if (accountRepository.existsByFullname(signUpRequest.getFullname())) {
    }
    if (accountRepository.existsByPhone(signUpRequest.getPhone())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Số điện thoai đã được sử dụng!"));

    }
    SecurityAccount account = new SecurityAccount(
        signUpRequest.getId(),
        signUpRequest.getPhone(),
        signUpRequest.getFullname(),
        signUpRequest.getEmail(),

        encoder.encode(signUpRequest.getPassword()));

    Boolean gender = signUpRequest.getGender();
    if (gender != null) {
      account.setGender(gender);
    } else {

    }

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
    account.setStatus(1);
    account.setCreatedDate(new Date());

    account.setRoles(roles);

    String otp = otpUtil.generateOtp();
    try {
      emailUtil.sendOtpEmail(signUpRequest.getEmail(), otp);
    } catch (MessagingException e) {
      throw new RuntimeException("Không thể gửi OTP, vui lòng thử lại");
    }

    // Thiết lập thông tin OTP trong tài khoản
    Verification verification = new Verification();
    verification.setAccountId(signUpRequest.getId());
    verification.setActive(false);
    verification.setCode(otp);
    verification.setCreatedAt(LocalDateTime.now());
    verification.setSecurityAccount(account);
    account.setVerification(verification);

    accountRepository.save(account);

    return ResponseEntity.ok(new MessageResponse("Người dùng đã đăng ký thành công!"));
  }

  @PutMapping("/change-password")
  public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
    SecurityAccount securityAccount = accountRepository.findById(changePasswordRequest.getId())
        .orElseThrow(
            () -> new UsernameNotFoundException("Không tìm thấy người dùng " + changePasswordRequest.getId()));

    if (!encoder.matches(changePasswordRequest.getOldPassword(), securityAccount.getPassword())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Mật khẩu cũ không đúng!"));
    }

    if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmNewPassword())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Mật khẩu mới và mật khẩu xác nhận không khớp"));
    }
    securityAccount.setPassword(encoder.encode(changePasswordRequest.getNewPassword()));
    accountRepository.save(securityAccount);

    return ResponseEntity.ok().body("Đổi mật khẩu thành công");

  }


@PutMapping("/{id}")
public ResponseEntity<?> updateAccount(@PathVariable String id, @Valid @RequestBody UserDto userDto) {
    Optional<SecurityAccount> existingAccountOpt = accountRepository.findById(id);
    
    if (!existingAccountOpt.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
    }
    
    SecurityAccount existingAccount = existingAccountOpt.get();
  
    existingAccount.setPhone(userDto.getPhone());
    existingAccount.setFullname(userDto.getFullname());
    existingAccount.setEmail(userDto.getEmail());
    existingAccount.setAddress(userDto.getAddress());
    existingAccount.setBirthday(userDto.getBirthday());
    existingAccount.setGender(userDto.getGender());
    existingAccount.setImage(userDto.getImage());
    
    SecurityAccount updatedAccount = accountRepository.save(existingAccount);
    
    UserDto responseDto = new UserDto(
        updatedAccount.getId(),
        updatedAccount.getPhone(),
        updatedAccount.getFullname(),
        updatedAccount.getEmail(),
        updatedAccount.getAddress(),
        updatedAccount.getBirthday(),
        updatedAccount.getGender(),
        updatedAccount.getImage()
    );
    

    return ResponseEntity.ok(responseDto);
}




  @GetMapping("/logout")
  public ResponseEntity<?> logoutUser(HttpServletRequest request) {
    SecurityContextHolder.getContext().setAuthentication(null);
    return ResponseEntity.ok(new MessageResponse("Đăng xuất thành công!"));
  }

}