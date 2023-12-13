package com.ticketez_backend_springboot.auth.OTP.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import org.springframework.core.io.Resource;
import org.springframework.util.StreamUtils;

import com.ticketez_backend_springboot.modules.account.Account;
import com.ticketez_backend_springboot.modules.movie.Movie;



@Component
public class EmailUtil {

  private final JavaMailSender javaMailSender;

  @Autowired
  public EmailUtil(JavaMailSender javaMailSender) {
    this.javaMailSender = javaMailSender;
  }

  // Phương thức chung để gửi email
  public void sendEmail(String to, String subject, String htmlContent) throws MessagingException {
    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
    helper.setTo(to);
    helper.setSubject(subject);
    helper.setText(htmlContent, true);

    javaMailSender.send(mimeMessage);
  }

  // Tạo nội dung email OTP và gửi
  public void sendOtpEmail(String to, String otp) throws MessagingException {
    String subject = "TicketEz OTP";
    String htmlContent = createHtmlContent("Mã OTP của bạn là: ", otp);
    sendEmail(to, subject, htmlContent);
  }

  // Tạo nội Liên hệ

  // Phương thức trợ giúp để tạo nội dung HTML cho email
  private String createHtmlContent(String message, String dynamicPart) {
    return "<!DOCTYPE html>" +
        "<html lang='en'>" +
        "<head>" +
        "<meta charset='UTF-8'>" +
        "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
        "<style>" +
        "body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }"
        +
        ".container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }"
        +
        ".header { text-align: center; background-color: #0056b3; color: #fff; padding: 20px; }" +
        ".header h1 { margin: 0; }" +
        ".content { padding: 20px; text-align: center; }" +
        ".dynamic-part { font-size: 20px; font-weight: bold; color: #0056b3; margin-top: 20px; }" +
        "</style>" +
        "</head>" +
        "<body>" +
        "<div class='container'>" +
        "<div class='header'><h1>TicketEz</h1></div>" +
        "<div class='content'>" +
        "<p>" + message + "<span class='dynamic-part'>" + dynamicPart + "</span></p>" +
        "</div>" +
        "</div>" +
        "</body>" +
        "</html>";
  }


  //

  String htmlcuatao(Movie movie, Account account){
    return "<html><body>"
  + "<div"
  + " style='font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;'>"
  + "<h2 style='margin-top: 0;'>Chia sẻ sản phẩm sách</h2>"
  + " <p>Xin chào,  <strong>" + account.getFullname() + "</strong></p>"
  + "<p>Tôi muốn chia sẻ với bạn một sản phẩm sách thú vị. Dưới đây là thông tin về sách:</p>"
  + "<div style='display: flex; align-items: center; margin-bottom: 20px; '>"
  + "<img style='width: 165px; height: auto; margin-right: 20px;'"
  + "   src='cid:image' alt='Lỗi hình ảnh'>"
  + " <div style=' width: auto;  margin-bottom: 30px;'>"
  + "    <h3 style='font-size: 18px; font-weight: bold; margin: 0; '>" + movie.getTitle() + "</h3>"
  // + "   <p style='font-size: 14px; color: #c71b1b; margin: 0; margin-top: 10px;'>Giá: "
  // + "book.getPrice()" + " VNĐ</p>"
  + "     <div"
  + "          style='margin-top: 30px; min-height: 51.2px;  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;'>"
  + "          " +movie.getDescription() + ""
  + "       </div>"
  + "    </div>"
  + " </div>"
  + " <p>Bạn có thể tìm hiểu thêm về sách này và đặt mua tại <a href='http://localhost:3000/movie-details/"
  + movie.getId() + "'>đường dẫn"
  + "          sách</a>.</p>"
  + " <p>Hy vọng bạn sẽ thích quyển sách này! Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, hãy liên hệ với tôi."
  + " </p>"
  + "<p>Trân trọng,<br><strong>Success 202 - BOOKWORLD</strong> </p>"
  + " <p>&copy; 2023 Tất cả các quyền được bảo lưu.</p>"
  + "</div>"
  + "</body></html>";
  }



  
  public void sendEmailAccount( Movie movie,Account account) throws MessagingException, IOException {
    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
     
    helper.setTo(account.getEmail());
    helper.setSubject("TicketEz");
    helper.setText(htmlcuatao(movie, account), true);

    String imagePath = "static/images/" + movie.getPoster();
    Resource resource = new ClassPathResource(imagePath);
    InputStream inputStream = resource.getInputStream();
    byte[] imageData = StreamUtils.copyToByteArray(inputStream);

    helper.addInline("image", new ByteArrayResource(imageData), "image/jpeg");

    javaMailSender.send(mimeMessage);
  }
}
