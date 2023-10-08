package com.ticketez_backend_springboot.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO<T> {
    private Integer totalPage;
    private Long totalItem;
    private List<T> data;
}
