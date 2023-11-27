package com.ticketez_backend_springboot.modules.seatChoose;

import java.time.LocalDateTime;
import java.util.List;
import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@Configuration
@EnableScheduling
@RequestMapping("/api/seat-choose")
public class SeatChooseAPI {
    @Autowired
    SeatChooseDao dao;

    @GetMapping
    public ResponseEntity<List<SeatChoose>> findAll() {
        return ResponseEntity.ok(dao.findAll());
    }

    @GetMapping("find-seat-choose-by-seat-char-id-and-showtime-id/{seatChartID}/{showTimeID}")
    public ResponseEntity<List<String>> findByStatus(
            @PathVariable("seatChartID") Long seatChartId,
            @PathVariable("showTimeID") Long showTimeId) {
        return ResponseEntity.ok(dao.findSeatNamesBySeatChartIdAndShowTimeId(seatChartId, showTimeId));
    }

    @PostMapping
    public ResponseEntity<List<SeatChoose>> post(@RequestBody List<SeatChoose> seats) {
        dao.saveAll(seats);
        return ResponseEntity.ok(seats);
    }

    @PostMapping("/deleteMultiple")
    public ResponseEntity<Void> deleteMultiple(@RequestBody List<SeatChoose> seatChooseList) {
        // for (SeatChoose seatChoose : seatChooseList) {
        // if (!dao.existsById(seatChoose.getId())) {
        // return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        // }
        // }
        dao.deleteAllByIdIn(seatChooseList);

        return ResponseEntity.noContent().build();
    }

    @Scheduled(fixedDelay = 60000)
    public void checkAndDeleteBookedSeats() {
        LocalDateTime currentTime = LocalDateTime.now();
        List<SeatChoose> seatChooses = dao.findAll();
        for (SeatChoose seat : seatChooses) {
            if (seat.getLastSelectedTime() != null) {
                Duration duration = Duration.between(seat.getLastSelectedTime(), currentTime);
                if (duration.toMinutes() >= 5) {
                    dao.deleteById(seat.getId());
                }
            }
        }
    }
}
