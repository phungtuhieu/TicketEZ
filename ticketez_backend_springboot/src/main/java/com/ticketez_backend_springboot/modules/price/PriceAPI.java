package com.ticketez_backend_springboot.modules.price;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ticketez_backend_springboot.dto.NewPriceSeatTypeDTO;
import com.ticketez_backend_springboot.dto.PriceAndPriceSeatTypeDTO;
import com.ticketez_backend_springboot.dto.PriceSeatTypeDTO;
import com.ticketez_backend_springboot.modules.priceSeatType.PriceSeatType;
import com.ticketez_backend_springboot.modules.priceSeatType.PriceSeatTypeDAO;
import com.ticketez_backend_springboot.modules.seatType.SeatType;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/price")
public class PriceAPI {
    @Autowired
    PriceDAO priceDAO;

    @Autowired
    PriceSeatTypeDAO priceSeatTypeDAO;

    @GetMapping
    public ResponseEntity<List<Price>> findAll() {
        return ResponseEntity.ok(priceDAO.findAll());
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<Price>> getAll() {
        return ResponseEntity.ok(priceDAO.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Price> findById(@PathVariable("id") Long id) {
        if (!priceDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(priceDAO.findById(id).get());
    }

    // Tìm kiếm PriceAndPriceSeatTypeDTO theo id cinemacomplex và movie id
    @GetMapping("/findByCinemaComplexIdAndMovieId/{cinemacomplexId}/{movieId}")
    public ResponseEntity<List<PriceAndPriceSeatTypeDTO>> findAllPriceAndPriceSeatTypeDTOByCinemaComplexIdAndMovieId(
            @PathVariable("cinemacomplexId") Long idCinemaComPlex,
            @PathVariable("movieId") Long idMovie) {
        List<Price> prices = priceDAO.findByCinemaComplexIdAndFormatMovie_Movie_Id(idCinemaComPlex, idMovie);

        List<PriceAndPriceSeatTypeDTO> rspList = new ArrayList<>();

        for (Price price : prices) {
            PriceAndPriceSeatTypeDTO dto = new PriceAndPriceSeatTypeDTO();
            dto.setPrice(price);

            List<PriceSeatType> priceSeatTypes = priceSeatTypeDAO.findByPriceId(price.getId());
            List<NewPriceSeatTypeDTO> newSeatTypes = new ArrayList<>();

            for (PriceSeatType priceSeatType : priceSeatTypes) {
                NewPriceSeatTypeDTO newSeatType = new NewPriceSeatTypeDTO();
                newSeatType.setId(priceSeatType.getId());
                newSeatType.setWeekdayPrice(priceSeatType.getWeekdayPrice());
                newSeatType.setWeekendPrice(priceSeatType.getWeekendPrice());
                newSeatType.setSeatType(priceSeatType.getSeatType());
                newSeatTypes.add(newSeatType);
            }

            dto.setNewPriceSeatTypeDTOs(newSeatTypes);
            rspList.add(dto);
        }

        return ResponseEntity.ok(rspList);
    }

    // Tìm price và mảng PriceSeatType
    @GetMapping("/price-price-seat-type-dto")
    public ResponseEntity<List<PriceAndPriceSeatTypeDTO>> findAllPriceAndPriceSeatTypeDTO() {
        List<Price> prices = priceDAO.findAll();

        List<PriceAndPriceSeatTypeDTO> rspList = new ArrayList<>();

        for (Price price : prices) {
            PriceAndPriceSeatTypeDTO dto = new PriceAndPriceSeatTypeDTO();
            dto.setPrice(price);

            List<PriceSeatType> priceSeatTypes = priceSeatTypeDAO.findByPriceId(price.getId());
            List<NewPriceSeatTypeDTO> newSeatTypes = new ArrayList<>();

            for (PriceSeatType priceSeatType : priceSeatTypes) {
                NewPriceSeatTypeDTO newSeatType = new NewPriceSeatTypeDTO();
                newSeatType.setId(priceSeatType.getId());
                newSeatType.setWeekdayPrice(priceSeatType.getWeekdayPrice());
                newSeatType.setWeekendPrice(priceSeatType.getWeekendPrice());
                newSeatType.setSeatType(priceSeatType.getSeatType());
                newSeatTypes.add(newSeatType);
            }

            dto.setNewPriceSeatTypeDTOs(newSeatTypes);
            rspList.add(dto);
        }

        return ResponseEntity.ok(rspList);
    }

    // Tìm price và mảng seatType
    @GetMapping("/price-seat-type-dto")
    public ResponseEntity<List<PriceSeatTypeDTO>> findAllPriceAndSeatTypeDTO() {
        List<Price> prices = priceDAO.findAll();

        List<PriceSeatTypeDTO> rspList = new ArrayList<>();

        for (Price price : prices) {
            PriceSeatTypeDTO dto = new PriceSeatTypeDTO();
            dto.setPrice(price);

            List<SeatType> seatTypes = new ArrayList<>();
            for (PriceSeatType priceSeatType : price.getPriceSeatTypes()) {
                seatTypes.add(priceSeatType.getSeatType());
            }

            dto.setSeatTypes(seatTypes);
            rspList.add(dto);
        }

        return ResponseEntity.ok(rspList);
    }

    // @GetMapping("/find-by-id-cinema-compex-movie/{cinemaComplexId}/{movieId}")
    // public ResponseEntity<List<Price>> findByIdCinemaComplexAndMovie(
    // @PathVariable("cinemaComplexId") Long CinemaComplexId,
    // @PathVariable("movieId") Long movieId) {

    // return
    // ResponseEntity.ok(priceDAO.findPricesByCinemaComplexIdAndMovieId(CinemaComplexId,
    // movieId));
    // }

    // @PostMapping("/get/price-by-seattype")
    // public ResponseEntity<?> getPriceListBySeatTypeIds(@RequestBody PriceFindDTO
    // priceFindDTO) {
    // try {
    // List<Price> listPrice =
    // priceDAO.getPriceListBySeatTypeIds(priceFindDTO.getSeatTypeIds(),
    // priceFindDTO.getCinemaClxId(), priceFindDTO.getMovieId());
    // if (listPrice == null) {
    // return new ResponseEntity<>("Không tìm thấy giá của các này",
    // HttpStatus.CONFLICT);
    // }
    // return ResponseEntity.ok(listPrice);
    // } catch (Exception e) {
    // return new ResponseEntity<>("Không tìm thấy giá của các này",
    // HttpStatus.CONFLICT);
    // }
    // }

    @PostMapping
    public ResponseEntity<Price> post(@RequestBody Price price) {
        priceDAO.save(price);
        return ResponseEntity.ok(price);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Price> put(@PathVariable("id") Long id, @RequestBody Price price) {
        if (!priceDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        priceDAO.save(price);
        return ResponseEntity.ok(price);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id) {
        priceDAO.deleteById(id);
        return ResponseEntity.ok(true);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Price> patchStatus(@PathVariable("id") Long id, @RequestBody Map<String, Boolean> statusUpdates) {
        Optional<Price> optionalPrice = priceDAO.findById(id);
        
        if (optionalPrice.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
    
        Price price = optionalPrice.get();
        
        // Check if the request body contains the 'status' field
        if (statusUpdates.containsKey("status")) {
            price.setStatus(statusUpdates.get("status"));
        }
    
        priceDAO.save(price);
        
        return ResponseEntity.ok(price);
    }
    

}
