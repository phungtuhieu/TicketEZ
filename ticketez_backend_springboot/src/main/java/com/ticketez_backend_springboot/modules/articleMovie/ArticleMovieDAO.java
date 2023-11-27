package com.ticketez_backend_springboot.modules.articleMovie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleMovieDAO extends JpaRepository<ArticleMovie, ArticleMoviePK> {

}
