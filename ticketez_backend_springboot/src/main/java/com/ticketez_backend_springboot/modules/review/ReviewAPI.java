package com.ticketez_backend_springboot.modules.review;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

import com.ticketez_backend_springboot.modules.account.Account;
import com.ticketez_backend_springboot.modules.account.AccountDAO;
import com.ticketez_backend_springboot.modules.booking.Booking;
import com.ticketez_backend_springboot.modules.movie.Movie;
import com.ticketez_backend_springboot.modules.movie.MovieDAO;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/review")
public class ReviewAPI {

    @Autowired
    ReviewDAO reviewDAO;

    @Autowired
    MovieDAO movieDAO;
    // @GetMapping
    // public ResponseEntity<List<Review>> findAll() {
    // return ResponseEntity.ok(reviewDAO.findAll());
    // }
    @Autowired
    AccountDAO accountDAO;

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        try {
            if (!reviewDAO.existsById(id)) {
                return new ResponseEntity<>("Không tìm thấy review", HttpStatus.NOT_FOUND);
            }
            return ResponseEntity.ok(reviewDAO.findById(id).get());
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/get/all")
    public ResponseEntity<List<Review>> findAll() {
        List<Review> review = reviewDAO.findAllByOrderByIdDesc();
        return ResponseEntity.ok(review);
    }

    @PostMapping
    public ResponseEntity<?> post(@RequestBody Review review) {
        try {
            reviewDAO.save(review);
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> put(@PathVariable("id") Long id, @RequestBody Review review) {
        try {
            if (!reviewDAO.existsById(id)) {
                return new ResponseEntity<>("không tồn tại", HttpStatus.NOT_FOUND);
            }
            reviewDAO.save(review);
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {
            reviewDAO.deleteById(id);
            return ResponseEntity.ok().body("Xoá bình luận thành công");
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Không thể xóa", HttpStatus.CONFLICT);
        }

    }

    @GetMapping("/get/by-movie/{movieId}")
    public ResponseEntity<?> getReviewsByMovieId(@PathVariable("movieId") Long movieId) {
        try {
            Optional<Movie> optionalMovie = movieDAO.findById(movieId);
            // Account account = accountDAO.findById("user6").get();
            // System.out.println("+++++++++++++" + !account.getBookings().isEmpty());

            if (optionalMovie.isPresent()) {
                List<Review> reviews = reviewDAO.findAllByMovieId(movieId);
                return ResponseEntity.ok(reviews);
            }

            return new ResponseEntity<>("Không tìm thấy phim có id " + movieId, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace(); // In lỗi để theo dõi tình trạng lỗi
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/check-account-booking")
    public ResponseEntity<?> getcheckAccountBooking(@RequestParam("accountId") String accountId,
            @RequestParam("movieId") Long movieId) {
        try {
            Account optionalAccount = accountDAO.findById(accountId).get();
            Movie optionalMovie = movieDAO.findById(movieId).get();

            List<Review> reviews = reviewDAO.findByCheckAccBooking(optionalMovie, optionalAccount);

            Boolean check = false;
            if (!reviews.isEmpty()) {
                check = true;
                return ResponseEntity.ok(check);
            }

            return ResponseEntity.ok(check);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
