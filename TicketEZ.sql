USE [master] 
GO
CREATE DATABASE TicketEZ
GO
    -- DROP DATABASE TicketEZ 
    USE TicketEZ
GO
    CREATE TABLE Accounts (
        phone NVARCHAR(15) NOT NULL,
        fullname NVARCHAR(100) NOT NULL,
        email NVARCHAR(350) NOT NULL,
        [password] NVARCHAR(30) NOT NULL,
        [image] NVARCHAR(MAX) NOT NULL,
        birthday DATE NOT NULL,
        gender BIT NOT NULL,
        [role] BIT NOT NULL,
        active BIT NOT NULL,
        verified BIT NOT NULL,
        points INT NOT NULL
    )
GO
    CREATE TABLE Verification (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        account_id NVARCHAR(15) NOT NULL,
        code NVARCHAR(6) NOT NULL,
        created_at DATETIME NOT NULL,
        expires_at DATETIME NOT NULL,
        active BIT NOT NULL
    )
GO
    CREATE TABLE Reviews (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        comment NVARCHAR(MAX),
        rating FLOAT NOT NULL,
        create_date DATETIME NOT NULL,
        edit_date DATETIME,
        account_id NVARCHAR(15) NOT NULL,
        movie_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Genres (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(255) NOT NULL,
        [description] NVARCHAR(MAX)
    )
GO
    CREATE TABLE Genres_Movies (
        genre_id BIGINT NOT NULL,
        movie_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Movie_Studio (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(250) NOT NULL,
        country NVARCHAR(150) NOT NULL,
        email NVARCHAR(350) NOT NULL,
        [description] NVARCHAR(MAX)
    )
GO
    CREATE TABLE MPAA_Rating (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [rating_code] NVARCHAR(10) NOT NULL,
        icon NVARCHAR(MAX) NOT NULL,
        [description] NVARCHAR(MAX)
    )
GO
    CREATE TABLE Movies (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        title NVARCHAR (500) NOT NULL,
        [description] NVARCHAR(MAX) NOT NULL,
        duration TIME(0) NOT NULL,
        release_date DATE NOT NULL,
        country NVARCHAR(150) NOT NULL,
        rating FLOAT NOT NULL,
        movie_studio_id BIGINT NOT NULL,
        video_trailer NVARCHAR(MAX) NOT NULL,
        MPAA_rating_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Formats (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(20) NOT NULL,
        [description] NVARCHAR(MAX)
    )
GO
    CREATE TABLE Formats_Movies (
        movie_id BIGINT NOT NULL,
        format_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Directors (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        fullname NVARCHAR(100) NOT NULL,
        birthday DATE NOT NULL,
        avatar NVARCHAR(255) NOT NULL
    )
GO
    CREATE TABLE Directors_Movies (
        director_id BIGINT NOT NULL,
        movie_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Actors (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        fullname NVARCHAR(100) NOT NULL,
        birthday DATE NOT NULL,
        avatar NVARCHAR(255) NOT NULL
    )
GO
    CREATE TABLE Actors_Movies (
        actor_id BIGINT NOT NULL,
        movie_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Provinces (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(200) NOT NULL
    )
GO
    CREATE TABLE Cinema_Complex (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(200) NOT NULL,
        [address] NVARCHAR(MAX) NOT NULL,
        phone NVARCHAR(15) NOT NULL,
        opening_time TIME(0) NOT NULL,
        closing_time TIME(0) NOT NULL,
        province_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Seat_Types (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(200) NOT NULL,
        [image] NVARCHAR(MAX) NOT NULL,
        [description] NVARCHAR(MAX)
    )
GO
    CREATE TABLE Seats (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(200) NOT NULL,
        [status] BIT NOT NULL,
        [description] NVARCHAR(MAX),
        seat_type_id BIGINT NOT NULL,
		seat_chart_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Seats_Booking (
        seat_id BIGINT NOT NULL,
        [booking_id] NVARCHAR(30) NOT NULL,
        [status] INT NOT NULL -- ĐÃ ĐẶT, ĐANG CHỌN, ĐÃ CHỌN
    )
GO
    CREATE TABLE Price (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        weekday_price FLOAT NOT NULL,
        weekend_price FLOAT NOT NULL,
        [start_date] DATETIME NOT NULL,
        end_date DATETIME NOT NULL,
        [status] BIT NOT NULL,
        seat_type_id BIGINT NOT NULL,
        movie_id BIGINT NOT NULL,
        cinema_complex_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Events (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(200) NOT NULL,
        [description] NVARCHAR(MAX),
        [start_date] DATETIME NOT NULL,
        end_date DATETIME NOT NULL,
        banner NVARCHAR(MAX) NOT NULL,
        [status] BIT NOT NULL,
        cinema_complex_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Services (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(200) NOT NULL,
        [description] NVARCHAR(MAX),
        [image] NVARCHAR(MAX) NOT NULL,
        cinema_complex_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Price_Services (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        price FLOAT NOT NULL,
        [start_date] DATETIME NOT NULL,
        end_date DATETIME NOT NULL,
        service_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Cinema_Types (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        type_name NVARCHAR(100) NOT NULL,
        [description] NVARCHAR(MAX)
    )
GO
    CREATE TABLE Cinemas (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(255) NOT NULL,
        [status] BIT NOT NULL,
        cinema_type_id BIGINT NOT NULL,
        cinema_complex_id BIGINT NOT NULL
    )
GO
    CREATE TABLE SeatChart (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(255) NOT NULL,
		[rows] int NOT NULL,
		[columns] int NOT NULL,
        [status] BIT NOT NULL,
		cinema_id BIGINT NOT NULL
    )
GO
    -- CHƯA HOÀN THIỆN - DISCOUNT
    CREATE TABLE Discounts (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        title NVARCHAR(500) NOT NULL,
        coupon_code VARCHAR(20) NOT NULL,
        amount FLOAT NOT NULL,
        [start_date] DATETIME NOT NULL,
        end_date DATETIME NOT NULL,
        [status] BIT NOT NULL,
        discount_type BIT NOT NULL,
        cinema_complex_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Discounts_Booking (
        discount_id BIGINT NOT NULL,
        booking_id NVARCHAR(30) NOT NULL,
    )
GO
    CREATE TABLE Showtimes (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        start_time DATETIME NOT NULL,
        end_time DATETIME NOT NULL,
        [status] BIGINT NOT NULL,
        movie_id BIGINT NOT NULL,
        cinema_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Booking (
        id NVARCHAR(30) NOT NULL,
        -- HD23082023(Ngày giờ mili giây + hash)
        account_id NVARCHAR(15) NOT NULL,
        create_date DATETIME NOT NULL,
        showtime_id BIGINT NOT NULL,
    )
GO
    CREATE TABLE Payment_Info (
        transaction_id NVARCHAR(20) NOT NULL,
        tmn_code NVARCHAR (10) NOT NULL,
        booking_id NVARCHAR(30) NOT NULL,
        amount FLOAT NOT NULL,
        pay_date DATETIME NOT NULL,
        order_info NVARCHAR(100) NOT NULL,
        bank_code NVARCHAR(25),
        transaction_status NVARCHAR(3) NOT NULL,
    )
GO
    CREATE TABLE Services_Booking (
        booking_id NVARCHAR(30) NOT NULL,
        service_id BIGINT NOT NULL
    )
GO
ALTER TABLE
    Accounts
ADD
    CONSTRAINT PK_Accounts PRIMARY KEY (phone);

GO
ALTER TABLE
    Actors
ADD
    CONSTRAINT PK_Actors PRIMARY KEY (id);

GO
ALTER TABLE
    Actors_Movies
ADD
    CONSTRAINT PK_Actors_Movies PRIMARY KEY (actor_id, movie_id);

GO
ALTER TABLE
    Cinemas
ADD
    CONSTRAINT PK_Cinemas PRIMARY KEY (id);

GO
ALTER TABLE
    SeatChart
ADD
    CONSTRAINT PK_SeatChart PRIMARY KEY (id);

GO
ALTER TABLE
    Cinema_Complex
ADD
    CONSTRAINT PK_Cinema_Complex PRIMARY KEY (id);

GO
ALTER TABLE
    Cinema_Types
ADD
    CONSTRAINT PK_Cinema_Types PRIMARY KEY (id);

GO
ALTER TABLE
    Directors
ADD
    CONSTRAINT PK_Directors PRIMARY KEY (id);

GO
ALTER TABLE
    Directors_Movies
ADD
    CONSTRAINT PK_Directors_Movies PRIMARY KEY (director_id, movie_id);

GO
ALTER TABLE
    [Events]
ADD
    CONSTRAINT PK_Events PRIMARY KEY (id);

GO
ALTER TABLE
    Formats
ADD
    CONSTRAINT PK_Formats PRIMARY KEY (id);

GO
ALTER TABLE
    Formats_Movies
ADD
    CONSTRAINT PK_Formats_Movies PRIMARY KEY (format_id, movie_id);

GO
ALTER TABLE
    Genres
ADD
    CONSTRAINT PK_Genres PRIMARY KEY (id);

GO
ALTER TABLE
    Genres_Movies
ADD
    CONSTRAINT PK_Genres_Movies PRIMARY KEY (genre_id, movie_id);

GO
ALTER TABLE
    Movies
ADD
    CONSTRAINT PK_Movies PRIMARY KEY (id);

GO
ALTER TABLE
    Movie_Studio
ADD
    CONSTRAINT PK_Movie_Studio PRIMARY KEY (id);

GO
ALTER TABLE
    Payment_Info
ADD
    CONSTRAINT PK_Payment_Info PRIMARY KEY (transaction_id);

GO
ALTER TABLE
    Price
ADD
    CONSTRAINT PK_Price PRIMARY KEY (id);

GO
ALTER TABLE
    Price_Services
ADD
    CONSTRAINT PK_Price_Services PRIMARY KEY (id);

GO
ALTER TABLE
    Provinces
ADD
    CONSTRAINT PK_Provinces PRIMARY KEY (id);

GO
ALTER TABLE
    Reviews
ADD
    CONSTRAINT PK_Reviews PRIMARY KEY (id);

GO
ALTER TABLE
    Seat_Types
ADD
    CONSTRAINT PK_Seat_Types PRIMARY KEY (id);

GO
ALTER TABLE
    Seats
ADD
    CONSTRAINT PK_Seats PRIMARY KEY (id);

GO

ALTER TABLE
    Seats_Booking
ADD
    CONSTRAINT PK_Seats_Booking PRIMARY KEY (seat_id, booking_id);

GO
ALTER TABLE
    [Services]
ADD
    CONSTRAINT PK_Services PRIMARY KEY (id);

GO
ALTER TABLE
    Showtimes
ADD
    CONSTRAINT PK_Showtimes PRIMARY KEY (id);

GO
ALTER TABLE
    Booking
ADD
    CONSTRAINT PK_Booking PRIMARY KEY (id);

GO
ALTER TABLE
    Discounts
ADD
    CONSTRAINT PK_Discounts PRIMARY KEY (id);

GO
ALTER TABLE
    Verification
ADD
    CONSTRAINT PK_Verification PRIMARY KEY (id);

GO
ALTER TABLE
    Services_Booking
ADD
    CONSTRAINT PK_Services_Booking PRIMARY KEY (booking_id, service_id);

GO
ALTER TABLE
    Discounts_Booking
ADD
    CONSTRAINT PK_Discounts_Booking PRIMARY KEY (booking_id, discount_id);

GO
ALTER TABLE
    MPAA_Rating
ADD
    CONSTRAINT PK_MPAA_Rating PRIMARY KEY (id);

GO
    -- TẠO KHOÁ NGOẠI
ALTER TABLE
    Verification
ADD
    CONSTRAINT FK_Verification_Accounts FOREIGN KEY (account_id) REFERENCES Accounts(phone)
GO
    -- Reviews
ALTER TABLE
    Reviews
ADD
    CONSTRAINT FK_Reviews_Accounts FOREIGN KEY (account_id) REFERENCES Accounts(phone)
GO
ALTER TABLE
    Reviews
ADD
    CONSTRAINT FK_Reviews_Movies FOREIGN KEY (movie_id) REFERENCES Movies(id)
GO
    -- /Reviews
    -- Showtimes
ALTER TABLE
    Showtimes
ADD
    CONSTRAINT FK_Showtimes_Cinema FOREIGN KEY (cinema_id) REFERENCES Cinemas(id)
GO
ALTER TABLE
    Showtimes
ADD
    CONSTRAINT FK_Showtimes_Movies FOREIGN KEY (movie_id) REFERENCES Movies(id)
GO
    -- /Showtimes
    -- Price
ALTER TABLE
    Price
ADD
    CONSTRAINT FK_Price_Movies FOREIGN KEY (movie_id) REFERENCES Movies(id)
GO
ALTER TABLE
    Price
ADD
    CONSTRAINT FK_Price_SeatTypes FOREIGN KEY (seat_type_id) REFERENCES Seat_Types(id)
GO
ALTER TABLE
    Price
ADD
    CONSTRAINT FK_Price_CinemaComplex FOREIGN KEY (cinema_complex_id) REFERENCES Cinema_Complex(id)
GO
    -- /Price
    -- Directors_Movies
ALTER TABLE
    Directors_Movies
ADD
    CONSTRAINT FK_DirectorMovies_Movies FOREIGN KEY (movie_id) REFERENCES Movies(id)
GO
ALTER TABLE
    Directors_Movies
ADD
    CONSTRAINT FK_DirectorMovies_Directors FOREIGN KEY (director_id) REFERENCES Directors(id)
GO
    -- /Directors_Movies
    -- Formats_Movies
ALTER TABLE
    Formats_Movies
ADD
    CONSTRAINT FK_FormatsMovies_Movies FOREIGN KEY (movie_id) REFERENCES Movies(id)
GO
ALTER TABLE
    Formats_Movies
ADD
    CONSTRAINT FK_FormatsMovies_Formats FOREIGN KEY (format_id) REFERENCES Formats(id)
GO
    -- /Formats_Movies
    -- Genres_Movies
ALTER TABLE
    Genres_Movies
ADD
    CONSTRAINT FK_GenresMovies_Movies FOREIGN KEY (movie_id) REFERENCES Movies(id)
GO
ALTER TABLE
    Genres_Movies
ADD
    CONSTRAINT FK_Genres_Movies FOREIGN KEY (genre_id) REFERENCES Genres(id)
GO
    -- /Genres_Movies
    -- Actors_Movies
ALTER TABLE
    Actors_Movies
ADD
    CONSTRAINT FK_ActorsMovies_Movies FOREIGN KEY (movie_id) REFERENCES Movies(id)
GO
ALTER TABLE
    Actors_Movies
ADD
    CONSTRAINT FK_ActorsMovies_Actors FOREIGN KEY (actor_id) REFERENCES Actors(id)
GO
    -- /Actors_Movies
    -- Movies
ALTER TABLE
    Movies
ADD
    CONSTRAINT FK_Movies_MPAArating FOREIGN KEY (MPAA_rating_id) REFERENCES MPAA_Rating(id)
GO
ALTER TABLE
    Movies
ADD
    CONSTRAINT FK_Movies_MovieStudio FOREIGN KEY (movie_studio_id) REFERENCES Movie_Studio(id)
GO
    -- /Movies
    -- Seat 
ALTER TABLE
    [Seats]
ADD
    CONSTRAINT FK_Seats_SeatTypes FOREIGN KEY (seat_type_id) REFERENCES Seat_Types(id)
GO
ALTER TABLE
    [Seats]
ADD
    CONSTRAINT FK_Seats_SeatChart FOREIGN KEY (seat_chart_id) REFERENCES SeatChart(id)
GO
ALTER TABLE
    SeatChart
ADD
    CONSTRAINT FK_SeatChart_Cinemas FOREIGN KEY (cinema_id) REFERENCES Cinemas(id)
GO
    -- /Seats
    -------------- Cinema_Complex
ALTER TABLE
    [Events]
ADD
    CONSTRAINT FK_Events_CinemaComplex FOREIGN KEY (cinema_complex_id) REFERENCES Cinema_Complex(id)
GO
ALTER TABLE
    [Services]
ADD
    CONSTRAINT FK_Service_Cinema_Complex FOREIGN KEY (cinema_complex_id) REFERENCES Cinema_Complex(id)
GO
ALTER TABLE
    Price_Services
ADD
    CONSTRAINT FK_PriceService_Service FOREIGN KEY (service_id) REFERENCES [Services](id)
GO
ALTER TABLE
    Cinema_Complex
ADD
    CONSTRAINT FK_CinemaComplex_Provinces FOREIGN KEY (province_id) REFERENCES Provinces(id)
GO
ALTER TABLE
    Discounts
ADD
    CONSTRAINT FK_Discount_Cinema_Complex FOREIGN KEY (cinema_complex_id) REFERENCES Cinema_Complex(id)
GO
    -- Discount_Booking
ALTER TABLE
    Discounts_Booking
ADD
    CONSTRAINT FK_DiscountsBooking_Discounts FOREIGN KEY (discount_id) REFERENCES Discounts(id)
GO
ALTER TABLE
    Discounts_Booking
ADD
    CONSTRAINT FK_DiscountsBooking_Booking FOREIGN KEY (booking_id) REFERENCES Booking(id)
GO
    -- /Discount_Booking
    -- Cinema
ALTER TABLE
    Cinemas
ADD
    CONSTRAINT FK_Cinemas_CinemaComplex FOREIGN KEY (cinema_complex_id) REFERENCES Cinema_Complex(id)
GO
ALTER TABLE
    Cinemas
ADD
    CONSTRAINT FK_Cinemas_Cinema_Types FOREIGN KEY (cinema_type_id) REFERENCES Cinema_Types(id)
GO
    -- /Cinema
    -- -- Seats_Booking
ALTER TABLE
    [Seats_Booking]
ADD
    CONSTRAINT FK_SeatsBooking_Seats FOREIGN KEY (seat_id) REFERENCES Seats(id)
GO
ALTER TABLE
    [Seats_Booking]
ADD
    CONSTRAINT FK_SeatsBooking_Booking FOREIGN KEY (booking_id) REFERENCES Booking(id)
GO
    -- /Seats_Booking
    -- Booking
ALTER TABLE
    [Booking]
ADD
    CONSTRAINT FK_Booking_Showtimes FOREIGN KEY (showtime_id) REFERENCES Showtimes(id)
GO
ALTER TABLE
    [Booking]
ADD
    CONSTRAINT FK_Booking_Accounts FOREIGN KEY (account_id) REFERENCES Accounts(phone)
GO
    -- /Booking
    -- Services_Booking
ALTER TABLE
    [Services_Booking]
ADD
    CONSTRAINT FK_ServicesBooking_Booking FOREIGN KEY (booking_id) REFERENCES Booking(id)
GO
ALTER TABLE
    [Services_Booking]
ADD
    CONSTRAINT FK_ServicesBooking_Services FOREIGN KEY (service_id) REFERENCES Services(id)
GO
    -- /Services_Booking
    -- Payment_Info
ALTER TABLE
    [Payment_Info]
ADD
    CONSTRAINT FK_PaymentInfo_Booking FOREIGN KEY (booking_id) REFERENCES Booking(id)
GO
    -- /Payment_Info





SELECT * FROM Accounts
SELECT * FROM Verification
SELECT * FROM Reviews
SELECT * FROM Genres
SELECT * FROM Genres_Movies

SELECT * FROM Movie_Studio
SELECT * FROM MPAA_Rating
SELECT * FROM Movies
SELECT * FROM Formats
SELECT * FROM Formats_Movies
SELECT * FROM Directors
SELECT * FROM Directors_Movies

SELECT * FROM Actors
SELECT * FROM Actors_Movies
SELECT * FROM Provinces
SELECT * FROM Cinema_Complex
SELECT * FROM Seat_Types
SELECT * FROM Seats
SELECT * FROM Seats_Booking
SELECT * FROM Price


SELECT * FROM Events
SELECT * FROM Services
SELECT * FROM Price_Services
SELECT * FROM Cinema_Types
SELECT * FROM Cinemas
SELECT * FROM Discounts
SELECT * FROM Discounts_Booking
SELECT * FROM Showtimes
SELECT * FROM Booking
SELECT * FROM Payment_Info
SELECT * FROM Services_Booking



-- insert into


-- DELETE Accounts
-- DBCC CHECKIDENT ('Accounts', RESEED, 0);

-- DELETE Verification
-- DBCC CHECKIDENT ('Verification', RESEED, 0);

-- DELETE Reviews
-- DBCC CHECKIDENT ('Reviews', RESEED, 0);

-- DELETE Genres
-- DBCC CHECKIDENT ('Genres', RESEED, 0);

-- DELETE Genres_Movies
-- DBCC CHECKIDENT ('Genres_Movies', RESEED, 0);

-- DELETE Movie_Studio
-- DBCC CHECKIDENT ('Movie_Studio', RESEED, 0);

-- DELETE MPAA_Rating
-- DBCC CHECKIDENT ('MPAA_Rating', RESEED, 0);

-- DELETE Movies
-- DBCC CHECKIDENT ('Movies', RESEED, 0);

-- DELETE Formats
-- DBCC CHECKIDENT ('Formats', RESEED, 0);

-- DELETE Formats_Movies
-- DBCC CHECKIDENT ('Formats_Movies', RESEED, 0);

-- DELETE Directors
-- DBCC CHECKIDENT ('Directors', RESEED, 0);

-- DELETE Directors_Movies
-- DBCC CHECKIDENT ('Directors_Movies', RESEED, 0);

-- DELETE Actors
-- DBCC CHECKIDENT ('Actors', RESEED, 0);

-- DELETE Actors_Movies
-- DBCC CHECKIDENT ('Actors_Movies', RESEED, 0);

-- DELETE Provinces
-- DBCC CHECKIDENT ('Provinces', RESEED, 0);

-- DELETE Cinema_Complex
-- DBCC CHECKIDENT ('Cinema_Complex', RESEED, 0);

-- DELETE Seat_Types
-- DBCC CHECKIDENT ('Seat_Types', RESEED, 0);

-- DELETESeats
-- DBCC CHECKIDENT ('Seats', RESEED, 0);

-- DELETE Seats_Booking
-- DBCC CHECKIDENT ('Seats_Booking', RESEED, 0);

-- DELETE Price
-- DBCC CHECKIDENT ('Price', RESEED, 0);

-- DELETE Events
-- DBCC CHECKIDENT ('Events', RESEED, 0);

-- DELETE Services
-- DBCC CHECKIDENT ('Services', RESEED, 0);

-- DELETE Price_Services
-- DBCC CHECKIDENT ('Price_Services', RESEED, 0);

-- DELETE Cinema_Types
-- DBCC CHECKIDENT ('Cinema_Types', RESEED, 0);

-- DELETE Cinemas
-- DBCC CHECKIDENT ('Cinemas', RESEED, 0);

-- DELETE Discounts
-- DBCC CHECKIDENT ('Discounts', RESEED, 0);

-- DELETE Discounts_Booking
-- DBCC CHECKIDENT ('Discounts_Booking', RESEED, 0);

-- DELETE Showtimes
-- DBCC CHECKIDENT ('Showtimes', RESEED, 0);

-- DELETE Booking
-- DBCC CHECKIDENT ('Booking', RESEED, 0);

-- DELETE Payment_Info
-- DBCC CHECKIDENT ('Payment_Info', RESEED, 0);

-- DELETE Services_Booking
-- DBCC CHECKIDENT ('Services_Booking', RESEED, 0);


--1.  bảng provinces
INSERT INTO [TicketEZ].[dbo].[Provinces] ([name])
VALUES
    (N'Hà Nội'),
    (N'Hồ Chí Minh'),
    (N'Hải Phòng'),
    (N'Đà Nẵng'),
    (N'Cần Thơ'),
    (N'Hà Giang'),
    (N'Cao Bằng'),
    (N'Lai Châu'),
    (N'Điện Biên'),
    (N'Lào Cai'),
    (N'Yên Bái'),
    (N'Tuyên Quang'),
    (N'Lạng Sơn'),
    (N'Bắc Kạn'),
    (N'Thái Nguyên'),
    (N'Phú Thọ'),
    (N'Vĩnh Phúc'),
    (N'Bắc Ninh'),
    (N'Bắc Giang'),
    (N'Quảng Ninh'),
    (N'Hòa Bình'),
    (N'Hà Nam'),
    (N'Hà Tĩnh'),
    (N'Nghệ An'),
    (N'Quảng Bình'),
    (N'Quảng Trị'),
    (N'Thừa Thiên Huế'),
    (N'Quảng Nam'),
    (N'Quảng Ngãi'),
    (N'Bình Định'),
    (N'Phú Yên'),
    (N'Khánh Hòa'),
    (N'Ninh Thuận'),
    (N'Bình Thuận'),
    (N'Kon Tum'),
    (N'Gia Lai'),
    (N'Đắk Lắk'),
    (N'Đắk Nông'),
    (N'Lâm Đồng'),
    (N'Bình Phước'),
    (N'Bình Dương'),
    (N'Đồng Nai'),
    (N'Tây Ninh'),
    (N'Bà Rịa - Vũng Tàu'),
    (N'Long An'),
    (N'Tiền Giang'),
    (N'Bến Tre'),
    (N'Trà Vinh'),
    (N'Vĩnh Long'),
    (N'Đồng Tháp'),
    (N'An Giang'),
    (N'Kiên Giang'),
    (N'Cà Mau'),
    (N'Sóc Trăng'),
    (N'Bạc Liêu'),
    (N'Hậu Giang'),
    (N'Bắc Ninh'),
    (N'Nam Định'),
    (N'Ninh Bình');


-- 2. thêm dữ liệu bảng cinema complex
  INSERT INTO [TicketEZ].[dbo].[Cinema_Complex] ([name], [address], [phone], [opening_time], [closing_time], [province_id])
VALUES
    (N'Standard Cinema Complex', N'123 Park Street, Quận 1, Thành phố Hồ Chí Minh', '0192949422', '08:00:00', '22:00:00', 2),
    (N'3D Cinema Complex', N'CM tháng 8, Quận 12, Thành phố Hồ Chí Minh', '0945586789', '09:00:00', '23:00:00', 2),
    (N'IMAX Cinema Complex', N'Đường Võ Văn Kiệt, Bình Thủy, Cần Thơ', '0111285634', '07:00:00', '21:00:00', 5),
    (N'VIP Cinema Complex', N'Nguyễn Văn Linh, Ninh Kiều, Cần Thơ', '09897774444', '10:00:00', '23:00:00', 5),
    (N'Multiplex Cinema Complex', N'Quốc Lộ 1A, Châu Thành, Sóc Trăng', '0908903495', '11:00:00', '23:50:00', 54),
    (N'Independent Cinema Complex', N'Đường Võ Văn Kiệt, Thành phố Sóc Trăng', '06848829533', '06:00:00', '20:00:00', 54),
    (N'Boutique Cinema Complex', N'39 Điện Biên Phủ, Phường 1, Thành phố Bạc Liêu, tỉnh Bạc Liêu ', '09993447999', '08:30:00', '22:30:00', 55),
    (N'Family Cinema Complex', N'Tầng 3, TTTM Vincom Plaza Bạc Liêu, số 18 Hồ Xuân Hương, Phường 1, Thành phố Bạc Liêu, tỉnh Bạc Liêu', '0380008090', '09:30:00', '23:30:00', 55),
    (N'Sports Cinema Complex', N'CGV Vincom Center Bà Triệu: Tầng 6, Vincom Center Bà Triệu, 191 Bà Triệu, Hai Bà Trưng, Hà Nội', '03419392939', '07:30:00', '21:30:00', 1),
    (N'Art House Cinema Complex', N'Tầng 5, Keangnam Hanoi Landmark Tower, Phạm Hùng, Từ Liêm, Hà Nội', '0984557777', '10:30:00', '00:30:00', 1),
    (N'Digital Cinema Complex', N' Tầng 4, Mipec Tower, 229 Tây Sơn, Đống Đa, Hà Nội', '0981237415', '11:30:00', '01:30:00', 42),
    (N'Live Cinema Complex', N'Tầng 5, Vincom Plaza Biên Hòa, đường Đồng Khởi, Phường Trung Dũng, TP. Biên Hòa, Đồng Nai', '09412367842', '07:30:00', '23:00:00', 42),
    (N'High-Tech Cinema Complex', N'Tầng 4, TTTM Long Khánh, 104A Trần Hưng Đạo, Phường Long Bình, TP. Long Khánh, Đồng Nai', '0945768900', '08:00:00', '22:00:00', 42),
    (N'Community Cinema Complex', N'TP. Biên Hòa, Đồng Nai', '0945515456', '09:00:00', '23:00:00', 42),
    (N'Anime Cinema Complex', N'TP. Biên Hòa, Đồng Nai', '0383834578', '07:00:00', '21:00:00', 42);



  -- 3. Thêm dữ liệu cho bảng Cinema_Types
INSERT INTO [TicketEZ].[dbo].[Cinema_Types] ([type_name], [description])
VALUES
    (N'Regular', N'Standard cinema with regular amenities.'),
    (N'VIP', N'Luxury cinema with VIP services.'),
    (N'3D', N'Cinema with 3D projection technology.'),
    (N'IMAX', N'Cinema with IMAX screens and audio.'),
    (N'Digital', N'Digital cinema with advanced projection.'),
    (N'Boutique', N'Boutique cinema with a unique experience.'),
    (N'Independent', N'Independent cinema offering diverse films.'),
    (N'Family', N'Family-friendly cinema with special screenings.'),
    (N'Sports', N'Cinema with sports events and big screens.'),
    (N'Art House', N'Art house cinema with independent films.');


 -- 4. Thêm dữ liệu cho bảng Cinemas
INSERT INTO [TicketEZ].[dbo].[Cinemas] ([name], [status], [cinema_type_id], [cinema_complex_id])
VALUES
    (N'Cinema 1', 1, 1, 1),
    (N'Cinema 2', 1, 3, 1),
    (N'Cinema 3', 1, 7, 2),
    (N'Cinema 4', 0, 6, 2),
    (N'Cinema 5', 0, 3, 3),
    (N'Cinema 6', 1, 3, 3),
    (N'Cinema 7', 1, 1, 4),
    (N'Cinema 8', 1, 1, 4),
    (N'Cinema 9', 0, 5, 7),
    (N'Cinema 10', 1, 7, 5),
	(N'Cinema 11', 1, 3, 3),
	(N'Cinema 12', 1, 3, 4),
	(N'Cinema 13', 1, 4, 6),
	(N'Cinema 14', 0, 5, 5),
	(N'Cinema 15', 1, 10, 5),
	(N'Cinema 16', 1, 8, 5),
	(N'Cinema 17', 0, 6, 5);


-- 5. Thêm dữ liệu cho dịch vụ của rạp phim services
INSERT INTO [TicketEZ].[dbo].[Services] ([name], [description], [image], [cinema_complex_id])
VALUES
    (N'Tiện ích ẩm thực và đồ uống', N'Tận hưởng đa dạng các loại đồ ăn nhẹ và đồ uống trong suốt buổi chiếu phim.', 'food.jpg', 1),
    (N'Phòng VIP', N'Trải nghiệm dịch vụ VIP với ghế ngồi thoải mái và các dịch vụ độc quyền.', 'vip.jpg', 1),
    (N'Cho thuê kính 3D', N'Thuê kính 3D để trải nghiệm phim sống động hơn.', '3d_glasses.jpg', 3),
    (N'Bãi đỗ xe', N'Có các cơ sở đỗ xe tiện lợi.', 'parking.jpg', 1),
    (N'Đặt vé trực tuyến', N'Đặt vé trực tuyến để trải nghiệm không gian không phải xếp hàng.', 'online_booking.jpg', 2),
    (N'Tiệc sinh nhật', N'Chào đón sinh nhật của bạn tại rạp phim cùng với chúng tôi.', 'birthday.jpg', 2),
    (N'Chiếu riêng', N'Đặt chiếu riêng cho nhóm hoặc sự kiện của bạn.', 'private_screening.jpg', 9),
    (N'Tiệc trò chơi Arcade', N'Trải nghiệm các trò chơi Arcade trước hoặc sau khi xem phim.', 'arcade.jpg', 7),
    (N'Ưu đãi cho nhóm', N'Ưu đãi đặc biệt dành cho các nhóm và sự kiện.', 'group_discount.jpg', 5),
    (N'Dịch vụ chăm sóc trẻ em', N'Dịch vụ chăm sóc trẻ em dành cho các bậc cha mẹ có con nhỏ.', 'child_care.jpg', 8),
    (N'Dịch vụ tiện ích', N'Chúng tôi cung cấp dịch vụ tiện ích để phục vụ tất cả khách hàng của chúng tôi.', 'accessibility.jpg', 10),
    (N'Chương trình khách hàng thân thiết', N'Tham gia chương trình khách hàng thân thiết của chúng tôi để nhận ưu đãi và quà tặng độc quyền.', 'loyalty.jpg', 15);

 -- 6. Thêm dữ liệu giá cho dịch vụ Price services
INSERT INTO [TicketEZ].[dbo].[Price_Services] ([price], [start_date], [end_date], [service_id])
VALUES
    (50000, '2023-10-05', '2023-10-31', 1),
    (100000, '2023-10-05', '2023-10-31', 2),
    (20000, '2023-10-05', '2023-10-31', 3),
    (5000, '2023-10-05', '2023-10-31', 4),
    (70000, '2023-10-05', '2023-10-31', 5),
    (25000, '2023-10-05', '2023-10-31', 6),
    (150000, '2023-10-05', '2023-10-31', 7),
    (30000, '2023-10-05', '2023-10-31', 8),
    (80000, '2023-10-05', '2023-10-31', 9),
    (60000, '2023-10-05', '2023-10-31', 10),
    (40000, '2023-10-05', '2023-10-31', 11),
    (30000, '2023-10-05', '2023-10-31', 12);

  -- 7. Thêm dữ liệu về loại ghế (Seat Types)
INSERT INTO [TicketEZ].[dbo].[Seat_Types] ([name], [image], [description])
VALUES
    (N'Ghế thông thường', 'url_anh_ghethongthuong.jpg', N'Loại ghế thông thường sử dụng cho tất cả khách hàng.'),
    (N'Ghế VIP', 'url_anh_ghevip.jpg', N'Loại ghế VIP dành cho các khách hàng có vé VIP.'),
    (N'Ghế hội nghị', 'url_anh_ghehoinghi.jpg', N'Loại ghế hội nghị dành cho các sự kiện, buổi họp, hội nghị.'),
    (N'Ghế đôi', 'url_anh_ghedoi.jpg', N'Loại ghế đôi thích hợp cho các cặp đôi xem phim.'),
    (N'Ghế trẻ em', 'url_anh_ghetreem.jpg', N'Loại ghế dành cho trẻ em, có kích thước nhỏ hơn.'),
    (N'Ghế ngồi thoải mái', 'url_anh_ghethoaithoaimai.jpg', N'Loại ghế có thiết kế đặc biệt để tạo sự thoải mái khi xem phim.');

-- 8 . thêm dữ liệu cho bảng biểu đồ (seatChart)
-- Chèn dữ liệu vào bảng SeatChart
INSERT INTO SeatChart ([name], [rows], [columns], [status], cinema_id)
VALUES
    ('Biểu đồ 1', 10, 7, 1, 1),
    ('Biểu đồ 2', 8, 12, 1, 1),
    ('Biểu đồ 3', 12, 8, 0, 1);
-- 8. Thêm dữ liệu về ghế
INSERT INTO Seats ([name], [status], [description], seat_type_id, seat_chart_id)
VALUES
    (N'A1', 1, N'Ghế thông thường', 1, 1),
    (N'A2', 1, N'Ghế VIP', 2, 1),
    (N'A3', 1, N'Ghế thông thường', 1, 1),
    (N'A4', 0, N'Ghế VIP', 2, 1),
    (N'A5', 1, N'Ghế thông thường', 1, 1),
    (N'A6', 1, N'Ghế VIP', 2, 1),
    (N'A7', 1, N'Ghế thông thường', 1, 1),
    (N'B1', 1, N'Ghế thông thường', 1, 1),
    (N'B2', 1, N'Ghế VIP', 2, 1),
    (N'B3', 1, N'Ghế thông thường', 1, 1),
    (N'B4', 1, N'Ghế VIP', 2, 1),
    (N'B5', 0, N'Ghế thông thường', 1, 1),
    (N'B6', 1, N'Ghế VIP', 2, 1),
    (N'B7', 1, N'Ghế thông thường', 1, 1),
	(N'C1', 1, N'Ghế thông thường', 1, 1),
    (N'C2', 1, N'Ghế VIP', 2, 1),
    (N'C3', 1, N'Ghế thông thường', 2, 1),
    (N'C4', 0, N'Ghế VIP', 2, 1),
    (N'C5', 1, N'Ghế thông thường', 2, 1),
    (N'C6', 1, N'Ghế VIP', 2, 1),
	(N'C7', 0, N'Ghế VIP', 2, 1),
    (N'D1', 1, N'Ghế VIP', 1, 1),
    (N'D2', 1, N'Ghế thông thường', 1, 1),
    (N'D3', 0, N'Ghế VIP', 1, 1),
    (N'D4', 1, N'Ghế thông thường', 1, 1),
    (N'D5', 0, N'Ghế VIP', 1, 1),
	(N'D6', 0, N'Ghế VIP', 1, 1),
	(N'D7', 0, N'Ghế VIP', 1, 1),
	(N'E1', 1, N'Ghế thông thường', 1, 1),
    (N'E2', 1, N'Ghế VIP', 2, 1),
    (N'E3', 1, N'Ghế thông thường', 1, 1),
    (N'E4', 0, N'Ghế VIP', 2, 1),
    (N'E5', 1, N'Ghế thông thường', 1, 1),
    (N'E6', 1, N'Ghế VIP', 2, 1),
    (N'E7', 1, N'Ghế thông thường', 1, 1),
	(N'F1', 1, N'Ghế thông thường', 1, 1),
    (N'F2', 1, N'Ghế VIP', 2, 1),
    (N'F3', 1, N'Ghế thông thường', 1, 1),
    (N'F4', 0, N'Ghế VIP', 2, 1),
    (N'F5', 1, N'Ghế thông thường', 1, 1),
    (N'F6', 1, N'Ghế VIP', 2, 1),
    (N'F7', 1, N'Ghế thông thường', 1, 1),
	(N'G1', 1, N'Ghế thông thường', 1, 1),
    (N'G2', 1, N'Ghế VIP', 2, 1),
    (N'G3', 1, N'Ghế thông thường', 1, 1),
    (N'G4', 0, N'Ghế VIP', 2, 1),
    (N'G5', 1, N'Ghế thông thường', 1, 1),
    (N'G6', 1, N'Ghế VIP', 2, 1),
    (N'G7', 1, N'Ghế thông thường', 1, 1),
	(N'H1', 1, N'Ghế thông thường', 1, 1),
    (N'H2', 1, N'Ghế VIP', 2, 1),
    (N'H3', 1, N'Ghế thông thường', 1, 1),
    (N'H4', 0, N'Ghế VIP', 2, 1),
    (N'H5', 1, N'Ghế thông thường', 1, 1),
    (N'H6', 1, N'Ghế VIP', 2, 1),
    (N'H7', 1, N'Ghế thông thường', 1, 1),
	(N'I1', 1, N'Ghế thông thường', 1, 1),
    (N'I2', 1, N'Ghế VIP', 2, 1),
    (N'I3', 1, N'Ghế thông thường', 1, 1),
    (N'I4', 0, N'Ghế VIP', 2, 1),
    (N'I5', 1, N'Ghế thông thường', 1, 1),
    (N'I6', 1, N'Ghế VIP', 2, 1),
    (N'I7', 1, N'Ghế thông thường', 1, 1),
	(N'J1', 1, N'Ghế thông thường', 1, 1),
    (N'J2', 1, N'Ghế VIP', 2, 1),
    (N'J3', 1, N'Ghế thông thường', 1, 1),
    (N'J4', 0, N'Ghế VIP', 2, 1),
    (N'J5', 1, N'Ghế thông thường', 1, 1),
    (N'J6', 1, N'Ghế VIP', 2, 1),
    (N'J7', 1, N'Ghế thông thường', 1, 1)

  -- 9. Thêm dữ liệu cho bảng Movie_Studio
INSERT INTO [TicketEZ].[dbo].[Movie_Studio] 
    ([name], [country], [email], [description])
VALUES
    ('Walt Disney Pictures', N'Hoa Kỳ', 'tuhieu@disney.com', N'Studio sản xuất phim của Disney.'),
    ('Warner Bros. Pictures', N'Hoa Kỳ', 'phungtuhieut@warnerbros.com', N'Studio sản xuất phim của Warner Bros.'),
    ('Paramount Pictures', N'Canada', 'hieutuphung@paramount.com', N'Studio sản xuất phim của Paramount.'),
    ('Universal Pictures', N'Anh', 'nguyenhoangdinh@universal.com', N'Studio sản xuất phim của Universal.'),
    ('20th Century Studios', N'Anh', 'dinhnguyen@20thcentury.com', N'Studio sản xuất phim của 20th Century.'),
    ('Sony Pictures Entertainment',	N'Mỹ', 'hieupt@sony.com', N'Studio sản xuất phim của Sony.');

 -- 10. Chèn dữ liệu vào bảng MPAA_Rating
INSERT INTO [TicketEZ].[dbo].[MPAA_Rating] ([rating_code], [icon], [description])
VALUES
    ('G', 'G_icon.png', N'Phù hợp cho mọi đối tượng.'),
    ('PG', 'PG_icon.png', N'Cần có sự hướng dẫn của cha mẹ hoặc người trưởng thành.'),
    ('PG-13', 'PG-13_icon.png', N'Không phù hợp cho trẻ dưới 13 tuổi.'),
    ('R', 'R_icon.png', N'Phim có nội dung cần có sự hướng dẫn của người trưởng thành.'),
    ('NC-17', 'NC-17_icon.png', N'Không phù hợp cho trẻ em dưới 17 tuổi.');

-- 11. Thêm dữ liệu cho bảng Movies
INSERT INTO [TicketEZ].[dbo].[Movies] 
    ([title], [description], [duration], [release_date], [country], [rating], [movie_studio_id], [video_trailer], [MPAA_rating_id])
VALUES
    (N'Avengers: Endgame', N'Cuộc chiến cuối cùng của siêu anh hùng Marvel', '02:33:00', '2019-04-26', N'United States', 8.4, 1, 'https://www.youtube.com/watch?v=TcMBFSGVi1c', 3),
    (N'The Dark Knight', N'Huyền thoại về Người Dơi và The Joker', '01:43:00', '2008-07-18', N'United States', 9.0, 2, 'https://www.youtube.com/watch?v=yQ5U8suTUw0', 3),
    (N'Avatar', N'Hành trình vào thế giới Pandora', '02:15:00', '2009-12-18', N'United States', 7.8, 3, 'https://www.youtube.com/watch?v=5PSNL1qE6VY', 2),
    (N'Jurassic Park', N'Những con khủng long trở lại', '01:50:00', '1993-06-11', N'United States', 8.1, 4, 'https://www.youtube.com/watch?v=lc0UehYemQA', 2),
    (N'Harry Potter and the Sorcerer''s Stone', N'Học viện phù thuỷ Hogwarts', '02:50:00', '2001-11-16', N'United Kingdom', 7.6, 5, 'https://www.youtube.com/watch?v=VyHV0BRtdxo', 1),
    (N'The Lion King', N'Cuộc phiêu lưu của chú sư tử Simba', '02:02:00', '1994-06-15', N'United States', 8.5, 5, 'https://www.youtube.com/watch?v=4sj1MT05lAA', 1),
    (N'Frozen', N'Băng giá và phép thuật', '02:33:00', '2013-11-27', 'United States', 7.4, 4, 'https://www.youtube.com/watch?v=TbQm5doF_Uc', 1),
    (N'Titanic', N'Hành trình trên con tàu hoàng gia', '02:33:00', '1997-12-19', N'United States', 7.8, 4, 'https://www.youtube.com/watch?v=2e-eXJ6HgkQ', 3),
	(N'Interstellar', N'Phiêu lưu vượt qua không gian và thời gian', '02:33:00', '2014-11-05', N'United States', 8.6, 4, 'https://www.youtube.com/watch?v=0vxOhd4qlnA', 4),
    (N'Inception', N'Truy cập vào giấc mơ của người khác', '02:20:00', '2010-07-16', 'United States', 8.8, 1, 'https://www.youtube.com/watch?v=YoHD9XEInc0', 3),
    (N'The Shawshank Redemption', N'Sự giải thoát từ nhà tù Shawshank', '02:24:00', '1994-10-14', N'United States', 9.3, 2, 'https://www.youtube.com/watch?v=6hB3S9bIaco', 3),
    (N'Forrest Gump', N'Hành trình của Forrest Gump trong cuộc sống', '01:47:00', '1994-07-06', N'United States', 8.8, 2, 'https://www.youtube.com/watch?v=uPIEn0M8su0', 4),
    (N'The Matrix', N'Sự thức tỉnh trong một thế giới ảo', '02:33:00', '1999-03-31', N'United States', 8.7, 3, 'https://www.youtube.com/watch?v=m8e-FF8MsqU', 1),
    (N'The Lord of the Rings: The Fellowship of the Ring', N'Hội bạn nhẫn - Cuộc hành trình bắt đầu', '02:50:00', '2001-12-19', 'NNew Zealand', 8.8, 4, 'https://www.youtube.com/watch?v=V75dMMIW2B4', 2),
    (N'Pulp Fiction', N'Một câu chuyện tình yêu và bạo lực', '02:30:00', '1994-10-14', N'United States', 8.9, 5, 'https://www.youtube.com/watch?v=wZBfmBvvotE', 5),
    (N'The Avengers', N'Siêu anh hùng Marvel đoàn tụ', '02:30:00', '2012-05-04', N'United States', 8.0, 1, 'https://www.youtube.com/watch?v=eOrNdBpGMv8', 5),
	(N'Inglourious Basterds', N'Cuộc chiến của một đội quân tinh nhuệ chống lại quân địch Nazi.', '02:21:00', '2009-08-20', N'United States', 8.3, 5, 'https://www.youtube.com/watch?v=6AtLlVNsuAc', 3),
    (N'The Godfather', N'Cuộc sống và sự nghiệp của gia đình mafias Corleone.', '02:28:00', '1972-03-24', N'United States', 9.2, 5, 'https://www.youtube.com/watch?v=sY1S34973zA', 4),
    (N'Schindler''s List', N'Cuộc hành trình của Oskar Schindler để cứu hàng trăm người Do Thái khỏi Holocaust.', '01:35:00', '1993-12-15', N'United States', 8.9, 5, 'https://www.youtube.com/watch?v=gG22XNhtnoY', 3),
    (N'Forrest Gump', N'Hành trình của Forrest Gump trong cuộc sống và lịch sử.', '02:33:00', '1994-07-06', N'United States', 8.8, 2, 'https://www.youtube.com/watch?v=uPIEn0M8su0', 4),
    (N'Star Wars: A New Hope', N'Sự huyền bí của Jedi và Cuộc chiến tranh giữa các vì sao.', '02:33:00', '1977-05-25', N'United States', 8.6, 2, 'https://www.youtube.com/watch?v=1g3_CFmnU7k', 1),
    (N'E.T. the Extra-Terrestrial', N'Câu chuyện về một cậu bé và một người ngoài hành tinh.', '02:33:00', '1982-06-11', N'United States', 7.8, 3, 'https://www.youtube.com/watch?v=qYAETtIIClk', 2),
    (N'Gladiator', N'Sự trả thù của một tướng quân La Mã.', '02:33:00', '2000-05-05', 'United Kingdom', 8.5, 3, 'https://www.youtube.com/watch?v=owK1qxDselE', 3),
    (N'The Silence of the Lambs', N'Câu chuyện về thám tử Clarice Starling và tên sát nhân hàng loạt Hannibal Lecter.', '02:50:00', '1991-02-14', N'United States', 8.6, 5, 'https://www.youtube.com/watch?v=W6Mm8Sbe__o', 5),
    (N'The Dark Knight Rises', N'Batman trở lại để đối mặt với Bane và Selina Kyle.', '01:47:00', '2012-07-20', N'United States', 8.4, 4, 'https://www.youtube.com/watch?v=g8evyE9TuYk', 3),
    (N'The Matrix Reloaded', N'Neo tiếp tục cuộc chiến chống lại Matrix.', '01:47:00', '2003-05-15', N'United States', 7.2, 5, 'https://www.youtube.com/watch?v=mVc8l4dLDo4', 1);


  -- 12. Thêm dữ liệu về giá vé (Price)
INSERT INTO [TicketEZ].[dbo].[Price] ([weekday_price], [weekend_price], [start_date], [end_date], [status], [seat_type_id], [movie_id], [cinema_complex_id])
VALUES
    (100000, 120000, '2022-12-31', '2023-01-21', 1, 1, 2, 1),
    (90000, 110000, '2022-12-19', '2023-01-31', 1, 2, 12, 1),
    (80000, 100000, '2022-07-16', '2023-02-07', 1, 1, 6, 1),
    (95000, 115000, '2022-12-31', '2023-03-23', 1, 2, 4, 1),
    (90000, 110000, '2023-04-01', '2023-04-30', 1, 1, 4, 2),
    (85000, 105000, '2022-06-17', '2023-05-20', 1, 2, 17, 2),
    (95000, 115000, '2022-07-03', '2023-06-17', 1, 1, 20, 3),
    (90000, 110000, '2022-08-09', '2023-07-13', 1, 2, 11, 2),
    (85000, 105000, '2022-08-22', '2023-08-11', 1, 1, 3, 3),
    (95000, 115000, '2022-09-21', '2023-09-30', 1, 2, 4, 4),
    (100000, 120000, '2023-5-31', '2023-09-30', 1, 1, 7, 3),
    (90000, 110000, '2023-5-21', '2023-09-28', 1, 2, 5, 3),
	(100000, 120000, '2022-12-31', '2023-01-21', 1, 1, 6, 4),
    (10000, 110000, '2022-12-19', '2023-01-31', 1, 2, 7, 4),
    (120000, 100000, '2022-07-16', '2023-02-07', 1, 1, 8, 5),
    (20000, 115000, '2022-12-31', '2023-03-23', 1, 2, 26, 6),
    (100000, 110000, '2023-04-01', '2023-07-30', 1, 1, 9, 7),
    (105000, 105000, '2022-11-17', '2023-05-20', 1, 2, 10,8),
    (150000, 115000, '2022-09-03', '2023-08-17', 1, 1, 21, 8),
    (100000, 110000, '2023-06-09', '2023-08-13', 1, 2, 22, 10),
    (75000, 105000, '2022-08-22', '2023-08-14', 1, 1, 12, 12),
    (95000, 115000, '2022-09-21', '2023-04-30', 1, 2, 13, 13),
    (110000, 120000, '2023-01-31', '2023-09-22', 1, 1, 24, 15),
    (90000, 110000, '2023-10-11', '2023-02-28', 1, 2, 25, 11);


  -- 13. Thêm dữ liệu cho bảng Discounts
INSERT INTO [TicketEZ].[dbo].[Discounts] 
    ([title], [coupon_code], [amount], [start_date], [end_date], [status], [discount_type], [cinema_complex_id])
VALUES
    (N'Discount 1', 'CODE001', 10.0, '2023-10-05 00:00:00', '2023-10-15 23:59:59', 1, 1, 1),
    (N'Discount 2', 'CODE002', 15.5, '2023-10-08 12:00:00', '2023-10-18 12:00:00', 1, 0, 2),
    (N'Discount 3', 'CODE003', 5.0, '2023-10-12 08:00:00', '2023-10-22 08:00:00', 1, 1, 3);


  --14. thêm bảng dữ liệu của Genres
  INSERT INTO [TicketEZ].[dbo].[Genres] ([name],[description])
VALUES
    (N'Hành động',N'Phim hành động thường có nhiều cảnh hỗn loạn, võ thuật, và hành động kịch tính. Chúng thường xoay quanh các nhân vật chống lại kẻ thù hoặc giải quyết vấn đề bằng cách sử dụng bạo lực hoặc kỹ năng chiến đấu.'),
    (N'Khoa học viễn tưởng',N'tập trung vào các khía cạnh khoa học, công nghệ, và tương lai.'),
	(N'Phiêu lưu',N' Phim phiêu lưu thường kể về cuộc hành trình mạo hiểm của các nhân vật chống lại khó khăn và nguy hiểm. Chúng thường tập trung vào việc khám phá và khám phá thế giới'),
	(N'Hài kịch',N'Phim hài kịch chuyên về việc tạo ra tiếng cười và giải trí. Chúng có thể xoay quanh các tình huống hài hước và những tình tiết gây cười'),
	(N'Kinh dị',N' Phim kinh dị tạo ra cảm giác sợ hãi và căng thẳng trong khán giả. Chúng thường có các yếu tố ma quỷ, ám ảnh và kỳ quái'),
	(N'Tình cảm',N' Phim tình cảm tập trung vào các mối quan hệ tình yêu và lãng mạn. Chúng thường xoay quanh câu chuyện tình đẹp và cảm động'),
	(N'Hoạt Hình',N'Phim hoạt hình sử dụng các hình ảnh được vẽ hoặc tạo ra bằng máy tính để kể câu chuyện. Chúng có thể dành cho cả trẻ em và người lớn'),
	(N'Tâm lý',N'Phim tâm lý tập trung vào phát triển nhân vật và tạo ra các tình tiết đầy cảm xúc. Chúng thường khám phá các vấn đề xã hội và nhân văn'),
	(N'Hình sự',N'Phim hình sự thường liên quan đến tội phạm, điều tra, và phá án. Chúng tập trung vào việc phát hiện và truy bắt tội phạm'),
	(N'Chiến tranh',N'Phim chiến tranh thường lấy bối cảnh trong các cuộc chiến tranh và tập trung vào các khía cạnh của chiến tranh, như tình bạn, mất mát và hậu quả xã hội');


 -- 15. Thêm dữ liệu vào bảng Genres_Movies
INSERT INTO [TicketEZ].[dbo].[Genres_Movies] ([genre_id], [movie_id])
VALUES
    (1, 26), -- Genre 1 và Movie 1
	(1, 11),
	(7, 2),
	(4, 2),
	(3, 2),
	(5, 2),
	(4, 4),
	(10, 13),
	(9, 4),
    (2, 5), -- Genre 2 và Movie 1
	(10, 5),
	(3, 5),
	(8, 5),
    (9, 3), -- Genre 3 và Movie 2
	(4, 3),
	(5, 6),
	(6, 7),
	(7, 7),
	(1, 8),
	(2, 8),
	(3, 8),
	(6, 8),
	(8, 8),
	(1, 10),
	(2, 11),
	(3, 12),
	(6, 17),
	(8, 20),
	(3, 9),
	(4, 9),
	(5, 9),
	(7, 18),
	(8, 18),
    (10, 20); 

 -- 16. thêm bảng dữ liệu events 
  INSERT INTO [TicketEZ].[dbo].[Events] ([name], [description], [start_date], [end_date], [banner], [status], [cinema_complex_id])
VALUES
  (N'Sự kiện Buổi ra mắt phim mới', N'Rạp phim thường tổ chức buổi ra mắt các bộ phim mới với sự kiện đặc biệt, bao gồm việc mời các diễn viên và đạo diễn tham dự.', '2023-12-01', '2023-12-05', 'bannerA.jpg', 1, 1),
  (N'Sự kiện Ngày hội phim hoạt hình', N'Một sự kiện dành riêng cho các bộ phim hoạt hình, có thể kèm theo các hoạt động vui chơi và trò chơi dành cho trẻ em', N'2023-11-20', '2023-11-25', 'bannerB.jpg', 1, 2),
  (N'Sự kiện Tuần lễ phim nước ngoài', N'Rạp phim có thể tổ chức các tuần lễ đặc biệt để giới thiệu các bộ phim từ các quốc gia khác nhau', '2023-10-25', '2023-11-02', 'bannerC.jpg', 0, 3),
   (N'Marathon phim', N'Buổi chiếu liên tiếp của một loạt phim cùng chủ đề hoặc của cùng một series', '2023-10-25', '2023-11-02', 'bannerC.jpg', 1, 3),
	(N'Sự kiện Buổi chiếu phim cổ điển', N'Rạp phim có thể tổ chức các buổi chiếu phim cổ điển để làm tái hiện các bộ phim kinh điển trên màn ảnh lớn', '2023-10-25', '2023-11-02', 'bannerC.jpg', 0, 3),
   (N'Sự kiện Khuyến mãi vé và phần thưởng', N'Các chương trình khuyến mãi và phần thưởng cho các khách hàng thường xuyên có thể là một phần quan trọng của sự kiện của rạp phim', '2023-10-25', '2023-11-02', 'bannerC.jpg', 1, 3),
   (N'Sự kiện Thảm đỏ và sự kiện thời trang', N' Cho các buổi ra mắt phim hoặc sự kiện đặc biệt, thảm đỏ và sự kiện thời trang có thể được tổ chức', '2023-10-25', '2023-11-02', 'bannerC.jpg', 1, 3)


-- 17.  thêm dữ liệu bảng accounts
  INSERT INTO [TicketEZ].[dbo].[Accounts] ([phone], [fullname], [email], [password], [image], [birthday], [gender], [role], [active], [verified], [points])
VALUES ('0987654321', N'Nguyễn Văn A', 'nguyenvana@email.com', 'abc123', 'profile_image.jpg', '1990-01-01', 1, 0, 1, 1, 1000),
 ('0866602116', N'Phùng Tự Hiếu', 'hieuphung@gmail.com', 'tuhieu123', 'profile_image.jpg', '2003-11-11', 1, 1, 1, 1, 1000),
('0945747051', N'Nguyễn Văn Hữu Tài', 'taivan@gmail.com', 'tai567', 'profile_image.jpg', '2003-04-01', 1, 0, 1, 1, 1000),
('0945518487', N'Nguyễn Minh Khôi', 'khoiminh@gmail.com', 'khoi123', 'profile_image.jpg', '2003-01-17', 1, 0, 1, 1, 1000),
('0393618987', N'Nguyễn Nhựt Đông', 'nhutdong@email.com', 'dong444', 'profile_image.jpg', '2003-08-21', 1, 1, 1, 1, 1000),
('0994949994', N'Nguyễn Hoàng Dinh', 'Dinh@gmail.com', 'dinh069', 'profile_image.jpg', '2003-09-24', 1, 0, 1, 1, 1000),
('0945584889', N'Trần Tấn Khanh', 'khanhtran@email.com', 'abc123', 'profile_image.jpg', '2003-10-13', 1, 0, 1, 1, 1000)


-- 18. thêm dữ liệu bảng actor

  INSERT INTO [TicketEZ].[dbo].[Actors] ([fullname], [birthday], [avatar])
VALUES (N'Nguyễn Văn Thanh', '1990-01-01', 'actor_image1.jpg'),
 (N'Nguyễn Tuấn', '1993-01-01', 'actor_image1.jpg'),
  (N'Trấn Thành', '1989-01-01', 'actor_image1.jpg'),
  (N'Trương Thế Vinh', '1988-01-01', 'actor_image1.jpg'),
   (N'Võ Thành Tâm ', '1994-01-01', 'actor_image1.jpg'),
    (N'Thanh Trúc', '1995-01-01', 'actor_image1.jpg'),
	 (N'Hứa Minh Đạt', '1990-01-01', 'actor_image1.jpg'),
	  (N'Lâm Chấn Khang', '1996-01-01', 'actor_image1.jpg'),
	   (N'Chris Hemsworth', '1996-01-01', 'actor_image1.jpg'),
	    (N'Tom Hiddleston ', '1999-01-01', 'actor_image1.jpg'),
		 (N'Benedict Cumberbatch', '2000-01-01', 'actor_image1.jpg'),
		  (N'Scarlett Johansson', '2000-01-01', 'actor_image1.jpg'),
		   (N'NTom Holland', '2000-01-01', 'actor_image1.jpg'),
		    (N'Chadwick Boseman', '1990-01-01', 'actor_image1.jpg'),
			 (N'Brie Larson', '1990-01-01', 'actor_image1.jpg'),
			  (N'Sebastian Stan', '1990-01-01', 'actor_image1.jpg'),
			   (N'Anthony Mackie ', '1990-01-01', 'actor_image1.jpg'),
			    (N'Idris Elba', '1990-01-01', 'actor_image1.jpg');

-- 19. thêm dữ liệu  actors_movie
 INSERT INTO [TicketEZ].[dbo].[Actors_Movies] ([actor_id], [movie_id])
VALUES (1, 10),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(1, 8),
(2, 4),
(4, 4),
(7, 2),
(1, 5),
(8, 7),
(9, 8),
(10, 9),
(11, 16),
(12, 13),
(13, 11),
(14, 12),
(15, 13),
(6, 12),
(11, 9),
(12, 11),
(17, 18),
(18, 17);

-- 20. thêm dữ liệu vào bảng formats
INSERT INTO [TicketEZ].[dbo].[Formats] ([name], [description])
VALUES ('2D', N'Phim 2D thường được chiếu trên màn hình phẳng.'),
       ('3D', N'Phim 3D sử dụng công nghệ 3D để tạo ra hiệu ứng chiếu rộng hơn và chi tiết hơn.'),
       ('IMAX', N'Phim IMAX có hình ảnh và âm thanh tối ưu trên màn hình IMAX lớn.'),
	   ('4DX', N'Phim 4DX có thêm hiệu ứng vị trí và chuyển động để tạo trải nghiệm thực tế hơn cho khán giả.'),
  ('Dolby Atmos', N'Phim Dolby Atmos cung cấp âm thanh vòm cao cấp với nhiều lớp âm thanh khác nhau.'),
  ('ScreenX', N'Phim ScreenX được chiếu trên nhiều màn hình, tạo ra trải nghiệm hình ảnh rộng hơn.'),
  ('VIP', N'Phim VIP được chiếu tại các phòng chiếu cao cấp với dịch vụ phục vụ tốt hơn.'),
  ('Standard', N'Phim dạng Standard là loại phim thông thường.'),
  ('D-Box', N'Phim D-Box có ghế có khả năng rung lắc để đồng bộ với hành động trong phim.'),
  ('4K Ultra HD', N'Phim 4K Ultra HD có độ phân giải cao hơn và chi tiết rõ nét hơn.'),
  ('HDR', N'Phim HDR (High Dynamic Range) có độ tương phản và màu sắc tốt hơn.');

--21. thêm dữ liệu vào bảng  formats_movies
INSERT INTO [TicketEZ].[dbo].[Formats_Movies] ([movie_id], [format_id])
VALUES (1, 2),
(13, 2),
(18, 2),
(3, 3),
(4, 3),
(6, 3),
(7, 4),
(17, 5),
(14, 9),
(5, 10),
(14, 11);

-- 22. thêm bảng dữ liệu của bảng verification
INSERT INTO [TicketEZ].[dbo].[Verification] ([account_id], [code], [created_at], [expires_at], [active])
VALUES
  ('0393618987', 'abc123', '2023-10-05 08:00:00', '2023-10-10 08:00:00', 1),
  ('0945584889', 'abc456', '2023-10-06 08:00:00', '2023-10-11 08:00:00', 1),
  ('0994949994', 'abc789', '2023-10-07 08:00:00', '2023-10-12 08:00:00', 0);
-- Thêm dữ liệu cho các bản ghi khác tương tự

-- 23. thêm dữ liệu bảng Showtimes
 INSERT INTO [TicketEZ].[dbo].[Showtimes] ([start_time], [end_time], [status], [movie_id], [cinema_id])
VALUES
  ('2023-10-10 10:00:00', '2023-10-10 12:00:00', 1, 1, 1),
  ('2023-10-12 14:00:00', '2023-10-10 16:00:00', 1, 2, 2),
  ('2023-10-11 10:00:00', '2023-10-11 12:00:00', 0, 3, 1);

-- 24. thêm dữ liệu bảng booking
INSERT INTO [TicketEZ].[dbo].[Booking] ([id], [account_id], [create_date], [showtime_id])
VALUES
  ('booking1','0866602116', '2023-10-10 09:30:00', 1),
   ('booking2','0866602116', '2023-10-10 09:30:00', 1);

--25. thêm dữ liệu bảng Directors
    INSERT INTO [TicketEZ].[dbo].[Directors] ([fullname], [birthday], [avatar])
VALUES
  ('Nguyễn Thị A', '1980-05-15', 'director_avatar1.jpg'),
  ('Trần Văn B', '1975-08-20', 'director_avatar2.jpg'),
  ('Lê Thị C', '1990-03-10', 'director_avatar3.jpg');

-- 26. thêm dữ liệu bảng [Directors_Movies]

  INSERT INTO [TicketEZ].[dbo].[Directors_Movies] ([director_id], [movie_id])
VALUES
  (1, 1),
  (2, 1),
  (3, 2);

  -- 27 thêm dữ liệu bảng [Payment_Info]
  /*
  INSERT INTO [TicketEZ].[dbo].[Payment_Info] ([transaction_id], [tmn_code], [booking_id], [amount], [pay_date], [order_info], [bank_code], [transaction_status])
VALUES
  ('TT01','TMN001', 'booking1', 500000, '2023-10-15 10:30:00', 'Order #12345', 'BANK001', 1),
  ('TT02','TMN003', 'booking2', 1000000, '2023-10-17 11:45:00', 'Order #54321', 'BANK003', 2);
  */
-- 28. thêm dữ liệu vào bảng .[Reviews]

  INSERT INTO [TicketEZ].[dbo].[Reviews] ([comment], [rating], [create_date], [edit_date], [account_id], [movie_id])
VALUES
  ('Đánh giá phim rất hay!', 5, '2023-10-20 08:30:00', '2023-10-20 08:30:00', '0866602116', 1),
  ('Phim thú vị, nhưng kết thúc khá buồn', 4, '2023-10-21 12:45:00', '2023-10-21 12:45:00', '0866602116', 1),
  ('Không thích phim này lắm', 2, '2023-10-22 17:20:00', NULL, '0866602116', 2);

  -- 29. theem dữ liệu vào bảng [Seats_Booking]
  /*
  INSERT INTO [TicketEZ].[dbo].[Seats_Booking] ([seat_id], [booking_id], [status])
VALUES
  ('1','booking1', 1), -- Giả sử status là True (1) cho trạng thái đã đặt chỗ
  ('2','booking1', 0), -- Giả sử status là False (0) cho trạng thái chưa đặt chỗ
  ('3','booking1', 1); -- Thêm dữ liệu cho các ghế khác với trạng thái khác nhau
  */
  -- 30 thêm dữ liệu vào bảng .[Services_Booking]
  /*
  INSERT INTO [TicketEZ].[dbo].[Services_Booking] ([booking_id], [service_id])
VALUES
  ('booking1', 1), -- Thêm dịch vụ có ID 101 vào đặt chỗ có ID 1
  ('booking2', 2);

-- 31. thêm dữ liệu vào bảng .[Discounts_Booking]

  INSERT INTO [TicketEZ].[dbo].[Discounts_Booking] ([discount_id], [booking_id])
VALUES
  (1, 'booking1'), -- Thêm mã giảm giá có ID 1 vào đặt chỗ có ID 101
  (3, 'booking2');
*/
SELECT * FROM Accounts
SELECT * FROM Verification
SELECT * FROM Reviews
SELECT * FROM Genres
SELECT * FROM Genres_Movies
SELECT * FROM Movie_Studio
SELECT * FROM MPAA_Rating
SELECT * FROM Movies
SELECT * FROM Formats
SELECT * FROM Formats_Movies
SELECT * FROM Directors
SELECT * FROM Directors_Movies
SELECT * FROM Actors
SELECT * FROM Actors_Movies
SELECT * FROM Provinces
SELECT * FROM Cinema_Complex
SELECT * FROM Seat_Types
SELECT * FROM Seats
SELECT * FROM SeatChart
SELECT * FROM Seats_Booking
SELECT * FROM Price
SELECT * FROM Events
SELECT * FROM Services
SELECT * FROM Price_Services
SELECT * FROM Cinema_Types
SELECT * FROM Cinemas
SELECT * FROM Discounts
SELECT * FROM Discounts_Booking
SELECT * FROM Showtimes
SELECT * FROM Booking
SELECT * FROM Payment_Info
SELECT * FROM Services_Booking