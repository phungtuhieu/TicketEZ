package com.ticketez_backend_springboot.modules.account;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.aspectj.internal.lang.annotation.ajcDeclareAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ticketez_backend_springboot.dto.AccountDTO;
import com.ticketez_backend_springboot.dto.ResponseDTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/account")
public class AccountAPI {

    @Autowired
    AccountDAO accountDAO;


    @GetMapping("/getAll")
    public ResponseEntity<List<Account>> findAll() {
        List<Account> accounts = accountDAO.findAllByOrderByPhoneDesc();
        return ResponseEntity.ok(accounts);
    }


    @GetMapping
    public ResponseEntity<?> findAll(@RequestParam("page") Optional<Integer> pageNo,
            @RequestParam("limit") Optional<Integer> limit,
            @RequestParam("search") Optional<String> search,
            @RequestParam("active") Optional<Boolean> active) {
        try {

            if (pageNo.isPresent() && pageNo.get() == 0) {
                return new ResponseEntity<>("Trang không tồn tại", HttpStatus.NOT_FOUND);
            }
            Pageable pageable = PageRequest.of(pageNo.orElse(1) - 1, limit.orElse(10));
            Page<AccountDTO> page = accountDAO.getAllRoleUserAndActive(pageable,active.orElse(true),search.orElse(""));

            ResponseDTO<AccountDTO> responseDTO = new ResponseDTO<>();
            responseDTO.setData(page.getContent());
            responseDTO.setTotalItems(page.getTotalElements());
            responseDTO.setTotalPages(page.getTotalPages());
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    

    @GetMapping("/{phone}")
    public ResponseEntity<?> findById(@PathVariable("phone") String phone) {
        try {
            if (!accountDAO.existsById(phone)) {
                return new ResponseEntity<>("Không tìm thấy người dùng", HttpStatus.NOT_FOUND);
            }
            return ResponseEntity.ok(accountDAO.findById(phone).get());
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @PostMapping
    // public ResponseEntity<?> post(@RequestBody Account account) {
    // try {
    // accountDAO.save(account);
    // return ResponseEntity.ok(account);
    // } catch (Exception e) {
    // return new ResponseEntity<>("Server error, vui lòng thử lại sau!",
    // HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    // }

    @PutMapping("/{phone}")
    public ResponseEntity<?> put(@PathVariable("phone") String phone, @RequestBody Account account) {
        try {
            if (!accountDAO.existsById(phone)) {
                return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.NOT_FOUND);
            }
            accountDAO.save(account);
            return ResponseEntity.ok(account);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/active/{phone}")
    public ResponseEntity<?> patch(@PathVariable("phone") String phone,
            @RequestBody Map<String, Boolean> updateAccountActive) {
        try {
            if (!accountDAO.existsById(phone)) {
                return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.NOT_FOUND);
            }
            Account account = accountDAO.findById(phone).orElse(null);
            if (account != null) {
                Boolean active = updateAccountActive.get("active");
                if (active != null) {
                    account.setActive(active);
                    accountDAO.save(account);
                }
                return ResponseEntity.ok("Sửa thành công");
            } else {
                return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PatchMapping("/infoUser/{phone}")
    public ResponseEntity<?> patchInfoUser(@PathVariable("phone") String phone,
            @RequestBody AccountDTO accountDTO) {
        try {
            if (!accountDAO.existsById(phone)) {
                return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.NOT_FOUND);
            }
            Account account = accountDAO.findById(phone).orElse(null);
            if (account != null) {
                account.setFullname(accountDTO.getFullname());
                account.setBirthday(accountDTO.getBirthday());
                account.setGender(accountDTO.isGender());
                account.setEmail(accountDTO.getEmail());
                account.setImage(accountDTO.getImage());
               accountDAO.save(account);
                return ResponseEntity.ok("Sửa thành công");
            } else {
                return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @DeleteMapping("/{phone}")
    // public ResponseEntity<?> delete(@PathVariable("phone") String phone) {
    // try {
    // accountDAO.deleteById(phone);
    // return ResponseEntity.ok().build();
    // } catch (DataIntegrityViolationException e) {
    // return new ResponseEntity<>("Không thể xóa diễn viên do tài liệu tham khảo
    // hiện có", HttpStatus.CONFLICT);
    // }
    // }

}
