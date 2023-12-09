package com.ticketez_backend_springboot.modules.review;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

import com.ticketez_backend_springboot.dto.MovieAndReviewDTO;
import com.ticketez_backend_springboot.dto.ResponseDTO;
import com.ticketez_backend_springboot.modules.account.Account;
import com.ticketez_backend_springboot.modules.account.AccountDAO;
import com.ticketez_backend_springboot.modules.booking.Booking;
import com.ticketez_backend_springboot.modules.cinemaComplex.CinemaComplex;
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
            Account optionalAccount = accountDAO.findById(accountId).orElse(null);
            Movie optionalMovie = movieDAO.findById(movieId).orElse(null);

            if (optionalAccount == null || optionalMovie == null) {
                return new ResponseEntity<>("Không tìm thấy tài khoản hoặc phim", HttpStatus.NOT_FOUND);
            }

            List<Review> reviews = reviewDAO.findByCheckAccBooking(optionalMovie, optionalAccount);

            if (!reviews.isEmpty()) {
                return ResponseEntity.ok("Tài khoản đã thanh toán");
            } else {
                return ResponseEntity.ok("Nếu bạn muốn bình luận, vui lòng thanh toán");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @GetMapping("/get/check-account-booking")
    // public ResponseEntity<?> getCheckAccountBooking(@RequestParam("accountId") String accountId,
    //         @RequestParam("movieId") Long movieId,
    //         @RequestParam("bookingStatus") boolean bookingStatus) {
    //     try {
    //         Account optionalAccount = accountDAO.findById(accountId).orElse(null);
    //         Movie optionalMovie = movieDAO.findById(movieId).orElse(null);

    //         if (optionalAccount == null || optionalMovie == null) {
    //             return new ResponseEntity<>("Không tìm thấy tài khoản hoặc phim", HttpStatus.NOT_FOUND);
    //         }

    //         if (bookingStatus) {

    //             return ResponseEntity.ok("Đã đặt vé thành công");
    //         } else {
    //             List<Review> reviews = reviewDAO.findByCheckAccBooking(optionalMovie, optionalAccount);

    //             if (!reviews.isEmpty()) {
    //                 boolean check = true;
    //                 Map<String, Object> response = new HashMap<>();
    //                 response.put("check", check);
    //                 response.put("message", "Tài khoản đã thanh toán");
    //                 return ResponseEntity.ok(response);
    //             } else {
    //                 // Additional information for the response
    //                 boolean check = false;
    //                 Map<String, Object> response = new HashMap<>();
    //                 response.put("check", check);
    //                 response.put("message", "Nếu bạn muốn bình luận, vui lòng thanh toán");
    //                 return ResponseEntity.ok(response);
    //             }
    //         }

    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // gọi movie đề lấy reivew của movie đó

    @GetMapping("/get/by-movie-review")
    public ResponseEntity<?> getMovieOrReview(@RequestParam("page") Optional<Integer> pageNo,
            @RequestParam("limit") Optional<Integer> limit) {
        try {
            if (pageNo.isPresent() && pageNo.get() == 0) {
                return new ResponseEntity<>("Trang không tồn tại", HttpStatus.NOT_FOUND);
            }
            Pageable pageable = PageRequest.of(pageNo.orElse(1) - 1, limit.orElse(10));
            Page<Movie> page = reviewDAO.findByMovieOrReview(pageable);
            MovieAndReviewDTO movieAndReviewDTO = new MovieAndReviewDTO();
            List<MovieAndReviewDTO.MovieAndListReviewObjResp> listMovieAndListReviewObjResps = new ArrayList<>();
            for (Movie movie : page.getContent()) {
                MovieAndReviewDTO.MovieAndListReviewObjResp movieAndListReviewObjResp = movieAndReviewDTO.new MovieAndListReviewObjResp();
                List<Review> reviews = reviewDAO.findByMovieOrderByIdDesc(movie);
                movieAndListReviewObjResp.setReview(reviews);
                movieAndListReviewObjResp.setMovie(movie);
                listMovieAndListReviewObjResps.add(movieAndListReviewObjResp);

            }
            movieAndReviewDTO.setListMovieAndListReviewObjResp(listMovieAndListReviewObjResps);
            movieAndReviewDTO.setTotalItems(page.getTotalElements());
            movieAndReviewDTO.setTotalPages(page.getTotalPages());

            return ResponseEntity.ok(movieAndReviewDTO);
        } catch (Exception e) {
            e.printStackTrace(); // In lỗi để theo dõi tình trạng lỗi
            return new ResponseEntity<>("Server error, vui lòng thử lại sau!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
