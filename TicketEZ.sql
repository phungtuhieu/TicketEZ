USE [master]

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
    birthday DATE NOT NULL,
    gender BIT NOT NULL,
    [role] BIT NOT NULL,
    active BIT NOT NULL,
    verified BIT NOT NULL,
    points INT NOT NULL
)
GO

CREATE TABLE Verification (
    id BIGINT IDENTITY(1,1) NOT NULL,
    account_id NVARCHAR(15) NOT NULL,
    code NVARCHAR(6) NOT NULL,  
    created_at DATETIME NOT NULL,
    expires_at DATETIME NOT NULL,
    active BIT NOT NULL
)
GO

CREATE TABLE Reviews(
    id BIGINT IDENTITY(1,1) NOT NULL,
    comment NVARCHAR(MAX) ,
    rating FLOAT NOT NULL,
    create_date DATETIME NOT NULL,
    edit_date DATETIME,
    account_id NVARCHAR(15) NOT NULL,
    movie_id BIGINT NOT NULL
)
GO

CREATE TABLE Genres (
    id BIGINT IDENTITY(1,1) NOT NULL,
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
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(250) NOT NULL,
    country NVARCHAR(150) NOT NULL,
    email NVARCHAR(350) NOT NULL,
    [description] NVARCHAR(MAX)
)
GO

CREATE TABLE MPAA_Rating (
    id BIGINT IDENTITY(1,1) NOT NULL,
    [rating_code] NVARCHAR(10) NOT NULL,
    icon NVARCHAR(MAX) NOT NULL,
    [description] NVARCHAR(MAX)
)
GO

CREATE TABLE Movies(
    id BIGINT IDENTITY(1,1) NOT NULL,
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

CREATE TABLE Formats(
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(20) NOT NULL,
    [description] NVARCHAR(MAX) 
)
GO

CREATE TABLE Formats_Movies(
    movie_id BIGINT  NOT NULL,
    format_id BIGINT  NOT NULL
)
GO

CREATE TABLE Directors (
    id BIGINT IDENTITY(1,1) NOT NULL,
    fullname  NVARCHAR(100) NOT NULL,
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
    id BIGINT IDENTITY(1,1) NOT NULL,
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
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(200) NOT NULL
)
GO

CREATE TABLE Cinema_Complex (
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(200) NOT NULL,
    [address] NVARCHAR(MAX) NOT NULL,
    phone NVARCHAR(15) NOT NULL ,
    opening_time TIME(0) NOT NULL,
    closing_time TIME(0) NOT NULL,
    province_id BIGINT NOT NULL
)
GO

CREATE TABLE Seat_Types(
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(200) NOT NULL,
    [image]  NVARCHAR(MAX) NOT NULL,
    [description] NVARCHAR(MAX)
)
GO

CREATE TABLE Seats(
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(200) NOT NULL,
    [status]  BIT NOT NULL,
    [description] NVARCHAR(MAX),
    seat_type_id BIGINT NOT NULL,
    cinema_id BIGINT NOT NULL,
)
GO



CREATE TABLE Seats_Booking(
    seat_id BIGINT NOT NULL,
    [booking_id]  NVARCHAR(30) NOT NULL,
    [status] INT NOT NULL -- ĐÃ ĐẶT, ĐANG CHỌN, ĐÃ CHỌN
)
GO

CREATE TABLE Price (
    id BIGINT IDENTITY(1,1) NOT NULL,
    weekday_price FLOAT NOT NULL,
    weekend_price FLOAT NOT NULL,
    [start_date] DATETIME NOT NULL,
    end_date  DATETIME NOT NULL,
    [status] BIT NOT NULL,
    seat_type_id BIGINT NOT NULL,
    movie_id BIGINT NOT NULL,
    cinema_complex_id BIGINT NOT NULL
)
GO


CREATE TABLE Events (
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(200) NOT NULL,
    [description] NVARCHAR(MAX),
    [start_date] DATETIME NOT NULL,
    end_date  DATETIME NOT NULL,
    banner NVARCHAR(MAX) NOT NULL,
    [status] BIT NOT NULL,
    cinema_complex_id  BIGINT NOT NULL
)
GO

CREATE TABLE Services (
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(200) NOT NULL,
    [description] NVARCHAR(MAX),
    [image] NVARCHAR(MAX) NOT NULL,
    cinema_complex_id  BIGINT NOT NULL
)
GO

CREATE TABLE Price_Services (
    id BIGINT IDENTITY(1,1) NOT NULL,
    price FLOAT NOT NULL,
    [start_date] DATETIME NOT NULL,
    end_date  DATETIME NOT NULL,
    service_id  BIGINT NOT NULL
)
GO

CREATE TABLE Cinema_Types (
    id BIGINT IDENTITY(1,1) NOT NULL,
    type_name NVARCHAR(100) NOT NULL,
    [description] NVARCHAR(MAX) 
)
GO

CREATE TABLE Cinemas (
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(255) NOT NULL,
    [status] BIT NOT NULL,
    cinema_type_id BIGINT  NOT NULL,
    cinema_complex_id BIGINT NOT NULL
)
GO


-- CHƯA HOÀN THIỆN - DISCOUNT
CREATE TABLE Discounts (
    id BIGINT IDENTITY(1,1) NOT NULL,
    title NVARCHAR(500) NOT NULL,
    coupon_code VARCHAR(20) NOT NULL,
    amount FLOAT NOT NULL,
    [start_date] DATETIME NOT NULL,
    end_date  DATETIME NOT NULL,
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
    id BIGINT IDENTITY(1,1) NOT NULL,
    start_time NVARCHAR(15) NOT NULL,
    end_time DATETIME NOT NULL,
    [status] BIGINT NOT NULL,
    movie_id BIGINT NOT NULL,
    cinema_id BIGINT NOT NULL
)
GO

CREATE TABLE Booking (
    id NVARCHAR(30) NOT NULL, -- HD23082023(Ngày giờ mili giây + hash)
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
	bank_code NVARCHAR(25) ,
 	transaction_status NVARCHAR(3) NOT NULL,
)
GO 

CREATE TABLE Services_Booking (
	booking_id NVARCHAR(30) NOT NULL,
	service_id BIGINT NOT NULL
)
GO 

ALTER TABLE Accounts
ADD CONSTRAINT PK_Accounts PRIMARY KEY (phone);
GO

ALTER TABLE Actors
ADD CONSTRAINT PK_Actors PRIMARY KEY (id);
GO

ALTER TABLE Actors_Movies
ADD CONSTRAINT PK_Actors_Movies PRIMARY KEY (actor_id,movie_id);
GO

ALTER TABLE Cinemas
ADD CONSTRAINT PK_Cinemas PRIMARY KEY (id);
GO

ALTER TABLE Cinema_Complex
ADD CONSTRAINT PK_Cinema_Complex PRIMARY KEY (id);
GO

ALTER TABLE Cinema_Types
ADD CONSTRAINT PK_Cinema_Types PRIMARY KEY (id);
GO

ALTER TABLE Directors
ADD CONSTRAINT PK_Directors PRIMARY KEY (id);
GO

ALTER TABLE Directors_Movies
ADD CONSTRAINT PK_Directors_Movies PRIMARY KEY (director_id,movie_id);
GO

ALTER TABLE [Events]
ADD CONSTRAINT PK_Events PRIMARY KEY (id);
GO

ALTER TABLE Formats
ADD CONSTRAINT PK_Formats PRIMARY KEY (id);
GO

ALTER TABLE Formats_Movies
ADD CONSTRAINT PK_Formats_Movies PRIMARY KEY (format_id,movie_id);
GO

ALTER TABLE Genres
ADD CONSTRAINT PK_Genres PRIMARY KEY (id);
GO

ALTER TABLE Genres_Movies
ADD CONSTRAINT PK_Genres_Movies PRIMARY KEY (genre_id,movie_id);
GO

ALTER TABLE Movies
ADD CONSTRAINT PK_Movies PRIMARY KEY (id);
GO

ALTER TABLE Movie_Studio
ADD CONSTRAINT PK_Movie_Studio PRIMARY KEY (id);
GO

ALTER TABLE Payment_Info
ADD CONSTRAINT PK_Payment_Info PRIMARY KEY (transaction_id);
GO

ALTER TABLE Price
ADD CONSTRAINT PK_Price PRIMARY KEY (id);
GO

ALTER TABLE Price_Services
ADD CONSTRAINT PK_Price_Services PRIMARY KEY (id);
GO

ALTER TABLE Provinces
ADD CONSTRAINT PK_Provinces PRIMARY KEY (id);
GO

ALTER TABLE Reviews
ADD CONSTRAINT PK_Reviews PRIMARY KEY (id);
GO

ALTER TABLE Seat_Types
ADD CONSTRAINT PK_Seat_Types PRIMARY KEY (id);
GO

ALTER TABLE Seats
ADD CONSTRAINT PK_Seats PRIMARY KEY (id);
GO

ALTER TABLE Seats_Booking
ADD CONSTRAINT PK_Seats_Booking PRIMARY KEY (seat_id,booking_id);
GO

ALTER TABLE [Services]
ADD CONSTRAINT PK_Services PRIMARY KEY (id);
GO

ALTER TABLE Showtimes
ADD CONSTRAINT PK_Showtimes PRIMARY KEY (id);
GO

ALTER TABLE Booking
ADD CONSTRAINT PK_Booking PRIMARY KEY (id);
GO

ALTER TABLE Discounts
ADD CONSTRAINT PK_Discounts PRIMARY KEY (id);
GO

ALTER TABLE Verification
ADD CONSTRAINT PK_Verification PRIMARY KEY (id);
GO


ALTER TABLE Services_Booking
ADD CONSTRAINT PK_Services_Booking PRIMARY KEY (booking_id,service_id);
GO

ALTER TABLE Discounts_Booking
ADD CONSTRAINT PK_Discounts_Booking PRIMARY KEY (booking_id,discount_id);
GO

ALTER TABLE MPAA_Rating
ADD CONSTRAINT PK_MPAA_Rating PRIMARY KEY (id);
GO


-- TẠO KHOÁ NGOẠI

ALTER TABLE Verification
ADD CONSTRAINT FK_Verification_Accounts
FOREIGN KEY (account_id) REFERENCES Accounts(phone) 
GO

-- Reviews
ALTER TABLE Reviews
ADD CONSTRAINT FK_Reviews_Accounts
FOREIGN KEY (account_id) REFERENCES Accounts(phone) 
GO

ALTER TABLE Reviews
ADD CONSTRAINT FK_Reviews_Movies
FOREIGN KEY (movie_id) REFERENCES Movies(id) 
GO  
-- /Reviews

-- Showtimes
ALTER TABLE Showtimes
ADD CONSTRAINT FK_Showtimes_Cinema
FOREIGN KEY (cinema_id) REFERENCES Cinemas(id) 
GO  

ALTER TABLE Showtimes
ADD CONSTRAINT FK_Showtimes_Movies
FOREIGN KEY (movie_id) REFERENCES Movies(id) 
GO  
-- /Showtimes

-- Price
ALTER TABLE Price
ADD CONSTRAINT FK_Price_Movies
FOREIGN KEY (movie_id) REFERENCES Movies(id) 
GO  

ALTER TABLE Price
ADD CONSTRAINT FK_Price_SeatTypes
FOREIGN KEY (seat_type_id) REFERENCES Seat_Types(id) 
GO  

ALTER TABLE Price
ADD CONSTRAINT FK_Price_CinemaComplex
FOREIGN KEY (cinema_complex_id) REFERENCES Cinema_Complex(id) 
GO  
-- /Price
-- Directors_Movies
ALTER TABLE Directors_Movies
ADD CONSTRAINT FK_DirectorMovies_Movies
FOREIGN KEY (movie_id) REFERENCES Movies(id) 
GO  

ALTER TABLE Directors_Movies
ADD CONSTRAINT FK_DirectorMovies_Directors
FOREIGN KEY (director_id) REFERENCES Directors(id) 
GO  
-- /Directors_Movies

-- Formats_Movies
ALTER TABLE Formats_Movies
ADD CONSTRAINT FK_FormatsMovies_Movies
FOREIGN KEY (movie_id) REFERENCES Movies(id) 
GO  

ALTER TABLE Formats_Movies
ADD CONSTRAINT FK_FormatsMovies_Formats
FOREIGN KEY (format_id) REFERENCES Formats(id) 
GO  
-- /Formats_Movies

-- Genres_Movies
ALTER TABLE Genres_Movies
ADD CONSTRAINT FK_GenresMovies_Movies
FOREIGN KEY (movie_id) REFERENCES Movies(id) 
GO  

ALTER TABLE Genres_Movies
ADD CONSTRAINT FK_Genres_Movies
FOREIGN KEY (genre_id) REFERENCES Genres(id) 
GO  
-- /Genres_Movies

-- Actors_Movies
ALTER TABLE Actors_Movies
ADD CONSTRAINT FK_ActorsMovies_Movies
FOREIGN KEY (movie_id) REFERENCES Movies(id) 
GO  

ALTER TABLE Actors_Movies
ADD CONSTRAINT FK_ActorsMovies_Actors
FOREIGN KEY (actor_id) REFERENCES Actors(id) 
GO  

-- /Actors_Movies


-- Movies
ALTER TABLE Movies
ADD CONSTRAINT FK_Movies_MPAArating
FOREIGN KEY (MPAA_rating_id) REFERENCES MPAA_Rating(id) 
GO  

ALTER TABLE Movies
ADD CONSTRAINT FK_Movies_MovieStudio
FOREIGN KEY (movie_studio_id) REFERENCES Movie_Studio(id) 
GO  
-- /Movies

-- Seat 
ALTER TABLE [Seats]
ADD CONSTRAINT FK_Seats_SeatTypes
FOREIGN KEY (seat_type_id) REFERENCES Seat_Types(id) 
GO  

ALTER TABLE [Seats]
ADD CONSTRAINT FK_Seats_Cinemas
FOREIGN KEY (cinema_id) REFERENCES Cinemas(id) 
GO  
-- /Seats
-------------- Cinema_Complex

ALTER TABLE [Events]
ADD CONSTRAINT FK_Events_CinemaComplex
FOREIGN KEY (cinema_complex_id) REFERENCES Cinema_Complex(id) 
GO  

ALTER TABLE [Services]
ADD CONSTRAINT FK_Service_Cinema_Complex
FOREIGN KEY (cinema_complex_id) REFERENCES Cinema_Complex(id) 
GO  

ALTER TABLE Price_Services
ADD CONSTRAINT FK_PriceService_Service
FOREIGN KEY (service_id) REFERENCES [Services](id) 
GO  

ALTER TABLE Cinema_Complex
ADD CONSTRAINT FK_CinemaComplex_Provinces
FOREIGN KEY (province_id) REFERENCES Provinces(id) 
GO 

ALTER TABLE Discounts
ADD CONSTRAINT FK_Discount_Cinema_Complex
FOREIGN KEY (cinema_complex_id) REFERENCES Cinema_Complex(id) 
GO 

-- Discount_Booking
ALTER TABLE Discounts_Booking
ADD CONSTRAINT FK_DiscountsBooking_Discounts
FOREIGN KEY (discount_id) REFERENCES Discounts(id) 
GO 

ALTER TABLE Discounts_Booking
ADD CONSTRAINT FK_DiscountsBooking_Booking
FOREIGN KEY (booking_id) REFERENCES Booking(id) 
GO 
-- /Discount_Booking
-- Cinema
    

    
ALTER TABLE Cinemas
ADD CONSTRAINT FK_Cinemas_CinemaComplex
FOREIGN KEY (cinema_complex_id) REFERENCES Cinema_Complex(id) 
GO  

    
ALTER TABLE Cinemas
ADD CONSTRAINT FK_Cinemas_Cinema_Types
FOREIGN KEY (cinema_type_id) REFERENCES Cinema_Types(id) 
GO  
-- /Cinema

-- -- Seats_Booking
ALTER TABLE [Seats_Booking]
ADD CONSTRAINT FK_SeatsBooking_Seats
FOREIGN KEY (seat_id) REFERENCES Seats(id) 
GO  

ALTER TABLE [Seats_Booking]
ADD CONSTRAINT FK_SeatsBooking_Booking
FOREIGN KEY (booking_id) REFERENCES Booking(id) 
GO  
-- /Seats_Booking

-- Booking
ALTER TABLE [Booking]
ADD CONSTRAINT FK_Booking_Showtimes
FOREIGN KEY (showtime_id) REFERENCES Showtimes(id) 
GO  

ALTER TABLE [Booking]
ADD CONSTRAINT FK_Booking_Accounts
FOREIGN KEY (account_id) REFERENCES Accounts(phone) 
GO  

-- /Booking

-- Services_Booking
ALTER TABLE [Services_Booking]
ADD CONSTRAINT FK_ServicesBooking_Booking
FOREIGN KEY ( booking_id) REFERENCES Booking(id) 
GO  

ALTER TABLE [Services_Booking]
ADD CONSTRAINT FK_ServicesBooking_Services
FOREIGN KEY (service_id) REFERENCES Services(id) 
GO  

-- /Services_Booking


-- Payment_Info
    
ALTER TABLE [Payment_Info]
ADD CONSTRAINT FK_PaymentInfo_Booking
FOREIGN KEY (booking_id) REFERENCES Booking(id) 
GO  
-- /Payment_Info