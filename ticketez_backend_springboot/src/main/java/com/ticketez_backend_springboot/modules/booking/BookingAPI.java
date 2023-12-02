package com.ticketez_backend_springboot.modules.booking;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.TransientDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ticketez_backend_springboot.dto.ResponseDTO;
import com.ticketez_backend_springboot.dto.RevenueStatisticsDTO;
import com.ticketez_backend_springboot.modules.account.AccountDAO;
import com.ticketez_backend_springboot.modules.movie.Movie;
import com.ticketez_backend_springboot.modules.movie.MovieAPI;
import com.ticketez_backend_springboot.modules.paymentInfo.PaymentInfo;
import com.ticketez_backend_springboot.modules.paymentInfo.PaymentInfoDAO;
import com.ticketez_backend_springboot.modules.seatBooking.SeatBooking;
import com.ticketez_backend_springboot.modules.seatBooking.SeatBookingDao;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/booking")
public class BookingAPI {

	@Autowired
	SeatBookingDao seatBookingDao;
	@Autowired
	VNPayService vnPayService;
	@Autowired
	PaymentInfoDAO pmIDao;
	@Autowired
	AccountDAO accDao;
	@Autowired
	private BookingDAO dao;
	private static final Logger logger = LoggerFactory.getLogger(MovieAPI.class);

	@GetMapping
	public ResponseEntity<?> findByPage(
			@RequestParam("page") Optional<Integer> pageNo,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("search") Optional<String> search) {
		try {

			if (pageNo.isPresent() && pageNo.get() == 0) {
				return new ResponseEntity<>("Số trang không tồn tại!", HttpStatus.BAD_REQUEST);
			}
			Sort sort = Sort.by(Sort.Order.desc("id"));
			Pageable pageable = PageRequest.of(pageNo.orElse(1) - 1, limit.orElse(10), sort);
			Page<Booking> page = dao.findAll(pageable);
			ResponseDTO<Booking> responeDTO = new ResponseDTO<>();
			responeDTO.setData(page.getContent());
			responeDTO.setTotalItems(page.getTotalElements());
			responeDTO.setTotalPages(page.getTotalPages());
			return ResponseEntity.ok(responeDTO);

		} catch (TransientDataAccessException ex) {
			logger.error("==> Loi ket noi voi database: {}", ex.toString());
			return new ResponseEntity<>("Kết nối database bị đóng tạm thời", HttpStatus.BAD_REQUEST);
		} catch (JpaSystemException ex) {
			logger.error("==> Loi JpaSystemException: {}", ex.toString());
			return new ResponseEntity<>("Có lỗi trong Booking API, hãy kiểm tra kiểu dữ liệu!",
					HttpStatus.BAD_REQUEST);
		} catch (EntityNotFoundException ex) {
			logger.error("==> Khong tim thay doi tuong Booking API: {}", ex.toString());
			return new ResponseEntity<>("Không tìm thấy đối tượng Booking API!", HttpStatus.NOT_FOUND);
		} catch (Exception ex) {
			logger.error("==> Xay ra loi trong Booking API  chua xac dinh!: {}", ex.toString());
			return new ResponseEntity<>("Có lỗi trong Booking API  vui lòng liên hệ quản trị viên",
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getOne(@PathVariable("id") String id) {
		Optional<Booking> bookingOptional = dao.findById(id);
		if (bookingOptional.isPresent()) {
			return ResponseEntity.ok(bookingOptional.get());
		} else {
			return new ResponseEntity<>("Có lỗi trong Booking API vui lòng liên hệ quản trị viên",
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/get-by-acc/{accId}")
	public ResponseEntity<?> getBookingByAcc(@PathVariable("accId") String accountId,
			@RequestParam("page") Optional<Integer> pageNo,
			@RequestParam("limit") Optional<Integer> limit,
			@RequestParam("search") Optional<String> search,
			@RequestParam("ticketStatus") Optional<Integer> ticketStatus) {
		if (!accDao.existsById(accountId)) {
			return new ResponseEntity<>("Không tìm thấy thông tin tài khoản", HttpStatus.NOT_FOUND);
		}
		try {

			if (pageNo.isPresent() && pageNo.get() == 0) {
				return new ResponseEntity<>("Số trang không tồn tại!", HttpStatus.BAD_REQUEST);
			}
			Sort sort = Sort.by(Sort.Order.desc("id"));
			Pageable pageable = PageRequest.of(pageNo.orElse(1) - 1, limit.orElse(10), sort);

			Page<Booking> page = dao.findByMovieName(
					search.orElse(""),
					ticketStatus.orElse(1),
					accountId, pageable);
			ResponseDTO<BookingHistoryDTO> responeDTO = new ResponseDTO<>();
			List<BookingHistoryDTO> lHistoryDTOs = new ArrayList<>();
			boolean check = false;
			for (Booking booking : page.getContent()) {
				BookingHistoryDTO bh = new BookingHistoryDTO();
				bh.setBooking(booking);
				PaymentInfo paymentInfo = pmIDao.findByBookingId(booking.getId());
				if (paymentInfo != null) {
					bh.setPaymentId(paymentInfo.getTransactionId());
				} else {
					check = true;
				}
				bh.setPaymentId(booking.getPaymentInfos().get(0).getTransactionId());
				lHistoryDTOs.add(bh);
			}
			if (check) {
				return new ResponseEntity<>("Payment không tồn tại!", HttpStatus.BAD_REQUEST);
			}
			responeDTO.setData(lHistoryDTOs);
			responeDTO.setTotalItems(page.getTotalElements());
			responeDTO.setTotalPages(page.getTotalPages());
			return ResponseEntity.ok(responeDTO);

		} catch (TransientDataAccessException ex) {
			logger.error("==> Loi ket noi voi database: {}", ex.toString());
			return new ResponseEntity<>("Kết nối database bị đóng tạm thời", HttpStatus.BAD_REQUEST);
		} catch (JpaSystemException ex) {
			logger.error("==> Loi JpaSystemException: {}", ex.toString());
			return new ResponseEntity<>("Có lỗi trong Booking API, hãy kiểm tra kiểu dữ liệu!",
					HttpStatus.BAD_REQUEST);
		} catch (EntityNotFoundException ex) {
			logger.error("==> Khong tim thay doi tuong Booking API: {}", ex.toString());
			return new ResponseEntity<>("Không tìm thấy đối tượng Booking API!", HttpStatus.NOT_FOUND);
		} catch (Exception ex) {
			logger.error("==> [getBookingByAcc] error!: {}", ex.toString());
			return new ResponseEntity<>("Có lỗi trong Booking API  vui lòng liên hệ quản trị viên",
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("by-show-time/{id}")
	public ResponseEntity<List<Booking>> getAllByShowTime(@PathVariable("id") Long id) {
		List<Booking> bookingOptional = dao.findByShowtimeId(id);

		return ResponseEntity.ok(bookingOptional);

	}

	@PostMapping
	public ResponseEntity<?> post(@RequestBody BookingDTO bookingDto) {
		if (bookingDto == null) {
			return new ResponseEntity<>("Không có dữ liệu để thêm", HttpStatus.BAD_REQUEST);
		}

		bookingDto.getBooking().setTicketStatus(TicketStatus.UNUSED);
		Booking createdBooking = dao.save(bookingDto.getBooking());

		List<SeatBooking> seatBookings = bookingDto.getSeats().stream().map(seat -> {
			SeatBooking seatBooking = new SeatBooking();
			seatBooking.setBooking(createdBooking);
			seatBooking.setSeat(seat);
			for (SeatTypePriceDTO stDto : bookingDto.getListPrice()) {
				if (stDto.getSeatTypeId() == seat.getSeatType().getId()) {
					seatBooking.setPrice(stDto.getPrice());
					break;
				}
			}
			// seatBooking.setStatus(1);
			return seatBooking;
		}).collect(Collectors.toList());
		int total = 0;
		for (SeatBooking s : seatBookings) {
			total += s.getPrice().intValue();
		}
		System.out.println("-=-------------------toal: " + total);
		seatBookingDao.saveAll(seatBookings);
		String payUrl = vnPayService.createOrder(total, "Thanh toan ve xem phim ", createdBooking.getId());
		// VNPayDTO vnPayDTO = new VNPayDTO();
		// vnPayDTO.setBookingId(createdBooking.getId());
		// vnPayDTO.setPayUrl(payUrl);
		return ResponseEntity.status(HttpStatus.OK).body(payUrl);
	}

	@GetMapping("/vnpay-payment")
	public ResponseEntity<?> payment(HttpServletRequest request) {
		Integer paymentStatus = vnPayService.orderReturn(request);

		String bookingId = request.getParameter("bookingId");
		Booking booking = dao.findById(bookingId).orElse(null);
		if (booking == null) {
			return new ResponseEntity<>("Không thể tìm thấy booking",
					HttpStatus.NOT_FOUND);
		}
		// List<SeatBooking> seatBookings = seatBookingDao.findByBooking(booking);

		String orderInfo = request.getParameter("vnp_OrderInfo");
		String tmnCode = request.getParameter("vnp_TmnCode");
		String paymentTime = request.getParameter("vnp_PayDate");
		String transactionId = request.getParameter("vnp_TransactionNo");
		String totalPrice = request.getParameter("vnp_Amount");
		System.out.println("------------- totalPrice: " + totalPrice);
		System.out.println("-------------Double totalPrice: " + Double.valueOf(totalPrice));
		String bankCode = request.getParameter("vnp_BankCode");
		String transactionStatus = request.getParameter("vnp_TransactionStatus");

		SimpleDateFormat inputFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		PaymentInfo paymentInfo = new PaymentInfo();

		try {
			Date date = inputFormat.parse(paymentTime);
			String outputDateString = dateFormat.format(date);
			Date payDate = dateFormat.parse(outputDateString);

			paymentInfo.setTransactionId(transactionId);
			paymentInfo.setBooking(booking);
			// chia 100 vì vnpay đã mặc định 100
			paymentInfo.setAmount(Double.valueOf(totalPrice) / 100);
			paymentInfo.setBankCode(bankCode);
			paymentInfo.setTmnCode(tmnCode);
			paymentInfo.setOrderInfo(orderInfo);
			paymentInfo.setPayDate(payDate);
			paymentInfo.setTransactionStatus(transactionStatus);
		} catch (ParseException e) {
			e.printStackTrace();
			return new ResponseEntity<>("Có lỗi trong việc định dạng ngày",
					HttpStatus.CONFLICT);
		}
		PaymentInfo pInfo = pmIDao.save(paymentInfo);
		if (paymentStatus >= 0) { // String urlRedirect = "/booking-info";
			return ResponseEntity.status(HttpStatus.OK).body(pInfo.getTransactionId());
		} else if (paymentStatus == 0) {
			return new ResponseEntity<>("Giao dịch thất bại",
					HttpStatus.CONFLICT);
		} else {
			return new ResponseEntity<>("Thông tin giao dịch không chính xác",
					HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/payment-info/{id}")
	public ResponseEntity<?> getPaymentInfoById(@PathVariable("id") String pInfoId) {
		PaymentInfo pInfoDb = pmIDao.findById(pInfoId).orElse(null);
		if (pInfoDb == null) {
			return new ResponseEntity<>("Không tìm thấy thông tin giao dịch", HttpStatus.NOT_FOUND);
		}
		Booking bookingDb = pInfoDb.getBooking();
		PaymentInfoDTO pInfoDTO = new PaymentInfoDTO();
		pInfoDTO.setPaymentInfo(pInfoDb);
		pInfoDTO.setBooking(bookingDb);
		pInfoDTO.setSeatBookings(bookingDb.getSeatsBookings());
		return ResponseEntity.status(HttpStatus.OK).body(pInfoDTO);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Booking> put(@PathVariable("id") String id, @RequestBody Booking booking) {
		if (booking == null) {
			return ResponseEntity.badRequest().body(null);
		}
		if (!dao.existsById(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		dao.save(booking);
		return ResponseEntity.ok(booking);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") String id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		dao.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/get/Revenue-statistics")
	public ResponseEntity<?> getRevenueStatisticsDTO() {
		try {
			List<RevenueStatisticsDTO> booking = dao.getRevenueStatisticsDTO();
			return ResponseEntity.ok(booking);

		} catch (Exception e) {
			return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
