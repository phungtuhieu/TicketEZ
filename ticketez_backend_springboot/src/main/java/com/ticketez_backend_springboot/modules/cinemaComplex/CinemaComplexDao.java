package com.ticketez_backend_springboot.modules.cinemaComplex;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CinemaComplexDao extends JpaRepository<CinemaComplex, Long> {
    List<CinemaComplex> findAllByOrderByIdDesc();

    @Query("SELECT ccx FROM CinemaComplex ccx "
            + "WHERE ccx.province.id = :provinceId AND"
            +" ccx.cinemaChain.name like CONCAT('%', :cinemaChainName, '%') AND "
            +" ccx.name like CONCAT('%', :searchNameCCX, '%') ")
    Page<CinemaComplex> getCinemaComplexByProvinceIdAndCinemaChainNameAndSearchNameCCX(Pageable pageable, @Param("provinceId") Integer provinceId,
            @Param("cinemaChainName") String cinemaChainName,
            @Param("searchNameCCX") String searchNameCCX);


}
