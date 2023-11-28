package com.ticketez_backend_springboot.modules.article;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import com.ticketez_backend_springboot.dto.ArticleDTO;
import com.ticketez_backend_springboot.dto.MovieDTO;
import com.ticketez_backend_springboot.dto.ResponseDTO;
import com.ticketez_backend_springboot.modules.actorMovie.ActorMovie;
import com.ticketez_backend_springboot.modules.actorMovie.ActorMoviePK;
import com.ticketez_backend_springboot.modules.articleMovie.ArticleMovie;
import com.ticketez_backend_springboot.modules.articleMovie.ArticleMovieDAO;
import com.ticketez_backend_springboot.modules.articleMovie.ArticleMoviePK;
import com.ticketez_backend_springboot.modules.directorMovie.DirectorMovie;
import com.ticketez_backend_springboot.modules.directorMovie.DirectorMoviePK;
import com.ticketez_backend_springboot.modules.formatMovie.FormatMovie;
import com.ticketez_backend_springboot.modules.genreMovie.GenreMovie;
import com.ticketez_backend_springboot.modules.genreMovie.GenreMoviePK;
import com.ticketez_backend_springboot.modules.movie.Movie;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/article")
public class ArticleAPI {
    @Autowired
    private ArticleDAO dao;
    @Autowired
    private ArticleMovieDAO articleMovieDAO;

    @GetMapping
    public ResponseEntity<ResponseDTO<Article>> findAll(@RequestParam("page") Optional<Integer> pageNo,
            @RequestParam("limit") Optional<Integer> limit) {
        try {

            if (pageNo.isPresent() && pageNo.get() == 0) {
                return ResponseEntity.notFound().build();
            }
            Sort sort = Sort.by(Sort.Order.desc("id"));
            Pageable pageable = PageRequest.of(pageNo.orElse(1) - 1, limit.orElse(10), sort);
            Page<Article> page = dao.findAll(pageable);
            ResponseDTO<Article> responseDTO = new ResponseDTO<>();
            responseDTO.setData(page.getContent());
            responseDTO.setTotalItems(page.getTotalElements());
            responseDTO.setTotalPages(page.getTotalPages());
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> findById(@PathVariable("id") Long id) {

        try {
            if (!dao.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(dao.findById(id).get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // @PostMapping
    // public ResponseEntity<Article> post(@RequestBody ArticleDTO articleDTO) {
    //     List<ArticleMovie> aherticleMovies = new ArrayList<>();
    //     try {
    //         Article articleSaved = dao.save(articleDTO.getArticle());
            
    //         for (int i = 0; i < articleDTO.getMovies().size(); i++) {
    //             ArticleMoviePK articleMoviePK = new ArticleMoviePK(articleDTO.getMovies().get(i).getId(), articleSaved.getId());
    //             ArticleMovie articleMovie = new ArticleMovie(articleMoviePK, articleDTO.getMovies().get(i),
    //                     articleSaved);
    //             aherticleMovies.add(articleMovie);
    //         }


    //         // System.out.println("---- formarMovie "+ formatMovies);
    //         articleMovieDAO.saveAll(aherticleMovies);
    //         return ResponseEntity.ok(articleSaved);
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         // return new ResponseEntity<>("Không thể thêm, có lỗi trong việc lưu dữ liệu vui lòng liên hệ quản trị viên",
    //         //         HttpStatus.CONFLICT);

    //     }
    //    }

    

    @PutMapping("/{id}")
    public ResponseEntity<Article> put(@PathVariable("id") Long id, @RequestBody Article article) {
        try {
            if (!dao.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            dao.save(article);
            return ResponseEntity.ok(article);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        try {
            dao.deleteById(id);
            return ResponseEntity.ok().body("Xoá sự kiện thành công");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Không thể xóa sự kiện do tài liệu tham khảo hiện có");
        }
    }
}
