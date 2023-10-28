package com.ticketez_backend_springboot.modules.province;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProvinceDao extends JpaRepository<Province, Long> {


    @Query("SELECT p FROM Province p WHERE p.name like CONCAT('%', :name, '%')")
    List<Province> findAllByNameLike(@Param("name") String name);

}
