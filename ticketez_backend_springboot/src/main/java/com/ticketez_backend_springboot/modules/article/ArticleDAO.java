package com.ticketez_backend_springboot.modules.article;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleDAO extends JpaRepository<Article, Long> {

}
