package com.ticketez_backend_springboot.auth.OTP.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Component
public class EmailUtil {
  @Autowired
  private SpringTemplateEngine thymeleafTemplateEngine;
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

  public void sendEmailWithInlineImage(String to, String subject, String htmlContent, String imageName,
      byte[] imageBytes) throws MessagingException {
    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
    helper.setTo(to);
    helper.setSubject(subject);

    // Thêm hình ảnh vào email với Content-ID
    helper.setText(htmlContent, true);
    helper.addInline(imageName, new ByteArrayResource(imageBytes), "image/png");

    javaMailSender.send(mimeMessage);
  }

  public void sendMessageUsingThymeleafTemplate(
      String to, String subject, Map<String, Object> templateModel, String nameTemplateHtml)
      throws MessagingException {

    Context thymeleafContext = new Context();
    thymeleafContext.setVariables(templateModel);

    String htmlBody = thymeleafTemplateEngine.process(nameTemplateHtml + ".html", thymeleafContext);

    sendEmail(to, subject, htmlBody);
  }

  public void sendMessageUsingThymeleafTemplateWithInlineImage(
      String to, String subject, Map<String, Object> templateModel, String nameTemplateHtml,
      String imageName,
      byte[] imageBytes)
      throws MessagingException {

    Context thymeleafContext = new Context();
    thymeleafContext.setVariables(templateModel);

    String htmlBody = thymeleafTemplateEngine.process(nameTemplateHtml + ".html", thymeleafContext);

    // Gửi email với hình ảnh nhúng
    sendEmailWithInlineImage(to, subject, htmlBody, imageName, imageBytes);
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

}
