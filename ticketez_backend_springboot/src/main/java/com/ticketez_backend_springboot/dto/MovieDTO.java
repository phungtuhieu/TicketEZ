package com.ticketez_backend_springboot.dto;
import com.ticketez_backend_springboot.modules.actorMovie.ActorMovie;
import com.ticketez_backend_springboot.modules.directorMovie.DirectorMovie;
import com.ticketez_backend_springboot.modules.formatMovie.FormatMovie;
import com.ticketez_backend_springboot.modules.genreMovie.GenreMovie;
import com.ticketez_backend_springboot.modules.movie.Movie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDTO {
    Movie movie;
    GenreMovie genreMovie;
    DirectorMovie directorMovie;
    ActorMovie actorMovie;
    FormatMovie formatMovie;
}
