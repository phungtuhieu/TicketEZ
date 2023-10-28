package com.ticketez_backend_springboot.modules.cinemaComplex;

import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ticketez_backend_springboot.dto.ResponseDTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/cinemaComplex")
public class CinemaComplexAPI {
    @Autowired
    CinemaComplexDao cinemaComplexDao;

    @GetMapping
    public ResponseEntity<?> findAll(@RequestParam("page") Optional<Integer> pageNo,
            @RequestParam("limit") Optional<Integer> limit) {
        try {

            if (pageNo.isPresent() && pageNo.get() == 0) {
                return new ResponseEntity<>("Trang không tồn tại", HttpStatus.NOT_FOUND);
            }
            Sort sort = Sort.by(Sort.Order.desc("id"));
            Pageable pageable = PageRequest.of(pageNo.orElse(1) - 1, limit.orElse(10), sort);
            Page<CinemaComplex> page = cinemaComplexDao.findAll(pageable);
            ResponseDTO<CinemaComplex> responseDTO = new ResponseDTO<>();
            responseDTO.setData(page.getContent());
            responseDTO.setTotalItems(page.getTotalElements());
            responseDTO.setTotalPages(page.getTotalPages());
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<CinemaComplex>> findAll() {
        List<CinemaComplex> seats = cinemaComplexDao.findAllByOrderByIdDesc();
        return ResponseEntity.ok(seats);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        try {
            if (!cinemaComplexDao.existsById(id)) {
                return new ResponseEntity<>("Không tìm thấy cụm rạp", HttpStatus.NOT_FOUND);
            }
            return ResponseEntity.ok(cinemaComplexDao.findById(id).get());
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping
    public ResponseEntity<?> post(@RequestBody CinemaComplex cinemaComplex) {
        try {
            cinemaComplexDao.save(cinemaComplex);
            return ResponseEntity.ok(cinemaComplex);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable("id") Long id, @RequestBody CinemaComplex cinemaComplex) {
        try {
            if (!cinemaComplexDao.existsById(id)) {
                return new ResponseEntity<>("Cụm Rạp không tồn tại", HttpStatus.NOT_FOUND);
            }
            cinemaComplexDao.save(cinemaComplex);
            return ResponseEntity.ok(cinemaComplex);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {
            cinemaComplexDao.deleteById(id);
            return ResponseEntity.ok().body("Xoá cụm rạp thành công");
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Không thể xóa", HttpStatus.CONFLICT);
        }

    }

    // ----------------------------------------------------------------

    @GetMapping("/get/get-cinemaComplex-by-provinceId-cinemaChainName-searchNameCCX")
    public ResponseEntity<?> getDuLie(@RequestParam("results") Optional<Integer> results,
            @RequestParam("provinceId") Optional<Integer> provinceId,
            @RequestParam("cinemaChainName") Optional<String> cinemaChainName,
            @RequestParam("searchNameCCX") Optional<String> searchNameCCX) {

        try {
            if (cinemaChainName.isPresent() && cinemaChainName.get() == ""
                    || cinemaChainName.get().equalsIgnoreCase("tất cả")) {
                cinemaChainName = Optional.empty();
            }

            Sort sort = Sort.by(Sort.Order.desc("id"));
            Pageable pageable = PageRequest.of(0, results.orElse(999), sort);
            Page<CinemaComplex> page = cinemaComplexDao.getCinemaComplexByProvinceIdAndCinemaChainNameAndSearchNameCCX(pageable, provinceId.orElse(2),
                    cinemaChainName.orElse(""), searchNameCCX.orElse(""));
            ResponseDTO<CinemaComplex> responseDTO = new ResponseDTO<>();
            responseDTO.setData(page.getContent());
            responseDTO.setTotalItems(page.getTotalElements());
            responseDTO.setTotalPages(page.getTotalPages());
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
