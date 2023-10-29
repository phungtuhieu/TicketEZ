package com.ticketez_backend_springboot.modules.movie;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

import com.ticketez_backend_springboot.dto.MovieDTO;
import com.ticketez_backend_springboot.dto.ResponseDTO;
import com.ticketez_backend_springboot.modules.actor.Actor;
import com.ticketez_backend_springboot.modules.actorMovie.ActorMovie;
import com.ticketez_backend_springboot.modules.actorMovie.ActorMovieDAO;
import com.ticketez_backend_springboot.modules.actorMovie.ActorMoviePK;
import com.ticketez_backend_springboot.modules.cinemaComplex.CinemaComplex;
import com.ticketez_backend_springboot.modules.cinemaComplex.CinemaComplexDao;
import com.ticketez_backend_springboot.modules.director.Director;
import com.ticketez_backend_springboot.modules.directorMovie.DirectorMovie;
import com.ticketez_backend_springboot.modules.directorMovie.DirectorMovieDAO;
import com.ticketez_backend_springboot.modules.directorMovie.DirectorMoviePK;
import com.ticketez_backend_springboot.modules.format.Format;
import com.ticketez_backend_springboot.modules.formatMovie.FormatMovie;
import com.ticketez_backend_springboot.modules.formatMovie.FormatMovieDAO;
import com.ticketez_backend_springboot.modules.genre.Genre;
import com.ticketez_backend_springboot.modules.genreMovie.GenreMovie;
import com.ticketez_backend_springboot.modules.genreMovie.GenreMovieDAO;
import com.ticketez_backend_springboot.modules.genreMovie.GenreMoviePK;
import com.ticketez_backend_springboot.service.UploadImageService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/movie")
public class MovieAPI {
    @Autowired
    MovieDAO dao;

    @Autowired
    FormatMovieDAO formatMovieDAO;
    @Autowired
    GenreMovieDAO genreMovieDAO;
    @Autowired
    DirectorMovieDAO directorMovieDAO;
    @Autowired
    ActorMovieDAO actorMovieDAO;

    @Autowired
    CinemaComplexDao cinemaComplexDao;

    @GetMapping
    public ResponseEntity<?> findByPage(
            @RequestParam("page") Optional<Integer> pageNo,
            @RequestParam("limit") Optional<Integer> limit,
            @RequestParam("search") Optional<String> search) {
        try {
            if (pageNo.isPresent() && pageNo.get() == 0) {
                return new ResponseEntity<>("Tài nguyên không tồn tại", HttpStatus.BAD_REQUEST);
            }
            Sort sort = Sort.by(Sort.Order.desc("id"));
            Pageable pageable = PageRequest.of(pageNo.orElse(1) - 1, limit.orElse(10), sort);
            Page<Movie> page = dao.findAll(pageable);
            ResponseDTO<Movie> responeDTO = new ResponseDTO<>();
            responeDTO.setData(page.getContent());
            responeDTO.setTotalItems(page.getTotalElements());
            responeDTO.setTotalPages(page.getTotalPages());
            return ResponseEntity.ok(responeDTO);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<Movie>> findAll() {
        List<Movie> movies = dao.findAllByOrderByIdDesc();
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        
        if (!dao.existsById(id)) {
            
            return new ResponseEntity<>("Không tìm thấy phim", HttpStatus.NOT_FOUND);
        }
        Map<String, Object> resp = new HashMap<String, Object>();

        Movie movie = dao.findById(id).get();

        List<Actor> actors = new ArrayList<>();
        List<Director> directors = new ArrayList<>();
        List<Format> formats = new ArrayList<>();
        List<Genre> genres = new ArrayList<>();
         
        for (ActorMovie actorMovie : movie.getActorsMovies()) {
            actors.add(actorMovie.getActor());
        }
        for (DirectorMovie directorMovie : movie.getDirectorsMovies()) {
            directors.add(directorMovie.getDirector());
        }
        for (FormatMovie formatMovie : movie.getFormatsMovies()) {
            formats.add(formatMovie.getFormat());
        }
        for (GenreMovie genreMovie : movie.getGenresMovies()) {
            genres.add(genreMovie.getGenre());
        }
        resp.put("movie", movie);
        resp.put("actors", actors);
        resp.put("directors", directors);
        resp.put("formats", formats);
        resp.put("genres", genres);
        return ResponseEntity.ok(resp);
    }

    @PostMapping
    public ResponseEntity<?> post(@RequestBody MovieDTO moviedDto) {

        List<ActorMovie> actorMovies = new ArrayList<>();
        List<DirectorMovie> directorMovies = new ArrayList<>();
        List<GenreMovie> genreMovies = new ArrayList<>();
        List<FormatMovie> formatMovies = new ArrayList<>();
        try {
            Movie movieSaved = dao.save(moviedDto.getMovie());
            System.out.println("----Id " + movieSaved.getId());
            // System.out.println("----Movie " +movieSaved);
            for (int i = 0; i < moviedDto.getActors().size(); i++) {
                ActorMoviePK actorMoviePK = new ActorMoviePK(moviedDto.getActors().get(i).getId(), movieSaved.getId());
                System.out.println("----actorMoviePK " + actorMoviePK);
                ActorMovie actorMovie = new ActorMovie(actorMoviePK, moviedDto.getActors().get(i),
                        movieSaved);
                actorMovies.add(actorMovie);
            }

            for (int i = 0; i < moviedDto.getDirectors().size(); i++) {
                DirectorMoviePK directorMoviePK = new DirectorMoviePK(moviedDto.getDirectors().get(i).getId(),
                        movieSaved.getId());
                DirectorMovie directorMovie = new DirectorMovie(directorMoviePK, moviedDto.getDirectors().get(i),
                        movieSaved);
                directorMovies.add(directorMovie);
            }

            for (int i = 0; i < moviedDto.getGenres().size(); i++) {
                GenreMoviePK genreMoviePK = new GenreMoviePK(moviedDto.getGenres().get(i).getId(),
                        movieSaved.getId());
                GenreMovie genreMovie = new GenreMovie(genreMoviePK, moviedDto.getGenres().get(i),
                        movieSaved);
                genreMovies.add(genreMovie);
            }

            for (int i = 0; i < moviedDto.getFormats().size(); i++) {
                FormatMovie formatMovie = new FormatMovie();
                formatMovie.setFormat(moviedDto.getFormats().get(i));
                formatMovie.setMovie(movieSaved);
                formatMovies.add(formatMovie);
            }
            // System.out.println("---- formarMovie "+ formatMovies);
            formatMovieDAO.saveAll(formatMovies);
            directorMovieDAO.saveAll(directorMovies);
            genreMovieDAO.saveAll(genreMovies);
            actorMovieDAO.saveAll(actorMovies);
            return ResponseEntity.ok(movieSaved);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Không thể thêm, có lỗi trong việc lưu dữ liệu vui lòng liên hệ quản trị viên",
                    HttpStatus.CONFLICT);

        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<Movie> put(@PathVariable("id") Long id, @RequestBody Movie movie) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        dao.save(movie);
        return ResponseEntity.ok(movie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {
            
            if (!dao.existsById(id)) {
                return ResponseEntity.notFound().build();
            }           
            Movie movie = dao.findById(id).get();
            for (int i = 0; i < movie.getFormatsMovies().size(); i++) {
                if(!movie.getFormatsMovies().get(i).getShowtimes().isEmpty()) {
                    return new ResponseEntity<>("Không thể Xoá, phim đã được thêm vào lịch chiếu", HttpStatus.CONFLICT);
                }
            }
            for (int i = 0; i < movie.getActorsMovies().size(); i++) {
                actorMovieDAO.delete(movie.getActorsMovies().get(i));
            }
            for (int i = 0; i < movie.getDirectorsMovies().size(); i++) {
                directorMovieDAO.delete(movie.getDirectorsMovies().get(i));
            }
            for (int i = 0; i < movie.getGenresMovies().size(); i++) {
                genreMovieDAO.delete(movie.getGenresMovies().get(i));
            }
            for (int i = 0; i < movie.getFormatsMovies().size(); i++) {
                formatMovieDAO.delete(movie.getFormatsMovies().get(i));
            }
            UploadImageService.deleteImage(movie.getPoster());
            dao.deleteById(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return new ResponseEntity<>("Không thể xoá, dữ liệu đã được sử dụng ở nơi khác", HttpStatus.CONFLICT);
        }
    }

    ////////////////////////////////
    @GetMapping("/get/movies-by-cinemaComplex/{cinemaComplexId}/{date}")
    public ResponseEntity<?> getDuLie(
            @PathVariable("cinemaComplexId") Long CinemaComplexId,
            @PathVariable("date") LocalDate date) {
        try {
            if (CinemaComplexId.equals("")) {
                return new ResponseEntity<>("Lỗi", HttpStatus.NOT_FOUND);
            }
            if (date == null || date.equals("")) {
                date = LocalDate.now();
            }
            CinemaComplex cinemaComplex = cinemaComplexDao.findById(CinemaComplexId).get();
            if (cinemaComplex != null) {
                List<Movie> movie = dao.getMoviesByCinemaComplex(cinemaComplex, date);
                return ResponseEntity.ok(movie);
            }
            return new ResponseEntity<>("Lỗi", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
