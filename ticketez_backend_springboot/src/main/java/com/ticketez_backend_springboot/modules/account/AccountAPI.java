package com.ticketez_backend_springboot.modules.account;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ticketez_backend_springboot.dto.ResponseDTO;
import com.ticketez_backend_springboot.modules.director.Director;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/account")
public class AccountAPI {

    @Autowired
    AccountDAO accountDAO;


    @GetMapping
    public ResponseEntity<ResponseDTO<Account>> findAll(@RequestParam("page") Optional<Integer> pageNo,
            @RequestParam("limit") Optional<Integer> limit) {
        try {

            if (pageNo.isPresent() && pageNo.get() == 0) {
                return ResponseEntity.notFound().build();
            }
            Sort sort = Sort.by(Sort.Order.desc("phone"));
            Pageable pageable = PageRequest.of(pageNo.orElse(1) - 1, limit.orElse(10), sort);
            Page<Account> page = accountDAO.findAll(pageable);
            ResponseDTO<Account> responseDTO = new ResponseDTO<>();
            responseDTO.setData(page.getContent());
            responseDTO.setTotalItems(page.getTotalElements());
            responseDTO.setTotalPages(page.getTotalPages());
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // @GetMapping
    // public ResponseEntity<List<Account>> findAll( ) {
    //     return ResponseEntity.ok(accountDAO.findAll());
    // }

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
