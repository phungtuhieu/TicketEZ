package com.ticketez_backend_springboot.modules.movieStudio;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
@RequestMapping("/api/movie-studio")
public class MovieStudioAPI{
    @Autowired
    MovieStudioDAO dao;

    @GetMapping
    public ResponseEntity<ResponseDTO<MovieStudio>> findAll(
    @RequestParam("page") Optional<Integer> pageNo,
    @RequestParam("limit") Optional<Integer> limit) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0), limit.orElse(5));
        Page<MovieStudio> page = dao.findAll(pageable);
        ResponseDTO<MovieStudio> responeDTO = new ResponseDTO<>();
        responeDTO.setData(page.getContent());
        responeDTO.setTotalItem(page.getTotalElements());
        responeDTO.setTotalPage(page.getTotalPages());
        return ResponseEntity.ok(responeDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieStudio> findById(@PathVariable("id") Long id) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping
    public ResponseEntity<MovieStudio> post(@RequestBody MovieStudio movieStudio) {
        dao.save(movieStudio);
        return ResponseEntity.ok(movieStudio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovieStudio> put(@PathVariable("id") Long id, @RequestBody MovieStudio movieStudio) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        dao.save(movieStudio);
        return ResponseEntity.ok(movieStudio);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        dao.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
