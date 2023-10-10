package com.ticketez_backend_springboot.modules.format;

import java.util.List;
import java.util.Locale.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FormatDAO extends JpaRepository<Format,Long>{
       @Query("SELECT f FROM Format f ORDER BY f.id DESC ")
    List<Format> getAll();
  
}
