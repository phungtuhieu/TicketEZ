package com.ticketez_backend_springboot.modules.account;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
// 
import com.ticketez_backend_springboot.dto.AccountDTO;

public interface AccountDAO extends JpaRepository<Account, String> {

   
    @Query("SELECT new com.ticketez_backend_springboot.dto.AccountDTO( a.id, a.phone, a.fullname, a.email, a.birthday, a.gender, a.image, a.status, a.address, a.verified) "
            + "FROM Account a JOIN a.accountRoles ar "
            + "WHERE ar.role.id = 2 AND a.fullname like CONCAT('%', :search, '%') AND a.status = :status  ORDER BY a.createdDate DESC")
    Page<AccountDTO> getAllRoleUserAndActive(Pageable pageable, @Param("status") Integer status,
            @Param("search") String search);

    List<Account> findAllByOrderByCreatedDateDesc();

}
