package com.ticketez_backend_springboot.auth.security.jwt;

import java.security.Key;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.ticketez_backend_springboot.auth.security.services.UserDetailsImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;



@Component
public class JwtUtils {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  @Value("${bezkoder.app.jwtSecret}")
  private String jwtSecret;

  @Value("${bezkoder.app.jwtExpirationMs}")
  private int jwtExpirationMs;


  public String generateJwtToken(Authentication authentication) {

    UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

    return Jwts.builder()
        .setSubject((userPrincipal.getUsername()))
        .setIssuedAt(new Date())
        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
        .signWith(key(), SignatureAlgorithm.HS256)
        .compact();
  }

// mã hóa
  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }


// xác định danh tính

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parserBuilder().setSigningKey(key()).build()
        .parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
      return true;
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }

  // private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  // byte[] keyBytes = Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded();
  // @Value("${bezkoder.app.jwtSecret}")
  // private String jwtSecret;

  // @Value("${bezkoder.app.jwtExpirationMs}")
  // private int jwtExpirationMs;

  // public String generateJwtToken(UserDetailsImpl userPrincipal) {
  // return generateTokenFromUsername(userPrincipal.getUsername());
  // }

  // public String generateTokenFromUsername(String username) {
  // return Jwts.builder()
  // .setSubject("example")
  // .signWith(SignatureAlgorithm.HS512, keyBytes)
  // .compact();
  // }

  // public String getUserNameFromJwtToken(String token) {
  // return
  // Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
  // }

  // public boolean validateJwtToken(String authToken) {
  // try {
  // // String jwtSecret = "yourJwtSecret";
  // // String authToken = "yourAuthToken";

  // Jws<Claims> claimsJws = Jwts.parserBuilder()
  // .setSigningKey(jwtSecret)
  // .build()
  // .parseClaimsJws(authToken);

  // Claims claims = claimsJws.getBody();
  // return true;
  // } catch (SignatureException e) {
  // logger.error("Invalid JWT signature: {}", e.getMessage());
  // } catch (MalformedJwtException e) {
  // logger.error("Invalid JWT token: {}", e.getMessage());
  // } catch (ExpiredJwtException e) {
  // logger.error("JWT token is expired: {}", e.getMessage());
  // } catch (UnsupportedJwtException e) {
  // logger.error("JWT token is unsupported: {}", e.getMessage());
  // } catch (IllegalArgumentException e) {
  // logger.error("JWT claims string is empty: {}", e.getMessage());
  // }

  // return false;
  // }
}
