package com.ticketez_backend_springboot.modules.accountRole;

import com.ticketez_backend_springboot.modules.account.Account;
import com.ticketez_backend_springboot.modules.role.Role;
import com.ticketez_backend_springboot.modules.service.Service;
import com.ticketez_backend_springboot.modules.serviceBooking.ServiceBookingPK;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Accounts_Roles")
@Data
public class AccountRole {
    @EmbeddedId
    AccountRolePK accountRolePK;

    @ManyToOne
    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private Account account ;

    @ManyToOne
    @JoinColumn(name = "role_id", insertable = false, updatable = false)
    private Role role ;
}
