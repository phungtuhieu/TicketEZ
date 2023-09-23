package com.ticketez_backend_springboot.modules.account;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountDAO extends JpaRepository<Account,String> {
    
}
