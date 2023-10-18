package com.ticketez_backend_springboot.modules.accountRole;


import java.io.Serializable;

import com.ticketez_backend_springboot.modules.account.Account;
import com.ticketez_backend_springboot.modules.role.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Setter
@Getter
@Data

public class AccountRolePK implements Serializable  {

    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private Long accountID;


    @JoinColumn(name = "role_id", insertable = false, updatable = false)
    private Long roleID ;

    public AccountRolePK(Long accountID, Long roleID) {
		this.accountID = accountID;
		this.roleID = roleID;
	}
}
