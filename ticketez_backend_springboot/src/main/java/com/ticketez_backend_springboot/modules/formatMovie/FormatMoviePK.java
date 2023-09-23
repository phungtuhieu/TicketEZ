package com.ticketez_backend_springboot.modules.formatMovie;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Setter
@Getter
public class FormatMoviePK implements Serializable {
	@Column(name = "format_id", insertable = false, updatable = false)
	private Long formatId;

	@Column(name = "movie_id", insertable = false, updatable = false)
	private Long movieId;

}