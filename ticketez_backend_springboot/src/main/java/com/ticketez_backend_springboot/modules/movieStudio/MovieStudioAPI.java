package com.ticketez_backend_springboot.modules.movieStudio;

import java.util.Map;
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

@RestController
@RequestMapping("/api/movie-studio")
public class MovieStudioAPI {
    @Autowired
    MovieStudioDAO dao;

    @GetMapping
    public ResponseEntity<?> findAll(
            @RequestParam("page") Optional<Integer> pageNo,
            @RequestParam("limit") Optional<Integer> limit,
            @RequestParam("search") Optional<String> search) {
        try {
            if (pageNo.isPresent() && pageNo.get() == 0) {
                return new ResponseEntity<>("Tài nguyên không tồn tại", HttpStatus.BAD_REQUEST);
            }
            Sort sort = Sort.by(Sort.Order.desc("id"));
            Pageable pageable = PageRequest.of(pageNo.orElse(1) - 1, limit.orElse(10), sort);
            Page<MovieStudio> page = dao.findAll(pageable);
            ResponseDTO<MovieStudio> responeDTO = new ResponseDTO<>();
            responeDTO.setData(page.getContent());
            responeDTO.setTotalItems(page.getTotalElements());
            responeDTO.setTotalPages(page.getTotalPages());
            return ResponseEntity.ok(responeDTO);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        try {
             if (!dao.existsById(id)) {
           return new ResponseEntity<>("Dữ liệu không tồn tại", HttpStatus.NOT_FOUND);
        }
            return ResponseEntity.ok(dao.findById(id).get());
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi khi tìm kiếm dữ liệu", HttpStatus.CONFLICT);
        }
       
    }

    @PostMapping
    public ResponseEntity<?> post(@RequestBody MovieStudio movieStudio) {
        try {
            dao.save(movieStudio);
             return ResponseEntity.ok(movieStudio);
        } catch (Exception e) {
            return new ResponseEntity<>("Không thể thêm dữ liệu mới", HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable("id") Long id, @RequestBody MovieStudio movieStudio) {
        try {
             if (!dao.existsById(id)) {
                return new ResponseEntity<>("Không tìm thấy dữ liệu", HttpStatus.NOT_FOUND);
            }
            dao.save(movieStudio);
            return ResponseEntity.ok(movieStudio);
        } catch (Exception e) {
           return new ResponseEntity<>("Lỗi khi cập nhật dữ liệu",HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {
            if (!dao.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            dao.deleteById(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return new ResponseEntity<>("Không thể xoá, dữ liệu đã được sử dụng ở nơi khác", HttpStatus.CONFLICT);
        }

    }

}
