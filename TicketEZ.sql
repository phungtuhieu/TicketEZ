
USE [master]
GO

CREATE DATABASE TicketEZ 
GO
    -- DROP DATABASE TicketEZ 
    USE TicketEZ
GO
 
CREATE TABLE Roles (
	 id BIGINT IDENTITY(1,1) NOT NULL,
	 [name] NVARCHAR(255) NOT NULL,
	 [description] NVARCHAR(MAX)
)
GO
	
CREATE TABLE Accounts (
	id NVARCHAR(20) NOT NULL,
    phone NVARCHAR(15) ,
    fullname NVARCHAR(100),
	[image] NVARCHAR(MAX),
    email NVARCHAR(350) NOT NULL,
	[address] NVARCHAR(MAX),
    [password] NVARCHAR(255) NOT NULL,
    birthday DATE,
    gender BIT ,
    [status] INT ,
    verified BIT ,
	created_date DATETIME ,
    points INT  
)
GO
CREATE TABLE Account_Lock_History(
    id BIGINT IDENTITY(1,1) NOT NULL,
    event_type INT NOT NULL, -- unlock hoặc lock tài khoản, lock: true, unlock: false
    event_date DATETIME NOT NULL, 
    reason NVARCHAR(MAX) NOT NULL, -- lý do unlock hoặc lock 
	account_id NVARCHAR(20) NOT NULL,
)
GO

CREATE TABLE Accounts_Roles (
	account_id NVARCHAR(20) NOT NULL,
	role_id BIGINT NOT NULL,
)
GO

CREATE TABLE Activity_Logs (
    id BIGINT IDENTITY(1,1) NOT NULL,
    time_stamp DATETIME NOT NULL, -- Thời gian thực hiện
	[action] NVARCHAR(MAX) NOT NULL, -- Thêm, sửa, xóa, đăng nhập, đăng xuất
	[description] NVARCHAR(MAX) NOT NULL,
	ip_address NVARCHAR(MAX) NOT NULL,
	[user_agent] NVARCHAR(MAX) NOT NULL, -- Thông tin của trình duyệt: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36
	[result] NVARCHAR(50) NOT NULL, -- Thành công, thất bại
	account_id NVARCHAR(20) NOT NULL,
    old_data NVARCHAR(MAX), -- Lưu các thông tin trước khi "xóa", "cập nhật" (Không bắt buộc)
    new_data NVARCHAR(MAX) -- Lưu các thông tin sau khi "Thêm", "cập nhật" (Không bắt buộc)
)
GO
    CREATE TABLE Verification (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        account_id NVARCHAR(20) NULL,
        code NVARCHAR(6) NULL,
        created_at DATETIME NULL,
        expires_at DATETIME NULL,
        active BIT NULL
    )
GO
    CREATE TABLE Reviews (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        comment NVARCHAR(MAX),
        rating FLOAT NOT NULL,
        create_date DATETIME NOT NULL,
        edit_date DATETIME,
        account_id NVARCHAR(20) NOT NULL,
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
    CREATE TABLE Studios (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(250) NOT NULL,
		[image] NVARCHAR(MAX) NOT NULL,
        [founded_date] DATE NOT NULL,
        country NVARCHAR(150) NOT NULL,
        email NVARCHAR(350) NOT NULL,
        [address] NVARCHAR(MAX) NOT NULL,
        website NVARCHAR(MAX) NOT NULL,
        [description] NVARCHAR(MAX)
    )
GO
    CREATE TABLE Producers (
        id BIGINT IDENTITY(1, 1) NOT NULL,
		[name] NVARCHAR(250) NOT NULL,
		[image] NVARCHAR(MAX) NOT NULL,
		[birthday] DATE NOT NULL,
        nationality NVARCHAR(150) NOT NULL,
        email NVARCHAR(350) NOT NULL,
        [biography] NVARCHAR(MAX)
    )
GO

    CREATE TABLE Movies_Producers (
        movie_id BIGINT NOT NULL,
		producer_id BIGINT NOT NULL,
    )
GO
CREATE TABLE Movies_Studios (
        movie_id BIGINT NOT NULL,
		studio_id BIGINT NOT NULL,
    )
GO

    CREATE TABLE MPAA_Rating (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [rating_code] NVARCHAR(10) NOT NULL,
        icon NVARCHAR(MAX) NOT NULL,
		[color_code] NVARCHAR(30) NOT NULL,
        [description] NVARCHAR(MAX)
    )
GO
    CREATE TABLE Movies (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        title NVARCHAR (500) NOT NULL,
        poster NVARCHAR(MAX) NOT NULL,
        banner NVARCHAR(MAX) NOT NULL,
        [description] NVARCHAR(MAX) NOT NULL,
        duration TIME(0) NOT NULL,
        release_date DATE NOT NULL,
        country NVARCHAR(150) NOT NULL,
        rating FLOAT NOT NULL,
        --movie_studio_id BIGINT NOT NULL,
		--movie_producer_id BIGINT NOT NULL,
        video_trailer NVARCHAR(MAX) NOT NULL,
        MPAA_rating_id BIGINT NOT NULL
    )
GO

-- Lưu các top phim như (Top 10 phim hành động, top 10 phim xem nhiều nhất)
CREATE TABLE Articles(
    id BIGINT IDENTITY(1, 1) NOT NULL,
    title NVARCHAR(255) NOT NULL,
	banner NVARCHAR(MAX) NOT NULL,
    content NVARCHAR(MAX) NOT NULL,
	status BIT NOT NULL,--0 là nháp , 1 là đăng
    create_date DATE NOT NULL,
)
GO

CREATE TABLE Articles_Movies(
    movie_id BIGINT NOT NULL,
    article_id BIGINT NOT NULL,
)
GO

    CREATE TABLE Formats (      
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(20) NOT NULL,
        [description] NVARCHAR(MAX)
    )
GO
    CREATE TABLE Formats_Movies (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        movie_id BIGINT NOT NULL,
        format_id BIGINT NOT NULL
    )
GO
    CREATE TABLE Directors (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        fullname NVARCHAR(100) NOT NULL,
		gender BIT NOT NULL,
        birthday DATE NOT NULL,
        country NVARCHAR(150) NOT NULL,
        avatar NVARCHAR(255) NOT NULL,
		email NVARCHAR(255) NOT NULL,
		biography NVARCHAR(MAX) -- lưu tiểu sử
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
		gender BIT NOT NULL,
        birthday DATE NOT NULL,
        country NVARCHAR(150) NOT NULL,
        avatar NVARCHAR(255) NOT NULL,
		email NVARCHAR(255) NOT NULL,
		biography NVARCHAR(MAX) -- lưu tiểu sử
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
CREATE TABLE Cinema_Chains (
	id BIGINT IDENTITY(1, 1) NOT NULL,
	[name] NVARCHAR(255) NOT NULL,
    [image] NVARCHAR(MAX) NOT NULL,
	[banner] NVARCHAR(MAX) NOT NULL,
	[description] NVARCHAR(MAX)
) 
GO
    CREATE TABLE Cinema_Complex (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(200) NOT NULL,
        [address] NVARCHAR(MAX) NOT NULL,
        phone NVARCHAR(15) NOT NULL,
        opening_time TIME(0) NOT NULL,
        closing_time TIME(0) NOT NULL,
		[longitude]  FLOAT NOT NULL,
		[latitude]  FLOAT NOT NULL,
        cinema_chain_id BIGINT NOT NULL,
        province_id BIGINT NOT NULL
    )
GO

    CREATE TABLE Seat_Types (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(200) NOT NULL,
		nick_name nvarChar(50) not null,
		color nvarchar(50) not null,
				[width] int not null,
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

-- CREATE TABLE Child_Seat_Chart (
-- 	seat_chart_id BIGINT NOT NULL,
-- 	showtime_id  BIGINT NOT NULL
-- )
-- GO

    CREATE TABLE Seats_Booking (
		id BIGINT IDENTITY(1, 1) NOT NULL,
        [seat_id] BIGINT NOT NULL,
        [booking_id] NVARCHAR(10) NOT NULL,
		[price] FLOAT NOT NULL,
    )
	go 
	
    CREATE TABLE Seats_Choose (
		id BIGINT IDENTITY(1, 1) NOT NULL,
		last_selected_time DATETIME,
		[seat_id] BIGINT NOT NULL,
		showtime_id BIGINT NOT NULL,
    )
GO
    CREATE TABLE Price (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [start_date] DATETIME NOT NULL,
        end_date DATETIME NOT NULL,
        [status] BIT NOT NULL,
        format_movie_id BIGINT NOT NULL,
        cinema_complex_id BIGINT NOT NULL
    )

GO
  CREATE TABLE Price_Seat_Types (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        weekday_price FLOAT NOT NULL,
        weekend_price FLOAT NOT NULL,
        seat_type_id BIGINT NOT NULL,
		price_id BIGINT NOT NULL
    )


GO
    CREATE TABLE [Events] (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(200) NOT NULL,
        [description] NVARCHAR(MAX),
        [start_date] DATETIME NOT NULL,
        end_date DATETIME NOT NULL,
        banner NVARCHAR(MAX) NOT NULL,
        [status] BIT NOT NULL,
        type_event INT NOT NULL,
		account_id NVARCHAR(20) NOT NULL,

    )
GO
    CREATE TABLE [Events_Discounts] (
        event_id BIGINT NOT NULL,
        discount_id BIGINT NOT NULL,
    )
GO
    CREATE TABLE [Services] (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        [name] NVARCHAR(200) NOT NULL,
        [description] NVARCHAR(MAX),
        [image] NVARCHAR(MAX) NOT NULL,
        cinema_complex_id BIGINT NOT NULL
    )
GO

    CREATE TABLE [Service_Choose] (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        service_id BIGINT NOT NULL,
        price FLOAT NOT NULL,
    )

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
    CREATE TABLE Seat_Chart (
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
        booking_id NVARCHAR(10)NOT NULL,
    )
GO
    CREATE TABLE Showtimes (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        start_time DATETIME NOT NULL,
        end_time DATETIME NOT NULL,
        --[status] INT NOT NULL,
        cinema_id BIGINT NOT NULL,
        format_movie_id BIGINT NOT NULL,
        seat_chart_id BIGINT NOT NULL,
		price_id  BIGINT NOT NULL,
    )
GO
    CREATE TABLE Booking (
        id NVARCHAR(10) NOT NULL,
        account_id NVARCHAR(20) NOT NULL,
        create_date DATETIME NOT NULL,
        showtime_id BIGINT NOT NULL,
        [status] INT NOT NULL, -- 0: Thành công, 1: Thanh toán gặp lỗi,...
        [ticket_status] INT NOT NULL, -- 0: Chưa sử dụng, 1: đã sử dụng, 2: Hết hạn
    )
GO
    CREATE TABLE Payment_Info (
        transaction_id NVARCHAR(20) NOT NULL,
        tmn_code NVARCHAR (10) NOT NULL,
        booking_id NVARCHAR(10)NOT NULL,
        amount FLOAT NOT NULL,
        pay_date DATETIME NOT NULL,
        order_info NVARCHAR(100) NOT NULL,
        bank_code NVARCHAR(25),
        transaction_status NVARCHAR(3) NOT NULL,
    )
GO
    CREATE TABLE Services_Booking (
        booking_id NVARCHAR(10)NOT NULL,
        service_id BIGINT NOT NULL,
		price FLOAT NOT NULL
    )
GO

ALTER TABLE Roles
ADD CONSTRAINT PK_Roles PRIMARY KEY(id)
GO

ALTER TABLE Accounts_Roles
ADD CONSTRAINT PK_Accounts_Roles PRIMARY KEY(account_id, role_id)
GO

ALTER TABLE Account_Lock_History
ADD CONSTRAINT PK_Account_Lock_History PRIMARY KEY(id)
GO

ALTER TABLE Activity_Logs
ADD CONSTRAINT PK_Activity_Logs PRIMARY KEY(id)
GO

-- ALTER TABLE Child_Seat_Chart
-- ADD CONSTRAINT PK_Child_Seat_Chart PRIMARY KEY(seat_chart_id,showtime_id)
-- GO

ALTER TABLE
    Accounts
ADD
    CONSTRAINT PK_Accounts PRIMARY KEY (id);

GO

ALTER TABLE
    Producers
ADD
    CONSTRAINT PK_Producers PRIMARY KEY (id);
GO
ALTER TABLE
    Movies_Producers
ADD
    CONSTRAINT PK_Movies_Producers PRIMARY KEY (movie_id, producer_id);
GO


ALTER TABLE
    Service_Choose
ADD
    CONSTRAINT PK_Service_Choose PRIMARY KEY (id);
GO

ALTER TABLE
    Studios
ADD
    CONSTRAINT PK_Studios PRIMARY KEY (id);
GO
ALTER TABLE
    Movies_Studios
ADD
    CONSTRAINT PK_Movies_Studios PRIMARY KEY (movie_id, studio_id);
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
    Cinema_Chains
ADD
    CONSTRAINT PK_Cinema_Chains PRIMARY KEY (id);
GO
ALTER TABLE
    Articles
ADD
    CONSTRAINT PK_Articles PRIMARY KEY (id);
GO
ALTER TABLE
    Articles_Movies
ADD
    CONSTRAINT PK_Article_Movies PRIMARY KEY (movie_id, article_id);
GO
ALTER TABLE
    Seat_Chart
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
    CONSTRAINT PK_Formats_Movies PRIMARY KEY (id);

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
-- ALTER TABLE
--     Studio
-- ADD
--     CONSTRAINT PK_Movie_Studio PRIMARY KEY (id);

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
    CONSTRAINT PK_Seats_Booking PRIMARY KEY (id);

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
ALTER TABLE
    Seats_Choose
ADD
    CONSTRAINT PK_Seats_Choose PRIMARY KEY (id);
GO
ALTER TABLE
     Price_Seat_Types
ADD
    CONSTRAINT PK_Price_Seat_Types PRIMARY KEY (id);

    -- TẠO KHOÁ NGOẠI
ALTER TABLE
    Verification
ADD
    CONSTRAINT FK_Verification_Accounts FOREIGN KEY (account_id) REFERENCES Accounts(id)
GO

ALTER TABLE
    Accounts_Roles
ADD
    CONSTRAINT FK_Accounts_Roles_Accounts FOREIGN KEY (account_id) REFERENCES Accounts(id)
GO
ALTER TABLE
    Activity_Logs
ADD
    CONSTRAINT FK_Activity_Logs_Accounts FOREIGN KEY (account_id) REFERENCES Accounts(id)
GO

-- ALTER TABLE
--     Child_Seat_Chart
-- ADD
--     CONSTRAINT FK_Child_Seat_Chart_Seat_Chart FOREIGN KEY (seat_chart_id) REFERENCES Seat_Chart(id)
-- GO


-- ALTER TABLE
--     Child_Seat_Chart
-- ADD
--     CONSTRAINT FK_Child_Seat_Chart_Showtimes FOREIGN KEY (seat_chart_id) REFERENCES Showtimes(id)
-- GO
-- ALTER TABLE
--     Formats_Movies
-- ADD
--     CONSTRAINT FK_FormatsMovies_Movies FOREIGN KEY (movie_id) REFERENCES Movies(id)
-- GO  
ALTER TABLE
    Account_Lock_History
ADD
    CONSTRAINT FK_Account_Lock_History_Accounts FOREIGN KEY (account_id) REFERENCES Accounts(id)
GO 
ALTER TABLE
    Formats_Movies
ADD
    CONSTRAINT FK_FormatsMovies_Formats FOREIGN KEY (format_id) REFERENCES Formats(id)
GO
ALTER TABLE
    Accounts_Roles
ADD
    CONSTRAINT FK_Accounts_Roles_Roles FOREIGN KEY (role_id) REFERENCES Roles(id)
GO
    -- Reviews
ALTER TABLE
    Reviews
ADD
    CONSTRAINT FK_Reviews_Accounts FOREIGN KEY (account_id) REFERENCES Accounts(id)
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
    CONSTRAINT FK_Showtimes_FormatMovies FOREIGN KEY (format_movie_id) REFERENCES Formats_Movies(id)
GO
ALTER TABLE
    Showtimes
ADD
    CONSTRAINT FK_Showtimes_Price FOREIGN KEY (price_id) REFERENCES price(id)
GO
    -- /Showtimes
    -- Price
ALTER TABLE
    Price
ADD
    CONSTRAINT FK_Price_FormatMovies FOREIGN KEY (format_movie_id) REFERENCES Formats_Movies(id)
GO
/*ALTER TABLE
    Price
ADD
    CONSTRAINT FK_Price_SeatTypes FOREIGN KEY (seat_type_id) REFERENCES Seat_Types(id)
GO
*/
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
    Movies_Studios
ADD
    CONSTRAINT FK_MovieStudio_Movie FOREIGN KEY (movie_id) REFERENCES Movies(id)
GO

ALTER TABLE
    Movies_Studios
ADD
    CONSTRAINT FK_MovieStudios_Studio FOREIGN KEY (studio_id) REFERENCES Studios(id)
GO

ALTER TABLE
    Movies_Producers
ADD
    CONSTRAINT FK_Movies_Producers_Movie FOREIGN KEY (movie_id) REFERENCES Movies(id)
GO
ALTER TABLE
    Movies_Producers
ADD
    CONSTRAINT FK_MovieProducer_Producer FOREIGN KEY (producer_id) REFERENCES Producers(id)
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
    CONSTRAINT FK_Seats_SeatChart FOREIGN KEY (seat_chart_id) REFERENCES Seat_Chart(id)
GO
ALTER TABLE
    Seat_Chart
ADD
    CONSTRAINT FK_SeatChart_Cinemas FOREIGN KEY (cinema_id) REFERENCES Cinemas(id)
GO
    -- /Seats
    -------------- Cinema_Complex
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
    Events_Discounts
ADD
    CONSTRAINT FK_Events_Discounts_Events FOREIGN KEY (event_id) REFERENCES [Events](id)
GO
ALTER TABLE
    Events_Discounts
ADD
    CONSTRAINT FK_Events_Discounts_Discount FOREIGN KEY (discount_id) REFERENCES [Discounts](id)
GO
ALTER TABLE
    Cinema_Complex
ADD
    CONSTRAINT FK_CinemaComplex_Cinema_Chains FOREIGN KEY (cinema_chain_id) REFERENCES Cinema_Chains(id)
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
    CONSTRAINT FK_Booking_Accounts FOREIGN KEY (account_id) REFERENCES Accounts(id)
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
ALTER TABLE
    [Articles_Movies]
ADD
    CONSTRAINT FK_Articles_Movies_Movie FOREIGN KEY (movie_id) REFERENCES Movies(id)
GO
ALTER TABLE
    [Articles_Movies]
ADD
    CONSTRAINT FK_Articles_Movies_Articles FOREIGN KEY (article_id) REFERENCES Articles(id)
GO
ALTER TABLE
    [Service_Choose]
ADD
    CONSTRAINT FK_Service_Choose_Service FOREIGN KEY (service_id) REFERENCES Services(id)
GO
    -- /Services_Booking
    -- Payment_Info
ALTER TABLE
    [Payment_Info]
ADD
    CONSTRAINT FK_PaymentInfo_Booking FOREIGN KEY (booking_id) REFERENCES Booking(id)
GO
ALTER TABLE
    [Seats_Choose]
ADD
    CONSTRAINT FK_Seats_Choose_Seat FOREIGN KEY (seat_id) REFERENCES Seats(id)
GO
	ALTER TABLE
    [Seats_Choose]
ADD
    CONSTRAINT FK_Choose_Seat_showtime FOREIGN KEY (showtime_id) REFERENCES Showtimes(id)
    -- /seatChoose

		ALTER TABLE
    [Price_Seat_Types]
ADD
    CONSTRAINT FK_Price_Seat_Types_price FOREIGN KEY (price_id) REFERENCES Price(id)
GO

		ALTER TABLE
    [Price_Seat_Types]
ADD
    CONSTRAINT FK_Price_Seat_Types_Seat_Type FOREIGN KEY (seat_type_id) REFERENCES Seat_Types(id)
GO


SELECT * FROM Accounts
SELECT * FROM Verification
SELECT * FROM Reviews
SELECT * FROM Genres
SELECT * FROM Genres_Movies

SELECT * FROM Movies_Studios
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


SELECT * FROM [Events]
SELECT * FROM [Services]
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
GO

INSERT INTO Producers ([name],[image],[birthday], nationality, email, [biography])
VALUES
(N'Điện Ảnh Việt',N'image','1980-10-03', N'Việt Nam', 'info@dienanhviet.vn', N'Nhà sản xuất phim Điện Ảnh Việt tại Việt Nam.'),
(N'Phim Trần', N'image','1980-10-05',N'Việt Nam', 'contact@phimtran.vn', N'Nhà sản xuất phim Trần tại Việt Nam.'),
(N'Xuân Phim',N'image','1980-12-13' , N'Việt Nam','contact@xuanphim.com', N'Nhà sản xuất phim Xuân Phim tại Việt Nam.'),
(N'Quốc Dũng Films', N'image','1980-02-25',N'Việt Nam', 'info@quocdungfilms.vn', N'Nhà sản xuất phim Quốc Dũng Films tại Việt Nam.'),
(N'Phim Tây Bắc',N'image','1980-09-08' , N'Việt Nam','contact@phimtaybac.com', N'Nhà sản xuất phim Tây Bắc tại Việt Nam.');
GO

INSERT INTO Cinema_Chains ([name],[image],[banner],[description])
VALUES
(N'CGV',N'cgv.jpg',N'cgvbanner.jpg', N'Rạp chiếu phim CGV - Mạng lưới rạp phim lớn tại Việt Nam.'),
(N'Lotte Cinema', N'lotte.jpg',N'lottebanner.jpg',N'Nhà mạng lưới rạp chiếu phim của Lotte tại Việt Nam.'),
(N'BHD Star Cineplex',N'bhp.jpg',N'bhpbanner.jpg',N'Nhà mạng lưới rạp BHD Star Cineplex tại Việt Nam.'),
(N'Megastar Cineplex',N'mega.jpg',N'megaBannner.jpg', N'Rạp chiếu phim Megastar Cineplex - Một trong những mạng lưới phòng chiếu lớn tại Việt Nam.'),
(N'Galaxy Cinema',N'galaci_cinema.jpg',N'galaci_cinema_banner.jpg', N'Galaxy Cinema - Mạng lưới rạp chiếu phim phổ biến tại Việt Nam.');
GO
-- 2. thêm dữ liệu bảng cinema complex
  INSERT INTO [TicketEZ].[dbo].[Cinema_Complex] ([name], [address], [phone], [opening_time], [closing_time],[latitude],[longitude], [cinema_chain_id],[province_id])
VALUES
    (N'Standard Cinema Complex', N'123 Park Street, Quận 1, Thành phố Hồ Chí Minh', '0192949422', '08:00:00', '22:00:00',10.789879751872588,106.67766713500747,1, 2),
    (N'3D Cinema Complex', N'CM tháng 8, Quận 12, Thành phố Hồ Chí Minh', '0945586789', '09:00:00', '23:00:00',11.942648947844194, 108.46757489149324, 2,2),
    (N'IMAX Cinema Complex', N'Đường Võ Văn Kiệt, Bình Thủy, Cần Thơ', '0111285634', '07:00:00', '21:00:00',12.683889984028019, 108.00538470578515, 3,5),
    (N'VIP Cinema Complex', N'Nguyễn Văn Linh, Ninh Kiều, Cần Thơ', '09897774444', '10:00:00', '23:00:00',13.98730117822659, 107.99614634146174, 4,5),
    (N'Multiplex Cinema Complex', N'Quốc Lộ 1A, Châu Thành, Sóc Trăng', '0908903495', '11:00:00', '23:50:00',16.086851807997597, 108.16118439891675, 5,54),
    (N'Independent Cinema Complex', N'Đường Võ Văn Kiệt, Thành phố Sóc Trăng', '06848829533', '06:00:00', '20:00:00',17.486183473488236, 106.57067083008025, 2,54),
    (N'Boutique Cinema Complex', N'39 Điện Biên Phủ, Phường 1, Thành phố Bạc Liêu, tỉnh Bạc Liêu ', '09993447999', '08:30:00', '22:30:00',18.26987469201251, 105.91811624097883, 3,55),
    (N'Family Cinema Complex', N'Tầng 3, TTTM Vincom Plaza Bạc Liêu, số 18 Hồ Xuân Hương, Phường 1, Thành phố Bạc Liêu, tỉnh Bạc Liêu', '0380008090', '09:30:00', '23:30:00',18.66776727182012, 105.69282952514989, 1,55),
    (N'Sports Cinema Complex', N'CGV Vincom Center Bà Triệu: Tầng 6, Vincom Center Bà Triệu, 191 Bà Triệu, Hai Bà Trưng, Hà Nội', '03419392939', '07:30:00', '21:30:00',18.34362799541733, 105.88704221120933,4, 1),
    (N'Art House Cinema Complex', N'Tầng 5, Keangnam Hanoi Landmark Tower, Phạm Hùng, Từ Liêm, Hà Nội', '0984557777', '10:30:00', '00:30:00',18.675126921754565, 105.66175549538038,5, 1),
    (N'Digital Cinema Complex', N' Tầng 4, Mipec Tower, 229 Tây Sơn, Đống Đa, Hà Nội', '0981237415', '11:30:00', '01:30:00', 19.49003763234295, 105.33547818280053,1,42),
    (N'Live Cinema Complex', N'Tầng 5, Vincom Plaza Biên Hòa, đường Đồng Khởi, Phường Trung Dũng, TP. Biên Hòa, Đồng Nai', '09412367842', '07:30:00', '23:00:00',19.91423237112507, 105.70836655042983, 3,42),
    (N'High-Tech Cinema Complex', N'Tầng 4, TTTM Long Khánh, 104A Trần Hưng Đạo, Phường Long Bình, TP. Long Khánh, Đồng Nai', '0945768900', '08:00:00', '22:00:00',20.555664689128083, 106.10456042999107, 2,42),
    (N'Community Cinema Complex', N'TP. Biên Hòa, Đồng Nai', '0945515456', '09:00:00', '23:00:00',21.078481525791283, 105.79382013229598, 1,42),
    (N'Anime Cinema Complex', N'TP. Biên Hòa, Đồng Nai', '0383834578', '07:00:00', '21:00:00',21.049483918957133, 105.84043116882903, 4,42);
GO


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
GO

 -- 4. Thêm dữ liệu cho bảng Cinemas
INSERT INTO [TicketEZ].[dbo].[Cinemas] ([name], [status], [cinema_type_id], [cinema_complex_id])
VALUES
    (N'Cinema 1 - Standard Cinema Complex ', 1, 1, 1),
    (N'Cinema 2 - Standard Cinema Complex', 1, 3, 1),
    (N'Cinema 1 - 3D Cinema Complex', 1, 7, 2),
    (N'Cinema 2 - 3D Cinema Complex', 1, 6, 2),
    (N'Cinema 1 - IMAX Cinema Complex', 1, 3, 3),
    (N'Cinema 2 - IMAX Cinema Complex', 1, 3, 3),
    (N'Cinema 1 - VIP Cinema Complex', 1, 1, 4),
    (N'Cinema 2 - VIP Cinema Complex', 1, 1, 4),
    (N'Cinema 1 - Multiplex Cinema Complex', 1, 5, 5),
    (N'Cinema 2 - Multiplex Cinema Complex', 1, 7, 5),
	(N'Cinema 1 - Independent Cinema Complex', 1, 3, 6),
	(N'Cinema 2 - Independent Cinema Complex', 1, 3, 6),
	(N'Cinema 1 - Boutique Cinema Complex', 1, 4, 7),
	(N'Cinema 2 - Boutique Cinema Complex', 1, 5, 7),
	(N'Cinema 1 - Family Cinema Complex', 1, 10, 8),
	(N'Cinema 2 - Family Cinema Complex', 1, 8, 8),
	(N'Cinema 1 - Sports Cinema Complex', 1, 6, 9),
		(N'Cinema 2 -Sports Cinema Complex', 1, 6, 9);
GO

-- 5. Thêm dữ liệu cho dịch vụ của rạp phim services
INSERT INTO [TicketEZ].[dbo].[Services] ([name], [description], [image], [cinema_complex_id])
VALUES
    (N'My combo', N'1 bắp lớn + 1 nước siêu lớn. Nhận trong ngày xem phim', 'food.jpg', 1),
    (N'CGV Combo', N'1 bắp lớn + 2 nước siêu lớn. Nhận trong ngày xem phim', 'vip.jpg', 1),
    (N'SPECIAL DRINK FAMILY COMBO', N'04 nước pha chế vừa (nước trái cây xoài đào / trà sữa đường nâu / trà vải / milo ) + 02 bắp ngọt. Nhận trong ngày xem phim. 
	Chỉ thêm 5,000đ đổi sang nước lớn.
	Số lượng quà tặng có giới hạn', '3d_glasses.jpg', 3),
    (N'SPECIAL DRINK MD COMBO', N'01 ly nhân vật tùy chọn + 02 nước pha chế vừa ( nước trái cây xoài đào / trà sữa đường nâu / trà vải / milo ) 
	+ 01 bắp ngọt - Nhận trong ngày xem phim - Mẫu ly nhân vật phụ thuộc vào số lượng tại rạp 
	- Không áp dụng đối với mẫu ly mới ra mắt - Số lượng quà tặng có giới hạn', 'parking.jpg', 1),
    (N'TRIDENT MY COMBO', N'1 ly Aquaman Trident + 1 nước ngọt siêu lớn + 1 bắp lớn tùy chọn vị
- Nhận trong ngày xem phim', 'online_booking.jpg', 2),
    (N'GARFIELD TRIPPLE COMBO 2023', N'03 ly nhân vật Garfield (kèm nước) + 01 bắp hai vị
* Nhận ngay trong ngày xem phim
** Mẫu ly phụ thuộc vào số lượng của rạp', 'birthday.jpg', 2),
    (N'GARFIELD DOUBLE COMBO 2023', N'02 ly nhân vật Garfield (kèm nước)
* Nhận ngay trong ngày xem phim
** Thêm 39,000đ nhận ngay 1 bắp ngọt
*** Mẫu ly phụ thuộc vào số lượng của rạp', 'private_screening.jpg', 9)
   
GO
 -- 6. Thêm dữ liệu giá cho dịch vụ Price services
INSERT INTO [TicketEZ].[dbo].[Price_Services] ([price], [start_date], [end_date], [service_id])
VALUES
    (50000, '2023-12-05', '2023-12-29', 1),
    (100000, '2023-10-05', '2023-12-29', 2),
    (20000, '2023-10-05', '2023-12-29', 3),
    (5000, '2023-10-05', '2023-12-29', 4), 
    (70000, '2023-10-05', '2023-12-29', 5),
    (25000, '2023-10-05', '2023-12-29', 6),
    (150000, '2023-10-05', '2023-12-29', 7);
GO



  -- 7. Thêm dữ liệu về loại ghế (Seat Types)
INSERT INTO [TicketEZ].[dbo].[Seat_Types] ([name],[nick_name],[color],[width], [image], [description])
VALUES
    (N'Ghế thường','normalSeat','#7C25CE',1, 'normal.jpg', N'Loại ghế thông thường sử dụng cho tất cả khách hàng.'),
    (N'Ghế VIP','vipSeat','#B32225',1, 'vip.jpg', N'Loại ghế VIP dành cho các khách hàng có vé VIP.'),  
	(N'Ghế đôi','coupleSeat','#AD1859',2,'coupelseat.jpg', N'Loại ghế đôi thích hợp cho các cặp đôi xem phim.'),
    (N'Ghế tựa','reclinerSeat','#0891B2',1 ,'ghetua.jpg', N'Loại ghế tựa về sao.'),
    (N'Ghế trẻ em','kidSeat','#10B785',1, 'kid.jpg', N'Loại ghế dành cho trẻ em, có kích thước nhỏ hơn.'),
    (N'Ghế Sofa','sofaSeat','#C58B0B',1, 'sofa.jpg', N'Loại ghế có thiết kế đặc biệt để tạo sự thoải mái khi xem phim.'),
	(N'đường đi','way','#121B2B',1 ,'url_anh_ghethoaithoaimai.jpg', N'Đây là loại dùng để đo kích thước của đường đi'),
	(N'Ghế đã đặt','seatUnavailable','#404040',1 ,'url_anh_ghethoaithoaimai.jpg', N'đây là màu ghế đã đặt'),
	(N'Ghế chọn','seatReserved','#16A34A',1 ,'url_anh_ghethoaithoaimai.jpg', N'Đây là màu ghế đã chọn');
GO
-- 8 . thêm dữ liệu cho bảng biểu đồ (seatChart)
-- Chèn dữ liệu vào bảng SeatChart
INSERT INTO Seat_Chart ([name], [rows], [columns], [status], cinema_id)
VALUES
    (N'Sơ đồ 1', 10, 7, 1, 1)
GO
-- 8. Thêm dữ liệu về ghế
INSERT INTO Seats ([name], [status], [description], seat_type_id, seat_chart_id)
VALUES
    (N'A1', 1, N'Ghế thông thường', 1, 1),
    (N'A2', 1, N'Ghế VIP', 1, 1),
    (N'A3', 1, N'Ghế thông thường', 1, 1),
    (N'A4', 1, N'Ghế VIP', 1, 1),
    (N'A5', 1, N'Ghế thông thường', 1, 1),
    (N'A6', 1, N'Ghế VIP', 1, 1),
    (N'A7', 1, N'Ghế thông thường', 1, 1),
    (N'B1', 1, N'Ghế thông thường', 1, 1),
    (N'B2', 1, N'Ghế VIP', 1, 1),
    (N'B3', 1, N'Ghế thông thường', 1, 1),
    (N'B4', 1, N'Ghế VIP', 1, 1),
    (N'B5', 1, N'Ghế thông thường', 1, 1),
    (N'B6', 1, N'Ghế VIP', 1, 1),
    (N'B7', 1, N'Ghế thông thường', 1, 1),
	(N'C1', 1, N'Ghế thông thường', 1, 1),
    (N'C2', 1, N'Ghế VIP', 1, 1),
    (N'C3', 1, N'Ghế thông thường', 2, 1),
    (N'C4', 1, N'Ghế VIP', 1, 1),
    (N'C5', 1, N'Ghế thông thường', 2, 1),
    (N'C6', 1, N'Ghế VIP', 1, 1),
	(N'C7', 1, N'Ghế VIP', 1, 1),
    (N'D1', 1, N'Ghế VIP', 1, 1),
    (N'D2', 1, N'Ghế thông thường', 1, 1),
    (N'D3', 1, N'Ghế VIP', 1, 1),
    (N'D4', 1, N'Ghế thông thường', 1, 1),
    (N'D5', 1, N'Ghế VIP', 1, 1),
	(N'D6', 1, N'Ghế VIP', 1, 1),
	(N'D7', 1, N'Ghế VIP', 1, 1),
	(N'E1', 1, N'Ghế thông thường', 1, 1),
    (N'E2', 1, N'Ghế VIP', 1, 1),
    (N'E3', 1, N'Ghế thông thường', 1, 1),
    (N'E4', 1, N'Ghế VIP', 1, 1),
    (N'E5', 1, N'Ghế thông thường', 1, 1),
    (N'E6', 1, N'Ghế VIP', 1, 1),
    (N'E7', 1, N'Ghế thông thường', 1, 1),
	(N'F1', 1, N'Ghế thông thường', 1, 1),
    (N'F2', 1, N'Ghế VIP', 1, 1),
    (N'F3', 1, N'Ghế thông thường', 1, 1),
    (N'F4', 1, N'Ghế VIP', 1, 1),
    (N'F5', 1, N'Ghế thông thường', 1, 1),
    (N'F6', 1, N'Ghế VIP', 1, 1),
    (N'F7', 1, N'Ghế thông thường', 1, 1),
	(N'G1', 1, N'Ghế thông thường', 2, 1),
    (N'G2', 1, N'Ghế VIP', 2, 1),
    (N'G3', 1, N'Ghế thông thường', 2, 1),
    (N'G4', 1, N'Ghế VIP', 2, 1),
    (N'G5', 1, N'Ghế thông thường', 2, 1),
    (N'G6', 1, N'Ghế VIP', 2, 1),
    (N'G7', 1, N'Ghế thông thường', 2, 1),
	(N'H1', 1, N'Ghế thông thường', 2, 1),
    (N'H2', 1, N'Ghế VIP', 2, 1),
    (N'H3', 1, N'Ghế thông thường', 2, 1),
    (N'H4', 1, N'Ghế VIP', 2, 1),
    (N'H5', 1, N'Ghế thông thường', 2, 1),
    (N'H6', 1, N'Ghế VIP', 2, 1),
    (N'H7', 1, N'Ghế thông thường', 2, 1),
	(N'I1', 1, N'Ghế thông thường', 2, 1),
    (N'I2', 1, N'Ghế VIP', 2, 1),
    (N'I3', 1, N'Ghế thông thường', 2, 1),
    (N'I4', 1, N'Ghế VIP', 2, 1),
    (N'I5', 1, N'Ghế thông thường', 2, 1),
    (N'I6', 1, N'Ghế VIP', 2, 1),
    (N'I7', 1, N'Ghế thông thường', 2, 1),
	(N'J1', 1, N'Ghế thông thường', 2, 1),
    (N'J2', 1, N'Ghế VIP', 2, 1),
    (N'J3', 1, N'Ghế thông thường', 2, 1),
    (N'J4', 1, N'Ghế VIP', 2, 1),
    (N'J5', 1, N'Ghế thông thường', 2, 1),
    (N'J6', 1, N'Ghế VIP', 2, 1),
    (N'J7', 1, N'Ghế thông thường', 2, 1)
GO
  -- 9. Thêm dữ liệu cho bảng Studio
INSERT INTO [TicketEZ].[dbo].[Studios] 
    ([name],[image], [founded_date], [country], [email],[address],[website], [description])
VALUES
    ('Walt Disney Pictures',N'Walt-Disney.jpg', '2003-02-01', N'Hoa Kỳ', 'tuhieu@disney.com', N'Address1', N'website1', N'Studio sản xuất phim của Disney.'),
    ('Warner Bros. Pictures', N'warner-bros.jpg', '2003-02-01',N'Hoa Kỳ', 'phungtuhieut@warnerbros.com',  N'Address1', N'website1',N'Studio sản xuất phim của Warner Bros.'),
    ('Paramount Pictures',N'Paramount-Pictures-logo.jpg', '2003-02-01', N'Canada', 'hieutuphung@paramount.com',  N'Address1', N'website1',N'Studio sản xuất phim của Paramount.'),
    ('Universal Pictures', N'Universal_Pictures.jpg', '2003-02-01',N'Anh', 'nguyenhoangdinh@universal.com',  N'Address1', N'website1',N'Studio sản xuất phim của Universal.'),
    ('20th Century Studios',N'20th_Century_Studios.jpg', '2003-02-01', N'Anh', 'dinhnguyen@20thcentury.com', N'Address1', N'website1', N'Studio sản xuất phim của 20th Century.'),
    ('Sony Pictures Entertainment',N'Sony_Pictures_Entertainment.jpg', '2003-02-01',	N'Mỹ', 'hieupt@sony.com', N'Address1', N'website1', N'Studio sản xuất phim của Sony.');
GO
 -- 10. Chèn dữ liệu vào bảng MPAA_Rating
INSERT INTO [TicketEZ].[dbo].[MPAA_Rating] ([rating_code], [icon],[color_code], [description])
VALUES
    ('G', '0dd95ef9-1453-46f3-9577-1b1db03dd536_RATED_G.svg.png', '#1A5D1A',N'Phù hợp cho mọi đối tượng.'),
    ('PG', 'e534d759-e88e-4d5b-9c7c-3c9b2dc751ca_RATED_PG.svg.png','#7A9D54', N'Cần có sự hướng dẫn của cha mẹ hoặc người trưởng thành.'),
    ('PG-13', 'a7a2d7d7-20fd-4aeb-a0c9-c8ced2721697_RATED_PG-13.svg.png','#FF9B50', N'Không phù hợp cho trẻ dưới 13 tuổi.'),
    ('R', 'efccadb4-d926-4f81-a47c-1175aac38bc8_RATED_R.svg.png','#FFCD4B', N'Phim có nội dung cần có sự hướng dẫn của người trưởng thành.'),
    ('NC-17', '6a0f27bc-34f4-46d6-9e3e-517686a183fc_Nc-17.svg.png','#D80032', N'Không phù hợp cho trẻ em dưới 17 tuổi.');
GO
INSERT INTO Movies (title, poster,banner,[description], duration, release_date, country, rating, video_trailer, MPAA_rating_id)
VALUES
(N'Wonka', N'wonka.jpg',N'wonkabanner.jpg',N'Dựa trên nhân vật từ quyến sách gối đầu giường của các em nhỏ trên toàn thế giới "Charlie và Nhà Máy Sôcôla" và phiên bản phim điện ảnh cùng tên vào năm 2005, WONKA kể câu chuyện kỳ diệu về hành trình của nhà phát minh, ảo thuật gia và nhà sản xuất sôcôla vĩ đại nhất thế giới trở thành WILLY WONKA đáng yêu mà chúng ta biết ngày nay. Từ đạo diễn loạt phim Paddington và nhà sản xuất loạt phim chuyển thể đình đám Harry Potter, WONKA hứa hẹn sẽ là một bộ phim đầy vui nhộn và màu sắc cho khán giả dịp Lễ Giáng Sinh năm nay.', '02:15:00', '2023-09-15', N'Việt Nam', 7.5,  'https://www.youtube.com/embed/1JHj4hc5MEI?si=5_ztvPzfFkUiDsaD', 1),
(N'Người Mặt Trời', N'nguoimattroi.jpg',N'nguoimattroibanner.jpg',N'400 năm qua, loài Ma Cà Rồng đã bí mật sống giữa loài người trong hòa bình, nhưng hiểm họa bỗng ập đến khi một cô gái loài người phát hiện được thân phận của hai anh em Ma Cà Rồng. Người anh khát máu quyết săn lùng cô để bảo vệ bí mật giống loài, trong khi người còn lại chạy đua với thời gian để bảo vệ cô bằng mọi giá', '02:00:00', '2023-07-20', N'Việt Nam', 8.2,  'https://www.youtube.com/embed/L3t9jW4eRAs?si=PYjnv8njj25lUAi0', 2),
(N'Bỗng Dưng Trúng Mánh', N'bongdungtrungmanh.jpg',N'bongdungtrungmanhbanner.jpg',N'Bỗng Dưng Trúng Mánh là câu chuyện từ cá biệt toàn trường hoá tài phiệt học đường của Lee Kang-jin (Yoo Seon-ho) - một nam sinh thường xuyên bị bạn học bắt nạt. Tình cờ nhặt được chiếc phong bì chứa đầy tiền mặt của ông trùm cho vay nặng lãi Rang (Yoon Byung-hee), cuộc đời Kang-jin đã hoàn toàn thay đổi. Rang dạy Kang-jin những bài học đầu tiên về nghề cho vay siêu lợi nhuận, từ đó biến cậu học trò lầm lì trở thành “chiến thần tài chính”, đại gia mới nổi, “ông hoàng” cho vay nặng lãi của trường trung học Geumhwa', '02:30:00', '2023-06-10', N'Việt Nam', 6.8,  'https://www.youtube.com/embed/cH2lE3fxelc?si=th2RZVLkoslRHewS', 3),
(N'Đường Hầm Tới Mùa Hạ, Lối Thoát Của Biệt Ly', N'duongham.jpg',N'duonghambanner.jpg', N'Dựa trên cuốn tiểu thuyết đạt giải thưởng. Bộ phim chuyển thể giành giải thưởng Paul Grimault tại Liên hoan phim hoạt hình quốc tế Annecy 2023. Một đường hầm bí ẩn tên Urashima có thể thực hiện bất kỳ điều ước nào…nhưng bạn sẽ phải đánh đổi bằng thời gian. Cậu học sinh trung học Kaoru, bị ám ảnh bởi quá khứ, cùng với Anzu, một cô gái luôn đấu tranh để đạt được ước mơ của mình bước vào đường hầm. Nhưng thứ họ phải đánh đổi là quá lớn. Đây là một câu chuyện mùa hè khó quên về nỗi nhớ, thời gian và tình yêu của tuổi trẻ', '01:45:00', '2023-05-05', N'Việt Nam', 9.1,  'https://www.youtube.com/embed/38B5-Ft_doo?si=riDFqsOfOdm7Pvee', 4),
(N'Đế Chế Napoleon', N'napoleon.jpg',N'napoleonbanner.jpg',N'Một góc nhìn riêng tư về nguồn gốc và quá trình leo lên ngôi hoàng đế nhanh chóng và tàn nhẫn của nhà cầm quân người Pháp. Câu chuyện được nhìn qua lăng kính mối quan hệ đầy đam mê và biến động giữa Napoleon với vợ và tình yêu đích thực của ông, Josephine.', '02:20:00', '2023-03-15', N'Việt Nam', 7.9, 'https://www.youtube.com/embed/2t6lSTexflk?si=vmRl58Y91yF55uwg', 5),
(N'Cô Giáo Em Là Số 1', N'cogiaolaso1.jpg',N'cogiaolaso1banner.jpg', N'Si-min (do Shin Hae-sun thủ vai) là một võ sĩ quyền anh đầy triển vọng nhưng đã từ bỏ quyền thi đấu tại kỳ Thế vận hội Olympic để lấy tiền trả nợ cho cha. Từ đó, Si-min cũng nhận ra rằng, cuộc sống vốn không công bằng và “công lý không thể mài ra cơm”. Si-min gạt phăng giấc mơ trở thành võ sĩ quyền anh và quyết tâm trở thành giáo viên, với mong muốn về một cuộc sống ổn định hơn. Cô trở thành giáo viên hợp đồng của một trường trung học có tiếng cùng mục tiêu trở thành giáo viên chính thức ở đây. Để có thể nhanh chóng hoàn thành nguyện vọng, cô đã nỗ lực kìm nén cái tôi xuống đáy, luôn mỉm cười cho qua, bất chấp mọi tình huống trớ trêu xảy đến với mình. Tuy nhiên, Su-gang (do Lee Jun-young thủ vai) - kẻ cầm đầu của một băng đảng quậy phá, chuyên đi bắt nạt và hành hạ người yếu thế đã phá vỡ quy tắc của Si-min. Không thể chịu đựng được những hành vi bạo lực học đường của Su-gang, Si-min đeo lên một chiếc mặt nạ mèo và dạy cho tên côn đồ một bài học đáng nhớ. Nhận thấy quyền lực của mình bị đe dọa, Su-gang điên cuồng tìm kiếm người đeo mặt nạ mèo, Si-min đứng trước nguy cơ bị bại lộ danh tính và phải đối mặt với sự lựa chọn giữa “CÔNG LÝ hay CÔNG VIỆC.”', '02:10:00', '2023-02-01', N'Việt Nam', 6.5,  'https://www.youtube.com/embed/XieLp58PaJg?si=YM4zlkwkXCyw12Jk', 3),
(N'Yêu Lại Vợ Ngầu', N'yeulaivongau.jpg',N'yeulaivongaubanner.jpg', N'Cặp vợ chồng trẻ No Jung Yeol (Kang Ha-neul) và Hong Na Ra (Jung So-min) từ cuộc sống hôn nhân màu hồng dần “hiện nguyên hình” trở thành cái gai trong mắt đối phương với vô vàn thói hư, tật xấu. Không thể đi đến tiếng nói chung, Jung Yeol và Na Ra quyết định ra toà ly dị. Tuy nhiên, họ phải chờ 30 ngày cho đến khi mọi thủ tục chính thức được hoàn tất. Trong khoảng thời gian này, một vụ tai nạn xảy ra khiến cả hai mất đi ký ức và không nhớ người kia là ai. Từ thời gian 30 ngày chờ đợi để được “đường ai nấy đi”, tình huống trớ trêu khiến cả hai bắt đầu nảy sinh tình cảm trở lại. Liệu khi nhớ ra mọi thứ, họ vẫn sẽ ký tên vào tờ giấy ly hôn?', '01:55:00', '2023-01-10', N'Việt Nam', 8.7,  'https://www.youtube.com/embed/081I7DXNknc?si=jGn73WInT9nFXtjI', 2),
(N'Bạn Không Thân', N'bankhongthan.jpg',N'bankhongthanbanner.jpg' ,N'Một nhóm học sinh trung học, với niềm đam mê làm phim chung, quyết định thực hiện một bộ phim ngắn dựa trên cuộc đời của bạn học yêu quý của họ. Nhưng họ không biết rằng, nỗ lực của họ sẽ khiến họ khám phá ra những bí mật ẩn giấu của người bạn đó, có thể thay đổi quan điểm của họ về đam mê mãi mãi.', '02:05:00', '2023-10-05', N'Việt Nam', 7.1, 'https://www.youtube.com/embed/jXuDMm55GYo?si=8B23gjAUGSPJN2iF', 1),
(N'Ác Mộng Tuổi 21', N'acmongtuoi21.jpg',N'acmongtuoi21banner.jpg', N'Ác Mộng Tuổi 21 theo chân Sreynit - cô gái luôn bị ám ảnh bởi những giấc mơ khủng khiếp đến mức có thể giết chết cô khi ngủ. Một thầy bói từng nói với cô rằng cuộc sống của cô sẽ trở lại bình thường nếu cô sống sót qua sinh nhật thứ 21 của mình. Tuy nhiên, vào đêm trước khi cô bước sang tuổi 21, một giấc mơ đã đưa cô quay trở lại quá khứ, nơi cô và hai chàng trai khác có liên quan đến cái chết của một người bạn thời thơ ấu', '02:25:00', '2023-11-20', N'Việt Nam', 8.5,  'https://www.youtube.com/embed/RfFJFi1CErA?si=WNyu_bANIy9wLp4j', 4),
(N'Điều Ước', N'dieuuoc.jpg',N'dieuuocbanner.jpg',N'Một bộ phim hoạt hình hoàn toàn mới với chủ đề về những ngôi sao ước vọng. Phim có Ariana DeBose lồng tiếng vai Asha và được đạo diễn bởi Chris Buck & Fawn Veerasunthorn, sản xuất bởi Peter Del Vecho & Juan Pablo Reyes với các bài hát được Julia Michaels sáng tác mới hoàn toàn', '02:15:00', '2023-12-10', N'Việt Nam', 9.2,  'https://www.youtube.com/embed/ctlz0R1tSZE?si=W0LwG0DZXsaNBfhd', 5);
GO
INSERT INTO [TicketEZ].[dbo].[Movies_Producers](movie_id, producer_id)
VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 3),
(3, 2),
(4, 1)
GO
INSERT INTO [TicketEZ].[dbo].[Movies_Studios](movie_id, studio_id)
VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 3),
(3, 2),
(4, 1)
GO
  -- 13. Thêm dữ liệu cho bảng Discounts
INSERT INTO [TicketEZ].[dbo].[Discounts] 
    ([title], [coupon_code], [amount], [start_date], [end_date], [status], [discount_type], [cinema_complex_id])
VALUES
    (N'Discount 1', 'CODE001', 10.0, '2023-10-05 00:00:00', '2023-10-15 23:59:59', 1, 1, 1),
    (N'Discount 2', 'CODE002', 15.5, '2023-10-08 12:00:00', '2023-10-18 12:00:00', 1, 0, 2),
    (N'Discount 3', 'CODE003', 5.0, '2023-10-12 08:00:00', '2023-10-22 08:00:00', 1, 1, 3);
GO

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
GO


GO
 -- 16. thêm bảng dữ liệu events 
  INSERT INTO [TicketEZ].[dbo].[Events] ([name], [description], [start_date], [end_date], [banner], [status], [type_event],[account_id])
VALUES
  (N'Sự kiện Buổi ra mắt phim mới', N'Rạp phim thường tổ chức buổi ra mắt các bộ phim mới với sự kiện đặc biệt, bao gồm việc mời các diễn viên và đạo diễn tham dự.', '2023-12-01', '2023-12-05', 'bannerA.jpg', 1, 1,'admin'),
  (N'Sự kiện Ngày hội phim hoạt hình', N'Một sự kiện dành riêng cho các bộ phim hoạt hình, có thể kèm theo các hoạt động vui chơi và trò chơi dành cho trẻ em', N'2023-11-20', '2023-11-25', 'bannerB.jpg', 1, 2,'admin'),
  (N'Sự kiện Tuần lễ phim nước ngoài', N'Rạp phim có thể tổ chức các tuần lễ đặc biệt để giới thiệu các bộ phim từ các quốc gia khác nhau', '2023-10-25', '2023-11-02', 'bannerC.jpg', 0, 3,'admin'),
   (N'Marathon phim', N'Buổi chiếu liên tiếp của một loạt phim cùng chủ đề hoặc của cùng một series', '2023-10-25', '2023-11-02', 'bannerC.jpg', 1, 3,'admin'),
	(N'Sự kiện Buổi chiếu phim cổ điển', N'Rạp phim có thể tổ chức các buổi chiếu phim cổ điển để làm tái hiện các bộ phim kinh điển trên màn ảnh lớn', '2023-10-25', '2023-11-02', 'bannerC.jpg', 0, 3,'admin'),
   (N'Sự kiện Khuyến mãi vé và phần thưởng', N'Các chương trình khuyến mãi và phần thưởng cho các khách hàng thường xuyên có thể là một phần quan trọng của sự kiện của rạp phim', '2023-10-25', '2023-11-02', 'bannerC.jpg', 1, 3,'admin'),
   (N'Sự kiện Thảm đỏ và sự kiện thời trang', N' Cho các buổi ra mắt phim hoặc sự kiện đặc biệt, thảm đỏ và sự kiện thời trang có thể được tổ chức', '2023-10-25', '2023-11-02', 'bannerC.jpg', 1, 3,'admin')
GO
INSERT INTO Roles ([name], [description])
VALUES
(N'SUPER_ADMIN', N'Quyền cao nhất trong hệ thống.'),
(N'USER', N'Người dùng thông thường'),
(N'MOVIE_MANAGEMENT_ADMIN', N'Quyền quản lý thông tin về phim'),
(N'SCHEDULING_PRICING_ADMIN', N'Quyền quản lý lịch chiếu, gia ghế, ghế'),
(N'USER_MANAGEMENT_ADMIN', N'Quyền quản lý tài khoản và thông tin người dùng.')
GO
-- Bạn có thể tiếp tục chèn dữ liệu cho các vai khác nếu cần.

-- 17.  thêm dữ liệu bảng accounts
INSERT INTO Accounts (id, phone, fullname, [image], email, [address], [password], birthday, gender, [status], verified, created_date, points)
VALUES
('admin', '0987654321', N'Nguyễn Văn A', 'image1.jpg', 'nguyen.va@gmail.com', N'123 Đường ABC, Quận 1, TP.HCM', 'admin', '1990-01-15', 1, 1, 1, '2023-01-01 08:00:00', 0),
('user2', '0901234567', N'Trần Thị B', 'image2.jpg', 'tran.thi.b@gmail.com', N'456 Đường XYZ, Quận 2, TP.HCM', 'user2', '1985-03-20', 0, 1, 0, '2023-01-02 09:30:00', 75),
('user3', '0912345678', N'Lê Văn C', 'image3.jpg', 'le.van.c@gmail.com', N'789 Đường DEF, Quận 3, TP.HCM', 'user3', '1995-11-10', 1, 1, 1, '2023-01-03 11:15:00', 120),
('user4', '0976543210', N'Phạm Thị D', 'image4.jpg', 'pham.thi.d@gmail.com', N'101 Đường GHI, Quận 4, TP.HCM', 'user4', '1988-07-05', 0, 1, 1, '2023-01-04 13:45:00', 90),
('user5', '0965432109', N'Huỳnh Văn E', 'image5.jpg', 'huynh.van.e@gmail.com', N'202 Đường KLM, Quận 5, TP.HCM', 'user5', '1992-09-30', 1, 1, 1, '2023-01-05 16:20:00', 150),
('user6', '0981234567', N'Võ Thị F', 'image6.jpg', 'vo.thi.f@gmail.com', N'303 Đường NOP, Quận 6, TP.HCM', 'user6', '1984-12-25', 0, 1, 0, '2023-01-06 19:10:00', 60),
('user7', '0909876543', N'Đặng Văn G', 'image7.jpg', 'dang.van.g@gmail.com', N'404 Đường QRS, Quận 7, TP.HCM', 'user7', '1998-02-12', 1, 1, 1, '2023-01-07 21:55:00', 110),
('user8', '0918765432', N'Lý Thị H', 'image8.jpg', 'ly.thi.h@gmail.com', N'505 Đường TUV, Quận 8, TP.HCM', 'user8', '1993-06-18', 0, 1, 1, '2023-01-08 23:30:00', 80),
('user9', '0961234876', N'Mai Văn I', 'image9.jpg', 'mai.van.i@gmail.com', N'606 Đường WXY, Quận 9, TP.HCM', 'user9', '1989-04-28', 1, 1, 1, '2023-01-09 02:15:00', 130),
('user10', '0934785236', N'Ngô Thị K', 'image10.jpg', 'ngo.thi.k@gmail.com', N'707 Đường LMN, Quận 10, TP.HCM', 'user10', '1991-08-08', 0, 1, 1, '2023-01-10 04:50:00', 70),
('user11', '0987612345', N'Hồ Văn L', 'image11.jpg', 'ho.van.l@gmail.com', N'808 Đường UVW, Quận 11, TP.HCM', 'user11', '1997-10-22', 1, 1, 1, '2023-01-11 07:35:00', 140),
('user12', '0912345678', N'Phan Văn M', 'image12.jpg', 'phan.van.m@gmail.com', N'909 Đường OPQ, Quận 12, TP.HCM', 'user12', '1987-05-15', 0, 1, 1, '2023-01-12 10:20:00', 95),
('user13', '0905432s187', N'Chu Thị N', 'image13.jpg', 'chu.thi.n@gmail.com', N'123 Đường STU, Quận Gò Vấp, TP.HCM', 'user13', '1994-01-05', 1, 1, 1, '2023-01-13 13:05:00', 105),
('user14', '0965432187', N'Bùi Văn O', 'image14.jpg', 'bui.van.o@gmail.com', N'234 Đường Kẹp, Quận Tân Bình, TP.HCM', 'user14', '1996-03-10', 1, 1, 1, '2023-01-14 15:40:00', 65),
('user15', '0976543298', N'Trương Thị P', 'image15.jpg', 'truong.thi.p@gmail.com', N'345 Đường Xé, Quận Tân Phú, TP.HCM', 'user15', '1999-07-02', 1, 1, 1, '2023-01-15 18:25:00', 125),
('user16', '0923456789', N'Lê Văn Q', 'image16.jpg', 'le.van.q@gmail.com', N'456 Đường Mãn, Quận Bình Tân, TP.HCM', 'user16', '1993-09-20', 1, 1, 1, '2023-01-16 20:55:00', 75),
('user17', '0901234567', N'Vũ Thị R', 'image17.jpg', 'vu.thi.r@gmail.com', N'567 Đường Khoá, Quận Thủ Đức, TP.HCM', 'user17', '1990-12-12', 0, 1, 0, '2023-01-17 23:40:00', 110),
('user18', '0934567890', N'Phạm Thị S', 'image18.jpg', 'pham.thi.s@gmail.com', N'678 Đường Khoá, Quận Củ Chi, TP.HCM', 'user18', '1986-11-08', 0, 1, 1, '2023-01-18 02:25:00', 90),
('user19', '0918765432', N'Tôn Thị T', 'image19.jpg', 'ton.thi.t@gmail.com', N'789 Đường Lờ, Quận Hóc Môn, TP.HCM', 'user19', '1997-04-28', 1, 1, 1, '2023-01-19 04:55:00', 140),
('user20', '0987654321', N'Dương Văn U', 'image20.jpg', 'duong.van.u@gmail.com', N'890 Đường Đùi, Quận Nhà Bè, TP.HCM', 'user20', '1995-08-18', 1, 1, 1, '2023-01-20 07:40:00', 80);
GO

INSERT INTO Accounts_Roles (account_id, role_id)
VALUES
('admin', 1), -- Tài khoản 1 có vai trò "Super Admin"
('user2', 2) -- Tài khoản 2 có vai trò "Movie Management Admin"
GO
-- 18. thêm dữ liệu bảng actor

  INSERT INTO [TicketEZ].[dbo].[Actors] ([fullname], [gender], [birthday],[country], [avatar],[email],[biography])
VALUES (N'Phương Anh Đào',1, '1990-01-01','VN', 'PhuongAnhDao.jpg',N'email123@gmail.com',N'Tiểu sửa'),
 (N'Tuấn Trần',0, '1993-01-01','VN', 'TuanTran.jpg',N'email123@gmail.com',N'Tiểu sửa'),
  (N'Trấn Thành',0, '1989-01-01','VN', 'tranthanh.jpg',N'email123@gmail.com',N'Tiểu sửa'),
  (N'Trương Thế Vinh',0, '1988-01-01','VN', 'truongthevinh.jpg',N'email123@gmail.com',N'Tiểu sửa'),
   (N'Võ Thành Tâm ',0, '1994-01-01','VN', 'vothanhtam.jpg',N'email123@gmail.com',N'Tiểu sửa'),
    (N'Thanh Trúc',1, '1995-01-01','VN', 'THANH_TRUC.jpg',N'email123@gmail.com',N'Tiểu sửa'),
	 (N'Hứa Minh Đạt', 0,'1990-01-01','VN', 'huaminhdat.jpg',N'email123@gmail.com',N'Tiểu sửa'),
	  (N'Lâm Chấn Khang', 0,'1996-01-01','VN',  'lamchankhanh.jpg',N'email123@gmail.com',N'Tiểu sửa'),
	   (N'Chris Hemsworth',0, '1996-01-01','VN',  'ChrisHemsworth.jpg',N'email123@gmail.com',N'Tiểu sửa'),
	    (N'Tom Hiddleston ',1, '1999-01-01','VN',  'Tom_Hiddleston.jpg',N'email123@gmail.com',N'Tiểu sửa'),
		 (N'Benedict Cumberbatch',0, '2000-01-01','VN',  'BenedictCumberbatch.jpg',N'email123@gmail.com',N'Tiểu sửa'),
		  (N'Scarlett Johansson',0, '2000-01-01','VN',  'ScarlettJohansson.jpg',N'email123@gmail.com',N'Tiểu sửa'),
		   (N'NTom Holland',1, '2000-01-01','VN',  'Tom_Holland_by_Gage_Skidmore.jpg',N'email123@gmail.com',N'Tiểu sửa'),
		    (N'Chadwick Boseman',0, '1990-01-01','VN',  'ChadwickBoseman.jpg',N'email123@gmail.com',N'Tiểu sửa'),
			 (N'Brie Larson',1, '1990-01-01', 'VN', 'BrieLarson.jpg',N'email123@gmail.com',N'Tiểu sửa'),
			  (N'Sebastian Stan',1, '1990-01-01', 'VN', 'SebastianStan.jpg',N'email123@gmail.com',N'Tiểu sửa'),
			   (N'Anthony Mackie ',0, '1990-01-01','VN',  'AnthonyMackie.jpg',N'email123@gmail.com',N'Tiểu sửa'),
			    (N'Idris Elba', 1,'1990-01-01', 'VN', 'IdrisElba.jpg',N'email123@gmail.com',N'Tiểu sử');
GO
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
(10, 9);

GO
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
GO

-- Thêm dữ liệu mẫu cho bảng Formats_Movies
INSERT INTO Formats_Movies (movie_id, format_id)
VALUES
    ( 1, 1),
    ( 1, 2),
    ( 2, 1),
    ( 2, 2),
	( 3, 1),
    ( 3, 2),
    ( 4, 1),  
	( 4, 2),
    ( 5, 1),
    ( 5, 2),  
	( 6, 1),
    ( 6, 2),
    ( 7, 1), 
	( 7, 2),
    ( 8, 1),
    ( 8, 2), 
	( 9, 1),
    ( 9, 2),
    ( 10, 1),
	( 10, 2);
	go
-- Inserting sample data into the Price table
INSERT INTO Price ([start_date], [end_date], [status], format_movie_id, cinema_complex_id)
VALUES
    ('2023-11-20', '2023-12-27', 1, 1, 1),
	('2023-11-20', '2023-12-27', 1, 2, 1),
    ('2023-11-20', '2023-12-27', 1, 3, 2),
	('2023-11-20', '2023-12-27', 1, 4, 2),
	('2023-11-20', '2023-12-27', 1, 5, 3),
	('2023-11-20', '2023-12-27', 1, 6, 3),
	('2023-11-20', '2023-12-27', 1, 7, 4),
	('2023-11-20', '2023-12-27', 1, 8, 4),
	('2023-11-20', '2023-12-27', 1, 9, 5),
	('2023-11-20', '2023-12-27', 1, 10, 5),
	('2023-11-20', '2023-12-27', 1, 11, 6),
	('2023-11-20', '2023-12-27', 1, 12, 6),
	('2023-11-20', '2023-12-27', 1, 13, 8),
	('2023-11-20', '2023-12-27', 1, 14, 9),
	('2023-11-20', '2023-12-27', 1, 15, 10),
	('2023-11-20', '2023-12-27', 1, 16, 11),
	('2023-11-20', '2023-12-27', 1, 17, 12),
    ('2023-11-20', '2023-12-27', 1, 18, 13),
	('2023-11-20', '2023-12-27', 1, 19, 14),
    ('2023-11-20', '2023-12-27', 1, 20, 15);


-- 23. thêm dữ liệu bảng Showtimes
 INSERT INTO [TicketEZ].[dbo].[Showtimes] ([start_time], [end_time], [cinema_id],  [format_movie_id],[seat_chart_id],[price_id])
VALUES
  ('2023-12-8 12:00:00', '2023-12-8 14:00:00',  1, 1,1,1),
  ('2023-12-8 15:00:00', '2023-12-8 17:00:00',  1, 3,1,3),
  ('2023-12-8 18:00:00', '2023-12-8 20:00:00',  1, 5,1,5),
  ('2023-12-8 21:00:00', '2023-12-8 23:00:00',  1, 7,1,7),
  ('2023-12-9 12:00:00', '2023-12-9 14:00:00',  1, 9,1,9),
  ('2023-12-9 15:00:00', '2023-12-9 17:00:00',  1, 2,1,2),
  ('2023-12-9 18:00:00', '2023-12-9 20:00:00',  1, 4,1,4),
  ('2023-12-9 21:00:00', '2023-12-9 23:00:00',  1, 6,1,6),
  ('2023-12-10 12:00:00', '2023-12-10 14:00:00',1, 8,1,8),
  ('2023-12-10 15:00:00', '2023-12-10 17:00:00',1, 10,1,10)
GO

--24. thêm dữ liệu cho bảng booking
/*
INSERT INTO [TicketEZ].[dbo].[Booking] ([id], [account_id], [create_date], [showtime_id],[status])
VALUES ('1','user10','2023-10-28', 1);

go*/
--26. thêm dữ liệu bảng seatbooking
/*
INSERT INTO [TicketEZ].[dbo].[Seats_Booking] ([seat_id], [booking_id])
VALUES (2,1, 1),
(3,1, 1),
(4,1, 1),
(5,1, 1)

go
*/
--25. thêm dữ liệu bảng Directors
    INSERT INTO [TicketEZ].[dbo].[Directors] ([fullname],[gender], [birthday],[country], [avatar],[email],[biography])
VALUES
  (N'Nguyễn Thị A',1, '1980-05-15','VN' , 'director_avatar1.jpg',N'email123@gmail.com',N'Tiểu sửa'),
  (N'Trần Văn B',0, '1975-08-20','VN' , 'director_avatar2.jpg',N'email123@gmail.com',N'Tiểu sửa'),
  (N'Lê Thị C',1, '1990-03-10','VN' , 'director_avatar3.jpg',N'email123@gmail.com',N'Tiểu sửa');
  GO
-- 26. thêm dữ liệu bảng [Directors_Movies]

  INSERT INTO [TicketEZ].[dbo].[Directors_Movies] ([director_id], [movie_id])
VALUES
  (1, 1),
  (2, 1),
  (3, 2);
GO

--27 bảng dữ liệu reivew
 SELECT *
FROM [TicketEZ].[dbo].[Reviews]
WHERE [movie_id] = 1;

  INSERT INTO [TicketEZ].[dbo].[Reviews] ([comment], [rating], [create_date], [edit_date], [account_id], [movie_id])
VALUES 
(N'Màu phim thì đánh giá cao đẹp, sắc nét, nhân vật nhập tâm. Vui có, hài có, sợ có, một chút hồi hộp.
Tuy nhiên chưa toát vẻ cổ xưa phong kiến lắm, xuyên suốt phim tình tiết chưa logic khúc cần làm rõ thì làm khá nhanh, so với nhịp phim khúc đầu khá chậm. Mình bị tụt mood khúc Nhân bị bắt trong rừng, quá dễ dàng và từ đó đến hết phim mọi chuyện giải quyết khá nhanh chóng và không được thuyết trình phục. 
Để coi thì cũng ok á, nhưng mà coi xong mình bị tụt mood :((( chả hỉu sao luô', 5, '2023-01-24 09:30:00', NULL, N'user2', 1),
(N'Nói thật trước khi đi xem tôi cũng nghe rất nhiều luồng ý kiến về bộ phim cả khen lẫn chê. Nhưng khi xem xong tôi cảm giác bộ phim rất có chiều sâu. Yếu tố văn hoá, thiên nhiên cảm giác rất đã mắt. Bộ phim khai thác về bối cảnh phong kiến rất hà khắc với phụ nữ. Phim có cảnh nóng được diễn khá thật nên nếu ai không thích không khuyến khích xem. Ngoài ra nó cũng gợi đến tình mẫu tử giữa mợ Ba và bé Đông Nhi. Thú thật thì tôi xem cũng ấm ức theo mẹ nào chẳng thương con mợ ba đã chịu đựng quá nhiều 6,7 năm trời nhưng khi bà Cả đem con mình ra quỳ nguyên đêm. Là tôi khéo tôi đào mả cả nhà quan còn được. Hành mình đã đành con mình một đứa bé 6 tuổi nó biết gì hành nó. Ngoài ra thì phim cũng cho tôi khá nhiều cảm xúc vì xem phim nhưng cảm giác như thật. Duy nhất có điểm trừ là giọng nữ chính hơi trẻ con thật. Một vài phân cảnh lặp lại khiến phim dễ bị nhàm. Còn lại thì phim này vẫn đáng trải nghiệm nó đọng lại khá nhiều giá trị. Nếu mọi người xem hãy nhìn và cảm nhận sâu đừng chỉ tập trung yếu tố ngoài lề', 5, '2023-02-14 09:30:00', NULL, N'user3', 1),
(N'Hình ảnh đã mắt , cũng có vài miếng hài khá hay=)), sự kết hợp của 3 cô gái là một sự hoàn hảo....', 5, '2023-03-04 09:30:00', NULL, N'user4', 1),
(N'lâu lắm k đi coi phim vì chọn mãi không thấy bộ nào thích. rồi thấy có phim này đi coi thử mà cười banh cả hàm luôn á kkkkk', 5, '2023-04-22 09:30:00', NULL, N'user5', 1),
(N'Em khóc nhiều khi xem phim này.em cảm thấy em rất may mắn khi có mẹ ở bên.khi quen người yêu.lúc trẻ con cãi nhau.mẹ là người khuyên rằng con phải thật bình tĩnh.thấu hiểu.em và người yêu đi xem.2 đứa nhìn nhau và nói với nhau rằng.thật cảm ơn vì 2 đứa đã kịp hiểu nhau thấu hiểu nhau.để vẫn còn hạnh phúc ở bên nhau', 5, '2023-05-28 09:30:00', NULL, N'user6', 1),
(N'phim đối với mình chưa đặc sắc lắm, ko xúc động như mng review. Nữ 9 diễn tạm ổn, mẹ n9 thì mặt diễn hơi đơ. Các vai diễn khác cũng tạm. Kịch bản chấp nhận được . Âm thanh hơi ồn. Tóm lại mình hài lòng so với mặt bằng phim việt nói chung.', 5, '2023-05-30 09:30:00', NULL, N'user7', 1),
(N'Hay đấy', 5, '2023-06-11 09:30:00', NULL, N'user8', 1),
(N'Trên cả tuyệt vời', 5, '2023-06-13 09:30:00', NULL, N'user9', 1),
(N'Tôi không thích bộ này cho lắm chắc gu phim của thôi không phải loại này', 5, '2023-06-14 09:30:00', NULL, N'user10', 1),
(N'Màu phim thì đánh giá cao đẹp, sắc nét, nhân vật nhập tâm. Vui có, hài có, sợ có, một chút hồi hộp.
Tuy nhiên chưa toát vẻ cổ xưa phong kiến lắm, xuyên suốt phim tình tiết chưa logic khúc cần làm rõ thì làm khá nhanh, so với nhịp phim khúc đầu khá chậm. Mình bị tụt mood khúc Nhân bị bắt trong rừng, quá dễ dàng và từ đó đến hết phim mọi chuyện giải quyết khá nhanh chóng và không được thuyết trình phục. 
Để coi thì cũng ok á, nhưng mà coi xong mình bị tụt mood :((( chả hỉu sao luô', 5, '2023-01-24 09:30:00', NULL, N'user2', 2),
(N'Nói thật trước khi đi xem tôi cũng nghe rất nhiều luồng ý kiến về bộ phim cả khen lẫn chê. Nhưng khi xem xong tôi cảm giác bộ phim rất có chiều sâu. Yếu tố văn hoá, thiên nhiên cảm giác rất đã mắt. Bộ phim khai thác về bối cảnh phong kiến rất hà khắc với phụ nữ. Phim có cảnh nóng được diễn khá thật nên nếu ai không thích không khuyến khích xem. Ngoài ra nó cũng gợi đến tình mẫu tử giữa mợ Ba và bé Đông Nhi. Thú thật thì tôi xem cũng ấm ức theo mẹ nào chẳng thương con mợ ba đã chịu đựng quá nhiều 6,7 năm trời nhưng khi bà Cả đem con mình ra quỳ nguyên đêm. Là tôi khéo tôi đào mả cả nhà quan còn được. Hành mình đã đành con mình một đứa bé 6 tuổi nó biết gì hành nó. Ngoài ra thì phim cũng cho tôi khá nhiều cảm xúc vì xem phim nhưng cảm giác như thật. Duy nhất có điểm trừ là giọng nữ chính hơi trẻ con thật. Một vài phân cảnh lặp lại khiến phim dễ bị nhàm. Còn lại thì phim này vẫn đáng trải nghiệm nó đọng lại khá nhiều giá trị. Nếu mọi người xem hãy nhìn và cảm nhận sâu đừng chỉ tập trung yếu tố ngoài lề', 5, '2023-02-14 09:30:00', NULL, N'user3', 2),
(N'Hình ảnh đã mắt , cũng có vài miếng hài khá hay=)), sự kết hợp của 3 cô gái là một sự hoàn hảo....', 5, '2023-03-04 09:30:00', NULL, N'user4', 2),
(N'lâu lắm k đi coi phim vì chọn mãi không thấy bộ nào thích. rồi thấy có phim này đi coi thử mà cười banh cả hàm luôn á kkkkk', 5, '2023-04-22 09:30:00', NULL, N'user5', 2),
(N'Em khóc nhiều khi xem phim này.em cảm thấy em rất may mắn khi có mẹ ở bên.khi quen người yêu.lúc trẻ con cãi nhau.mẹ là người khuyên rằng con phải thật bình tĩnh.thấu hiểu.em và người yêu đi xem.2 đứa nhìn nhau và nói với nhau rằng.thật cảm ơn vì 2 đứa đã kịp hiểu nhau thấu hiểu nhau.để vẫn còn hạnh phúc ở bên nhau', 5, '2023-05-28 09:30:00', NULL, N'user6', 2),
(N'phim đối với mình chưa đặc sắc lắm, ko xúc động như mng review. Nữ 9 diễn tạm ổn, mẹ n9 thì mặt diễn hơi đơ. Các vai diễn khác cũng tạm. Kịch bản chấp nhận được . Âm thanh hơi ồn. Tóm lại mình hài lòng so với mặt bằng phim việt nói chung.', 5, '2023-05-30 09:30:00', NULL, N'user7', 2),
(N'Hay đấy', 5, '2023-06-11 09:30:00', NULL, N'user8', 2),
(N'Trên cả tuyệt vời', 5, '2023-06-13 09:30:00', NULL, N'user9', 2),
(N'Tôi không thích bộ này cho lắm chắc gu phim của thôi không phải loại này', 5, '2023-06-14 09:30:00', NULL, N'user10', 2);



INSERT INTO Price_Seat_Types (weekday_price, weekend_price, seat_type_id,price_id)
VALUES
    (70000, 85000, 1, 1),
    ( 90000, 100000, 2, 1),
    (100000, 120000, 3, 1),
	 (70000, 85000, 1, 2),
    ( 90000, 100000, 2, 2),
    (100000, 120000, 3, 2),
	 (70000, 85000, 1, 3),
    ( 90000, 100000, 2, 3),
    (100000, 120000, 3, 4),
	 (70000, 85000, 1, 4),
    ( 90000, 100000, 2, 4),
    (100000, 120000, 3, 4),
	 (70000, 85000, 1, 5),
    ( 90000, 100000, 2, 5),
    (100000, 120000, 3, 5),
	 (70000, 85000, 1, 6),
    ( 90000, 100000, 2, 6),
    (100000, 120000, 3, 6),
	 (70000, 85000, 1, 7),
    ( 90000, 100000, 2, 7),
    (100000, 120000, 3, 7),
	 (70000, 85000, 1, 8),
    ( 90000, 100000, 2, 8),
    (100000, 120000, 3, 8),
	 (70000, 85000, 1, 9),
    ( 90000, 100000, 2, 9),
	 (70000, 85000, 1, 9),
    ( 90000, 100000, 2, 10),
    (100000, 120000, 3, 10),
    (100000, 120000, 3, 10);
  
--thêm dữ liệu cho bảng booking
INSERT INTO Booking (id, account_id, create_date, showtime_id, [status],[ticket_status])
VALUES
    ('1', 'user6', '2022-01-01 12:00:00', 1, 0, 0 ),
    ('2', 'user6', '2022-03-02 14:30:00', 1, 1, 0),
    ('3', 'user6', '2022-03-03 16:45:00', 1, 0, 0),
    ('4', 'user6', '2024-01-04 19:15:00', 1, 1, 0),
    ('5', 'user6', '2024-01-05 21:30:00', 1, 0, 1),
    ('6', 'user6', '2024-01-06 10:00:00', 1, 1, 1),
    ('7', 'user5', '2022-01-07 13:45:00', 2, 0, 1),
    ('8', 'user6', '2023-01-08 15:30:00', 2, 1, 1),
    ('9', 'user6', '2022-02-09 18:00:00', 2, 0, 1),
    ('10', 'user6', '2022-02-10 20:15:00', 2, 1, 1),
    ('11', 'user6', '2022-02-11 11:30:00', 3, 0, 2),
    ('12', 'user6', '2022-02-12 14:00:00', 3, 1, 2),
    ('13', 'user6', '2022-02-13 16:15:00', 3, 0, 2),
    ('14', 'user6', '2022-01-14 19:45:00', 3, 1, 2),
    ('15', 'user6', '2022-02-15 22:00:00', 3, 0, 2),
    ('16', 'user6', '2023-01-16 09:15:00', 3, 1, 2),
    ('17', 'user6', '2023-01-17 12:30:00', 3, 0, 1),
    ('18', 'user6', '2023-01-18 14:45:00', 3, 1, 1),
    ('19', 'user6', '2023-01-19 17:00:00', 3, 0, 1),
    ('20', 'user6', '2023-01-20 20:30:00', 3, 1, 1);

	/* 
	   CREATE TABLE Booking (
        id NVARCHAR(10) NOT NULL,
        account_id NVARCHAR(20) NOT NULL,
        create_date DATETIME NOT NULL,
        showtime_id BIGINT NOT NULL,
        [status] INT NOT NULL, -- 0: Thành công, 1: Thanh toán gặp lỗi,...
        [ticket_status] INT NOT NULL, -- 0: Chưa sử dụng, 1: đã sử dụng, 2: Hết hạn
    )*/

--thêm dữ liệu cho bảng Seats_Booking
INSERT INTO Seats_Booking ([seat_id], [booking_id], [price])
VALUES
    (1, 1, 20.5),
    (2, 1, 15.75),
    (3, 1, 30.0),
    (4,1, 25.25),
    (5, 1, 18.5),
    (6, 2, 22.75),
    (7, 3, 19.0),
    (8, 3, 35.5),
    (9, 4, 40.25),
    (10, 5, 28.75),
    (11, 6, 33.0),
    (12, 7, 17.25),
    (13,8, 21.5),
    (14, 4, 26.75),
    (15, 3,23.0),
    (16, 2, 38.5),
    (17,1, 43.25),
    (18, 1, 31.75),
    (19, 1, 36.0),
    (20, 1, 29.25);

	-- Chèn dữ liệu cho bảng Articles
INSERT INTO Articles (title, banner, content, status, create_date)
VALUES 
(N'Tiêu đề 1', 'Banner 1', N'Nội dung 1', 1, '2023-01-01'),
(N'Tiêu đề 2', 'Banner 2', N'Nội dung 2', 0, '2023-01-02'),
(N'Tiêu đề 3', 'Banner 3', N'Nội dung 3', 1, '2023-01-03'),
(N'Tiêu đề 4', 'Banner 4', N'Nội dung 4', 0, '2023-01-04'),
(N'Tiêu đề 5', 'Banner 5', N'Nội dung 5', 1, '2023-01-05'),
(N'Tiêu đề 6', 'Banner 6', N'Nội dung 6', 0, '2023-01-06'),
(N'Tiêu đề 7', 'Banner 7', N'Nội dung 7', 1, '2023-01-07'),
(N'Tiêu đề 8', 'Banner 8', N'Nội dung 8', 0, '2023-01-08'),
(N'Tiêu đề 9', 'Banner 9', N'Nội dung 9', 1, '2023-01-09'),
(N'Tiêu đề 10', 'Banner 10', N'Nội dung 10', 0, '2023-01-10');



SELECT * FROM Accounts
SELECT * FROM Verification
SELECT * FROM Reviews
SELECT * FROM Genres
SELECT * FROM Genres_Movies
SELECT * FROM Studios
SELECT * FROM Movies_Producers
SELECT * FROM Movies_Studios
SELECT * FROM MPAA_Rating
SELECT * FROM Movies
SELECT * FROM Formats
SELECT * FROM Formats_Movies
SELECT * FROM Directors
SELECT * FROM Directors_Movies
SELECT * FROM Actors
SELECT * FROM Actors_Movies
SELECT * FROM Provinces

SELECT * FROM Seat_Types
SELECT * FROM Seats
SELECT * FROM Seats_Choose

SELECT * FROM Seat_Chart
SELECT * FROM Seats_Booking
SELECT * FROM Price
SELECT * FROM Price_Seat_Types
SELECT * FROM [Events]
SELECT * FROM [Services]
SELECT * FROM Price_Services
SELECT * FROM Cinema_Types
SELECT * FROM Cinemas
SELECT * FROM Cinema_Complex
SELECT * FROM Discounts
SELECT * FROM Discounts_Booking
SELECT * FROM Showtimes
SELECT * FROM Booking
SELECT * FROM Payment_Info
SELECT * FROM Services_Booking