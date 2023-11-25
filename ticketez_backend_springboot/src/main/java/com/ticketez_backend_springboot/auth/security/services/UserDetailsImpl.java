package com.ticketez_backend_springboot.auth.security.services;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ticketez_backend_springboot.auth.models.SecurityAccount;
import com.ticketez_backend_springboot.modules.role.Role;

import lombok.Data;

@Data
public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private String id;
  private String phone;
  private String fullname;
  private String address;
  private String email;
  @JsonIgnore
  private String password;
  private Date birthday;
  private String gender;
  private String image;
  private Date createdDate;

  private Collection<? extends GrantedAuthority> authorities;

  public UserDetailsImpl(String id, String phone, String fullname, String address, String email, String password,
      Date birthday, String gender, String image, Date createdDate,
      Collection<? extends GrantedAuthority> authorities) {
    this.id = id;
    this.phone = phone;
    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.birthday = birthday;
    this.gender = gender;
    this.image = image;
    this.createdDate = createdDate;
    this.authorities = authorities;
  }

  public static UserDetailsImpl build(SecurityAccount account) {
    List<GrantedAuthority> authorities = account.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .collect(Collectors.toList());


    return new UserDetailsImpl(
        account.getId(),
        account.getPhone(),
        account.getFullname(),
        account.getEmail(),
        account.getAddress(),
        account.getPassword(),
        account.getBirthday(),
        account.getGender(),
        account.getImage(),
        account.getCreatedDate(),
        authorities);
  }

  // @Override
  // public Role seveRole(Role role){
  // return
  // }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public String getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(id, user.id);
  }

  @Override
  public String getUsername() {
    return id;
  }

}
