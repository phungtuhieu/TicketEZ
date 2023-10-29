
package com.ticketez_backend_springboot.modules.formatMovie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormatMovieDAO extends JpaRepository<FormatMovie, Long> {

}
