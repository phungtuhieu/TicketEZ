package com.ticketez_backend_springboot.modules.account;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/account")
public class AccountAPI {

    @Autowired
    AccountDAO accountDAO;

    @GetMapping
    public ResponseEntity<List<Account>> findAll( ) {
        return ResponseEntity.ok(accountDAO.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> findById(@PathVariable("id") String id) {
        if (!accountDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(accountDAO.findById(id).get());
    }

    @PostMapping
    public ResponseEntity<Account> post(@RequestBody Account account) {
        accountDAO.save(account);
        return ResponseEntity.ok(account);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> put(@PathVariable("id") String id, @RequestBody Account account) {
        if (!accountDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        accountDAO.save(account);
        return ResponseEntity.ok(account);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") String id) {
        accountDAO.deleteById(id);
        return ResponseEntity.ok(true);
    }
    
}
