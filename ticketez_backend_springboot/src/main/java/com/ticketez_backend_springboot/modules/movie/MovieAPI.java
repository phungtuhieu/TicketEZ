package com.ticketez_backend_springboot.modules.movie;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

import com.ticketez_backend_springboot.dto.ActorAndDirectorDTO;
import com.ticketez_backend_springboot.dto.MovieByShowtimeShowingDTO;
import com.ticketez_backend_springboot.dto.MovieDTO;
import com.ticketez_backend_springboot.dto.MovieShowtimeDTO;
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
import com.ticketez_backend_springboot.modules.formatMovie.FormatMovie;
import com.ticketez_backend_springboot.modules.formatMovie.FormatMovieDAO;
import com.ticketez_backend_springboot.modules.genre.Genre;
import com.ticketez_backend_springboot.modules.genreMovie.GenreMovie;
import com.ticketez_backend_springboot.modules.genreMovie.GenreMovieDAO;
import com.ticketez_backend_springboot.modules.genreMovie.GenreMoviePK;
import com.ticketez_backend_springboot.service.UploadImageService;
import com.ticketez_backend_springboot.modules.format.Format;
import com.ticketez_backend_springboot.modules.showtime.Showtime;
import com.ticketez_backend_springboot.modules.showtime.ShowtimeDAO;

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

    @Autowired
    ShowtimeDAO showtimeDao;

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

        MovieDTO resp = new MovieDTO();
        resp.setActors(actors);
        resp.setDirectors(directors);
        resp.setFormats(formats);
        resp.setGenres(genres);
        resp.setMovie(movie);
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
    public ResponseEntity<?> put(@PathVariable("id") Long id, @RequestBody MovieDTO movieDTO) {

        Movie movieDb = dao.findById(movieDTO.getMovie().getId()).orElse(null);
        if (movieDb == null) {
            return new ResponseEntity<>("Có lỗi, Không tìm thấy phim trong cơ sở dữ liệu",
                    HttpStatus.NOT_FOUND);
        }
        Movie movieForm = movieDTO.getMovie();

        if (!movieDTO.getFormats().isEmpty()) {
            List<Format> listFormatInMovie = movieDb.getFormatsMovies().stream()
                    .map(FormatMovie::getFormat)
                    .collect(Collectors.toList());

            // List<FormatMovie> listFormatMovieDel = movieDb.getFormatsMovies().stream()
            // .filter(f -> movieDTO.getFormats().stream()
            // .noneMatch(form -> form.getId() == f.getId()))
            // .collect(Collectors.toList());
            List<FormatMovie> listFormatMovieDel = movieDb.getFormatsMovies().stream()
                    .filter(f -> movieDTO.getFormats().stream()
                            .noneMatch(form -> {
                                return form.getId() == f.getFormat().getId();
                            }))
                    .collect(Collectors.toList());
            List<FormatMovie> listFormatMovieCreate = movieDTO.getFormats().stream()
                    .filter(f -> listFormatInMovie.stream().noneMatch(fInM -> {
                        return fInM.getId() == f.getId();
                    }))
                    .map(formatForm -> {
                        FormatMovie formatMovie = new FormatMovie();
                        formatMovie.setFormat(formatForm);
                        formatMovie.setMovie(movieForm);
                        return formatMovie;
                    }).collect(Collectors.toList());

            if (listFormatMovieDel.size() > 0) {
                formatMovieDAO.deleteAll(listFormatMovieDel);
            }
            if (listFormatMovieCreate.size() > 0) {
                formatMovieDAO.saveAll(listFormatMovieCreate);
            }
        }
        if (!movieDTO.getGenres().isEmpty()) {
            List<Genre> listGenreInMovie = movieDb.getGenresMovies().stream()
                    .map(GenreMovie::getGenre)
                    .collect(Collectors.toList());

            List<GenreMovie> listGenreMovieDel = movieDb.getGenresMovies().stream()
                    .filter(f -> movieDTO.getGenres().stream()
                            .noneMatch(form -> {
                                return form.getId() == f.getGenre().getId();
                            }))
                    .collect(Collectors.toList());

            List<GenreMovie> listGenreMovieCreate = movieDTO.getGenres().stream()
                    .filter(f -> listGenreInMovie.stream().noneMatch(fInM -> {
                        return fInM.getId() == f.getId();
                    }))
                    .map(genreForm -> {
                        GenreMovie genreMovie = new GenreMovie();
                        GenreMoviePK genreMoviePK = new GenreMoviePK();
                        genreMoviePK.setGenre_id(genreForm.getId());
                        genreMoviePK.setMovieId(movieForm.getId());

                        genreMovie.setGenreMoviePK(genreMoviePK);
                        genreMovie.setGenre(genreForm);
                        genreMovie.setMovie(movieForm);
                        return genreMovie;
                    }).collect(Collectors.toList());

            if (listGenreMovieDel.size() > 0) {
                genreMovieDAO.deleteAll(listGenreMovieDel);
            }
            if (listGenreMovieCreate.size() > 0) {
                genreMovieDAO.saveAll(listGenreMovieCreate);
            }
        }
        if (!movieDTO.getActors().isEmpty()) {
            List<Actor> listActorsInMovie = movieDb.getActorsMovies().stream()
                    .map(ActorMovie::getActor)
                    .collect(Collectors.toList());

            List<ActorMovie> listDirectorMovieDel = movieDb.getActorsMovies().stream()
                    .filter(f -> movieDTO.getActors().stream()
                            .noneMatch(form -> {
                                return form.getId() == f.getActor().getId();
                            }))
                    .collect(Collectors.toList());

            List<ActorMovie> listActorMovieCreate = movieDTO.getActors().stream()
                    .filter(f -> listActorsInMovie.stream().noneMatch(fInM -> {
                        return fInM.getId() == f.getId();
                    }))
                    .map(actorForm -> {
                        ActorMovie actorMovie = new ActorMovie();
                        ActorMoviePK actorMoviePK = new ActorMoviePK();
                        actorMoviePK.setActorId(actorForm.getId());
                        actorMoviePK.setMovieId(movieForm.getId());

                        actorMovie.setActorMoviePK(actorMoviePK);
                        actorMovie.setActor(actorForm);
                        actorMovie.setMovie(movieForm);
                        return actorMovie;
                    }).collect(Collectors.toList());

            if (listDirectorMovieDel.size() > 0) {
                actorMovieDAO.deleteAll(listDirectorMovieDel);
            }
            if (listActorMovieCreate.size() > 0) {
                actorMovieDAO.saveAll(listActorMovieCreate);
            }
        }
        if (!movieDTO.getDirectors().isEmpty()) {
            List<Director> listDirectorsInMovie = movieDb.getDirectorsMovies().stream()
                    .map(DirectorMovie::getDirector)
                    .collect(Collectors.toList());

            List<DirectorMovie> listDirectorMovieDel = movieDb.getDirectorsMovies().stream()
                    .filter(f -> movieDTO.getDirectors().stream()
                            .noneMatch(form -> {
                                return form.getId() == f.getDirector().getId();
                            }))
                    .collect(Collectors.toList());

            List<DirectorMovie> listDirectorsMovieCreate = movieDTO.getDirectors().stream()
                    .filter(f -> listDirectorsInMovie.stream().noneMatch(fInM -> {
                        return fInM.getId() == f.getId();
                    }))
                    .map(directorForm -> {
                        DirectorMovie directorMovie = new DirectorMovie();
                        DirectorMoviePK directorMoviePK = new DirectorMoviePK();
                        directorMoviePK.setDirectorId(directorForm.getId());
                        directorMoviePK.setMovieId(movieForm.getId());

                        directorMovie.setDirectorMoviePK(directorMoviePK);
                        directorMovie.setDirector(directorForm);
                        directorMovie.setMovie(movieForm);
                        return directorMovie;
                    }).collect(Collectors.toList());

            if (listDirectorMovieDel.size() > 0) {
                directorMovieDAO.deleteAll(listDirectorMovieDel);
            }
            if (listDirectorsMovieCreate.size() > 0) {
                directorMovieDAO.saveAll(listDirectorsMovieCreate);
            }
        }

        dao.save(movieForm);
        return ResponseEntity.ok(movieForm);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {

            if (!dao.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            Movie movie = dao.findById(id).get();
            for (int i = 0; i < movie.getFormatsMovies().size(); i++) {
                if (!movie.getFormatsMovies().get(i).getShowtimes().isEmpty()) {
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
    // @GetMapping("/get/movies-by-cinemaComplex/{cinemaComplexId}/{date}")
    // public ResponseEntity<?> getDuLie(
    // @PathVariable("cinemaComplexId") Long CinemaComplexId,
    // @PathVariable("date") LocalDate date) {
    // try {
    // if (CinemaComplexId.equals("")) {
    // return new ResponseEntity<>("Lỗi", HttpStatus.NOT_FOUND);
    // }
    // if (date == null || date.equals("")) {
    // date = LocalDate.now();
    // }
    // CinemaComplex cinemaComplex =
    //////////////////////////////// cinemaComplexDao.findById(CinemaComplexId).get();
    // if (cinemaComplex != null) {
    // List<Movie> movie = dao.getMoviesByCinemaComplex(cinemaComplex, date);
    // return ResponseEntity.ok(movie);
    // }
    // return new ResponseEntity<>("Lỗi", HttpStatus.NOT_FOUND);
    // } catch (Exception e) {
    // return new ResponseEntity<>("Lỗi kết nối server",
    //////////////////////////////// HttpStatus.INTERNAL_SERVER_ERROR);
    // }

    // }

    @GetMapping("/get/movies-by-cinemaComplexTest")
    public ResponseEntity<?> gettest(
            @RequestParam("cinemaComplexId") Long cinemaComplexId,
            @RequestParam("date") Optional<LocalDate> date) {
        try {
            if (cinemaComplexId.equals("")) {
                return new ResponseEntity<>("Không tìm thấy phim cụm rạp", HttpStatus.NOT_FOUND);
            }

            CinemaComplex cinemaComplex = cinemaComplexDao.findById(cinemaComplexId).get();
            List<Movie> movies = dao.getMoviesByCinemaComplex(cinemaComplex, date.orElse(LocalDate.now()));

            if (movies.isEmpty()) {
                return ResponseEntity.ok(new ArrayList<>());
            }

            MovieShowtimeDTO movieShowtimeDTO = new MovieShowtimeDTO();

            List<MovieShowtimeDTO.MovieObjResp> listMovieObjResp = new ArrayList<>();

            for (Movie movie : movies) {

                MovieShowtimeDTO.MovieObjResp movieObjResp = movieShowtimeDTO.new MovieObjResp();

                List<MovieShowtimeDTO.MovieObjResp.FormatAndShowtimes> listFormatAndShowtimes = new ArrayList<>();

                List<Genre> genres = new ArrayList<>();
                for (GenreMovie genreMovie : movie.getGenresMovies()) {
                    genres.add(genreMovie.getGenre());
                }

                for (FormatMovie formatMovie : movie.getFormatsMovies()) {

                    MovieShowtimeDTO.MovieObjResp.FormatAndShowtimes formatAndShowtimes = movieObjResp.new FormatAndShowtimes();

                    formatAndShowtimes.setFormat(formatMovie.getFormat());

                    List<Showtime> showtime = showtimeDao.getShowtimesByCCXAndMovieAndFormatAndDate(cinemaComplex,
                            movie, formatMovie.getFormat(), date.orElse(LocalDate.now()));
                    formatAndShowtimes.setShowtimes(showtime);
                    listFormatAndShowtimes.add(formatAndShowtimes);

                }

                movieObjResp.setMovie(movie);
                movieObjResp.setGenres(genres);
                movieObjResp.setListFormatAndShowtimes(listFormatAndShowtimes);

                listMovieObjResp.add(movieObjResp);
                movieShowtimeDTO.setListMovieObjResp(listMovieObjResp);
            }

            return ResponseEntity.ok(movieShowtimeDTO);

        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/get/movie-showing")
    public ResponseEntity<?> getMovieShowing() {
        try {
            List<Movie> movie = dao.getMoviesExistsMovieIdShowtimes();
            return ResponseEntity.ok(movie);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // lấy actor và director theo id của movie
    @GetMapping("/get/actor-director-by-movie/{id}")
    public ResponseEntity<?> getActorAndDirector(@PathVariable("id") Long id) {
        try {
            Movie movie = dao.findById(id).get();
            ActorAndDirectorDTO actorAndDirectorDTO = new ActorAndDirectorDTO();
            ActorAndDirectorDTO.ActorAndDirectorsObj actorAndDirectorsObj = actorAndDirectorDTO.new ActorAndDirectorsObj();
            List<Actor> actors = new ArrayList<>();
            List<Director> directors = new ArrayList<>();
            for (ActorMovie actorMovie : movie.getActorsMovies()) {
                actors.add(actorMovie.getActor());

            }
            for (DirectorMovie directorMovie : movie.getDirectorsMovies()) {
                directors.add(directorMovie.getDirector());
            }
            actorAndDirectorsObj.setActors(actors);
            actorAndDirectorsObj.setDirectors(directors);
            actorAndDirectorDTO.setActorAndDirectorsObj(actorAndDirectorsObj);

            return ResponseEntity.ok(actorAndDirectorDTO);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/movie-by-showtime-showing")
    public ResponseEntity<?> getMovieByShowtimeShowing() {
        try {
            List<Movie> movies = dao.getMovieByShowtimeShowing();
            MovieByShowtimeShowingDTO movieShowingDTO = new MovieByShowtimeShowingDTO();
            List<MovieByShowtimeShowingDTO.MovieObjResp> listMovieObjResp = new ArrayList<>();
            for (Movie movie : movies) {
                MovieByShowtimeShowingDTO.MovieObjResp movieObjResp = movieShowingDTO.new MovieObjResp();
                List<Genre> genres = new ArrayList<>();
                for (GenreMovie genrMovie : movie.getGenresMovies()) {
                    genres.add(genrMovie.getGenre());
                }
                movieObjResp.setMovie(movie);
                movieObjResp.setGenres(genres);
                listMovieObjResp.add(movieObjResp);
                movieShowingDTO.setListMovieObjResp(listMovieObjResp);

            }
            return ResponseEntity.ok(movieShowingDTO);

        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/movie-by-showtime-upcoming")
    public ResponseEntity<?> getMovieByShowtimeUpcoming() {
        try {
            List<Movie> movies = dao.getMovieByShowtimeUpcoming();
            MovieByShowtimeShowingDTO movieShowingDTO = new MovieByShowtimeShowingDTO();
            List<MovieByShowtimeShowingDTO.MovieObjResp> listMovieObjResp = new ArrayList<>();
            for (Movie movie : movies) {
                MovieByShowtimeShowingDTO.MovieObjResp movieObjResp = movieShowingDTO.new MovieObjResp();
                List<Genre> genres = new ArrayList<>();
                for (GenreMovie genrMovie : movie.getGenresMovies()) {
                    genres.add(genrMovie.getGenre());
                }
                movieObjResp.setMovie(movie);
                movieObjResp.setGenres(genres);
                listMovieObjResp.add(movieObjResp);
                movieShowingDTO.setListMovieObjResp(listMovieObjResp);

            }
            return ResponseEntity.ok(movieShowingDTO);

        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Lấy ra 5 sản phẩm có booking cao nhất
    @GetMapping("/get/fivemovie")
    public ResponseEntity<List<MovieDTO>> findFiveMovie() {
        List<Movie> movies = dao.findTop5MoviesByBookingCount();
        List<MovieDTO> movieDTOList = new ArrayList<>();

        for (Movie movie : movies) {
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

            MovieDTO movieDTO = new MovieDTO(movie, directors, actors, genres, formats);
            movieDTOList.add(movieDTO);
        }

        return ResponseEntity.ok(movieDTOList);
    }

}
