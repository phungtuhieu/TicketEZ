package com.ticketez_backend_springboot.auth.OTP.service;

import jakarta.mail.MessagingException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ticketez_backend_springboot.auth.OTP.util.EmailUtil;
import com.ticketez_backend_springboot.auth.OTP.util.OtpUtil;
import com.ticketez_backend_springboot.auth.models.SecurityAccount;
import com.ticketez_backend_springboot.auth.repository.AccountRepository;
import com.ticketez_backend_springboot.modules.verification.Verification;
import com.ticketez_backend_springboot.modules.verification.VerificationDAO;

@Service
public class UserService {

  @Autowired
  private OtpUtil otpUtil;
  @Autowired
  private EmailUtil emailUtil;
  @Autowired
  private AccountRepository userRepository;
  @Autowired
  private VerificationDAO verificationDAO;


  // public String verifyAccount(String id, String otp) {
  //   SecurityAccount securityAccount = userRepository.findById(id)
  //       .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với email này: " + id));

  //   List<Verification> verifications = verificationDAO.findByAccountId(securityAccount.getId());

  //   // Xử lý danh sách verifications
  //   for (Verification verification : verifications) {
  //     if (verification.getCode().equals(otp) &&
  //         Duration.between(verification.getCreatedAt(), LocalDateTime.now()).getSeconds() < (1 * 60)) {

  //       // Xác nhận OTP và cập nhật cơ sở dữ liệu
  //       verification.setActive(true);
  //       verification.setExpiresAt(LocalDateTime.now());
  //       verificationDAO.save(verification);

  //       // Cập nhật trạng thái xác nhận của tài khoản
  //       securityAccount.setVerified(true);
  //       userRepository.save(securityAccount);

  //       return "Tài khoản đã được xác nhận. Bạn có thể đăng nhập.";
  //     }
  //   }

  //   return "Mã OTP không hợp lệ hoặc đã hết hạn.";
  // }

  public String regenerateOtp(String email) {
    SecurityAccount securityAccount = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với email này: " + email));

    String otp = otpUtil.generateOtp();
    try {
        emailUtil.sendOtpEmail(email, otp);
    } catch (MessagingException e) {
        return "Không thể gửi OTP qua email, vui lòng thử lại sau.";
    }
    List<Verification> verifications = verificationDAO.findByAccountId(securityAccount.getId());
    if (!verifications.isEmpty()) {
        for (Verification verification : verifications) {
            verification.setCode(otp);
            verification.setCreatedAt(LocalDateTime.now());
            verification.setActive(true); // Set lại trạng thái active nếu cần
            verificationDAO.save(verification);
        }
    } else {
    
    }

    return "Mã OTP đã được cập nhật. Vui lòng xác minh tài khoản trong vòng 1 phút.";
}

}
