
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
        movie_id BIGINT NOT NULL,
        [status] INT NOT NULL   --0 là duyệt, 1 là chưa duyệt, 2 là ẩn, 
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
		account_id NVARCHAR(20) NOT NULL
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
        quantity INT NOT NULL,
        cinema_complex_id BIGINT NOT NULL
    )
GO

    CREATE TABLE [Service_Choose] (
        id BIGINT IDENTITY(1, 1) NOT NULL,
        account_id NVARCHAR(20) NOT NULL,
        service_id BIGINT NOT NULL,
        quantity INT NOT NULL,
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
		quantity INT NOT NULL,
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
ALTER TABLE
    [Service_Choose]
ADD
    CONSTRAINT FK_Service_Choose_Account FOREIGN KEY (account_id) REFERENCES Accounts(id)
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
	GO
    -- /seatChoose
		ALTER TABLE
    [Seats_Choose]
ADD
    CONSTRAINT FK_Choose_Seat_Account FOREIGN KEY (account_id) REFERENCES Accounts(id)
	GO
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

SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([id], [name], [description]) VALUES (1, N'SUPER_ADMIN', N'Quyền cao nhất trong hệ thống.')
INSERT [dbo].[Roles] ([id], [name], [description]) VALUES (2, N'USER', N'Người dùng thông thường')
INSERT [dbo].[Roles] ([id], [name], [description]) VALUES (3, N'MOVIE_MANAGEMENT_ADMIN', N'Quyền quản lý thông tin về phim')
INSERT [dbo].[Roles] ([id], [name], [description]) VALUES (4, N'SCHEDULING_PRICING_ADMIN', N'Quyền quản lý lịch chiếu, giá ghế, ghế')
INSERT [dbo].[Roles] ([id], [name], [description]) VALUES (5, N'USER_MANAGEMENT_ADMIN', N'Quyền quản lý tài khoản và thông tin người dùng.')
INSERT [dbo].[Roles] ([id], [name], [description]) VALUES (6, N'CINEMA_MANAGEMENT_ADMIN', N'Quyền quản lý rap phim')
INSERT [dbo].[Roles] ([id], [name], [description]) VALUES (7, N'SERVICE_EVENT_MANAGEMENT_ADMIN', N'Quản lý dịch vụ sự kiện')
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
INSERT [dbo].[Accounts] ([id], [phone], [fullname], [image], [email], [address], [password], [birthday], [gender], [status], [verified], [created_date], [points]) VALUES (N'admin', N'0987654321', N'Nguyễn Văn A', N'image1.jpg', N'nguyen.va@gmail.com', N'123 Đường ABC, Quận 1, TP.HCM', N'admin', CAST(N'1990-01-15' AS Date), 1, 1, 1, CAST(N'2023-01-01T08:00:00.000' AS DateTime), 0)
INSERT [dbo].[Accounts] ([id], [phone], [fullname], [image], [email], [address], [password], [birthday], [gender], [status], [verified], [created_date], [points]) VALUES (N'admin01', N'0844457992', N'admin', N'a480eae8-382f-4e07-af9f-09d351b587a4_user.jpg', N'admin123@gmail.com', NULL, N'$2a$10$1nAbLCEE4i/zu.O.6UgwHu84wz5b6PGudB9TwscvHnHI/TAMePINy', NULL, 0, 1, 1, CAST(N'2023-12-09T16:44:17.837' AS DateTime), 0)
INSERT [dbo].[Accounts] ([id], [phone], [fullname], [image], [email], [address], [password], [birthday], [gender], [status], [verified], [created_date], [points]) VALUES (N'dongnguyen', N'0393618987', N'Nguyễn Nhựt Đông', NULL, N'0393618987dong@gmail.com', NULL, N'$2a$10$9uz9BLYJ3t517bCJv6W/H./ObCPtbjWyOZLt9gX3qaeNnyxZ35f4S', NULL, 1, 1, 1, CAST(N'2023-12-14T11:40:10.997' AS DateTime), 0)
INSERT [dbo].[Accounts] ([id], [phone], [fullname], [image], [email], [address], [password], [birthday], [gender], [status], [verified], [created_date], [points]) VALUES (N'user2', N'0901234567', N'Trần Thị B', N'image2.jpg', N'tran.thi.b@gmail.com', N'456 Đường XYZ, Quận 2, TP.HCM', N'user2', CAST(N'1985-03-20' AS Date), 0, 1, 0, CAST(N'2023-01-02T09:30:00.000' AS DateTime), 75)
INSERT [dbo].[Accounts] ([id], [phone], [fullname], [image], [email], [address], [password], [birthday], [gender], [status], [verified], [created_date], [points]) VALUES (N'user3', N'0912345678', N'Lê Văn C', N'image3.jpg', N'le.van.c@gmail.com', N'789 Đường DEF, Quận 3, TP.HCM', N'user3', CAST(N'1995-11-10' AS Date), 1, 1, 1, CAST(N'2023-01-03T11:15:00.000' AS DateTime), 120)
INSERT [dbo].[Accounts] ([id], [phone], [fullname], [image], [email], [address], [password], [birthday], [gender], [status], [verified], [created_date], [points]) VALUES (N'user4', N'0976543210', N'Phạm Thị D', N'image4.jpg', N'pham.thi.d@gmail.com', N'101 Đường GHI, Quận 4, TP.HCM', N'user4', CAST(N'1988-07-05' AS Date), 0, 1, 1, CAST(N'2023-01-04T13:45:00.000' AS DateTime), 90)
INSERT [dbo].[Accounts] ([id], [phone], [fullname], [image], [email], [address], [password], [birthday], [gender], [status], [verified], [created_date], [points]) VALUES (N'user5', N'0965432109', N'Huỳnh Văn E', N'image5.jpg', N'huynh.van.e@gmail.com', N'202 Đường KLM, Quận 5, TP.HCM', N'user5', CAST(N'1992-09-30' AS Date), 1, 1, 1, CAST(N'2023-01-05T16:20:00.000' AS DateTime), 150)
INSERT [dbo].[Accounts] ([id], [phone], [fullname], [image], [email], [address], [password], [birthday], [gender], [status], [verified], [created_date], [points]) VALUES (N'user6', N'0981234567', N'Võ Thị F', N'image6.jpg', N'vo.thi.f@gmail.com', N'303 Đường NOP, Quận 6, TP.HCM', N'user6', CAST(N'1984-12-25' AS Date), 0, 1, 0, CAST(N'2023-01-06T19:10:00.000' AS DateTime), 60)
GO
INSERT [dbo].[Accounts_Roles] ([account_id], [role_id]) VALUES (N'admin01', 1)
INSERT [dbo].[Accounts_Roles] ([account_id], [role_id]) VALUES (N'dongnguyen', 2)
INSERT [dbo].[Accounts_Roles] ([account_id], [role_id]) VALUES (N'user2', 2)
GO
SET IDENTITY_INSERT [dbo].[Verification] ON 

INSERT [dbo].[Verification] ([id], [account_id], [code], [created_at], [expires_at], [active]) VALUES (1, N'dongnguyen', N'973364', CAST(N'2023-12-14T11:40:16.170' AS DateTime), CAST(N'2023-12-14T11:40:45.980' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Verification] OFF
GO
SET IDENTITY_INSERT [dbo].[MPAA_Rating] ON 

INSERT [dbo].[MPAA_Rating] ([id], [rating_code], [icon], [color_code], [description]) VALUES (1, N'G', N'26de6567-7ed2-4fb9-ba8b-290184abf8b7_RATED_G.svg.png', N'#1A5D1A', N'Phù hợp cho mọi đối tượng.')
INSERT [dbo].[MPAA_Rating] ([id], [rating_code], [icon], [color_code], [description]) VALUES (2, N'PG', N'93867fe9-e185-4214-b765-d95bff36a3a5_RATED_PG.svg.png', N'#7A9D54', N'Cần có sự hướng dẫn của cha mẹ hoặc người trưởng thành.')
INSERT [dbo].[MPAA_Rating] ([id], [rating_code], [icon], [color_code], [description]) VALUES (3, N'PG-13', N'325b8b73-4843-4cdf-b053-ae939ad08a22_RATED_PG-13.svg.png', N'#FF9B50', N'Không phù hợp cho trẻ dưới 13 tuổi.')
INSERT [dbo].[MPAA_Rating] ([id], [rating_code], [icon], [color_code], [description]) VALUES (4, N'R', N'c36ff308-205e-4d3a-acea-9d87adf679d4_RATED_R.svg.png', N'#FFCD4B', N'Phim có nội dung cần có sự hướng dẫn của người trưởng thành.')
INSERT [dbo].[MPAA_Rating] ([id], [rating_code], [icon], [color_code], [description]) VALUES (5, N'NC-17', N'9e8a269e-4d84-4b3b-80d9-603c46135cc9_Nc-17.svg.png', N'#D80032', N'Không phù hợp cho trẻ em dưới 17 tuổi.')
SET IDENTITY_INSERT [dbo].[MPAA_Rating] OFF
GO
SET IDENTITY_INSERT [dbo].[Movies] ON 

INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (1, N'Wonka', N'852959e8-1706-4e13-8b37-45ec27c181c7_25290777902495175-pyVuoZzw2mpBmcYE8sb5EB8NwJ6.jpg', N'3731af72-2416-4480-b323-c49f8d5d8474_timotheewonka.jpg_141701766779.jpg', N'Dựa trên nhân vật từ quyến sách gối đầu giường của các em nhỏ trên toàn thế giới "Charlie và Nhà Máy Sôcôla" và phiên bản phim điện ảnh cùng tên vào năm 2005, WONKA kể câu chuyện kỳ diệu về hành trình của nhà phát minh, ảo thuật gia và nhà sản xuất sôcôla vĩ đại nhất thế giới trở thành WILLY WONKA đáng yêu mà chúng ta biết ngày nay. Từ đạo diễn loạt phim Paddington và nhà sản xuất loạt phim chuyển thể đình đám Harry Potter, WONKA hứa hẹn sẽ là một bộ phim đầy vui nhộn và màu sắc cho khán giả dịp Lễ Giáng Sinh năm nay.', CAST(N'02:15:00' AS Time), CAST(N'2023-09-15' AS Date), N'Việt Nam', 0, N'https://www.youtube.com/embed/1JHj4hc5MEI?si=5_ztvPzfFkUiDsaD', 1)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (2, N'Người Mặt Trời', N'bc096eef-6d91-401c-9d46-4f2c07eb6134_700x1000_14_.jpg', N'330ccfae-f82f-4d91-ab7f-7c68b6fc8732_maxresdefault (3).jpg', N'400 năm qua, loài Ma Cà Rồng đã bí mật sống giữa loài người trong hòa bình, nhưng hiểm họa bỗng ập đến khi một cô gái loài người phát hiện được thân phận của hai anh em Ma Cà Rồng. Người anh khát máu quyết săn lùng cô để bảo vệ bí mật giống loài, trong khi người còn lại chạy đua với thời gian để bảo vệ cô bằng mọi giá', CAST(N'02:00:00' AS Time), CAST(N'2023-07-20' AS Date), N'Việt Nam', 0, N'https://www.youtube.com/embed/L3t9jW4eRAs?si=PYjnv8njj25lUAi0', 2)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (3, N'Bỗng Dưng Trúng Mánh', N'ce623333-a117-4c7a-b721-141edbfe67c1_25877399152516226-poster.jpg', N'b1ab9194-7a72-465c-ae32-bfe0b32206fd_maxresdefault (9).jpg', N'Bỗng Dưng Trúng Mánh là câu chuyện từ cá biệt toàn trường hoá tài phiệt học đường của Lee Kang-jin (Yoo Seon-ho) - một nam sinh thường xuyên bị bạn học bắt nạt. Tình cờ nhặt được chiếc phong bì chứa đầy tiền mặt của ông trùm cho vay nặng lãi Rang (Yoon Byung-hee), cuộc đời Kang-jin đã hoàn toàn thay đổi. Rang dạy Kang-jin những bài học đầu tiên về nghề cho vay siêu lợi nhuận, từ đó biến cậu học trò lầm lì trở thành “chiến thần tài chính”, đại gia mới nổi, “ông hoàng” cho vay nặng lãi của trường trung học Geumhwa', CAST(N'02:30:00' AS Time), CAST(N'2023-06-10' AS Date), N'Việt Nam', 0, N'https://www.youtube.com/embed/cH2lE3fxelc?si=th2RZVLkoslRHewS', 3)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (4, N'Đường Hầm Tới Mùa Hạ, Lối Thoát Của Biệt Ly', N'd35538d0-0bf5-43ce-b48c-9cabe9cd4cb3_duong-ham-toi-mua-ha (1).jpg', N'2705a54d-65ef-46fa-84e5-3ee3b47d14cd_review-light-novel-duong-ham-toi-mua-ha-loi-thoat-cua-biet-ly-1.jpg', N'Dựa trên cuốn tiểu thuyết đạt giải thưởng. Bộ phim chuyển thể giành giải thưởng Paul Grimault tại Liên hoan phim hoạt hình quốc tế Annecy 2023. Một đường hầm bí ẩn tên Urashima có thể thực hiện bất kỳ điều ước nào…nhưng bạn sẽ phải đánh đổi bằng thời gian. Cậu học sinh trung học Kaoru, bị ám ảnh bởi quá khứ, cùng với Anzu, một cô gái luôn đấu tranh để đạt được ước mơ của mình bước vào đường hầm. Nhưng thứ họ phải đánh đổi là quá lớn. Đây là một câu chuyện mùa hè khó quên về nỗi nhớ, thời gian và tình yêu của tuổi trẻ', CAST(N'01:45:00' AS Time), CAST(N'2023-05-05' AS Date), N'Việt Nam', 0, N'https://www.youtube.com/embed/38B5-Ft_doo?si=riDFqsOfOdm7Pvee', 4)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (5, N'Đế Chế Napoleon', N'7b29eec7-8c65-476b-8761-ced8b76428ed_655c61350f5f6368347971.jpeg', N'b63c933a-d595-4346-8455-26e2eea5e85a_de-che-napoleon-thumbnail.jpg', N'Một góc nhìn riêng tư về nguồn gốc và quá trình leo lên ngôi hoàng đế nhanh chóng và tàn nhẫn của nhà cầm quân người Pháp. Câu chuyện được nhìn qua lăng kính mối quan hệ đầy đam mê và biến động giữa Napoleon với vợ và tình yêu đích thực của ông, Josephine.', CAST(N'02:20:00' AS Time), CAST(N'2023-03-15' AS Date), N'Việt Nam', 0, N'https://www.youtube.com/embed/2t6lSTexflk?si=vmRl58Y91yF55uwg', 5)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (6, N'Cô Giáo Em Là Số 1', N'71f9cce4-b65d-4146-a4a8-4f9497d4e948_25292636839275241-poster (1).jpg', N'a3640b50-d870-4075-b445-d40c187abd12_maxresdefault (8).jpg', N'Si-min (do Shin Hae-sun thủ vai) là một võ sĩ quyền anh đầy triển vọng nhưng đã từ bỏ quyền thi đấu tại kỳ Thế vận hội Olympic để lấy tiền trả nợ cho cha. Từ đó, Si-min cũng nhận ra rằng, cuộc sống vốn không công bằng và “công lý không thể mài ra cơm”. Si-min gạt phăng giấc mơ trở thành võ sĩ quyền anh và quyết tâm trở thành giáo viên, với mong muốn về một cuộc sống ổn định hơn. Cô trở thành giáo viên hợp đồng của một trường trung học có tiếng cùng mục tiêu trở thành giáo viên chính thức ở đây. Để có thể nhanh chóng hoàn thành nguyện vọng, cô đã nỗ lực kìm nén cái tôi xuống đáy, luôn mỉm cười cho qua, bất chấp mọi tình huống trớ trêu xảy đến với mình. Tuy nhiên, Su-gang (do Lee Jun-young thủ vai) - kẻ cầm đầu của một băng đảng quậy phá, chuyên đi bắt nạt và hành hạ người yếu thế đã phá vỡ quy tắc của Si-min. Không thể chịu đựng được những hành vi bạo lực học đường của Su-gang, Si-min đeo lên một chiếc mặt nạ mèo và dạy cho tên côn đồ một bài học đáng nhớ. Nhận thấy quyền lực của mình bị đe dọa, Su-gang điên cuồng tìm kiếm người đeo mặt nạ mèo, Si-min đứng trước nguy cơ bị bại lộ danh tính và phải đối mặt với sự lựa chọn giữa “CÔNG LÝ hay CÔNG VIỆC.”', CAST(N'02:10:00' AS Time), CAST(N'2023-02-01' AS Date), N'Việt Nam', 0, N'https://www.youtube.com/embed/XieLp58PaJg?si=YM4zlkwkXCyw12Jk', 3)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (7, N'Yêu Lại Vợ Ngầu', N'36dc6e03-627a-4186-bfdd-f42f1b9b86ea_24065416204290604-poster.jpg', N'054ee858-a09b-4473-bcea-db2545e8acb2_maxresdefault (5).jpg', N'Cặp vợ chồng trẻ No Jung Yeol (Kang Ha-neul) và Hong Na Ra (Jung So-min) từ cuộc sống hôn nhân màu hồng dần “hiện nguyên hình” trở thành cái gai trong mắt đối phương với vô vàn thói hư, tật xấu. Không thể đi đến tiếng nói chung, Jung Yeol và Na Ra quyết định ra toà ly dị. Tuy nhiên, họ phải chờ 30 ngày cho đến khi mọi thủ tục chính thức được hoàn tất. Trong khoảng thời gian này, một vụ tai nạn xảy ra khiến cả hai mất đi ký ức và không nhớ người kia là ai. Từ thời gian 30 ngày chờ đợi để được “đường ai nấy đi”, tình huống trớ trêu khiến cả hai bắt đầu nảy sinh tình cảm trở lại. Liệu khi nhớ ra mọi thứ, họ vẫn sẽ ký tên vào tờ giấy ly hôn?', CAST(N'01:55:00' AS Time), CAST(N'2023-01-10' AS Date), N'Việt Nam', 0, N'https://www.youtube.com/embed/081I7DXNknc?si=jGn73WInT9nFXtjI', 2)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (8, N'Bạn Không Thân', N'550173bb-f4b5-43de-8cd1-f00589cb23b2_crew_1080x1350_1_.jpg', N'1f54e4df-f2f8-4715-b104-c6415fad4119_640x396_1__2.jpg', N'Một nhóm học sinh trung học, với niềm đam mê làm phim chung, quyết định thực hiện một bộ phim ngắn dựa trên cuộc đời của bạn học yêu quý của họ. Nhưng họ không biết rằng, nỗ lực của họ sẽ khiến họ khám phá ra những bí mật ẩn giấu của người bạn đó, có thể thay đổi quan điểm của họ về đam mê mãi mãi.', CAST(N'02:05:00' AS Time), CAST(N'2023-10-05' AS Date), N'Việt Nam', 0, N'https://www.youtube.com/embed/jXuDMm55GYo?si=8B23gjAUGSPJN2iF', 1)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (9, N'Ác Mộng Tuổi 21', N'4d77edb6-1a20-4d37-be8d-87c00bdc2a26_26133519975983191-poster1.jpg', N'90403415-dc4e-441f-a419-73e52e469af2_hq720.jpg', N'Ác Mộng Tuổi 21 theo chân Sreynit - cô gái luôn bị ám ảnh bởi những giấc mơ khủng khiếp đến mức có thể giết chết cô khi ngủ. Một thầy bói từng nói với cô rằng cuộc sống của cô sẽ trở lại bình thường nếu cô sống sót qua sinh nhật thứ 21 của mình. Tuy nhiên, vào đêm trước khi cô bước sang tuổi 21, một giấc mơ đã đưa cô quay trở lại quá khứ, nơi cô và hai chàng trai khác có liên quan đến cái chết của một người bạn thời thơ ấu', CAST(N'02:25:00' AS Time), CAST(N'2023-11-20' AS Date), N'Việt Nam', 0, N'https://www.youtube.com/embed/RfFJFi1CErA?si=WNyu_bANIy9wLp4j', 4)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (10, N'Điều Ước', N'4c3ebc60-ce36-4979-b047-746c49977dbc_payoff-poster-wish-poster.jpg', N'49a3b5ba-fc2f-4762-8bb9-59208c70d8c5_lich-chieu-phim-wish-2023-dieu-uoc-thumb.jpg', N'Một bộ phim hoạt hình hoàn toàn mới với chủ đề về những ngôi sao ước vọng. Phim có Ariana DeBose lồng tiếng vai Asha và được đạo diễn bởi Chris Buck & Fawn Veerasunthorn, sản xuất bởi Peter Del Vecho & Juan Pablo Reyes với các bài hát được Julia Michaels sáng tác mới hoàn toàn', CAST(N'02:15:00' AS Time), CAST(N'2023-12-10' AS Date), N'Việt Nam', 0, N'https://www.youtube.com/embed/ctlz0R1tSZE?si=W0LwG0DZXsaNBfhd', 5)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (11, N'nhà Vịt Di Cư', N'ad595cb6-ab23-4f08-acfc-57e3bbc68d9b_19839086198206120-poster.jpg', N'5b8c7c2d-bae8-4eaa-9c64-e522df67a49b_maxresdefault (4).jpg', N'33333', CAST(N'04:56:46' AS Time), CAST(N'2023-12-10' AS Date), N'AF', 0, N'3', 5)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (12, N'Kẻ Ăn Hồn', N'ad9d58bc-f299-4873-8c2e-43eba88d271d_k_n_h_n_-_teaser_potser_-_kh_i_chi_u_08122023.jpg', N'0cdac8c4-8a2f-489d-82e2-3557b469d80c_download (3).jpeg', N'Kẻ Ăn Hồn - phim về hàng loạt cái chết bí ẩn ở Làng Địa Ngục, nơi có ma thuật cổ xưa: 5 mạng đổi bình Rượu Sọ Người. Thập Nương - cô gái áo đỏ là kẻ nắm giữ bí thuật luyện nên loại rượu mạnh nhất! ', CAST(N'01:58:27' AS Time), CAST(N'2023-12-15' AS Date), N'VN', 0, N'https://www.youtube.com/embed/WKIgBOdzxBk?si=HO2crVUhyASTztlW', 5)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (14, N'Cầu Hồn', N'c1a3bf14-9f79-4b44-a6b2-c918734789fe_700x1000_24__1.jpg', N'8c6e144d-5ed3-4090-a60c-1fd17720e8ad_1920x1080_13__1.jpg', N'Cầu Hồn bắt đầu trong bối cảnh kỳ lạ của những câu chuyện siêu nhiên được lưu hành trong trường. Các địa điểm chính của trường bao gồm thư viện, phòng tập nhảy và thang máy đều toát lên sự kinh dị về những điềm báo đen tối sẽ diễn ra. Điểm đặc biệt của phim là cách lồng ghép khéo léo 3 nghi thức tâm linh vào 1 trò chơi thực tế ảo: Trò chơi 4 góc; Trò chơi trốn tìm 1 người; và Trò chơi thang máy. Bộ phim là sự trỗi dậy của TRUYỀN THUYẾT KINH HOÀNG CÂY CẦU MA NỮ TẠI ĐÀI LOAN.', CAST(N'03:03:03' AS Time), CAST(N'2023-12-15' AS Date), N'VN', 0, N'https://www.youtube.com/embed/RDx_FzYM45Y?si=HmFqRGNp3tre7wFf', 5)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (15, N'Quỷ Cầu ', N'028b1e25-4ef4-44c5-9e43-492eecba7810_download (4).jpeg', N'efd3c186-a40e-4a99-8e14-310ccde99ffb_25291146077975868-qu-cau-750_1698228057531.jpg', N'
Du lịchCẩm nangThứ bảy, 20/4/2019, 16:09 (GMT+7)
''Cây cầu của quỷ'' nằm giữa rừng cây ở Đức
Rakotzbrücke có kiến trúc khác lạ và mang vẻ đẹp kỳ ảo, bắc qua hồ nước ở công viên Kromlauer.

Cầu Rakotzbrücke giữa rừng lá đổ sắc vàng, đỏ vào mùa thu.
Cầu Rakotzbrücke giữa rừng lá đổ sắc vàng vào mùa thu. Ảnh: Mymordernmet. 

Khi bạn mới nhìn, có vẻ như thiên nhiên đã tạo ra một vòng tròn hoàn hảo giữa hồ nước thơ mộng trong công viên Kromlauer tại Đức. Nhưng khi lại gần hơn, bạn sẽ nhận ra vòng tròn ấn tượng này là kết quả của một ảo ảnh quang học độc đáo. Cây cầu hình vòm có tên Rakotzbrücke còn được mệnh danh là "Cây cầu của quỷ" đã khéo léo đánh lừa thị giác của bạn. Công trình được xây dựng bằng đá bazan vào năm 1860 do KTS Friedrich Hermann Rötschke thiết kế. ', CAST(N'01:04:39' AS Time), CAST(N'2023-12-15' AS Date), N'AF', 0, N'https://www.youtube.com/embed/Y00GJIeAJ0w?si=01TJ46hrOvgNpmId', 2)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (16, N'Elio: Cậu Bé Đến Từ Trái Đất', N'46ba4a20-d34b-4213-9366-494249e2fd7a_download (5).jpeg', N'36b6daa7-e138-4463-bde7-6ee584fed074_maxresdefault (10).jpg', N'Gặp Elio, một cậu bé có khả năng dịch chuyển xuyên vũ trụ và bị nhận nhầm thành Đại sứ thiên hà của Trái đất. Phim có America Ferrera đảm nhận lồng tiếng cho nhân vật Olga Solis, Yonas Kibreab lồng tiếng cho Elio. Phim được đạo diễn bởi Adrian Molina và sản xuất bởi Mary Alice Drumm. Elio từ Disney và Pixar dự kiến khởi chiếu vào mùa xuân 2024.', CAST(N'01:13:17' AS Time), CAST(N'2023-12-15' AS Date), N'VN', 0, N'https://www.youtube.com/embed/STf980_RnQ4?si=0LpkA54QDBEfNwBJ', 2)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (17, N'Xin Chào Jadoo', N'8c54e8f5-7d91-40d4-bd15-ad878b85bb01_470wx700h_2_.jpg', N'93b8a20a-e557-49b8-96c6-a988dbfeb767_Thumbnail_Xin-chào-Jado.jpg', N'Xin chào Jadoo là một bộ phim chuyển thể từ truyện tranh nổi tiếng mà họa sĩ truyện tranh Lee Bin đã xuất bản trong tạp chí《BÊN MÌNH hàng tháng》 Kể từ tháng 9 năm 1997. Dựa trên truyện tranh này, Tooniverse và Atoonz đồng sản xuất bộ phim hoạt hình cùng tên với bộ truyện tranh vào các năm 2011, 2012, 2015 và 2017.', CAST(N'01:16:09' AS Time), CAST(N'2023-12-15' AS Date), N'VN', 0, N'https://www.youtube.com/embed/vL9AXolV3Ag?si=gsvhjigm817bFaLf', 3)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (18, N'Thiếu Niên và Chim Diệc', N'878fe227-bf4a-4c99-9ae3-3f333fbbc2da_tbath-vietnam-poster-_french-version_-27x40in-_a_1_.jpg', N'cd1685a3-16e2-41a5-a450-5b92882f51ad_the-boy-and-the-heron-16999471735301247222925-783-324-1204-1128-crop-1699947230352961570262.webp', N'Thiếu niên và chim diệc là một bộ phim anime điện ảnh Nhật Bản thuộc thể loại chính kịch do Miyazaki Hayao viết kịch bản kiêm đạo diễn và được Studio Ghibli sản xuất, được lấy cảm hứng từ tiểu thuyết năm 1937 cùng tên.', CAST(N'01:21:23' AS Time), CAST(N'2023-12-15' AS Date), N'VN', 0, N'https://www.youtube.com/embed/eggzAobZzHc?si=njpLuKApUvp4TRsu', 2)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (20, N'Pororo: Cuộc Phiêu Lưu Đến Dinh Thự Rồng', N'85f5e917-1ed7-4450-a801-e6b056d7137d_93509019625368708-4.jpg', N'ccd2fe7b-c560-45b0-9b4a-6e83f5d6c690_maxresdefault (11).jpg', N'Chim cánh cụt đáng yêu Pororo sẽ trở lại vào dịp Tết này với một chuyến phiêu lưu mới. Lần này là cuộc phiêu lưu đến Dinh Thự Rồng. Tên phù thủy xấu xa Gad đang tìm cách đánh cắp ''Trái tim Rồng'', một viên ngọc được phong ấn bằng sức mạnh to lớn của vua rồng nhỏ Arthur. Trong khi đó, Crong, người đã vô tình hấp thụ sức mạnh của ''Trái tim rồng'', biến thành một Crong khổng lồ và khiến Pororo và những người bạn của cậu gặp nguy hiểm. Arthur, Pororo và những người bạn phải đến Dinh Thự Rồng tham gia vào trận chiến để lấy lại sức mạnh từ tay phù thủy độc ác. Liệu Pororo có thể bảo vệ Dinh Thự Rồng và cứu lấy những người bạn của mình?', CAST(N'01:24:55' AS Time), CAST(N'2023-12-15' AS Date), N'VN', 0, N'https://www.youtube.com/embed/zAz1kodqd8s?si=z8CeaF7a7m9hmZ6d', 1)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (21, N'Vẹt Cò Phiêu Lưu Kỳ: Viên Ngọc Bí Ẩn', N'327babaa-adbe-42e1-b4e8-8824aa33c81c_27714154689618056-poster.jpg', N'f58414cd-d248-4315-b3b1-b81c3b2d1234_vet-co-750_1701851294091.webp', N'Richard – chú vẹt lớn lên giữa đàn cò luôn tự tin sẽ có được vị trí dẫn đàn trở về phương Bắc. Thế nhưng, vị trí ấy lại được trao cho một chú cò khác, khiến Richard ấm ức và quyết định một mình phiêu lưu. Chú gặp một đàn chim sẻ bị giam cầm bởi chim công xấu xa Zamano và chỉ có thể được tự do nếu tìm được một viên ngọc quý. Richard cùng những người bạn sẽ tạo nên một biệt đội dũng cảm và đoàn kết để chinh phục viên ngọc.', CAST(N'01:28:06' AS Time), CAST(N'2023-12-15' AS Date), N'VN', 0, N'https://www.youtube.com/embed/tULdpa2BU0U?si=3KN0ppROuab7PVt-', 2)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (22, N'Mai', N'9c0d439f-17fd-4a70-8091-9a88817a933a_MAI-First-Look-Poster-Official-9642-1701143420.jpg', N'7c67f975-3b68-46af-8fd9-747c58fe52da_maxresdefault (12).jpg', N'MAI xoay quanh câu chuyện về cuộc đời của một người phụ nữ cùng tên với bộ phim. Trên First-look Poster, Phương Anh Đào tạo ấn tượng mạnh với cái nhìn tĩnh lặng, xuyên thấu, đặc biệt, trên bờ môi nữ diễn viên là hình ảnh cô đang nằm nghiêng trên mặt nước. Được phủ một màn sương mờ ảo, poster đậm chất nghệ thuật của Mai gây tò mò với lời tựa: “Quá khứ chưa ngủ yên, ngày mai liệu sẽ đến?”', CAST(N'01:38:53' AS Time), CAST(N'2023-12-15' AS Date), N'VN', 0, N'https://www.youtube.com/embed/VweAKEjYw8c?si=cPlt9-fVPNWfZfR5', 5)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (23, N'Aquaman: Vương Quốc Thất Lạc', N'7b9d4b09-1a16-4f05-9f88-e9d238aacf59_Aquaman_And_The_Lost_Kingdom_VN_poster.jpg', N'99d6ee8b-fe4e-450e-b250-05a5ba57c255_lich-chieu-phim-aquaman-va-vuong-quoc-that-lac-thumb (1).jpg', N'Black Manta khao khát trả thù cái chết của cha mình và giờ đây hắn cầm trong tay sức mạnh của cây Đinh Ba Đen huyền thoại, hắn sẽ không dừng lại trước khi hạ gục Aquaman một lần và mãi mãi. Để đánh bại Black Manta, Aquaman phải nhờ sự trợ giúp của người anh trai bị giam cầm của mình chính là Orm, vị vua bị truất ngôi của Atlantis. Cặp đôi không đội trời chung lần này cùng nhau hợp tác để cứu Atlantis khỏi sự diệt vong trước bàn tay đen tối của Black Manta.', CAST(N'01:44:08' AS Time), CAST(N'2023-12-15' AS Date), N'VI', 0, N'https://www.youtube.com/embed/-2AmjXnrfp4?si=dpiMGQtXUcy8Gl6R', 5)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (24, N'Godzilla x Kong: Đế Chế Mới', N'1447d558-98cd-477b-a1b0-a07051078c39_27023974374883359-AfVwAgWKmj1jbGc9f5WVt5v9PjE.jpg', N'1ba1e89d-68e6-43f9-a2a6-61d80c878288_maxresdefault (13).jpg', N'Cuộc chiến vĩ đại tiếp diễn! Vũ trụ điện ảnh Monsterverse từ nhà Legendary Pictures sẽ tiếp tục sau cuộc đối đầu bùng nổ trong “Godzilla Đại Chiến Kong” với một hành trình hoàn toàn mới. Kong toàn năng và Godzilla hung bạo sẽ chống lại một mối đe dọa khổng lồ chưa từng được khám phá ẩn sâu trong thế giới của chúng ta, thách thức sự tồn tại của cả hai titan vĩ đại - cùng với loài người. “Godzilla x Kong: The New Empire (tựa Việt: Godzilla x Kong: Đế Chế Mới” sẽ đào sâu vào lịch sử, nguồn gốc của các Titan, những bí ẩn về Đảo Đầu Lâu và hơn thế nữa. Một trận chiến huyền thoại rèn giũa các sinh vật phi thường này và gắn kết chúng với loài người mãi mãi…', CAST(N'01:46:19' AS Time), CAST(N'2023-12-15' AS Date), N'NZ', 0, N'https://www.youtube.com/embed/5XkgG_AAQs0?si=TXku9pSSgGuNJ7AU', 5)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (25, N'Chúa Tể Của Những Chiếc Nhẫn: Sự Trở Lại Của Nhà Vua', N'23a1b92d-ddc3-4861-bd24-087ea3131e6f_lotr3_poster_9x16_1_.jpg', N'9f9f9599-1665-40a0-a408-8578bbea903a_llich-chieu-phim-chua-te-cua-nhung-chiec-nhan-thumbnail.jpg', N'Chương cuối cùng của loạt phim Chúa Tể Của Những Chiếc Nhẫn mang tới trận chiến cuối cùng giữa thiện và ác cùng tương lai của Trung Địa. Frodo và Sam đến với Mordor trên hành trình phá hủy chiếc nhẫn, trong khi Aragon tiếp tục lãnh đạo nhóm của mình chống lại đoàn quân của Sauron. Phần phim thứ ba này được coi là thành công nhất cả loạt phim trên khía cạnh thương mại và phê bình, với doanh thu toàn cầu vượt mốc 1 tỷ đô la cùng 11 giải Oscar danh giá.', CAST(N'01:49:57' AS Time), CAST(N'2023-12-15' AS Date), N'NZ', 0, N'https://www.youtube.com/embed/FTdrUX323Xc?si=XASyUUHd-F0jvr7-', 5)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (26, N'Mickey 17', N'd8916b18-9f82-4518-b14d-63024c3c6cd8_MV5BZGIzNjdhY2EtYjUwYy00OTU1LTkyOTQtYTkwOTkwMDNjNGJiXkEyXkFqcGdeQXVyMTYzODA4MzA5._V1_.jpg', N'0ce59a84-52f3-4500-bc24-b178c5715821_screen-shot-2022-12-05-at-51232-pm-16740186002391241405143.webp', N'Được chuyển thể từ tiểu thuyết Mickey 7 của nhà văn Edward Ashton, Cuốn tiểu thuyết xoay quanh các phiên bản nhân bản vô tính mang tên “Mickey”, dùng để thay thế con người thực hiện cuộc chinh phạt nhằm thuộc địa hóa vương quốc băng giá Niflheim. Mỗi khi một Mickey chết đi, một Mickey mới sẽ được tạo ra, với phiên bản được đánh số 1, 2, 3 tiếp theo. Mickey số 7 được cho rằng đã chết, để rồi một ngày kia, hắn quay lại và bắt gặp phiên bản tiếp theo của mình.', CAST(N'01:51:53' AS Time), CAST(N'2023-12-15' AS Date), N'NZ', 0, N'https://www.youtube.com/embed/26uTcwSriMg?si=-YrkHAboQCt180Kk', 5)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (27, N'Phù Thủy Tối Thượng Trong Đa Vũ Trụ Hỗn Loạn', N'4247c028-982f-47b8-aba1-3a6175e0b010_Áp_phích_phim_Phù_thủy_tối_thượng_trong_Đa_Vũ_trụ_hỗn_loạn.jpg', N'f88f7959-bd01-415d-8937-1dbd219953f2_sddefault.jpg', N'
Phù Thủy Tối Thượng Trong Đa Vũ Trụ Hỗn Loạn - Doctor Strange in the Multiverse of Madness (2022) là một bộ phim siêu anh hùng của Mỹ dựa trên nhân vật Dr. Stephen Strange của Marvel Comics. Được sản xuất bởi Marvel Studios và phân phối bởi Walt Disney Studios Motion Pictures, nó được dự định là phần tiếp theo của Phù thủy tối thượng (2016) và là bộ phim thứ 28 của Vũ trụ Điện ảnh Marvel (MCU). Bộ phim được đạo diễn bởi Sam Raimi với kịch bản được viết bởi Jade Halley Bartlett và Michael Waldron, và có sự tham gia của Benedict Cumberbatch trong vai Stephen Strange, cùng với Chiwetel Ejiofor, Elizabeth Olsen, Benedict Wong, Xochitl Gomez, Michael Stuhlbarg và Rachel McAdams. Trong phim, Strange và các đồng minh của mình du hành vào đa vũ trụ để đối mặt với một kẻ thù mới bí ẩn. Đạo diễn và đồng biên kịch của Phù thủy tối thượng, Scott Derrickson đã có kế hoạch cho phần tiếp theo vào tháng 10 năm 2016. Ông đã ký để trở lại với tư cách đạo diễn vào tháng 12 năm 2018, khi Cumberbatch được xác nhận sẽ trở lại. Tiêu đề của bộ phim đã được công bố vào tháng 7 năm 2019 cùng với sự tham gia của Olsen, trong khi Bartlett được thuê viết kịch bản cho bộ phim vào tháng 10 năm đó. Derrickson từ chức giám đốc vào tháng 1 năm 2020, với lý do là sự khác biệt trong sáng tạo. Tháng sau, Waldron tham gia dự án và Raimi đảm nhận vị trí giám đốc. Quá trình quay bắt đầu vào tháng 11 năm 2020 tại London nhưng bị tạm dừng vào tháng 1 năm 2021 do đại dịch COVID-19. Việc sản xuất tiếp tục vào tháng 3 năm 2021 và kết thúc vào giữa tháng 4 tại Somerset. Các cảnh quay cũng xảy ra ở Surrey và Los Angeles.', CAST(N'01:55:34' AS Time), CAST(N'2023-12-15' AS Date), N'VN', 0, N'https://www.youtube.com/embed/nBYrzjR40N0?si=w2b0wnSgWaHcYoBW', 2)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (28, N'SPIDER-MAN: NO WAY HOME', N'1a9414a1-f8e3-47d5-8720-5c4316bc2adf_Áp_phích_phim_Người_Nhện_không_còn_nhà.jpg', N'd6277410-9e33-422a-84ac-672a33c8dbfe_review-phim-spider-man-no-way-home-elle-man-cover-1.jpeg', N'REVIEW PHIM NGƯỜI NHỆN KHÔNG CÒN NHÀ || SPIDER MAN NO WAY HOME || SAKURA REVIEW
Người Nhện: Không Còn Nhà - Spider-Man: No Way Home tiếp nối câu chuyện ở những phần phim trước, khi giờ đây siêu anh hùng người nhện là Peter Parker đã bị bại lộ ra danh tính thật sự của mình cho cả thế giới biết, tất cả đều do Mysterio thực hiện. Giờ đây Peter phải đối mặt với vô số nguy hiểm không những thế còn phải bảo vệ những người thân của mình. Vì không thể nào chống đỡ nổi, Peter Parker đã tìm đến Doctor Strange xin sự trợ giúp. Nhưng mọi chuyện ngày càng đi xa và rắc rối hơn, giờ đây Peter phải cố gắng khám phá ra được ý nghĩa thật sự của bản thân khi trở thành một siêu anh hùng.', CAST(N'01:57:38' AS Time), CAST(N'2023-12-15' AS Date), N'NZ', 0, N'https://www.youtube.com/embed/Yq4n0upxFVg?si=ekwerKt10Y1ExpGn', 5)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (29, N'BATMAN', N'208548ca-43ba-4d88-9739-c2c2c5cdb71c_poster_batman-1.jpg', N'467713b2-e176-4dfa-bc89-c2aaa76d4143_large_dg4_HT_Jdd3_B_Hrw_W_Hoiukv47_267ca5c0da.jpg', N'REVIEW PHIM NGƯỜI DƠI THE BATMAN 2022 || SAKURA REVIEW
Người Dơi The Batman 2022 Full HD Vietsub Thuyết Minh Trong năm thứ hai chiến đấu với tội phạm, Batman phát hiện ra tham nhũng ở thành phố Gotham , nơi kết nối với gia đình của chính anh ta trong khi đối mặt với một kẻ giết người hàng loạt được gọi là RiddleR', CAST(N'01:59:36' AS Time), CAST(N'2023-12-15' AS Date), N'NZ', 0, N'<iframe width="560" height="315" src="https://www.youtube.com/embed/-YjKD4R69Ew?si=azQinT2gFHbd5KcN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>', 5)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (30, N'Batman đại chiến Superman: Ánh sáng công lý', N'47d3b59a-2945-4e36-b3a1-bbd4c08361c9_Batman_V_Superman_Dawn_Of_Justice.jpg', N'f71286eb-64ce-41c8-920c-1a77a14da643_batman-v-superman-dawn-of-justice-1459271757.jpg', N'an of steel cực đỉnh, Bat vs Sup cũng cực đỉnh , có điều bản chiếu rạp bị cắt quá đáng thôi', CAST(N'01:01:36' AS Time), CAST(N'2023-12-15' AS Date), N'PG', 0, N'https://www.youtube.com/embed/42ktqKbIX9o?si=H7rYO4Q3ZVT3-om5', 5)
INSERT [dbo].[Movies] ([id], [title], [poster], [banner], [description], [duration], [release_date], [country], [rating], [video_trailer], [MPAA_rating_id]) VALUES (31, N'THOR: TÌNH YÊU VÀ SẤM SÉT', N'449cc4b5-cc08-499a-8617-a9ab365b3638_rsz_thor-main-poster_1_.jpg', N'a72140c5-4b4a-4e3f-8c70-9e08096e39bd_badf983b-bd37-441f-91d0-a0924fdebb10.jpg', N'Vốn từng là một chiến binh hùng mạnh của Asgard, trải qua vô số trận chiến lớn nhỏ nhưng sau sự kiện trong Avengers: Endgame (2019) cùng vô số mất mát, Thần Sấm không còn muốn theo đuổi con đường siêu anh hùng. Từ đây, anh lên đường tìm ra ý nghĩa của cuộc sống và nhìn nhận lại bản thân mình.', CAST(N'01:04:07' AS Time), CAST(N'2023-12-15' AS Date), N'NZ', 0, N'https://www.youtube.com/embed/Pd_vrc6VR5o?si=vr4Cf0Q7w7pE1Or0', 1)
SET IDENTITY_INSERT [dbo].[Movies] OFF
GO
SET IDENTITY_INSERT [dbo].[Formats] ON 

INSERT [dbo].[Formats] ([id], [name], [description]) VALUES (1, N'2D', N'Phim 2D thường được chiếu trên màn hình phẳng.')
INSERT [dbo].[Formats] ([id], [name], [description]) VALUES (2, N'3D', N'Phim 3D sử dụng công nghệ 3D để tạo ra hiệu ứng chiếu rộng hơn và chi tiết hơn.')
INSERT [dbo].[Formats] ([id], [name], [description]) VALUES (3, N'IMAX', N'Phim IMAX có hình ảnh và âm thanh tối ưu trên màn hình IMAX lớn.')
INSERT [dbo].[Formats] ([id], [name], [description]) VALUES (4, N'4DX', N'Phim 4DX có thêm hiệu ứng vị trí và chuyển động để tạo trải nghiệm thực tế hơn cho khán giả.')
INSERT [dbo].[Formats] ([id], [name], [description]) VALUES (5, N'Dolby Atmos', N'Phim Dolby Atmos cung cấp âm thanh vòm cao cấp với nhiều lớp âm thanh khác nhau.')
INSERT [dbo].[Formats] ([id], [name], [description]) VALUES (6, N'ScreenX', N'Phim ScreenX được chiếu trên nhiều màn hình, tạo ra trải nghiệm hình ảnh rộng hơn.')
INSERT [dbo].[Formats] ([id], [name], [description]) VALUES (7, N'VIP', N'Phim VIP được chiếu tại các phòng chiếu cao cấp với dịch vụ phục vụ tốt hơn.')
INSERT [dbo].[Formats] ([id], [name], [description]) VALUES (8, N'Standard', N'Phim dạng Standard là loại phim thông thường.')
INSERT [dbo].[Formats] ([id], [name], [description]) VALUES (9, N'D-Box', N'Phim D-Box có ghế có khả năng rung lắc để đồng bộ với hành động trong phim.')
INSERT [dbo].[Formats] ([id], [name], [description]) VALUES (10, N'4K Ultra HD', N'Phim 4K Ultra HD có độ phân giải cao hơn và chi tiết rõ nét hơn.')
INSERT [dbo].[Formats] ([id], [name], [description]) VALUES (11, N'HDR', N'Phim HDR (High Dynamic Range) có độ tương phản và màu sắc tốt hơn.')
SET IDENTITY_INSERT [dbo].[Formats] OFF
GO
SET IDENTITY_INSERT [dbo].[Formats_Movies] ON 

INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (1, 1, 1)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (2, 1, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (3, 2, 1)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (4, 2, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (5, 3, 1)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (6, 3, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (7, 4, 1)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (8, 4, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (9, 5, 1)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (10, 5, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (11, 6, 1)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (12, 6, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (13, 7, 1)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (14, 7, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (15, 8, 1)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (16, 8, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (17, 9, 1)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (18, 9, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (19, 10, 1)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (20, 10, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (21, 11, 1)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (22, 11, 4)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (23, 12, 11)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (24, 12, 5)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (25, 12, 9)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (26, 22, 4)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (27, 22, 10)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (28, 22, 9)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (29, 24, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (30, 24, 9)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (31, 24, 4)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (32, 24, 10)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (33, 25, 10)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (34, 25, 4)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (35, 25, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (36, 26, 11)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (37, 26, 5)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (38, 26, 9)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (39, 26, 10)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (40, 28, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (41, 28, 4)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (42, 28, 5)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (43, 29, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (44, 29, 4)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (45, 29, 1)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (46, 31, 11)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (47, 31, 5)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (48, 31, 9)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (49, 23, 3)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (50, 23, 6)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (51, 27, 11)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (52, 27, 5)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (53, 27, 9)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (54, 21, 7)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (55, 21, 8)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (56, 20, 5)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (57, 20, 10)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (58, 17, 3)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (59, 17, 11)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (60, 17, 5)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (61, 17, 9)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (62, 16, 3)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (63, 16, 11)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (64, 16, 5)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (65, 15, 2)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (66, 15, 4)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (67, 15, 10)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (68, 14, 6)
INSERT [dbo].[Formats_Movies] ([id], [movie_id], [format_id]) VALUES (69, 14, 8)
SET IDENTITY_INSERT [dbo].[Formats_Movies] OFF
GO
SET IDENTITY_INSERT [dbo].[Provinces] ON 

INSERT [dbo].[Provinces] ([id], [name]) VALUES (1, N'Hà Nội')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (2, N'Hồ Chí Minh')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (3, N'Hải Phòng')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (4, N'Đà Nẵng')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (5, N'Cần Thơ')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (6, N'Hà Giang')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (7, N'Cao Bằng')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (8, N'Lai Châu')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (9, N'Điện Biên')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (10, N'Lào Cai')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (11, N'Yên Bái')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (12, N'Tuyên Quang')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (13, N'Lạng Sơn')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (14, N'Bắc Kạn')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (15, N'Thái Nguyên')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (16, N'Phú Thọ')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (17, N'Vĩnh Phúc')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (18, N'Bắc Ninh')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (19, N'Bắc Giang')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (20, N'Quảng Ninh')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (21, N'Hòa Bình')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (22, N'Hà Nam')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (23, N'Hà Tĩnh')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (24, N'Nghệ An')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (25, N'Quảng Bình')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (26, N'Quảng Trị')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (27, N'Thừa Thiên Huế')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (28, N'Quảng Nam')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (29, N'Quảng Ngãi')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (30, N'Bình Định')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (31, N'Phú Yên')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (32, N'Khánh Hòa')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (33, N'Ninh Thuận')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (34, N'Bình Thuận')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (35, N'Kon Tum')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (36, N'Gia Lai')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (37, N'Đắk Lắk')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (38, N'Đắk Nông')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (39, N'Lâm Đồng')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (40, N'Bình Phước')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (41, N'Bình Dương')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (42, N'Đồng Nai')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (43, N'Tây Ninh')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (44, N'Bà Rịa - Vũng Tàu')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (45, N'Long An')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (46, N'Tiền Giang')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (47, N'Bến Tre')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (48, N'Trà Vinh')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (49, N'Vĩnh Long')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (50, N'Đồng Tháp')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (51, N'An Giang')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (52, N'Kiên Giang')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (53, N'Cà Mau')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (54, N'Sóc Trăng')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (55, N'Bạc Liêu')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (56, N'Hậu Giang')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (57, N'Bắc Ninh')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (58, N'Nam Định')
INSERT [dbo].[Provinces] ([id], [name]) VALUES (59, N'Ninh Bình')
SET IDENTITY_INSERT [dbo].[Provinces] OFF
GO
SET IDENTITY_INSERT [dbo].[Cinema_Chains] ON 

INSERT [dbo].[Cinema_Chains] ([id], [name], [image], [banner], [description]) VALUES (1, N'CGV', N'f7667212-0f32-4581-99bf-31e9c6ce442e_cgv.jpg', N'ad0a6aec-a10b-4867-9799-c56eb4b44a40_cj-cgv-mo-t-trong-nhu-ng-doanh-nghie-p-di-da-u-trong-vie-c-trie-n-khai-ho-a-don-die-n-tu-001.jpg', N'Rạp chiếu phim CGV - Mạng lưới rạp phim lớn tại Việt Nam.')
INSERT [dbo].[Cinema_Chains] ([id], [name], [image], [banner], [description]) VALUES (2, N'Lotte Cinema', N'lotte.jpg', N'lottebanner.jpg', N'Nhà mạng lưới rạp chiếu phim của Lotte tại Việt Nam.')
INSERT [dbo].[Cinema_Chains] ([id], [name], [image], [banner], [description]) VALUES (3, N'BHD Star Cineplex', N'76ec0fff-08b0-4749-8ef3-06868d5bb2ae_bhp.jpg', N'1a2fb28b-2e15-451e-a49b-5ac9ed480637_image2-1671509424.jpg', N'Nhà mạng lưới rạp BHD Star Cineplex tại Việt Nam.')
INSERT [dbo].[Cinema_Chains] ([id], [name], [image], [banner], [description]) VALUES (4, N'Megastar Cineplex', N'mega.jpg', N'700bd31d-522a-4d5f-aba0-e4f431894765_7016_body_new (1).jpg', N'Rạp chiếu phim Megastar Cineplex - Một trong những mạng lưới phòng chiếu lớn tại Việt Nam.')
INSERT [dbo].[Cinema_Chains] ([id], [name], [image], [banner], [description]) VALUES (5, N'Galaxy Cinema', N'galaci_cinema.jpg', N'ed222855-ac26-49f4-a369-f395942e81b0_galaxy-kinh-duong-vuong--3_1698741240596.jpg', N'Galaxy Cinema - Mạng lưới rạp chiếu phim phổ biến tại Việt Nam.')
SET IDENTITY_INSERT [dbo].[Cinema_Chains] OFF
GO
SET IDENTITY_INSERT [dbo].[Cinema_Complex] ON 

INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (1, N'Standard Cinema Complex', N'123 Park Street, Quận 1, Thành phố Hồ Chí Minh', N'0192949422', CAST(N'08:00:00' AS Time), CAST(N'22:00:00' AS Time), 106.67766713500747, 10.789879751872588, 1, 2)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (2, N'3D Cinema Complex', N'CM tháng 8, Quận 12, Thành phố Hồ Chí Minh', N'0945586789', CAST(N'09:00:00' AS Time), CAST(N'23:00:00' AS Time), 108.46757489149324, 11.942648947844194, 2, 2)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (3, N'IMAX Cinema Complex', N'Đường Võ Văn Kiệt, Bình Thủy, Cần Thơ', N'0111285634', CAST(N'07:00:00' AS Time), CAST(N'21:00:00' AS Time), 108.00538470578515, 12.683889984028019, 3, 5)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (4, N'VIP Cinema Complex', N'Nguyễn Văn Linh, Ninh Kiều, Cần Thơ', N'09897774444', CAST(N'10:00:00' AS Time), CAST(N'23:00:00' AS Time), 107.99614634146174, 13.98730117822659, 4, 5)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (5, N'Multiplex Cinema Complex', N'Quốc Lộ 1A, Châu Thành, Sóc Trăng', N'0908903495', CAST(N'11:00:00' AS Time), CAST(N'23:50:00' AS Time), 108.16118439891675, 16.086851807997597, 5, 54)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (6, N'Independent Cinema Complex', N'Đường Võ Văn Kiệt, Thành phố Sóc Trăng', N'06848829533', CAST(N'06:00:00' AS Time), CAST(N'20:00:00' AS Time), 106.57067083008025, 17.486183473488236, 2, 54)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (7, N'Boutique Cinema Complex', N'39 Điện Biên Phủ, Phường 1, Thành phố Bạc Liêu, tỉnh Bạc Liêu ', N'09993447999', CAST(N'08:30:00' AS Time), CAST(N'22:30:00' AS Time), 105.91811624097883, 18.269874692012511, 3, 55)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (8, N'Family Cinema Complex', N'Tầng 3, TTTM Vincom Plaza Bạc Liêu, số 18 Hồ Xuân Hương, Phường 1, Thành phố Bạc Liêu, tỉnh Bạc Liêu', N'0380008090', CAST(N'09:30:00' AS Time), CAST(N'23:30:00' AS Time), 105.69282952514989, 18.667767271820122, 1, 55)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (9, N'Sports Cinema Complex', N'CGV Vincom Center Bà Triệu: Tầng 6, Vincom Center Bà Triệu, 191 Bà Triệu, Hai Bà Trưng, Hà Nội', N'03419392939', CAST(N'07:30:00' AS Time), CAST(N'21:30:00' AS Time), 105.88704221120933, 18.343627995417329, 4, 1)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (10, N'Art House Cinema Complex', N'Tầng 5, Keangnam Hanoi Landmark Tower, Phạm Hùng, Từ Liêm, Hà Nội', N'0984557777', CAST(N'10:30:00' AS Time), CAST(N'00:30:00' AS Time), 105.66175549538038, 18.675126921754565, 5, 1)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (11, N'Digital Cinema Complex', N' Tầng 4, Mipec Tower, 229 Tây Sơn, Đống Đa, Hà Nội', N'0981237415', CAST(N'11:30:00' AS Time), CAST(N'01:30:00' AS Time), 105.33547818280053, 19.490037632342951, 1, 42)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (12, N'Live Cinema Complex', N'Tầng 5, Vincom Plaza Biên Hòa, đường Đồng Khởi, Phường Trung Dũng, TP. Biên Hòa, Đồng Nai', N'09412367842', CAST(N'07:30:00' AS Time), CAST(N'23:00:00' AS Time), 105.70836655042983, 19.91423237112507, 3, 42)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (13, N'High-Tech Cinema Complex', N'Tầng 4, TTTM Long Khánh, 104A Trần Hưng Đạo, Phường Long Bình, TP. Long Khánh, Đồng Nai', N'0945768900', CAST(N'08:00:00' AS Time), CAST(N'22:00:00' AS Time), 106.10456042999107, 20.555664689128083, 2, 42)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (14, N'Community Cinema Complex', N'TP. Biên Hòa, Đồng Nai', N'0945515456', CAST(N'09:00:00' AS Time), CAST(N'23:00:00' AS Time), 105.79382013229598, 21.078481525791283, 1, 42)
INSERT [dbo].[Cinema_Complex] ([id], [name], [address], [phone], [opening_time], [closing_time], [longitude], [latitude], [cinema_chain_id], [province_id]) VALUES (15, N'Anime Cinema Complex', N'TP. Biên Hòa, Đồng Nai', N'0383834578', CAST(N'07:00:00' AS Time), CAST(N'21:00:00' AS Time), 105.84043116882903, 21.049483918957133, 4, 42)
SET IDENTITY_INSERT [dbo].[Cinema_Complex] OFF
GO
SET IDENTITY_INSERT [dbo].[Price] ON 

INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (1, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 1, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (2, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 2, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (3, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 3, 2)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (4, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 4, 2)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (5, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 5, 3)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (6, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 6, 3)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (7, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 7, 4)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (8, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 8, 4)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (9, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 9, 5)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (10, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 10, 5)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (11, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 11, 6)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (12, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 12, 6)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (13, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 13, 8)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (14, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 14, 9)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (15, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 15, 10)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (16, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 16, 11)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (17, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 17, 12)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (18, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 18, 13)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (19, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 19, 14)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (20, CAST(N'2023-11-20T00:00:00.000' AS DateTime), CAST(N'2023-12-27T00:00:00.000' AS DateTime), 1, 20, 15)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (21, CAST(N'2023-12-14T07:00:00.000' AS DateTime), CAST(N'2023-12-29T07:00:00.000' AS DateTime), 1, 20, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (22, CAST(N'2023-12-14T07:00:00.000' AS DateTime), CAST(N'2023-12-21T07:00:00.000' AS DateTime), 1, 22, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (23, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-29T07:00:00.000' AS DateTime), 1, 46, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (24, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-28T07:00:00.000' AS DateTime), 1, 41, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (25, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-29T07:00:00.000' AS DateTime), 1, 48, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (26, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2024-01-03T07:00:00.000' AS DateTime), 1, 40, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (27, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2024-01-05T07:00:00.000' AS DateTime), 1, 40, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (28, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2024-01-06T07:00:00.000' AS DateTime), 1, 32, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (29, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-31T07:00:00.000' AS DateTime), 1, 30, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (30, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2024-01-06T07:00:00.000' AS DateTime), 1, 49, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (31, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2024-01-06T07:00:00.000' AS DateTime), 1, 50, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (32, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2024-01-04T07:00:00.000' AS DateTime), 1, 26, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (33, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2024-01-04T07:00:00.000' AS DateTime), 1, 28, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (34, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2024-01-04T07:00:00.000' AS DateTime), 1, 51, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (35, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-31T07:00:00.000' AS DateTime), 1, 54, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (36, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-26T07:00:00.000' AS DateTime), 1, 56, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (37, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-27T07:00:00.000' AS DateTime), 1, 61, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (38, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-31T07:00:00.000' AS DateTime), 1, 58, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (39, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-31T07:00:00.000' AS DateTime), 1, 59, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (40, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-31T07:00:00.000' AS DateTime), 1, 62, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (41, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-31T07:00:00.000' AS DateTime), 1, 65, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (42, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-31T07:00:00.000' AS DateTime), 1, 68, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (43, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-31T07:00:00.000' AS DateTime), 1, 25, 1)
INSERT [dbo].[Price] ([id], [start_date], [end_date], [status], [format_movie_id], [cinema_complex_id]) VALUES (44, CAST(N'2023-12-15T07:00:00.000' AS DateTime), CAST(N'2023-12-31T07:00:00.000' AS DateTime), 1, 22, 1)
SET IDENTITY_INSERT [dbo].[Price] OFF
GO
SET IDENTITY_INSERT [dbo].[Cinema_Types] ON 

INSERT [dbo].[Cinema_Types] ([id], [type_name], [description]) VALUES (1, N'Regular', N'Standard cinema with regular amenities.')
INSERT [dbo].[Cinema_Types] ([id], [type_name], [description]) VALUES (2, N'VIP', N'Luxury cinema with VIP services.')
INSERT [dbo].[Cinema_Types] ([id], [type_name], [description]) VALUES (3, N'3D', N'Cinema with 3D projection technology.')
INSERT [dbo].[Cinema_Types] ([id], [type_name], [description]) VALUES (4, N'IMAX', N'Cinema with IMAX screens and audio.')
INSERT [dbo].[Cinema_Types] ([id], [type_name], [description]) VALUES (5, N'Digital', N'Digital cinema with advanced projection.')
INSERT [dbo].[Cinema_Types] ([id], [type_name], [description]) VALUES (6, N'Boutique', N'Boutique cinema with a unique experience.')
INSERT [dbo].[Cinema_Types] ([id], [type_name], [description]) VALUES (7, N'Independent', N'Independent cinema offering diverse films.')
INSERT [dbo].[Cinema_Types] ([id], [type_name], [description]) VALUES (8, N'Family', N'Family-friendly cinema with special screenings.')
INSERT [dbo].[Cinema_Types] ([id], [type_name], [description]) VALUES (9, N'Sports', N'Cinema with sports events and big screens.')
INSERT [dbo].[Cinema_Types] ([id], [type_name], [description]) VALUES (10, N'Art House', N'Art house cinema with independent films.')
SET IDENTITY_INSERT [dbo].[Cinema_Types] OFF
GO
SET IDENTITY_INSERT [dbo].[Cinemas] ON 

INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (1, N'Cinema 1 - Standard Cinema Complex ', 1, 1, 1)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (2, N'Cinema 2 - Standard Cinema Complex', 1, 3, 1)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (3, N'Cinema 1 - 3D Cinema Complex', 1, 7, 2)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (4, N'Cinema 2 - 3D Cinema Complex', 1, 6, 2)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (5, N'Cinema 1 - IMAX Cinema Complex', 1, 3, 3)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (6, N'Cinema 2 - IMAX Cinema Complex', 1, 3, 3)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (7, N'Cinema 1 - VIP Cinema Complex', 1, 1, 4)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (8, N'Cinema 2 - VIP Cinema Complex', 1, 1, 4)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (9, N'Cinema 1 - Multiplex Cinema Complex', 1, 5, 5)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (10, N'Cinema 2 - Multiplex Cinema Complex', 1, 7, 5)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (11, N'Cinema 1 - Independent Cinema Complex', 1, 3, 6)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (12, N'Cinema 2 - Independent Cinema Complex', 1, 3, 6)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (13, N'Cinema 1 - Boutique Cinema Complex', 1, 4, 7)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (14, N'Cinema 2 - Boutique Cinema Complex', 1, 5, 7)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (15, N'Cinema 1 - Family Cinema Complex', 1, 10, 8)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (16, N'Cinema 2 - Family Cinema Complex', 1, 8, 8)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (17, N'Cinema 1 - Sports Cinema Complex', 1, 6, 9)
INSERT [dbo].[Cinemas] ([id], [name], [status], [cinema_type_id], [cinema_complex_id]) VALUES (18, N'Cinema 2 -Sports Cinema Complex', 1, 6, 9)
SET IDENTITY_INSERT [dbo].[Cinemas] OFF
GO
SET IDENTITY_INSERT [dbo].[Showtimes] ON 

INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (1, CAST(N'2023-12-08T12:00:00.000' AS DateTime), CAST(N'2023-12-08T14:00:00.000' AS DateTime), 1, 1, 1, 1)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (6, CAST(N'2023-12-18T15:00:00.000' AS DateTime), CAST(N'2023-12-18T17:00:00.000' AS DateTime), 1, 2, 1, 2)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (7, CAST(N'2023-12-15T18:00:00.000' AS DateTime), CAST(N'2023-12-15T20:00:00.000' AS DateTime), 1, 4, 1, 4)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (8, CAST(N'2023-12-15T21:00:00.000' AS DateTime), CAST(N'2023-12-15T23:00:00.000' AS DateTime), 1, 6, 1, 6)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (9, CAST(N'2023-12-15T12:00:00.000' AS DateTime), CAST(N'2023-12-15T14:00:00.000' AS DateTime), 1, 8, 1, 8)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (10, CAST(N'2023-12-15T15:00:00.000' AS DateTime), CAST(N'2023-12-15T17:00:00.000' AS DateTime), 1, 10, 1, 10)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (11, CAST(N'2023-12-15T16:14:07.000' AS DateTime), CAST(N'2023-12-15T18:29:00.000' AS DateTime), 1, 20, 1, 21)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (12, CAST(N'2023-12-15T04:57:49.000' AS DateTime), CAST(N'2023-12-15T09:53:00.000' AS DateTime), 1, 22, 1, 22)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (13, CAST(N'2023-12-17T11:12:53.000' AS DateTime), CAST(N'2023-12-17T12:16:00.000' AS DateTime), 1, 46, 1, 23)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (14, CAST(N'2023-12-17T12:34:11.000' AS DateTime), CAST(N'2023-12-17T13:38:00.000' AS DateTime), 1, 46, 1, 23)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (15, CAST(N'2023-12-17T19:13:35.000' AS DateTime), CAST(N'2023-12-17T20:17:00.000' AS DateTime), 1, 46, 1, 23)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (16, CAST(N'2023-12-17T21:13:52.000' AS DateTime), CAST(N'2023-12-17T22:17:00.000' AS DateTime), 1, 46, 1, 23)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (17, CAST(N'2023-12-17T11:15:02.000' AS DateTime), CAST(N'2023-12-17T13:12:00.000' AS DateTime), 1, 41, 1, 24)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (18, CAST(N'2023-12-17T14:15:20.000' AS DateTime), CAST(N'2023-12-17T16:12:00.000' AS DateTime), 1, 41, 1, 24)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (19, CAST(N'2023-12-17T14:16:12.000' AS DateTime), CAST(N'2023-12-17T15:20:00.000' AS DateTime), 1, 48, 1, 25)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (20, CAST(N'2023-12-17T16:16:55.000' AS DateTime), CAST(N'2023-12-17T17:20:00.000' AS DateTime), 1, 48, 1, 25)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (21, CAST(N'2023-12-17T12:21:19.000' AS DateTime), CAST(N'2023-12-17T14:18:00.000' AS DateTime), 1, 40, 1, 27)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (22, CAST(N'2023-12-17T14:42:58.000' AS DateTime), CAST(N'2023-12-17T16:39:00.000' AS DateTime), 1, 40, 1, 26)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (23, CAST(N'2023-12-17T15:24:11.000' AS DateTime), CAST(N'2023-12-17T17:10:00.000' AS DateTime), 1, 32, 1, 28)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (24, CAST(N'2023-12-17T18:24:32.000' AS DateTime), CAST(N'2023-12-17T20:10:00.000' AS DateTime), 1, 32, 1, 28)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (25, CAST(N'2023-12-17T20:34:48.000' AS DateTime), CAST(N'2023-12-17T22:20:00.000' AS DateTime), 1, 32, 1, 28)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (26, CAST(N'2023-12-17T16:26:18.000' AS DateTime), CAST(N'2023-12-17T18:12:00.000' AS DateTime), 1, 30, 1, 29)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (27, CAST(N'2023-12-17T18:49:36.000' AS DateTime), CAST(N'2023-12-17T20:35:00.000' AS DateTime), 1, 30, 1, 29)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (28, CAST(N'2023-12-17T14:28:40.000' AS DateTime), CAST(N'2023-12-17T16:12:00.000' AS DateTime), 1, 49, 1, 30)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (29, CAST(N'2023-12-17T16:38:03.000' AS DateTime), CAST(N'2023-12-17T18:22:00.000' AS DateTime), 1, 49, 1, 30)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (30, CAST(N'2023-12-17T16:29:48.000' AS DateTime), CAST(N'2023-12-17T18:13:00.000' AS DateTime), 1, 50, 1, 31)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (31, CAST(N'2023-12-17T20:30:13.000' AS DateTime), CAST(N'2023-12-17T22:14:00.000' AS DateTime), 1, 50, 1, 31)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (32, CAST(N'2023-12-17T14:32:25.000' AS DateTime), CAST(N'2023-12-17T16:10:00.000' AS DateTime), 1, 28, 1, 33)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (33, CAST(N'2023-12-17T16:40:45.000' AS DateTime), CAST(N'2023-12-17T18:18:00.000' AS DateTime), 1, 28, 1, 33)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (34, CAST(N'2023-12-17T20:33:08.000' AS DateTime), CAST(N'2023-12-17T22:11:00.000' AS DateTime), 1, 28, 1, 33)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (35, CAST(N'2023-12-17T14:33:30.000' AS DateTime), CAST(N'2023-12-17T16:11:00.000' AS DateTime), 1, 26, 1, 32)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (36, CAST(N'2023-12-17T16:43:50.000' AS DateTime), CAST(N'2023-12-17T18:21:00.000' AS DateTime), 1, 26, 1, 32)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (37, CAST(N'2023-12-17T20:34:12.000' AS DateTime), CAST(N'2023-12-17T22:12:00.000' AS DateTime), 1, 26, 1, 32)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (38, CAST(N'2023-12-17T15:37:06.000' AS DateTime), CAST(N'2023-12-17T17:32:00.000' AS DateTime), 1, 51, 1, 34)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (39, CAST(N'2023-12-17T16:39:46.000' AS DateTime), CAST(N'2023-12-17T18:07:00.000' AS DateTime), 1, 54, 1, 35)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (40, CAST(N'2023-12-17T15:41:57.000' AS DateTime), CAST(N'2023-12-17T17:05:00.000' AS DateTime), 1, 56, 1, 36)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (41, CAST(N'2023-12-17T20:42:17.000' AS DateTime), CAST(N'2023-12-17T22:06:00.000' AS DateTime), 1, 56, 1, 36)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (42, CAST(N'2023-12-17T16:43:55.000' AS DateTime), CAST(N'2023-12-17T17:59:00.000' AS DateTime), 1, 61, 1, 37)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (43, CAST(N'2023-12-17T18:50:25.000' AS DateTime), CAST(N'2023-12-17T20:06:00.000' AS DateTime), 1, 61, 1, 37)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (44, CAST(N'2023-12-17T10:57:34.000' AS DateTime), CAST(N'2023-12-17T12:13:00.000' AS DateTime), 1, 58, 1, 38)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (45, CAST(N'2023-12-17T13:45:51.000' AS DateTime), CAST(N'2023-12-17T15:01:00.000' AS DateTime), 1, 58, 1, 38)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (46, CAST(N'2023-12-17T16:46:07.000' AS DateTime), CAST(N'2023-12-17T18:02:00.000' AS DateTime), 1, 58, 1, 38)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (47, CAST(N'2023-12-17T19:46:26.000' AS DateTime), CAST(N'2023-12-17T21:02:00.000' AS DateTime), 1, 58, 1, 38)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (48, CAST(N'2023-12-17T12:47:28.000' AS DateTime), CAST(N'2023-12-17T14:03:00.000' AS DateTime), 1, 59, 1, 39)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (49, CAST(N'2023-12-17T15:47:47.000' AS DateTime), CAST(N'2023-12-17T17:03:00.000' AS DateTime), 1, 59, 1, 39)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (50, CAST(N'2023-12-17T17:26:08.000' AS DateTime), CAST(N'2023-12-17T18:42:00.000' AS DateTime), 1, 59, 1, 39)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (51, CAST(N'2023-12-17T18:59:27.000' AS DateTime), CAST(N'2023-12-17T20:15:00.000' AS DateTime), 1, 59, 1, 39)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (52, CAST(N'2023-12-17T21:49:05.000' AS DateTime), CAST(N'2023-12-17T23:05:00.000' AS DateTime), 1, 59, 1, 39)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (53, CAST(N'2023-12-18T13:51:11.000' AS DateTime), CAST(N'2023-12-18T15:04:00.000' AS DateTime), 1, 62, 1, 40)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (54, CAST(N'2023-12-18T08:56:33.000' AS DateTime), CAST(N'2023-12-18T10:00:00.000' AS DateTime), 1, 65, 1, 41)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (55, CAST(N'2023-12-19T08:54:15.000' AS DateTime), CAST(N'2023-12-19T11:57:00.000' AS DateTime), 1, 68, 1, 42)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (56, CAST(N'2023-12-19T13:55:49.000' AS DateTime), CAST(N'2023-12-19T15:53:00.000' AS DateTime), 1, 25, 1, 43)
INSERT [dbo].[Showtimes] ([id], [start_time], [end_time], [cinema_id], [format_movie_id], [seat_chart_id], [price_id]) VALUES (57, CAST(N'2023-12-20T20:56:56.000' AS DateTime), CAST(N'2023-12-20T01:52:00.000' AS DateTime), 1, 22, 1, 22)
SET IDENTITY_INSERT [dbo].[Showtimes] OFF
GO
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'1', N'user6', CAST(N'2022-01-01T12:00:00.000' AS DateTime), 1, 0, 0)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'10', N'user6', CAST(N'2022-02-10T20:15:00.000' AS DateTime), 1, 1, 1)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'11', N'user6', CAST(N'2022-02-11T11:30:00.000' AS DateTime), 1, 0, 2)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'12', N'user6', CAST(N'2022-02-12T14:00:00.000' AS DateTime), 1, 1, 2)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'13', N'user6', CAST(N'2022-02-13T16:15:00.000' AS DateTime), 1, 0, 2)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'14', N'user6', CAST(N'2022-01-14T19:45:00.000' AS DateTime), 1, 1, 2)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'15', N'user6', CAST(N'2022-02-15T22:00:00.000' AS DateTime), 1, 0, 2)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'16', N'user6', CAST(N'2023-01-16T09:15:00.000' AS DateTime), 1, 1, 2)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'169119893', N'dongnguyen', CAST(N'2023-12-14T11:42:31.450' AS DateTime), 11, 0, 1)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'17', N'user6', CAST(N'2023-01-17T12:30:00.000' AS DateTime), 1, 0, 1)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'18', N'user6', CAST(N'2023-01-18T14:45:00.000' AS DateTime), 1, 1, 1)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'19', N'user6', CAST(N'2023-01-19T17:00:00.000' AS DateTime), 1, 0, 1)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'2', N'user6', CAST(N'2022-03-02T14:30:00.000' AS DateTime), 1, 1, 0)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'20', N'user6', CAST(N'2023-01-20T20:30:00.000' AS DateTime), 1, 1, 1)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'2659744188', N'dongnguyen', CAST(N'2023-12-15T21:05:53.713' AS DateTime), 41, 0, 0)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'3', N'user6', CAST(N'2022-03-03T16:45:00.000' AS DateTime), 1, 0, 0)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'4', N'user6', CAST(N'2024-01-04T19:15:00.000' AS DateTime), 1, 1, 0)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'5', N'user6', CAST(N'2024-01-05T21:30:00.000' AS DateTime), 1, 0, 1)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'6', N'user6', CAST(N'2024-01-06T10:00:00.000' AS DateTime), 1, 1, 1)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'7', N'user5', CAST(N'2022-01-07T13:45:00.000' AS DateTime), 1, 0, 1)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'7425531041', N'dongnguyen', CAST(N'2023-12-15T21:05:08.950' AS DateTime), 44, 0, 0)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'8', N'user6', CAST(N'2023-01-08T15:30:00.000' AS DateTime), 1, 1, 1)
INSERT [dbo].[Booking] ([id], [account_id], [create_date], [showtime_id], [status], [ticket_status]) VALUES (N'9', N'user6', CAST(N'2022-02-09T18:00:00.000' AS DateTime), 1, 0, 1)
GO
SET IDENTITY_INSERT [dbo].[Services] ON 

INSERT [dbo].[Services] ([id], [name], [description], [image], [quantity], [cinema_complex_id]) VALUES (1, N'My combo', N'1 bắp lớn + 1 nước siêu lớn. Nhận trong ngày xem phim', N'629267a7-be1e-48a1-957a-1e0a1468092a_z4950576540477_9db58322f1460ea785ca5b69dc1806ad.jpg', 23, 1)
INSERT [dbo].[Services] ([id], [name], [description], [image], [quantity], [cinema_complex_id]) VALUES (2, N'CGV Combo', N'1 bắp lớn + 2 nước siêu lớn. Nhận trong ngày xem phim', N'c65d518f-ed81-4794-a7c0-e186c32b7508_z4950576509600_065004f5c2538dc9972a9c3fdd78293e.jpg', 23, 1)
INSERT [dbo].[Services] ([id], [name], [description], [image], [quantity], [cinema_complex_id]) VALUES (3, N'SPECIAL DRINK FAMILY COMBO', N'04 nước pha chế vừa (nước trái cây xoài đào / trà sữa đường nâu / trà vải / milo ) + 02 bắp ngọt. Nhận trong ngày xem phim. 
	Chỉ thêm 5,000đ đổi sang nước lớn.
	Số lượng quà tặng có giới hạn', N'b7ae1a64-f010-4c91-8887-9b70f3e94a36_z4950576485710_97583816ac966be6d1ae9af30cfdc8ed.jpg', 30, 3)
INSERT [dbo].[Services] ([id], [name], [description], [image], [quantity], [cinema_complex_id]) VALUES (4, N'SPECIAL DRINK MD COMBO', N'01 ly nhân vật tùy chọn + 02 nước pha chế vừa ( nước trái cây xoài đào / trà sữa đường nâu / trà vải / milo ) 
	+ 01 bắp ngọt - Nhận trong ngày xem phim - Mẫu ly nhân vật phụ thuộc vào số lượng tại rạp 
	- Không áp dụng đối với mẫu ly mới ra mắt - Số lượng quà tặng có giới hạn', N'535ad769-6c67-474a-a829-ffdafbb49734_z4950576471994_46141ee18b6eabcbaab3fac6c8aad5b7.jpg', 19, 1)
INSERT [dbo].[Services] ([id], [name], [description], [image], [quantity], [cinema_complex_id]) VALUES (5, N'TRIDENT MY COMBO', N'1 ly Aquaman Trident + 1 nước ngọt siêu lớn + 1 bắp lớn tùy chọn vị
- Nhận trong ngày xem phim', N'7cff72dc-c57b-4636-8731-0374171b256a_64e0cd2b28071_1692454187.png', 30, 2)
INSERT [dbo].[Services] ([id], [name], [description], [image], [quantity], [cinema_complex_id]) VALUES (6, N'GARFIELD TRIPPLE COMBO 2023', N'03 ly nhân vật Garfield (kèm nước) + 01 bắp hai vị
* Nhận ngay trong ngày xem phim
** Mẫu ly phụ thuộc vào số lượng của rạp', N'ac206b30-ed22-406b-a4f9-c84c96d48039_647f00b5f1f72_1686044854.png', 30, 2)
INSERT [dbo].[Services] ([id], [name], [description], [image], [quantity], [cinema_complex_id]) VALUES (7, N'GARFIELD DOUBLE COMBO 2023', N'02 ly nhân vật Garfield (kèm nước)
* Nhận ngay trong ngày xem phim
** Thêm 39,000đ nhận ngay 1 bắp ngọt
*** Mẫu ly phụ thuộc vào số lượng của rạp', N'806004fd-9824-4b16-8e5b-f23c8c20b56b_64e0cd409950b_1692454209.png', 30, 9)
SET IDENTITY_INSERT [dbo].[Services] OFF
GO
SET IDENTITY_INSERT [dbo].[Seat_Types] ON 

INSERT [dbo].[Seat_Types] ([id], [name], [nick_name], [color], [width], [image], [description]) VALUES (1, N'Ghế thường', N'normalSeat', N'#7C25CE', 1, N'normal.jpg', N'Loại ghế thông thường sử dụng cho tất cả khách hàng.')
INSERT [dbo].[Seat_Types] ([id], [name], [nick_name], [color], [width], [image], [description]) VALUES (2, N'Ghế VIP', N'vipSeat', N'#B32225', 1, N'vip.jpg', N'Loại ghế VIP dành cho các khách hàng có vé VIP.')
INSERT [dbo].[Seat_Types] ([id], [name], [nick_name], [color], [width], [image], [description]) VALUES (3, N'Ghế đôi', N'coupleSeat', N'#AD1859', 2, N'f491c4b0-e3c0-4316-b0bc-c56d3d62110a_coupelseat.jpg', N'Loại ghế đôi thích hợp cho các cặp đôi xem phim.')
INSERT [dbo].[Seat_Types] ([id], [name], [nick_name], [color], [width], [image], [description]) VALUES (4, N'Ghế tựa', N'reclinerSeat', N'#0891B2', 1, N'15d82bef-30ec-4fb0-a243-c36ed8151a54_ghetua.jpg', N'Loại ghế tựa về sao.')
INSERT [dbo].[Seat_Types] ([id], [name], [nick_name], [color], [width], [image], [description]) VALUES (5, N'Ghế trẻ em', N'kidSeat', N'#10B785', 1, N'kid.jpg', N'Loại ghế dành cho trẻ em, có kích thước nhỏ hơn.')
INSERT [dbo].[Seat_Types] ([id], [name], [nick_name], [color], [width], [image], [description]) VALUES (6, N'Ghế Sofa', N'sofaSeat', N'#C58B0B', 1, N'61c77d05-e28a-43e6-9ea1-590fc707586c_sofa.jpg', N'Loại ghế có thiết kế đặc biệt để tạo sự thoải mái khi xem phim.')
INSERT [dbo].[Seat_Types] ([id], [name], [nick_name], [color], [width], [image], [description]) VALUES (7, N'đường đi', N'way', N'#121B2B', 1, N'url_anh_ghethoaithoaimai.jpg', N'Đây là loại dùng để đo kích thước của đường đi')
INSERT [dbo].[Seat_Types] ([id], [name], [nick_name], [color], [width], [image], [description]) VALUES (8, N'Ghế đã đặt', N'seatUnavailable', N'#404040', 1, N'url_anh_ghethoaithoaimai.jpg', N'đây là màu ghế đã đặt')
INSERT [dbo].[Seat_Types] ([id], [name], [nick_name], [color], [width], [image], [description]) VALUES (9, N'Ghế chọn', N'seatReserved', N'#16A34A', 1, N'url_anh_ghethoaithoaimai.jpg', N'Đây là màu ghế đã chọn')
SET IDENTITY_INSERT [dbo].[Seat_Types] OFF
GO
SET IDENTITY_INSERT [dbo].[Seat_Chart] ON 

INSERT [dbo].[Seat_Chart] ([id], [name], [rows], [columns], [status], [cinema_id]) VALUES (1, N'Sơ đồ 1', 10, 7, 1, 1)
SET IDENTITY_INSERT [dbo].[Seat_Chart] OFF
GO
SET IDENTITY_INSERT [dbo].[Seats] ON 

INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (1, N'A1', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (2, N'A2', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (3, N'A3', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (4, N'A4', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (5, N'A5', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (6, N'A6', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (7, N'A7', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (8, N'B1', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (9, N'B2', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (10, N'B3', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (11, N'B4', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (12, N'B5', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (13, N'B6', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (14, N'B7', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (15, N'C1', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (16, N'C2', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (17, N'C3', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (18, N'C4', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (19, N'C5', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (20, N'C6', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (21, N'C7', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (22, N'D1', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (23, N'D2', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (24, N'D3', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (25, N'D4', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (26, N'D5', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (27, N'D6', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (28, N'D7', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (29, N'E1', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (30, N'E2', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (31, N'E3', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (32, N'E4', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (33, N'E5', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (34, N'E6', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (35, N'E7', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (36, N'F1', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (37, N'F2', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (38, N'F3', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (39, N'F4', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (40, N'F5', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (41, N'F6', 1, N'Ghế VIP', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (42, N'F7', 1, N'Ghế thông thường', 1, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (43, N'G1', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (44, N'G2', 1, N'Ghế VIP', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (45, N'G3', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (46, N'G4', 1, N'Ghế VIP', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (47, N'G5', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (48, N'G6', 1, N'Ghế VIP', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (49, N'G7', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (50, N'H1', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (51, N'H2', 1, N'Ghế VIP', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (52, N'H3', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (53, N'H4', 1, N'Ghế VIP', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (54, N'H5', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (55, N'H6', 1, N'Ghế VIP', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (56, N'H7', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (57, N'I1', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (58, N'I2', 1, N'Ghế VIP', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (59, N'I3', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (60, N'I4', 1, N'Ghế VIP', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (61, N'I5', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (62, N'I6', 1, N'Ghế VIP', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (63, N'I7', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (64, N'J1', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (65, N'J2', 1, N'Ghế VIP', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (66, N'J3', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (67, N'J4', 1, N'Ghế VIP', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (68, N'J5', 1, N'Ghế thông thường', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (69, N'J6', 1, N'Ghế VIP', 2, 1)
INSERT [dbo].[Seats] ([id], [name], [status], [description], [seat_type_id], [seat_chart_id]) VALUES (70, N'J7', 1, N'Ghế thông thường', 2, 1)
SET IDENTITY_INSERT [dbo].[Seats] OFF
GO
SET IDENTITY_INSERT [dbo].[Genres] ON 

INSERT [dbo].[Genres] ([id], [name], [description]) VALUES (1, N'Hành động', N'Phim hành động thường có nhiều cảnh hỗn loạn, võ thuật, và hành động kịch tính. Chúng thường xoay quanh các nhân vật chống lại kẻ thù hoặc giải quyết vấn đề bằng cách sử dụng bạo lực hoặc kỹ năng chiến đấu.')
INSERT [dbo].[Genres] ([id], [name], [description]) VALUES (2, N'Khoa học viễn tưởng', N'tập trung vào các khía cạnh khoa học, công nghệ, và tương lai.')
INSERT [dbo].[Genres] ([id], [name], [description]) VALUES (3, N'Phiêu lưu', N' Phim phiêu lưu thường kể về cuộc hành trình mạo hiểm của các nhân vật chống lại khó khăn và nguy hiểm. Chúng thường tập trung vào việc khám phá và khám phá thế giới')
INSERT [dbo].[Genres] ([id], [name], [description]) VALUES (4, N'Hài kịch', N'Phim hài kịch chuyên về việc tạo ra tiếng cười và giải trí. Chúng có thể xoay quanh các tình huống hài hước và những tình tiết gây cười')
INSERT [dbo].[Genres] ([id], [name], [description]) VALUES (5, N'Kinh dị', N' Phim kinh dị tạo ra cảm giác sợ hãi và căng thẳng trong khán giả. Chúng thường có các yếu tố ma quỷ, ám ảnh và kỳ quái')
INSERT [dbo].[Genres] ([id], [name], [description]) VALUES (6, N'Tình cảm', N' Phim tình cảm tập trung vào các mối quan hệ tình yêu và lãng mạn. Chúng thường xoay quanh câu chuyện tình đẹp và cảm động')
INSERT [dbo].[Genres] ([id], [name], [description]) VALUES (7, N'Hoạt Hình', N'Phim hoạt hình sử dụng các hình ảnh được vẽ hoặc tạo ra bằng máy tính để kể câu chuyện. Chúng có thể dành cho cả trẻ em và người lớn')
INSERT [dbo].[Genres] ([id], [name], [description]) VALUES (8, N'Tâm lý', N'Phim tâm lý tập trung vào phát triển nhân vật và tạo ra các tình tiết đầy cảm xúc. Chúng thường khám phá các vấn đề xã hội và nhân văn')
INSERT [dbo].[Genres] ([id], [name], [description]) VALUES (9, N'Hình sự', N'Phim hình sự thường liên quan đến tội phạm, điều tra, và phá án. Chúng tập trung vào việc phát hiện và truy bắt tội phạm')
INSERT [dbo].[Genres] ([id], [name], [description]) VALUES (10, N'Chiến tranh', N'Phim chiến tranh thường lấy bối cảnh trong các cuộc chiến tranh và tập trung vào các khía cạnh của chiến tranh, như tình bạn, mất mát và hậu quả xã hội')
SET IDENTITY_INSERT [dbo].[Genres] OFF
GO
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (1, 1)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (1, 2)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (1, 9)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (1, 17)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (1, 22)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (1, 23)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (1, 24)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (1, 25)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (1, 26)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (1, 27)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (1, 28)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (1, 29)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (1, 31)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (2, 2)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (2, 6)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (2, 7)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (2, 14)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (2, 23)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (2, 24)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (2, 27)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (3, 1)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (3, 3)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (3, 4)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (3, 7)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (3, 16)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (3, 20)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (3, 21)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (3, 25)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (3, 26)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (3, 27)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (3, 28)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (3, 29)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (3, 31)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (4, 1)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (4, 3)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (4, 4)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (4, 8)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (4, 9)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (4, 22)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (5, 2)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (5, 7)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (5, 12)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (5, 14)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (5, 15)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (7, 4)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (7, 6)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (7, 16)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (7, 17)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (7, 20)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (7, 21)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (8, 15)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (9, 3)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (9, 6)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (9, 11)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (10, 5)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (10, 8)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (10, 9)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (10, 10)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (10, 24)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (10, 25)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (10, 26)
INSERT [dbo].[Genres_Movies] ([genre_id], [movie_id]) VALUES (10, 28)
GO
SET IDENTITY_INSERT [dbo].[Studios] ON 

INSERT [dbo].[Studios] ([id], [name], [image], [founded_date], [country], [email], [address], [website], [description]) VALUES (1, N'Walt Disney Pictures', N'Walt-Disney.jpg', CAST(N'2003-02-01' AS Date), N'Hoa Kỳ', N'tuhieu@disney.com', N'Address1', N'website1', N'Studio sản xuất phim của Disney.')
INSERT [dbo].[Studios] ([id], [name], [image], [founded_date], [country], [email], [address], [website], [description]) VALUES (2, N'Warner Bros. Pictures', N'warner-bros.jpg', CAST(N'2003-02-01' AS Date), N'Hoa Kỳ', N'phungtuhieut@warnerbros.com', N'Address1', N'website1', N'Studio sản xuất phim của Warner Bros.')
INSERT [dbo].[Studios] ([id], [name], [image], [founded_date], [country], [email], [address], [website], [description]) VALUES (3, N'Paramount Pictures', N'Paramount-Pictures-logo.jpg', CAST(N'2003-02-01' AS Date), N'Canada', N'hieutuphung@paramount.com', N'Address1', N'website1', N'Studio sản xuất phim của Paramount.')
INSERT [dbo].[Studios] ([id], [name], [image], [founded_date], [country], [email], [address], [website], [description]) VALUES (4, N'Universal Pictures', N'Universal_Pictures.jpg', CAST(N'2003-02-01' AS Date), N'Anh', N'nguyenhoangdinh@universal.com', N'Address1', N'website1', N'Studio sản xuất phim của Universal.')
INSERT [dbo].[Studios] ([id], [name], [image], [founded_date], [country], [email], [address], [website], [description]) VALUES (5, N'20th Century Studios', N'c53b62e8-0831-4888-8157-aa7a9d551192_20th_Century_Studios.jpg', CAST(N'2003-02-01' AS Date), N'Anh', N'dinhnguyen@20thcentury.com', N'Address1', N'website1', N'Studio sản xuất phim của 20th Century.')
INSERT [dbo].[Studios] ([id], [name], [image], [founded_date], [country], [email], [address], [website], [description]) VALUES (6, N'Sony Pictures Entertainment', N'Sony_Pictures_Entertainment.jpg', CAST(N'2003-02-01' AS Date), N'Mỹ', N'hieupt@sony.com', N'Address1', N'website1', N'Studio sản xuất phim của Sony.')
INSERT [dbo].[Studios] ([id], [name], [image], [founded_date], [country], [email], [address], [website], [description]) VALUES (7, N'Columbia Pictures (Sony Pictures Entertainment)', N'f3d17806-0471-4681-a940-db5806412bd8_3u0ytx96an3zgz11rtq6uexod1xs2xlc.webp', CAST(N'1919-05-14' AS Date), N'VI', N'Columbia@gmail.com', N'Culver City, California, Hoa Kỳ', N'https://vi.wikipedia.org/wiki/Columbia_Pictures', N'Công ty công nghiệp điện ảnh Columbia là một công ty sản xuất và phân phối phim ảnh của Mỹ. Columbia Pictures hiện là một phần của Columbia TriStar Motion Picture Group, được sở hữu bởi Sony Pictures Entertainment, một công ty con của tập đoàn Sony.')
INSERT [dbo].[Studios] ([id], [name], [image], [founded_date], [country], [email], [address], [website], [description]) VALUES (8, N'Lionsgate Films', N'dab4a0e2-9d9a-495e-98cb-c9e8317180e8_aso9qco2t31osojpwo0us6yxmrsf3dix.webp', CAST(N'1962-12-12' AS Date), N'VI', N'Lionsgate@gmail.com', N'Lions Gate Entertainment', N'Lions Gate Entertainment', N'Lionsgate Films là một hãng sản xuất/phân phối điện ảnh Canada-Mỹ và là một phân ban của Lions Gate Entertainment.')
INSERT [dbo].[Studios] ([id], [name], [image], [founded_date], [country], [email], [address], [website], [description]) VALUES (9, N'Metro-Goldwyn-Mayer (MGM)', N'7de49c89-fa7b-4710-ade7-10727b693990_48pze3asqie8biszs3fbwgimhoidjq6j.webp', CAST(N'1924-04-12' AS Date), N'VI', N'Metro@gmail.com', N'Hãng phim Amazon, MGM Holdings, Metro-Goldwyn-Mayer Inc.', N'Metro.com', N'Metro–Goldwyn–Mayer Inc., hay MGM, là một tập đoàn truyền thông của nước Mỹ, hoạt động chủ yếu trong lĩnh vực sản xuất phim truyện và chương trình truyền hình. MGM được thành lập năm 1924 khi Marcus Loew thâu tóm Metro Pictures, Goldwyn Pictures Corporation và Louis B. Mayer Pictures.')
INSERT [dbo].[Studios] ([id], [name], [image], [founded_date], [country], [email], [address], [website], [description]) VALUES (10, N'Dream Works Pictures (trực thuộc Amblin Partners)', N'1dd4d34a-8229-49e1-950c-c2660e969a22_2bnuhizusvqwm7mn73r37ehq8ga4bhb7.webp', CAST(N'2001-12-12' AS Date), N'VI', N'Dream@gmail.com', N'Hoa kì
', N'Dream.com', N'Được biết đến như một hãng sản xuất phim hoạt hình sinh sau đẻ muộn so với các ông lớn trong ngành như Disney, 20th Century Fox, Pixar… DreamWorks Pictures đã nỗ lực không ngừng để xây dựng một vị thế vững chãi trong lòng người xem bằng những sản phẩm chất lượng cả về hình ảnh lẫn nội dung.')
SET IDENTITY_INSERT [dbo].[Studios] OFF
GO
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (1, 1)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (1, 2)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (2, 1)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (3, 2)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (3, 3)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (4, 1)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (5, 3)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (5, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (6, 1)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (6, 3)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (7, 3)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (7, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (7, 6)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (8, 3)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (8, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (9, 3)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (9, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (9, 6)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (10, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (11, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (12, 1)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (12, 2)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (12, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (14, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (14, 7)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (14, 10)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (15, 4)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (15, 6)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (15, 9)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (16, 7)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (16, 8)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (16, 10)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (17, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (17, 7)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (17, 8)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (17, 10)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (20, 3)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (20, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (20, 7)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (20, 8)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (20, 9)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (20, 10)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (21, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (21, 7)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (21, 10)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (22, 2)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (22, 3)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (22, 4)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (23, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (23, 7)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (23, 10)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (24, 1)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (24, 2)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (24, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (25, 4)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (25, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (26, 2)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (26, 4)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (26, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (27, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (27, 7)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (27, 10)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (28, 4)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (28, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (29, 2)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (29, 4)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (29, 5)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (31, 3)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (31, 4)
INSERT [dbo].[Movies_Studios] ([movie_id], [studio_id]) VALUES (31, 6)
GO
SET IDENTITY_INSERT [dbo].[Producers] ON 

INSERT [dbo].[Producers] ([id], [name], [image], [birthday], [nationality], [email], [biography]) VALUES (1, N'Điện Ảnh Việt', N'image', CAST(N'1980-10-03' AS Date), N'Việt Nam', N'info@dienanhviet.vn', N'Nhà sản xuất phim Điện Ảnh Việt tại Việt Nam.')
INSERT [dbo].[Producers] ([id], [name], [image], [birthday], [nationality], [email], [biography]) VALUES (2, N'Phim Trần', N'image', CAST(N'1980-10-05' AS Date), N'Việt Nam', N'contact@phimtran.vn', N'Nhà sản xuất phim Trần tại Việt Nam.')
INSERT [dbo].[Producers] ([id], [name], [image], [birthday], [nationality], [email], [biography]) VALUES (3, N'Xuân Phim', N'image', CAST(N'1980-12-13' AS Date), N'Việt Nam', N'contact@xuanphim.com', N'Nhà sản xuất phim Xuân Phim tại Việt Nam.')
INSERT [dbo].[Producers] ([id], [name], [image], [birthday], [nationality], [email], [biography]) VALUES (4, N'Quốc Dũng Films', N'image', CAST(N'1980-02-25' AS Date), N'Việt Nam', N'info@quocdungfilms.vn', N'Nhà sản xuất phim Quốc Dũng Films tại Việt Nam.')
INSERT [dbo].[Producers] ([id], [name], [image], [birthday], [nationality], [email], [biography]) VALUES (5, N'Phim Tây Bắc', N'image', CAST(N'1980-09-08' AS Date), N'Việt Nam', N'contact@phimtaybac.com', N'Nhà sản xuất phim Tây Bắc tại Việt Nam.')
SET IDENTITY_INSERT [dbo].[Producers] OFF
GO
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (1, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (1, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (2, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (3, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (3, 3)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (4, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (5, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (5, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (6, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (7, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (8, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (8, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (9, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (10, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (11, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (12, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (12, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (12, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (14, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (14, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (14, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (15, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (15, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (16, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (16, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (16, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (17, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (17, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (17, 4)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (17, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (20, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (20, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (20, 4)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (20, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (21, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (21, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (22, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (22, 3)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (22, 4)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (23, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (23, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (23, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (24, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (24, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (24, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (25, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (25, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (25, 4)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (25, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (26, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (26, 4)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (26, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (27, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (27, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (28, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (28, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (28, 4)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (28, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (29, 2)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (29, 4)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (29, 5)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (31, 1)
INSERT [dbo].[Movies_Producers] ([movie_id], [producer_id]) VALUES (31, 5)
GO
SET IDENTITY_INSERT [dbo].[Directors] ON 

INSERT [dbo].[Directors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (1, N'Đạo diễn Nhất Trung', 1, CAST(N'1980-05-15' AS Date), N'VN', N'4d927e8c-87a5-4e0a-8f34-e653b429f129_dao-dien-nhat-trung-984170.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Directors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (2, N'Lê Văn Kiệt ', 0, CAST(N'1975-08-20' AS Date), N'VN', N'8fc99ae1-586a-446e-9bd8-2d7605711940_dao-dien-le-van-kiet-984171.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Directors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (3, N'Victor Vũ', 1, CAST(N'1990-03-10' AS Date), N'VN', N'6c5bac41-78a4-4459-9849-a525d39f6f86_victo-vu-53540.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Directors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (4, N'Nguyễn Nhựt Đông', 1, CAST(N'2003-07-31' AS Date), N'VN', N'3e96a5d4-4a73-4797-a339-b5d3fa56caa5_z4977115745867_66adf7bb5372cc5566cdf2d8e75cded0.jpg', N'dong0393613987@outlook.com.vn', N'<p><strong>Lê Thanh Sơn </strong><span style="background-color:rgb(242,242,242);color:rgb(51,51,51);">là một đạo diễn phim, nhà sản xuất phim nổi tiếng của Viêt Nam anh được biết đến nhiều nhất qua bộ phim điện ảnh Bẫy rồng do chính anh làm đạo diễn trước đó anh cũng là Phó Đạo diễn cho các bộ phim truyền hình nổi tiếng như Áo lụa Hà Đông, Dòng máu anh hùng ngoài ra khán giả còn được biết đến anh qua vai trò nhà sản xuất của các bộ phim Để mai tính, Long Ruồi, Saigon Yo! , Lửa Phật, Âm mưu giày gót nhọn, Cú và chim se sẻ…Trong năm 2005, với bộ phim ngắn Tôi là ai đã giúp anh giành giải phim ngắn hay nhất tại lễ trao giải Cánh diều vàng năm 2005.</span></p>')
INSERT [dbo].[Directors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (5, N'Trần Tấn Khanh', 1, CAST(N'2003-07-14' AS Date), N'VN', N'ff66c5ce-7269-462d-a5be-044817b5150e_101388725.jpeg', N'khanh123@outlook.com.vn', N'<p><strong>Trần Tấn Khanh </strong><span style="background-color:rgb(242,242,242);color:rgb(51,51,51);">là một đạo diễn phim, nhà sản xuất phim nổi tiếng của Viêt Nam anh được biết đến nhiều nhất qua bộ phim điện ảnh Bẫy rồng do chính anh làm đạo diễn trước đó anh cũng là Phó Đạo diễn cho các bộ phim truyền hình nổi tiếng như Áo lụa Hà Đông, Dòng máu anh hùng ngoài ra khán giả còn được biết đến anh qua vai trò nhà sản xuất của các bộ phim Để mai tính, Long Ruồi, Saigon Yo! , Lửa Phật, Âm mưu giày gót nhọn, Cú và chim se sẻ…Trong năm 2005, với bộ phim ngắn Tôi là ai đã giúp anh giành giải phim ngắn hay nhất tại lễ trao giải Cánh diều vàng năm 2005.</span></p>')
INSERT [dbo].[Directors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (6, N'Phùng Tự Hiếu', 1, CAST(N'2003-08-08' AS Date), N'VN', N'55fd1aab-ee2c-4307-b188-fe959d8c8f46_screenshot_1702627901.png', N'Hieu123@outlook.com.vn', NULL)
INSERT [dbo].[Directors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (7, N'Nguyễn Minh Khôi', 1, CAST(N'2003-05-13' AS Date), N'VN', N'099c26ce-cb4e-4b5c-a4ef-3505846b2e8a_screenshot_1702627885.png', N'dong0393618987@outlook.com.vn', N'<p><strong>Nguyễn Minh Khôi </strong><span style="background-color:rgb(242,242,242);color:rgb(51,51,51);">là một đạo diễn phim, nhà sản xuất phim nổi tiếng của Viêt Nam anh được biết đến nhiều nhất qua bộ phim điện ảnh Bẫy rồng do chính anh làm đạo diễn trước đó anh cũng là Phó Đạo diễn cho các bộ phim truyền hình nổi tiếng như Áo lụa Hà Đông, Dòng máu anh hùng ngoài ra khán giả còn được biết đến anh qua vai trò nhà sản xuất của các bộ phim Để mai tính, Long Ruồi, Saigon Yo! , Lửa Phật, Âm mưu giày gót nhọn, Cú và chim se sẻ…Trong năm 2005, với bộ phim ngắn Tôi là ai đã giúp anh giành giải phim ngắn hay nhất tại lễ trao giải Cánh diều vàng năm 2005.</span></p>')
INSERT [dbo].[Directors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (8, N'Nguyễn Văn Hữu Tài', 1, CAST(N'2003-04-07' AS Date), N'VN', N'1c7d7336-ec93-4284-922a-43e96be0dbfc_z4977136305972_d6ba454eb244a20409a98aa74f9a9624.jpg', N'tai123@outlook.com.vn', N'<p><strong>Nguyễn Văn Hữu Tài </strong><span style="background-color:rgb(242,242,242);color:rgb(51,51,51);">là một đạo diễn phim, nhà sản xuất phim nổi tiếng của Viêt Nam anh được biết đến nhiều nhất qua bộ phim điện ảnh Bẫy rồng do chính anh làm đạo diễn trước đó anh cũng là Phó Đạo diễn cho các bộ phim truyền hình nổi tiếng như Áo lụa Hà Đông, Dòng máu anh hùng ngoài ra khán giả còn được biết đến anh qua vai trò nhà sản xuất của các bộ phim Để mai tính, Long Ruồi, Saigon Yo! , Lửa Phật, Âm mưu giày gót nhọn, Cú và chim se sẻ…Trong năm 2005, với bộ phim ngắn Tôi là ai đã giúp anh giành giải phim ngắn hay nhất tại lễ trao giải Cánh diều vàng năm 2005.</span></p>')
INSERT [dbo].[Directors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (9, N'Nguyễn Hoàng Dinh', 1, CAST(N'1983-08-10' AS Date), N'VN', N'198046a4-54f2-40ed-9ecb-dcb152497246_z4977150959275_9ff67eb01b6ceb4828e85d6782e35378.jpg', N'dinh123@outlook.com.vn', N'<p><strong>Nguyễn Hoàng Dinh </strong><span style="background-color:rgb(242,242,242);color:rgb(51,51,51);">là một đạo diễn phim, nhà sản xuất phim nổi tiếng của Viêt Nam anh được biết đến nhiều nhất qua bộ phim điện ảnh Bẫy rồng do chính anh làm đạo diễn trước đó anh cũng là Phó Đạo diễn cho các bộ phim truyền hình nổi tiếng như Áo lụa Hà Đông, Dòng máu anh hùng ngoài ra khán giả còn được biết đến anh qua vai trò nhà sản xuất của các bộ phim Để mai tính, Long Ruồi, Saigon Yo! , Lửa Phật, Âm mưu giày gót nhọn, Cú và chim se sẻ…Trong năm 2005, với bộ phim ngắn Tôi là ai đã giúp anh giành giải phim ngắn hay nhất tại lễ trao giải Cánh diều vàng năm 2005.</span></p>')
SET IDENTITY_INSERT [dbo].[Directors] OFF
GO
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (1, 1)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (1, 3)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (1, 4)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (1, 5)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (1, 6)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (1, 7)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (1, 8)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (1, 10)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (2, 1)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (2, 3)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (2, 4)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (2, 5)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (2, 6)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (2, 7)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (2, 8)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (2, 9)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (2, 10)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (2, 11)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (2, 26)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (3, 2)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (3, 3)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (3, 4)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (3, 5)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (3, 6)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (3, 7)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (3, 9)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (3, 10)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (3, 11)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (3, 26)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (3, 28)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (4, 12)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (4, 16)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (4, 26)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (4, 28)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (5, 12)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (5, 16)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (5, 20)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (5, 26)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (5, 28)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (5, 31)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (6, 12)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (6, 14)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (6, 15)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (6, 16)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (6, 17)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (6, 20)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (6, 22)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (6, 23)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (6, 24)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (6, 25)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (6, 27)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (6, 29)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (6, 31)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 12)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 14)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 15)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 16)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 17)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 20)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 21)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 22)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 23)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 24)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 25)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 27)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 28)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 29)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (7, 31)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 12)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 14)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 15)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 16)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 17)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 20)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 21)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 22)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 23)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 24)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 25)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 27)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 28)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 29)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (8, 31)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 12)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 14)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 15)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 16)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 17)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 20)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 21)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 22)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 23)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 24)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 25)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 26)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 27)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 28)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 29)
INSERT [dbo].[Directors_Movies] ([director_id], [movie_id]) VALUES (9, 31)
GO
SET IDENTITY_INSERT [dbo].[Actors] ON 

INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (1, N'Phương Anh Đào', 1, CAST(N'1990-01-01' AS Date), N'VN', N'5958c6b6-7b7e-42f3-b433-65dec30563a1_-7783-1665297599.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (2, N'Tuấn Trần', 0, CAST(N'1993-01-01' AS Date), N'VN', N'd1147faf-ec66-47b5-89df-3b35792e6a2d_tuan-tran-25-1585874183323120585721.webp', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (3, N'Trấn Thành', 0, CAST(N'1989-01-01' AS Date), N'VN', N'c2e516b0-d122-459e-a8b5-c452de286979_tran-thanh-7-1291-16726478317832054742485.webp', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (4, N'Trương Thế Vinh', 0, CAST(N'1988-01-01' AS Date), N'VN', N'636c1f80-579d-4e52-8783-071b32db9a31_truong-the-vinh-la-ai-1.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (5, N'Võ Thành Tâm ', 0, CAST(N'1994-01-01' AS Date), N'VN', N'17598e49-0fec-46af-843a-c3a9208cbb1b_8-hinh-bai-chot-16222944927892146601675.webp', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (6, N'Thanh Trúc', 1, CAST(N'1995-01-01' AS Date), N'VN', N'041c8303-3b32-4f83-955e-9f2038d84616__ptv9427_YJEB.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (7, N'Hứa Minh Đạt', 0, CAST(N'1990-01-01' AS Date), N'VN', N'f43fbbb0-423c-4f68-bdd2-6d6c0aa78414_hua-minh-dat-2-5547.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (8, N'Lâm Chấn Khang', 0, CAST(N'1996-01-01' AS Date), N'VN', N'9b190b19-4514-4055-bd71-774be3803850_06cc6f5e9fe2508b42cd0f3cdae45afa.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (9, N'Chris Hemsworth', 0, CAST(N'1996-01-01' AS Date), N'VN', N'2dda756a-a1b5-4396-9279-7a0c4bfbe3dc_25294365606591516-Untitled-3.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (10, N'Tom Hiddleston ', 1, CAST(N'1999-01-01' AS Date), N'VN', N'6e505fd9-f901-45e6-ab96-118949dfadff_12753096513732496-aqmub88LK5Cic8yZwwfcDqIQQqk.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (11, N'Benedict Cumberbatch', 0, CAST(N'2000-01-01' AS Date), N'VN', N'95037215-acca-46b1-bfb8-f89d55dd9819_15591452729196546-8HTSA2iVTsDN83OncAvFTcqxsAr.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (12, N'Scarlett Johansson', 0, CAST(N'2000-01-01' AS Date), N'VN', N'88359a8c-9146-4a81-9de7-fd83072dddfa_15591453080842357-mi00EsvrAebidnEYK7LZxgbKYyH.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (13, N'NTom Holland', 1, CAST(N'2000-01-01' AS Date), N'VN', N'2e7c7e71-cc5d-496f-b461-5ec9711918ba_12753096708754277-30KQyjsXfrdm4Dcori7bDFTg9Le.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (14, N'Chadwick Boseman', 0, CAST(N'1990-01-01' AS Date), N'VN', N'add53854-69ef-4fd9-9d51-4d029aa2a6d3_12753095875611657-6u95ZNLrADSlK7CVkgEvC0jLIJh.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (15, N'Brie Larson', 1, CAST(N'1990-01-01' AS Date), N'VN', N'd25ff88d-99a8-4ed2-a460-c55f8f445efd_12753095229777570-1iyqqmsflfSdmNzwRQH2PyazS3Z.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (16, N'Sebastian Stan', 1, CAST(N'1990-01-01' AS Date), N'VN', N'2fba6cc4-c127-49c9-82cd-8b6f354ba4bd_15591453421031774-jUuUbPuMGonFT5E2pcs4alfqaCN.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (17, N'Anthony Mackie ', 0, CAST(N'1990-01-01' AS Date), N'VN', N'e8a54f58-192f-4efc-b7db-93034ebdc205_12753094814719694-6Yk5t9RwkdkAT8Qv45934Eez2CA.jpg', N'email123@gmail.com', N'<p>Tiểu sửa</p>')
INSERT [dbo].[Actors] ([id], [fullname], [gender], [birthday], [country], [avatar], [email], [biography]) VALUES (18, N'Idris Elba', 1, CAST(N'1990-01-01' AS Date), N'VN', N'9701bb51-db9e-4b9c-b2be-0c3595b1e570_12753095010016800-z5TRmx4WQB9Ge1WQa6VdxBKnwmC.jpg', N'email123@gmail.com', N'<p>Tiểu sử</p>')
SET IDENTITY_INSERT [dbo].[Actors] OFF
GO
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (1, 2)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (1, 5)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (1, 8)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (1, 10)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (1, 12)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (2, 2)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (2, 4)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (2, 12)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (3, 2)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (3, 4)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (3, 12)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (4, 2)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (4, 4)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (4, 5)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (4, 12)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (5, 5)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (5, 12)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (6, 5)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (6, 12)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (6, 28)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (7, 2)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (7, 4)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (7, 5)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (7, 12)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (7, 23)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (7, 28)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (7, 29)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (8, 4)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (8, 7)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (8, 12)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (8, 23)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (8, 28)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (9, 4)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (9, 8)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (9, 14)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (9, 23)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (10, 4)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (10, 9)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (10, 14)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (10, 23)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (11, 4)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (11, 14)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (11, 15)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (11, 17)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (11, 20)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (11, 23)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (11, 27)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (12, 1)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (12, 3)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (12, 14)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (12, 15)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (12, 17)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (12, 20)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (12, 23)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (12, 27)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (12, 29)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (12, 31)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (13, 1)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (13, 3)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (13, 14)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (13, 15)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (13, 17)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (13, 20)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (13, 22)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (13, 25)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (13, 26)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (13, 27)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (13, 28)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (13, 31)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 1)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 8)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 14)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 15)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 17)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 20)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 22)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 24)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 25)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 26)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 27)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 28)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 29)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (14, 31)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 1)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 3)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 6)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 14)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 15)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 16)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 17)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 20)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 21)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 22)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 24)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 25)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 26)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 27)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 28)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 29)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (15, 31)
GO
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 1)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 3)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 5)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 8)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 11)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 14)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 15)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 16)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 17)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 20)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 21)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 22)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 24)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 25)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 26)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 27)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 28)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 29)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (16, 31)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 1)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 3)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 5)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 6)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 8)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 11)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 14)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 15)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 16)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 17)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 20)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 21)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 22)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 24)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 25)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 26)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 27)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 28)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 29)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (17, 31)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 1)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 3)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 6)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 11)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 14)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 15)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 16)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 17)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 20)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 21)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 22)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 24)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 25)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 26)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 27)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 28)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 29)
INSERT [dbo].[Actors_Movies] ([actor_id], [movie_id]) VALUES (18, 31)
GO
SET IDENTITY_INSERT [dbo].[Articles] ON 

INSERT [dbo].[Articles] ([id], [title], [banner], [content], [status], [create_date]) VALUES (13, N'Top 5 bộ phim kinh dị năm 2023', N'a38f1e36-2dd0-4fdb-b911-e89c348fc276_25291146077975868-qu-cau-750_1698228057531.jpg', N'Những bộ phim kinh dị hay nhất năm 2023 được yêu thích nhất mà bạn có thể quan tâm và theo dõi', 1, CAST(N'2023-12-15' AS Date))
INSERT [dbo].[Articles] ([id], [title], [banner], [content], [status], [create_date]) VALUES (14, N'Danh sách 7 phim hoạt hình hay nhất năm 2023', N'ee55ca35-1165-4c54-9543-02e4fcadb909_maxresdefault (10).jpg', N'hãy cùng TicketEZ xem những bộ phim hoạt hình được cho là hay nhất năm 2023', 1, CAST(N'2023-12-14' AS Date))
INSERT [dbo].[Articles] ([id], [title], [banner], [content], [status], [create_date]) VALUES (15, N'Danh sách 6 bộ phim tình yêu của năm 2023', N'3788eb8d-7dc2-413f-bdea-758ea6909b48_maxresdefault (12).jpg', N'TicketEZ luôn mang đến cho bạn một không gian vô cùng thơ mộng cùng các bộ phim mà chúng tôi mang đến cho bạn  hãy cùng chìm đấm vào tình yêu qua những bộ phim', 1, CAST(N'2023-12-15' AS Date))
INSERT [dbo].[Articles] ([id], [title], [banner], [content], [status], [create_date]) VALUES (16, N'Danh sách 5 bộ phim hành động của năm 2023', N'9802e2b3-8606-4b21-95e9-f4fa581a1a30_maxresdefault (13).jpg', N'rong bài viết này, chúng tôi xin giới thiệu đến bạn 14 bộ phim hành động viễn tưởng năm 2023, những tác phẩm đầy lôi cuốn và hấp dẫn. Với những câu chuyện phiêu lưu đầy hành động, những cảnh quay mãn nhãn và thế giới tưởng tượng đa dạng, các bộ phim này sẽ đưa bạn vào những cuộc phiêu lưu đẳng cấp và đầy kịch tính.', 1, CAST(N'2023-12-15' AS Date))
INSERT [dbo].[Articles] ([id], [title], [banner], [content], [status], [create_date]) VALUES (17, N'Top 5 bộ phim siêu anh hùng đợi mong đợi nhất năm 2023', N'55b0e746-ed11-4d6b-a16d-8468a935ea12_thanh-cong-cua-endgame-tro-treu-lai-la-su-that-bai-cua-giai-doan-4-mcu_63480d1fe9040.jpeg', N'Bạn đã sẵn sàng để khám phá vũ trụ điện ảnh đầy huyền thoại của siêu anh hùng? Trên màn ảnh rực rỡ, chúng ta được chứng kiến những câu chuyện phi thường và những nhân vật có siêu năng lực bậc nhất. Phim siêu anh hùng đã trở thành một thể loại phổ biến không chỉ trong lòng người hâm mộ, mà còn trên toàn thế giới.', 1, CAST(N'2023-12-15' AS Date))
SET IDENTITY_INSERT [dbo].[Articles] OFF
GO
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (2, 13)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (3, 15)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (4, 15)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (5, 16)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (6, 15)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (7, 15)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (8, 15)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (9, 13)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (10, 14)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (11, 14)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (12, 13)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (14, 13)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (15, 13)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (16, 14)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (17, 14)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (18, 14)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (20, 14)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (21, 14)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (22, 15)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (23, 16)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (24, 16)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (25, 16)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (26, 16)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (27, 17)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (28, 17)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (29, 17)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (30, 17)
INSERT [dbo].[Articles_Movies] ([movie_id], [article_id]) VALUES (31, 17)
GO
SET IDENTITY_INSERT [dbo].[Discounts] ON 

INSERT [dbo].[Discounts] ([id], [title], [coupon_code], [amount], [start_date], [end_date], [status], [discount_type], [cinema_complex_id]) VALUES (1, N'Discount 1', N'CODE001', 10, CAST(N'2023-10-05T00:00:00.000' AS DateTime), CAST(N'2023-10-15T23:59:59.000' AS DateTime), 1, 1, 1)
INSERT [dbo].[Discounts] ([id], [title], [coupon_code], [amount], [start_date], [end_date], [status], [discount_type], [cinema_complex_id]) VALUES (2, N'Discount 2', N'CODE002', 15.5, CAST(N'2023-10-08T12:00:00.000' AS DateTime), CAST(N'2023-10-18T12:00:00.000' AS DateTime), 1, 0, 2)
INSERT [dbo].[Discounts] ([id], [title], [coupon_code], [amount], [start_date], [end_date], [status], [discount_type], [cinema_complex_id]) VALUES (3, N'Discount 3', N'CODE003', 5, CAST(N'2023-10-12T08:00:00.000' AS DateTime), CAST(N'2023-10-22T08:00:00.000' AS DateTime), 1, 1, 3)
SET IDENTITY_INSERT [dbo].[Discounts] OFF
GO
SET IDENTITY_INSERT [dbo].[Price_Seat_Types] ON 

INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (1, 70000, 85000, 1, 1)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (2, 90000, 100000, 2, 1)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (3, 100000, 120000, 3, 1)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (4, 70000, 85000, 1, 2)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (5, 90000, 100000, 2, 2)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (6, 100000, 120000, 3, 2)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (7, 70000, 85000, 1, 3)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (8, 90000, 100000, 2, 3)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (9, 100000, 120000, 3, 4)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (10, 70000, 85000, 1, 4)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (11, 90000, 100000, 2, 4)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (12, 100000, 120000, 3, 4)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (13, 70000, 85000, 1, 5)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (14, 90000, 100000, 2, 5)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (15, 100000, 120000, 3, 5)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (16, 70000, 85000, 1, 6)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (17, 90000, 100000, 2, 6)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (18, 100000, 120000, 3, 6)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (19, 70000, 85000, 1, 7)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (20, 90000, 100000, 2, 7)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (21, 100000, 120000, 3, 7)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (22, 70000, 85000, 1, 8)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (23, 90000, 100000, 2, 8)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (24, 100000, 120000, 3, 8)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (25, 70000, 85000, 1, 9)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (26, 90000, 100000, 2, 9)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (27, 70000, 85000, 1, 9)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (28, 90000, 100000, 2, 10)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (29, 100000, 120000, 3, 10)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (30, 100000, 120000, 3, 10)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (31, 90000, 100000, 2, 21)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (32, 90000, 100000, 1, 21)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (33, 90000, 100000, 2, 22)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (34, 90000, 100000, 1, 22)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (35, 90000, 100000, 2, 23)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (36, 90000, 100000, 1, 23)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (37, 90000, 100000, 2, 24)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (38, 90000, 100000, 1, 24)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (39, 90000, 100000, 2, 25)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (40, 90000, 100000, 1, 25)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (41, 90000, 110000, 2, 26)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (42, 90000, 120000, 1, 26)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (43, 90000, 100000, 2, 27)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (44, 90000, 100000, 1, 27)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (45, 30000, 120000, 2, 28)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (46, 10000, 100000, 1, 28)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (47, 90000, 100000, 2, 29)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (48, 90000, 100000, 1, 29)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (49, 30000, 90000, 2, 30)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (50, 20000, 80000, 1, 30)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (51, 90000, 100000, 2, 31)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (52, 90000, 100000, 1, 31)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (53, 10000, 90000, 2, 32)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (54, 40000, 70000, 1, 32)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (55, 90000, 100000, 2, 33)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (56, 90000, 100000, 1, 33)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (57, 90000, 100000, 2, 34)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (58, 90000, 100000, 1, 34)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (59, 90000, 100000, 2, 35)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (60, 90000, 100000, 1, 35)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (61, 90000, 100000, 2, 36)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (62, 90000, 100000, 1, 36)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (63, 90000, 100000, 2, 37)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (64, 90000, 100000, 1, 37)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (65, 90000, 100000, 2, 38)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (66, 90000, 100000, 1, 38)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (67, 90000, 100000, 2, 39)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (68, 90000, 100000, 1, 39)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (69, 90000, 100000, 2, 40)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (70, 90000, 100000, 1, 40)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (71, 90000, 100000, 2, 41)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (72, 90000, 100000, 1, 41)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (73, 90000, 100000, 2, 42)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (74, 90000, 100000, 1, 42)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (75, 90000, 100000, 2, 43)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (76, 90000, 100000, 1, 43)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (77, 90000, 100000, 2, 44)
INSERT [dbo].[Price_Seat_Types] ([id], [weekday_price], [weekend_price], [seat_type_id], [price_id]) VALUES (78, 90000, 100000, 1, 44)
SET IDENTITY_INSERT [dbo].[Price_Seat_Types] OFF
GO
SET IDENTITY_INSERT [dbo].[Seats_Booking] ON 

INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (1, 1, N'1', 20.5)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (2, 2, N'1', 15.75)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (3, 3, N'1', 30)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (4, 4, N'1', 25.25)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (5, 5, N'1', 18.5)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (6, 6, N'2', 22.75)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (7, 7, N'3', 19)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (8, 8, N'3', 35.5)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (9, 9, N'4', 40.25)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (10, 10, N'5', 28.75)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (11, 11, N'6', 33)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (12, 12, N'7', 17.25)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (13, 13, N'8', 21.5)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (14, 14, N'4', 26.75)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (15, 15, N'3', 23)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (16, 16, N'2', 38.5)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (17, 17, N'1', 43.25)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (18, 18, N'1', 31.75)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (19, 19, N'1', 36)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (20, 20, N'1', 29.25)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (21, 15, N'169119893', 90000)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (22, 16, N'169119893', 90000)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (23, 17, N'169119893', 90000)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (24, 16, N'7425531041', 100000)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (25, 17, N'7425531041', 100000)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (26, 15, N'7425531041', 100000)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (27, 15, N'2659744188', 100000)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (28, 16, N'2659744188', 100000)
INSERT [dbo].[Seats_Booking] ([id], [seat_id], [booking_id], [price]) VALUES (29, 17, N'2659744188', 100000)
SET IDENTITY_INSERT [dbo].[Seats_Booking] OFF
GO
SET IDENTITY_INSERT [dbo].[Events] ON 

INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (1, N'TƯNG BỪNG KHAI TRƯƠNG LOTTE CINEMA PHỦ LÝ', N'<figure class="image image_resized" style="width:96.55%;"><img style="aspect-ratio:4032/3024;" src="https://media.lottecinemavn.com/Media/WebAdmin/9e24d7a3537b409c93c00000a82af337.jpg" alt="" width="4032" height="3024"></figure><p><br>&nbsp;</p><figure class="image image_resized" style="width:94.29%;"><img style="aspect-ratio:1171/511;" src="https://media.lottecinemavn.com/Media/WebAdmin/3016ccd36df145829a4b2aebaf4184a9.jpg" alt="" width="1171" height="511"></figure><p><br><span style="color:rgb(102,102,102);">Ngày 15/09/2018, Phủ Lý Hà Nam chính thức đón chào rạp chiếu phim đầu tiên mang tiêu chuẩn quốc tế, đây là cụm rạp thứ 40 trong hệ thông rạp của Lotte Cinema Việt Nam. Nhân dịp khai trương với các chương trình khuyến mãi ưu đãi mua 1 tặng 1, giảm giá combo bắp nước.</span><br><span style="color:rgb(102,102,102);">Sở hữu vị trí đắc địa tại tầng 4, Vincom Phủ Lý (42 Biên Hòa, P.Minh Khai, Phủ Lý, Hà Nam), tuyến đường sầm uất kết nối trung tâm thành phố với khu đô thị mới Nam Trần Hưng Đạo.</span><br><span style="color:rgb(102,102,102);">Lotte Cinema Phủ Lý hứa hẹn sẽ trở thành một địa điểm giải trí mới của giới trẻ Hà Nam. Lotte Cinema mang đến hệ thống rạp chiếu phim tiêu chuẩn quốc tế sử dụng công nghệ 2D, 3D hiện đại.</span><br><span style="color:rgb(102,102,102);">Với 03 phòng chiếu màn hình lớn cùng với hơn 250 ghế, khán giả sẽ có cơ hội tận hưởng không gian điện ảnh sống động và trải nghiệm mãn nhãn với các bộ phim bom tấn mới nhất.</span><br><span style="color:rgb(102,102,102);">Trước tiên hãy cùng điểm danh sơ qua một vài siêu phẩm mà bất cứ ai cũng không thể bỏ qua khi đến với Lotte Cinema Phủ Lý nhân dịp khai trương này.</span><br><span style="color:rgb(102,102,102);">Ra mắt chào sân đầu tiên chính là Ác quỷ ma sơ : The Nun với màn tái ngộ không thể rùng rợn hơn từ chị đại Valak “trùm cuối của vũ trụ điện ảnh kinh dị The Conjuring”, nhân vật đã gieo rắc nỗi ám ảnh kinh hoàng cho khán giả.</span><br><span style="color:rgb(102,102,102);">Bao Giờ Hết Ê: Đề tài với nội dung về cô nàng xinh đẹp, giỏi giang, bà chủ của chuỗi khách sạn hạng sang nức tiếng Sài thành gần xa, cháu gái đích hệ của gia tộc, tưởng như hạnh phúc viên mãn thì lại mang trong mình một nỗi buồn khó nói: ế không ai chịu yêu.</span><br><span style="color:rgb(102,102,102);">Trong đợt khai trương này, các mọt phim khi đến với Lotte Cinema Phủ Lý sẽ nhận được hàng loạt các ưu đãi. Cụ thể như sau:</span><br><span style="color:rgb(102,102,102);">+ Mua 01 vé được tặng ngay 01 vé (15.09 - 17.09) xem phim 2D miễn phí cho lần xem phim tiếp theo, hạn sử dụng 18.09- 17.10.2018. Hoặc mua 01 vé, nhận ngay 01 voucher mua bắp với giá 20.000VNĐ</span><br><span style="color:rgb(102,102,102);">+ Bên cạnh đó, khi đăng ký thành viên mới tại đây, bạn sẽ nhận ngay cơ hội quay may mắn trúng 100% với các phần quà vô cùng hấp dẫn như: quạt USB L.Point, nước ngọt, snack, đậu phộng giòn tan.</span><br><span style="color:rgb(102,102,102);">+ Ngoài ra, chỉ bằng việc check-in tại rạp, bạn sẽ được nhận ngay 01 phần bỏng smile. Hơn thế, nếu tấm hình của bạn nhận được nhiều lượt tương tác và like nhất, bạn sẽ còn được sở hữu thêm những tấm vé và combo xem phim miễn phí.</span><br><span style="color:rgb(102,102,102);">Ngoài ra để đáp ứng nhu câu điện ảnh của các bạn học sinh sinh viên thì chương trình ưu đãi giá vé 45k cho thành viên dưới 22 tuổi sẽ áp dụng xuyên suốt từ thứ 2 đến thứ 6.</span><br><span style="color:rgb(102,102,102);">Xem thêm thông tin về các bộ phim chiếu tại website Lotte Cinema và cập nhật các khuyến mãi mới nhất qua Facebook Lotte Cinema.</span></p>', CAST(N'2023-12-15T17:00:00.000' AS DateTime), CAST(N'2024-02-09T15:36:17.000' AS DateTime), N'7b136934-25eb-4068-9a15-509643419ba4_ada3c0dfa698417fa3b93d1d04790876.jpg', 1, 1, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (2, N'Lotte Cinema chơi lớn cùng cơn mưa bắp ngọt', N'<h2 style="margin-left:0px;"><strong>Để "làm mới" lại một chút sau những ngày hè dài nóng bức, Lotte Cinema tung ra chương trình "Popcorn Beast Bắp Ngon Thỏa Thích" dành cho các fan ruột của Xi-nê-ma mục đích tri ân những khách hàng thân thiết vẫn luôn ủng hộ rạp và khởi động cho một mùa lễ hội cuối năm bùng cháy hơn nữa.</strong></h2><ul><li><a href="https://ttvn.toquoc.vn/tphcm-dong-ham-thu-thiem-trong-3-dem-de-thu-nghiem-he-thong-pccc-tu-dong-20221021171616225.htm">TP.HCM: Đóng hầm Thủ Thiêm trong 3 đêm để thử nghiệm hệ thống PCCC tự động</a></li></ul><p style="margin-left:auto;"><img class="image_resized" style="aspect-ratio:1904/2448;height:auto !important;width:640px;" src="https://channel.mediacdn.vn/428462621602512896/2022/10/21/photo-1-16663485559621047196746.jpg" alt="Lotte Cinema chơi lớn cùng cơn mưa bắp ngọt - Ảnh 1." width="1904" height="2448"></p><p style="margin-left:0px;">Đã gọi là mưa thì chắc chắn phải "ướt" đúng không? Nhưng không phải vậy, cơn mưa từ Lotte Cinema mang đến lại giúp cho các "thực thần" lắp đầy và thách thức giới hạn chiếc bao tử của mình. Vào ngày 24/10/2022, chỉ cần mua vé xem phim và mang theo bất kì vật đựng nào có thể chứa được bắp rang, bạn sẽ được nhân viên đổ đầy bắp rang miễn phí mà không cần biết vật chứa là thứ gì, có thể là ly, hộp, xô, bình nước... (ngoại trừ túi nilon, túi giấy).</p><p style="margin-left:auto;"><img class="image_resized" style="aspect-ratio:660/880;height:auto !important;width:640px;" src="https://channel.mediacdn.vn/428462621602512896/2022/10/21/photo-2-1666348556022581031531.jpg" alt="Lotte Cinema chơi lớn cùng cơn mưa bắp ngọt - Ảnh 2." width="660" height="880"></p><p style="margin-left:0px;">Trước ngày ưu đãi khủng, tất cả chi nhánh khởi động bằng cách chuẩn bị đội ngũ nhân viên hỗ trợ liên tục, khu sảnh chờ rộng rãi và quan trọng nhất là vô vàn bắp ngọt để chờ đợi phục vụ các "thượng đế" của mình.</p><p style="margin-left:auto;"><img class="image_resized" style="aspect-ratio:661/910;height:auto !important;width:640px;" src="https://channel.mediacdn.vn/428462621602512896/2022/10/21/photo-3-16663485561541222815881.jpg" alt="Lotte Cinema chơi lớn cùng cơn mưa bắp ngọt - Ảnh 3." width="661" height="910"></p><p style="margin-left:0px;"><strong>Liệu lễ hội này là giông bão hay chỉ là mưa rào?</strong></p><p style="margin-left:0px;">Không chỉ đổ bộ ngày 24/10/2022, "cơn mưa bắp rang" này sẽ còn kéo dài cho đến 30.11.2022. Chỉ cần là khách hàng từng mua vé tại Lotte Cinema (có giữ cuống vé hoặc lịch sử giao dịch trên Web/App, đến rạp mua vé xem phim, mang theo vật đựng và mạnh dạn hô to "Đầy xô" bạn sẽ được sẽ được thỏa niềm đam mê bắp rang bơ của mình!</p><p style="margin-left:auto;"><img class="image_resized" style="aspect-ratio:980/703;height:auto !important;width:640px;" src="https://channel.mediacdn.vn/428462621602512896/2022/10/21/photo-4-16663485562041381731460.jpg" alt="Lotte Cinema chơi lớn cùng cơn mưa bắp ngọt - Ảnh 4." width="980" height="703"></p><p style="margin-left:0px;"><strong>Đại tiệc là chính – Săn deal là mười</strong></p><p style="margin-left:0px;">Chớp ngay thời điểm "đã ưu đãi nay còn ưu đãi hơn", mách bạn một loạt tips để săn các deal khủng trong giai đoạn cuối năm này. Khi tham gia đại tiệc "Popcorn Beast", các fan điện ảnh có thể tận dụng lại các sản phẩm mua tại Lotte Cinema, vừa được thưởng thức bắp miễn phí không giới hạn mà còn có thể kết hợp Check-in để nhận vé xem phim 2D miễn phí mỗi tuần kèm Voucher nước ngọt từ đây đến hết năm, nhanh tay lẹ chân lên kèo với hội bạn thân và đến ngay Lotte Cinema gần nhất để hưởng trọn bộ ưu đãi này nhé, lần này thì "1 công 3 việc" rồi!</p><p style="margin-left:0px;">Là một trong các cụm rạp chiếu phim lớn nhất tại Việt Nam, với hơn 45 cụm rạp tiêu chuẩn quốc tế, Lotte Cinema hứa hẹn sẽ luôn dành cho khách hàng của mình những trải nghiệm điện ảnh tuyệt vời nhất.</p><p style="margin-left:0px;">Xem thêm thông tin chi tiết của chương trình tại đây: <a href="https://bit.ly/PopcornBeast">https://bit.ly/PopcornBeast</a></p><p style="margin-left:0px;"><br>&nbsp;</p>', CAST(N'2023-12-15T17:00:00.000' AS DateTime), CAST(N'2024-02-10T15:35:17.000' AS DateTime), N'52e778c2-5c04-4c57-a07e-cfbc1d5b3d03_photo-4-16663485562041381731460.jpg', 1, 1, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (3, N'Sự kiện Tuần lễ phim nước ngoài', N'<h2 style="margin-left:0px;"><strong>Nhân dịp sinh nhật lần thứ 15, Lotte Cinema liên tục tung ra các chương trình siêu ưu đãi để cùng khán giả chào đón tuổi mới thật hoành tráng.</strong></h2><ul><li><a href="https://ttvn.toquoc.vn/khong-khi-lanh-dang-tran-xuong-mien-bac-mua-lon-tu-chieu-nay-20230424110026945.htm">Không khí lạnh đang tràn xuống, miền Bắc mưa lớn từ chiều nay</a></li></ul><p style="margin-left:0px;">Cùng điểm qua các ưu đãi hấp dẫn trong chuỗi sự kiện mừng sinh nhật lần thứ 15 của Lotte Cinema này nhé!</p><p style="margin-left:auto;"><img class="image_resized" style="aspect-ratio:960/600;height:auto !important;width:640px;" src="https://toquoc.mediacdn.vn/280518851207290880/2023/4/24/photo-1682309701514-16823097027741545171359.jpg" alt="Lotte Cinema khuấy đảo “màn ảnh rộng” bằng loạt ưu đãi tháng 4 - Ảnh 1." width="960" height="600"></p><p style="margin-left:0px;">Combo bắp nước giá sốc</p><p style="margin-left:0px;">Trong ba ngày 24 - 26/04, khi mua từ 2 vé xem phim tại các rạp Lotte Cinema, bạn sẽ được mua combo bắp nước với mức giá giảm chưa từng thấy:</p><p style="margin-left:0px;">- 1 bắp lớn &amp; 1 nước lớn chỉ 39.000 đồng;</p><p style="margin-left:0px;">- 1 bắp lớn &amp; 2 nước lớn chỉ 49.000 đồng.</p><p style="margin-left:auto;"><img class="image_resized" style="aspect-ratio:900/900;height:auto !important;width:640px;" src="https://toquoc.mediacdn.vn/280518851207290880/2023/4/24/photo-1682309709397-16823097101861910309848.jpg" alt="Lotte Cinema khuấy đảo “màn ảnh rộng” bằng loạt ưu đãi tháng 4 - Ảnh 2." width="900" height="900"></p><p style="margin-left:0px;">Đến với cụm rạp Lotte Cinema, khán giả sẽ được thưởng thức trọn vẹn những tác phẩm điện ảnh xuất sắc của Việt Nam và thế giới với chất lượng tuyệt vời nhất. Fan điện ảnh càng không nên bỏ qua tháng 4 xem phim ngập tràn ưu đãi này!<br>&nbsp;</p><p style="margin-left:0px;"><strong>Birthday Combo chỉ 99k</strong></p><p style="margin-left:0px;">Chỉ 99K! cho combo 1 bắp lớn + 2 nước ngọt lớn + các sản phẩm merchandise và sở hữu các set ly nước &amp; hộp bắp xinh xắn nằm trong BST độc quyền của Lotte Cinema là các ưu đãi đặc biệt mà các cụm rạp Lotte Cinema dành tặng khán giả nhân dịp sinh nhật 15 tuổi.</p><p style="margin-left:0px;">Chương trình áp dụng tại tất cả các rạp Lotte Cinema trên toàn quốc diễn ra đến hết ngày 28/4.</p><p style="margin-left:auto;"><img class="image_resized" style="aspect-ratio:900/900;height:auto !important;width:640px;" src="https://toquoc.mediacdn.vn/280518851207290880/2023/4/24/photo-1682309713819-1682309714217145980195.jpg" alt="Lotte Cinema khuấy đảo “màn ảnh rộng” bằng loạt ưu đãi tháng 4 - Ảnh 3." width="900" height="900"></p><p style="margin-left:0px;">Thông tin nhận ưu đãi:</p><p style="margin-left:0px;">Xem thông tin phim, lịch phim đang chiếu và các ưu đãi khác <a href="https://bit.ly/lcvn15birthday">tại đây</a>.</p>', CAST(N'2023-12-15T17:00:00.000' AS DateTime), CAST(N'2024-02-10T15:34:01.000' AS DateTime), N'09ce92f5-aee0-4733-a75d-d4051b332224_photo-1682309701514-16823097027741545171359.jpg', 1, 1, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (4, N'Duy nhất hôm nay CGV đồng giá từ 45k/vé bao gồm cả phim Em và Trịnh, set kèo đi ngay thôi!', N'<h2><strong>Cả nhà ơi, rủ rê đám bạn chạy ngay ra rạp phim nào. Duy nhất hôm nay CGV tung chương trình khuyến mãi đồng giá vé chỉ từ 45k loạt phim hay, trong đó có cả phim Em và Trịnh đang hot nhất rạp nữa đó. Tranh thủ đi ngay kẻo lỡ nhé!</strong></h2><p style="margin-left:0px;">&nbsp;</p><p>Cụ thể, hôm nay là ngày thứ 2 cuối cùng của tháng, CGV áp dụng chính sách giá vé đặc biệt chỉ duy nhất hôm nay 27/6 để chiều lòng các "mọt phim" như sau: đồng giá vé 60.000đ/vé 2D tại các rạp CGV ở Hồ Chí Minh, Hà Nội, Bình Dương, Đồng Nai và CGV Vincom Đà Nẵng; 50.000đ/vé 2D tại các rạp Khánh Hòa, Sơn La, Lạng Sơn, Kiên Giang, Trà Vinh, Vincom Vị Thanh (Cần Thơ); 45.000đ/ vé 2D tại rạp Sóc Trăng và 55.000đ/vé 2D cho các rạp còn lại.</p><figure class="image image_resized" style="width:94.51%;"><img src="https://statics.didau.com/image/2022/06/27/cbcc7b41053740c8a4ee0dbd2e890655.jpg" srcset="https://statics.didau.com/image/2022/06/27/22c8ab13d9784c189735d67fd414d6db.jpg 800w, https://statics.didau.com/image/2022/06/27/4e1c0fff2fc74c488739c1e9a47ae08c.jpg 1024w" sizes="100vw" width="1024"></figure><p>Ảnh: ntmp2708</p><figure class="image image_resized" style="width:97.01%;"><img src="https://statics.didau.com/image/2022/06/27/34bc8c802f26440cbd01f670d4344fb0.jpg" srcset="https://statics.didau.com/image/2022/06/27/e387fc02d82e4af1ae5fc772162f10e1.jpg 800w, https://statics.didau.com/image/2022/06/27/3a36342b792642648f21379529ef6c4b.jpg 1024w, https://statics.didau.com/image/2022/06/27/db4aed64d35c4fd4874b6aea2942943d.jpg 1920w" sizes="100vw" width="1920"></figure><p>Chưa dừng lại ở đó, bên cạnh ưu đãi về giá vé xem phim, trong hôm nay CGV còn tung combo (2 nước lớn + 1 bắp lớn) với giá “sốc” chỉ 83k.</p><figure class="image image_resized" style="width:96.65%;"><img src="https://statics.didau.com/image/2022/06/27/bdfbfe647f9749188523503e22434ce6.jpg" srcset="https://statics.didau.com/image/2022/06/27/1d90525890d040798352f011f15e8f1c.jpg 800w, https://statics.didau.com/image/2022/06/27/4622a69862834f6ebc2af5e790bdba70.jpg 1024w, https://statics.didau.com/image/2022/06/27/9798530cd4504e75a299497a2c69b47e.jpg 1920w" sizes="100vw" width="1920"></figure>', CAST(N'2023-12-15T17:00:00.000' AS DateTime), CAST(N'2024-02-10T15:33:21.000' AS DateTime), N'814ff098-d003-4b09-9039-bc970988a870_56da3de5049d46eab64631486b8bf4f8.png', 1, 1, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (5, N'Ưu đãi đồng giá 65.000/vé tại CGV Cinema', N'<h2 style="margin-left:0px;">Chi tiết ưu đãi</h2><p style="margin-left:0px;text-align:center;"><span style="color:black;"><strong>Chương Trình Ưu Đãi đồng giá 65.000đ/vé khi thanh toán bằng thẻ SeABank</strong></span></p><ul><li><span style="color:black;"><strong>Thời gian triển khai: </strong>Mỗi ngày từ ngày 26/08/2023 đến hết 15/01/2024 (Không áp dụng vào các ngày lễ Tết, Quốc Khánh 2/9 và các ngày lễ quy định của pháp luật). Số lượng có hạn</span></li><li><span style="color:black;"><strong>Nội dung chương trình ưu đãi</strong>:</span></li><li style="text-align:justify;"><span style="color:black;">Khách hàng thuộc đối tượng áp dụng đặt mua trực tuyến 02 (hai) vé xem phim 2D trên website/mobile website www.cgv.vn hoặc trên ứng dụng CGV Cinemas với giá ưu đãi chỉ 130.000 VNĐ</span></li><li style="text-align:justify;"><span style="color:black;">Cách thức<i> </i>nhận ưu đãi:</span></li><li style="text-align:justify;"><span style="color:black;"><strong>Bước 1</strong>: Chọn mua vé xem phim.</span></li><li style="text-align:justify;"><span style="color:black;"><strong>Bước 2</strong>: Tại mục “Giảm giá”, chọn ô “Đối tác”, tiếp tục chọn “Mua 02 vé xem phim 2D chỉ 130K cùng thẻ SeABank”.</span></li><li><span style="color:black;"><strong>Bước 3</strong>: Chủ Thẻ Hợp Lệ tiếp tục đến bước thanh toán và sử dụng Thẻ SeABank, hệ thống sẽ tự động giảm trừ còn 130.000 VND.</span></li><li style="text-align:justify;"><span style="color:black;"><strong>Bước 4</strong>: Chủ thẻ hợp lệ xuất trình thông tin tại rạp CGV để nhận vé xem phim.</span></li></ul><p style="margin-left:0px;text-align:justify;"><span style="color:black;"><i><strong>Ghi chú</strong>:</i></span></p><ul><li style="text-align:justify;"><span style="color:black;">Áp dụng Thẻ hợp lệ SeABank bao gồm những thẻ với những đầu BIN sau: 437420, 537158, 437421, 405082, 436545, 436546, 523611, 476636, 47663603, 476636, 43742200</span></li><li style="text-align:justify;"><span style="color:black;">Số lượt ưu đãi áp dụng: không giới hạn theo ngày</span></li><li style="text-align:justify;"><span style="color:black;">Chương trình bắt đầu từ <strong>09h00 - 23h59 </strong>mỗi ngày.</span></li><li style="text-align:justify;"><span style="color:black;">Áp dụng cho vé xem phim 2D tại tất cả rạp CGV trên toàn quốc.</span></li><li style="text-align:justify;"><span style="color:black;">Mỗi thẻ hợp lệ chỉ được hưởng 01 (một) lần ưu đãi/ tuần và không bị hạn chế số lần nhận ưu đãi trong suốt thời gian khuyến mãi</span></li></ul><p style="margin-left:0px;text-align:justify;"><span style="color:black;"><strong>&nbsp;QUY ĐỊNH CHUNG</strong></span></p><ul><li style="text-align:justify;"><span style="color:black;">Chương trình chỉ áp dụng cho hạng ghế thường và hạng ghế VIP cho phim 2D. Mỗi cặp vé được áp dụng cho cùng một bộ phim, một suất chiếu và cùng hạng ghế.</span></li><li style="text-align:justify;"><span style="color:black;">Khuyến mãi không áp dụng vào các ngày lễ tết theo quy định của pháp luật.</span></li><li style="text-align:justify;"><span style="color:black;">Không áp dụng cho suất chiếu sớm, suất chiếu đặc biệt, và các phòng chiếu đặc biệt như: IMAX, 4DX, GOLD CLASS, STARIUM, L’AMOUR, SWEETBOX…</span></li><li style="text-align:justify;"><span style="color:black;">Chương trình áp dụng cho tất cả các cụm rạp chiếu phim CGV trên toàn quốc.</span></li><li style="text-align:justify;"><span style="color:black;">Khuyến mãi được áp dụng với không giới hạn số lượng giới hạn mỗi ngày.</span></li><li style="text-align:justify;"><span style="color:black;">Vé xem phim không có giá trị đổi thành tiền mặt hay hoàn trả.</span></li><li style="text-align:justify;"><span style="color:black;">Chương trình không áp dụng đồng thời với các chương trình khuyến mãi khác.</span></li><li style="text-align:justify;"><span style="color:black;">KH chỉ tiến hành thanh toán khi hệ thống đã hiển thị số tiền giảm giá. SeABank và CGV không chịu trách nhiệm về việc hệ thống không hiển thị số tiền giảm giá mà KH vẫn tiến hành thanh toán.</span></li><li style="text-align:justify;"><span style="color:black;">CGV bảo lưu toàn quyền điều chỉnh hoặc kết thúc chương trình tại bất kỳ thời điểm nào mà không cần thông báo trước hoặc chịu trách nhiệm bồi thường bằng tiền mặt hoặc tài sản.</span></li><li style="text-align:justify;"><span style="color:black;">CGV bảo lưu quyền không chấp nhận hoặc từ chối người tham gia có dấu hiệu vi phạm các quy định chương trình (căn cứ theo Điều khoản sử dụng dịch vụ hoặc có bất kì hành vi nào mà bên tổ chức cho rằng là không phù hợp hoặc không thể chấp nhận).</span></li><li style="text-align:justify;"><span style="color:black;">CGV bảo lưu quyền hủy bỏ, sửa đổi và/hoặc điều chỉnh toàn bộ hoặc một phần bất kì các điều kiện và điều khoản của chương trình tại bất kỳ thời điểm nào mà không cần thông báo trước cho người tham gia.</span></li><li style="text-align:justify;"><span style="color:black;">Trong trường hợp xảy ra tranh chấp, quyết định của CGV là quyết định cuối cùng.</span></li></ul>', CAST(N'2023-12-15T17:00:00.000' AS DateTime), CAST(N'2024-02-10T15:31:56.000' AS DateTime), N'30524b4d-1cff-4a70-b8cd-fc4a398c0bea_Adapt_Tin tuc 640x396.png', 1, 1, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (6, N'ĐẶT VÉ PHIM CGV VỚI GIÁ CỰC HỜI CHỈ 84.000đ', N'<p style="margin-left:0px;text-align:justify;"><span class="text-big" style="color:rgb(34,34,34);"><strong>[ĐẶT VÉ PHIM – CGV] 84.000đ Không giới hạn số lượng</strong>&nbsp;</span></p><p style="margin-left:0px;text-align:justify;"><span style="color:rgb(0,31,62);"><strong>*Thông tin chương trình</strong>&nbsp;</span></p><p style="margin-left:0px;text-align:justify;"><span style="color:rgb(34,34,34);"><strong>1. Địa điểm sử dụng: Đặt Vé Phim tại ZaloPay</strong>&nbsp;</span></p><p style="margin-left:0px;text-align:justify;"><span style="color:rgb(34,34,34);"><strong>2. Đối tượng khuyến mại:</strong>&nbsp;</span><br><span style="color:rgb(34,34,34);"><strong>- Bạn thân:</strong> Tất cả khách hàng của ZaloPay đã từng có ít nhất 01 giao dịch thanh toán. &nbsp;</span></p><p style="margin-left:0px;text-align:justify;"><span style="color:rgb(34,34,34);"><strong>3. Nội dung chương trình:</strong>&nbsp;</span><br><span style="color:rgb(34,34,34);"><strong>- Bạn thân:</strong> Chỉ 84.000đ/vé CGV khi thanh toán bằng Ví điện tử ZaloPay.&nbsp;&nbsp;</span><br><span style="color:rgb(34,34,34);">- </span><span style="color:rgb(77,77,230);"><strong>1K = 1.000đ</strong></span><br><span style="color:rgb(34,34,34);">-Áp dụng: suất chiếu T6 - Chủ Nhật.&nbsp;&nbsp;</span><br><span style="color:rgb(34,34,34);">- Không giới hạn số lượng vé&nbsp;</span></p><p style="margin-left:0px;text-align:justify;"><span style="color:rgb(0,31,62);"><strong>*Hướng dẫn thực hiện</strong>&nbsp;</span></p><p style="margin-left:0px;text-align:justify;"><span style="color:rgb(0,31,62);"><strong>Đối với các khách hàng đặt vé trên Đặt Vé Phim –ZaloPay:</strong>&nbsp;</span></p><p style="margin-left:0px;text-align:justify;"><span style="color:rgb(34,34,34);">Bước 1: Truy cập vào ZaloPay hoặc ZaloPay trong Zalo chọn Đặt Vé Phim&nbsp;</span><br><span style="color:rgb(34,34,34);">Bước 2: Chọn Rạp CGV và chọn suất chiếu phù hợp&nbsp;</span><br><span style="color:rgb(34,34,34);">Bước 3: Chọn thanh toán. Khách hàng vui lòng chọn thẻ quà tặng tại mục “Chọn hoặc nhập mã ưu đãi” chọn voucher và áp dụng.&nbsp;</span><br><span style="color:rgb(34,34,34);">Bước 4: Vé giảm sẽ được áp dụng nếu bạn thỏa điều kiện khi chuyển sang màn hình thanh toán của ZaloPay.&nbsp;</span><br><span style="color:rgb(34,34,34);">Bước 5: Kiểm tra thông tin và xác nhận thanh toán.&nbsp;</span></p><p style="margin-left:0px;text-align:justify;"><span style="color:rgb(20,43,67);"><strong>*Quy định về loại vé và phòng chiếu</strong>&nbsp;</span><br><span style="color:rgb(34,34,34);">- Áp dụng các suất chiếu 2D tất cả các ngày trong tuần của CGV (ghế Standard, ghế VIP).&nbsp;</span><br><span style="color:rgb(34,34,34);">- KHÔNG áp dụng ghế Sweetbox, Deluxe.&nbsp;</span><br><span style="color:rgb(34,34,34);">- KHÔNG áp dụng cho các Suất chiếu sớm/ Suất chiếu đặc biệt/ Suất chiếu phim cũ/ Suất chiếu ngày Lễ Tết/ Suất chiếu 2D trong phòng chiếu đặc biệt HOẶC các phòng chiếu như: IMAX, 4DX, GOLD CLASS, STARIUM, L’AMOUR….&nbsp;&nbsp;</span><br><span style="color:rgb(34,34,34);">- KHÔNG áp dụng cho Starter.&nbsp;</span></p><p style="margin-left:0px;text-align:justify;"><span style="color:rgb(20,43,67);"><strong>**Thể lệ chương trình khuyến mãi</strong>&nbsp;</span></p><p style="margin-left:0px;text-align:justify;"><span style="color:rgb(34,34,34);">- Không tích điểm/ tích chi tiêu cho các giao dịch có vé hưởng chương trình khuyến mãi.&nbsp;</span><br><span style="color:rgb(34,34,34);">- Khi KH thay đổi nguồn tiền thanh toán, vui lòng áp dụng lại ưu đãi trước khi xác nhận lại thanh toán.&nbsp;</span><br><span style="color:rgb(34,34,34);">- Chỉ áp dụng cho khách hàng đã thực hiện xác minh thông tin tài khoản hoặc liên kết ngân hàng với ZaloPay.&nbsp;</span><br><span style="color:rgb(34,34,34);">- Không áp dụng thẻ ảo, thẻ prepaid.&nbsp;</span><br><span style="color:rgb(20,43,67);">- Không áp dụng cho Khách hàng đã được hưởng ưu đãi giảm giá khác của ZaloPay và CGV trong tháng.&nbsp;</span></p><p style="margin-left:0px;text-align:justify;"><span style="color:rgb(20,43,67);">***<strong> Quy định khác</strong>&nbsp;</span></p><p style="margin-left:0px;text-align:justify;"><span style="color:rgb(34,34,34);">- Trường hợp bạn không đủ điều kiện tham gia chương trình do tài khoản Zalo không hoạt động thường xuyên hoặc nằm trong danh sách có hoạt động bất thường được ghi nhận tự động bởi hệ thống ZaloPay.&nbsp;</span><br><span style="color:rgb(20,43,67);">- Thẻ quốc tế VISA, MasterCard, JCB áp dụng thanh toán trực tiếp đơn hàng từ 10.000đ trở lên. Chỉ áp dụng cho khách hàng đã thực hiện xác minh thông tin tài khoản hoặc liên kết ngân hàng với ZaloPay.&nbsp;</span><br><span style="color:rgb(20,43,67);">- Đối với Agribank và một số ngân hàng khác, cần nạp tối thiểu 50.000đ.&nbsp;</span><br><span style="color:rgb(34,34,34);">- Chương trình có thể kết thúc trước thời hạn nếu hết ngân sách khuyến mãi hoặc tạm dừng nếu có dấu hiệu gian lận, đầu cơ.&nbsp;</span><br><span style="color:rgb(34,34,34);">- Giao dịch bị xác định là gian lận, giả mạo thì quà tặng khuyến mại sẽ bị hủy.&nbsp;</span><br><span style="color:rgb(34,34,34);">- Không áp dụng đồng thời với các chương trình khuyến mãi khác của CGV và ZaloPay.&nbsp;</span><br><span style="color:rgb(34,34,34);">- Chương trình này không hỗ trợ các giao dịch hủy, đổi trả đối với các đơn hàng đã thanh toán thành công.&nbsp;</span><br><span style="color:rgb(34,34,34);">- Khi thanh toán, nếu khách hàng KHÔNG được giảm giá vui lòng gọi Hotline: 1900 54 54 36 để nhận hướng dẫn trước khi xác nhận thanh toán.&nbsp;</span><br><span style="color:rgb(34,34,34);">- Trong trường hợp có tranh chấp, quyết định của ZaloPay là quyết định cuối cùng. Ban tổ chức sẽ không giải quyết các trường hợp khách hàng khiếu nại về chương trình sau 3 ngày kể từ khi chương trình kết thúc.&nbsp;</span><br><span style="color:rgb(34,34,34);">-Căn cứ Luật Điện ảnh của Bộ trưởng Bộ Văn Hóa, Thể thao, Du lịch ngày 15/06/2022, ZaloPay - Đặt Vé Phim thông báo áp dụng quy định về khung giờ chiếu phim cho trẻ em như sau:&nbsp;</span><br><span style="color:rgb(34,34,34);">- Trẻ em: Là khách hàng dưới 16 tuổi (căn cứ vào năm sinh của Khách Hàng) hoặc cao dưới 130cm (đối với một số trường hợp)&nbsp;</span><br><span style="color:rgb(34,34,34);">- Giờ chiếu phim cho trẻ em dưới 13 tuổi tại rạp kết thúc trước 22 giờ.&nbsp;</span><br><span style="color:rgb(34,34,34);">- Giờ chiếu phim cho trẻ em dưới 16 tuổi tại rạp kết thúc trước 23 giờ.&nbsp;</span></p><p style="margin-left:0px;text-align:justify;"><span style="color:rgb(34,34,34);"><strong>* Để biết thêm chi tiết về chương trình, vui lòng liên hệ Trung tâm Hỗ trợ Khách hàng ZaloPay </strong>- <strong>Hotline: 1900 54 54 36</strong> - <strong>Email: </strong></span><a href="mailto:hotro@zalopay.vn"><span style="color:rgb(5,99,193);"><strong>hotro@zalopay.vn</strong></span></a><span style="color:rgb(0,0,0);">&nbsp;</span></p>', CAST(N'2023-12-15T17:00:00.000' AS DateTime), CAST(N'2024-01-27T15:30:16.000' AS DateTime), N'438b994e-c470-491e-adfc-6309cdb12436_Ve_Phim_84k_2_1_b76e6f35dc.png', 1, 1, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (7, N'Quỹ VinFuture tặng 25.000 vé miễn phí cho công chúng tại các rạp CGV trên toàn quốc', N'<p style="margin-left:0px;">(ĐCSVN) – Trong tuần lễ chiếu phim từ 6 -11/12, Quỹ VinFuture sẽ dành tặng 25.000 vé mời miễn phí cho công chúng trên toàn quốc nhằm góp phần thúc đẩy niềm hứng khởi và lan tỏa tình yêu khoa học công nghệ tới mọi người.</p><figure class="table"><table style="background-color:transparent;"><tbody><tr><td style="padding:0px;text-align:center;"><a href="https://file1.dangcongsan.vn/data/0/images/2022/12/03/upload_26/anh1.jpg"><img class="image_resized" style="aspect-ratio:780/347;width:61.34%;" src="https://file1.dangcongsan.vn/data/0/images/2022/12/03/upload_26/anh1.jpg?dpi=150&amp;quality=100&amp;w=780" alt="" width="780" height="347"></a></td></tr><tr><td style="padding:10px !important 0px;">&nbsp;Quỹ VinFuture công bố tổ chức Tuần lễ phim Khoa học Công nghệ VinFuture 2022 từ ngày 6/12 đến ngày 11/12/2022 trên toàn quốc. Ảnh: TL</td></tr></tbody></table></figure><p style="margin-left:0px;text-align:justify;">Ngày 3/12, Quỹ VinFuture công bố tổ chức Tuần lễ phim Khoa học Công nghệ VinFuture 2022 từ ngày 6/12 đến ngày 11/12/2022 trên toàn quốc. Đây là hoạt động mở màn cho chuỗi sự kiện chào mừng Lễ trao giải VinFuture lần thứ 2, với mục tiêu lan tỏa tình yêu khoa học tới công chúng.<br>&nbsp;</p><p style="margin-left:0px;text-align:justify;">Tuần lễ phim Khoa học Công nghệ do Quỹ VinFuture phối hợp cùng Hệ thống Trung tâm thương mại Vincom và Hệ thống rạp CGV Cinemas tổ chức. 03 tác phẩm điện ảnh xuất sắc được chọn lọc để trình chiếu là Gravity - Cuộc chiến không trọng lực; Interstellar - Hố đen tử thần và Current war - Trận ᴄhiến ánh ѕáng. Đây là 03 bộ phim khoa học và giả tưởng nổi tiếng của Hollywood, từng giành nhiều giải thưởng điện ảnh quốc tế uy tín.</p><p style="margin-left:0px;text-align:justify;">&nbsp;Nổi bật là phim Gravity – Cuộc chiến không trọng lực với 7 tượng vàng trên 10 đề cử trong trong mùa giải Oscar 2014 của đạo diễn nổi tiếng người Mexico Alfonso Cuarón. Lựa chọn tiếp cận bối cảnh không gian vũ trụ theo phong cách khoa học và hiện thực, Gravity mô tả về hiểm nguy của công việc ngoài không gian mang lại. Bộ phim gửi đi thông điệp cuộc đấu tranh sinh tồn với khát vọng sống và sự thách thức với những điều tưởng như bất khả thi.&nbsp;</p><p style="margin-left:0px;text-align:justify;">&nbsp;Tương tự không gian nhưng lại trong một bối cảnh hoàn toàn khác, phim Interstellar – Hố đen tử thần của nhà làm phim lừng danh Christopher Nolan là một biên niên ký về cuộc phiêu lưu vĩ đại của các nhà thám hiểm. Trong một thế giới tương lai khi Trái Đất bị ô nhiễm nặng nề, khi tài nguyên cạn kiệt, con người phải cùng đoàn kết để tìm ra giải pháp. "Khoa học chính là chìa khóa giúp con người thoát khỏi diệt vong" là thông điệp ý nghĩa của bộ phim này.&nbsp;&nbsp;</p><p style="margin-left:0px;text-align:justify;">&nbsp;Đặc biệt Phim Current war - Trận ᴄhiến ánh ѕáng - bộ phim kể lại ᴄuộᴄ đối đầu ᴠĩ đại đầy kịch tính trong lịᴄh ѕử khoa họᴄ của Nhà khoa học Ediѕon và Nhà khoa học Weѕtinghouѕe, dựa trên sự kiện có thật. Đây không phải một bộ phim tiểu sử theo tiêu chuẩn chung mà là tác phẩm điện ảnh dành cho những chiêm nghiệm về một thời kỳ mang đến những cuộc cách mạng liên tục, đóng góp kết quả làm thay đổi cuộc sống của rất nhiều người.</p><p style="margin-left:0px;text-align:justify;">&nbsp;Chia sẻ về ý nghĩa Tuần lễ phim, Tiến sĩ Lê Thái Hà - Giám đốc Điều hành Giải thưởng VinFuture cho biết: “Nhiều phát minh, đôi khi, được bắt đầu từ ý tưởng tưởng chừng như bất khả thi, nhưng với sức mạnh diệu kỳ của trí tuệ con người, đã có thể trở thành hiện thực. Thông qua những bộ phim với góc nhìn đa chiều, tuần lễ phim Khoa học Công nghệ VinFuture muốn truyền tải thông điệp, khoa học luôn được bắt nguồn từ những khát khao và ước mơ không giới hạn để vươn tới điều tốt đẹp nhất”.&nbsp;</p><p style="margin-left:0px;text-align:justify;">&nbsp;Trong tuần lễ chiếu phim từ 6 -11/12/2022, Quỹ VinFuture sẽ dành tặng 25.000 vé mời miễn phí cho công chúng trên toàn quốc nhằm góp phần thúc đẩy niềm hứng khởi và lan tỏa tình yêu khoa học công nghệ tới mọi người.Khán giả sẽ nhận vé miễn phí trực tiếp khi tới rạp hoặc có thể lựa chọn đăng ký vé online thông qua website, ứng dụng CGV với 3 suất chiếu mỗi ngày gồm: 10:30; 15:30; 19:30 tại 37 cụm rạp CGV tại các TTTM Vincom trên toàn quốc.&nbsp;</p><p style="margin-left:0px;text-align:justify;">&nbsp;Sau Tuần lễ Phim, VinFuture sẽ chính thức bắt đầu tuần lễ Khoa học – Công nghệ VinFuture 2022 với các hoạt động học thuật dành cho cộng đồng nghiên cứu khoa học, các lãnh đạo doanh nghiệp, các nhà sáng tạo đổi mới và công chúng, bao gồm: Giao lưu cùng Hội đồng Giải thưởng và Hội đồng Sơ khảo VinFuture; Diễn thuyết truyền cảm hứng “Đổi mới hiện tại, Kiến tạo tương lai”; Tọa đàm “Khoa học vì Cuộc sống”; Lễ trao giải VinFuture 2022; Chào tương lai: Giao lưu cùng Chủ nhân Giải thưởng VinFuture.</p><figure class="table" style="height:357px;width:800px;"><table style="background-color:rgb(183, 221, 232);"><tbody><tr><td style="padding:0px;text-align:justify;"><p style="margin-left:0px;">Quỹ VinFuture, được thành lập vào 20/12/2020, nhân ngày Quốc tế Đoàn kết Nhân loại – là quỹ hoạt động phi lợi nhuận do tỷ phú Phạm Nhật Vượng và phu nhân Phạm Thu Hương đồng sáng lập. Hoạt động cốt lõi của Quỹ là trao Giải thưởng VinFuture - Giải thưởng vinh danh những trí tuệ xuất chúng, những thành tựu khoa học công nghệ và phát minh có tiềm năng tạo ra sự thay đổi có ý nghĩa trên quy mô toàn cầu, mang lại cuộc sống tốt đẹp cho hàng triệu người trên khắp hành tinh.</p><p style="margin-left:0px;">Hệ thống giải thưởng gồm có Giải thưởng chính (VinFuture Grand Prize) trị giá 3 triệu đô la Mỹ, là một trong các giải thưởng thường niên có giá trị lớn nhất từ trước đến nay trên toàn cầu; 03 Giải Đặc biệt, mỗi giải trị giá 500 nghìn USD, dành cho các nhà khoa học nữ, các nhà khoa học đến từ các nước đang phát triển và các nhà khoa học nghiên cứu các lĩnh vực mới.</p><p style="margin-left:0px;">Ngoài ra, Quỹ cũng tiến hành nhiều hoạt động để hiện thực hóa sứ mệnh của mình, như tài trợ các sự kiện học thuật, kết nối trí tuệ, hợp tác phát triển khoa học công nghệ, và thúc đẩy giáo dục Khoa học - Công nghệ - Kỹ thuật - Toán học STEM.</p></td></tr></tbody></table></figure>', CAST(N'2023-12-15T10:00:00.000' AS DateTime), CAST(N'2024-01-27T15:30:34.000' AS DateTime), N'08326258-18dc-47b4-9c5d-de387eadaadd_anh1.jpg', 1, 1, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (8, N'''Đế chế Napoléon'': Thước phim hào hùng về cuộc đời hoàng đế lừng danh nước Pháp', N'<h2 style="margin-left:0px;"><strong>''Đế chế Napoléon'' của đạo diễn kỳ cựu Ridley Scott kể về hành trình chinh phục quyền lực của nhà lãnh đạo lỗi lạc người Pháp, song song với mối quan hệ đầy biến động giữa ông và hoàng hậu Joséphine de Beauharnais.</strong></h2><p>&nbsp;</p><p style="margin-left:0px;">Ngay khi công bố dự án, đạo diễn người Anh&nbsp;<a href="https://thanhnien.vn/nha-su-hoc-chi-ra-nhung-sai-sot-trong-bom-tan-napoleon-cua-ridley-scott-185231107074322438.htm">Ridley Scott&nbsp;</a>nổi tiếng với loạt phim <i>Blade Runner, Alien, Thelma &amp; Louise, Gladiator…</i> đã khiến công chúng sục sôi chờ đón bản anh hùng ca về một trong những nhân vật gây tranh cãi nhất lịch sử. Một chính trị gia ham quyền lực, một thiên tài yêu nước, một bạo chúa hay một người đàn ông có vóc dáng nhỏ bé nhưng mang khối óc và tư duy khổng lồ.<br>&nbsp;</p><p><img class="image_resized" style="aspect-ratio:800/450;height:auto;width:auto !important;" src="https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/12/3/1-17016069148291999550520.jpeg" alt="''Đế chế Napoléon'': Thước phim hào hùng về cuộc đời hoàng đế lừng danh nước Pháp - Ảnh 1." width="800" height="450"></p><p style="margin-left:0px;">Đế chế Napoleon kể lại những thăng trầm cuộc đời của một trong những hoàng đế vĩ đại nhất nước Pháp</p><p style="margin-left:0px;">Columbia Pictures</p><p style="margin-left:0px;">Ridley Scott tường thuật cuộc đời của&nbsp;<a href="https://thanhnien.vn/mu-hoang-de-napoleon-bonaparte-duoc-chot-gia-51-ti-dong-185231120101546588.htm">Napoléon Bonaparte</a>&nbsp;(do nam diễn viên đoạt giải Oscar Joaquin Phoenix thủ vai) đồng hành với các dấu mốc lịch sử như cuộc Cách mạng Pháp, vụ hành quyết nữ hoàng Marie Antoinette, từ lúc còn giữ chức vụ đại úy pháo binh sang chức tướng quân, chiến thắng trong cuộc vây hãm Toulon năm 1793, lên ngôi Hoàng đế năm 1804 cho đến khi ông bị phế truất, lưu đày rồi qua đời trên đảo Saint - Helena năm 1821. Phim tái hiện một số chiến công hiển hách của ông khắp châu Âu, châu Phi và cả thất bại đau đớn ở Waterloo.</p><p><strong>Copy video urlPlay / PauseMute / UnmuteReport a problemLanguageShareVidverto Player</strong></p><p>Tác phẩm còn khai thác mối quan hệ giữa Napoléon và người vợ đầu Joséphine de Beauharnais (Vanessa Kirby). Góa phụ hơn ông sáu tuổi, đã là mẹ của 2 đứa trẻ nhưng chinh phục Napoléon từ ánh mắt đầu tiên và cũng là mối tình khiến ông đau đáu suốt đời.</p><h2 style="margin-left:0px;"><strong>Bộ phim biến tấu lịch sử</strong></h2><p style="margin-left:0px;">Ngay khi ra mắt, phim vấp phải sự phản đối của các nhà sử học nước Pháp về tính xác thực của câu chuyện. Ridley Scott đáp lại rằng có hàng ngàn cuốn sách nghiên cứu về Napoléon và tất cả đều không sống ở thời đại ấy để kiểm chứng.</p><p><img class="image_resized" style="aspect-ratio:1924/1128;width:89.94%;" src="https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/12/3/2-1701606914863364923420.jpeg" alt="''Đế chế Napoléon'': Thước phim hào hùng về cuộc đời hoàng đế lừng danh nước Pháp - Ảnh 2." srcset="https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/12/3/2-1701606914863364923420.jpeg 1x,https://images2.thanhnien.vn/528068263637045248/2023/12/3/2-1701606914863364923420.jpeg 2x" sizes="100vw" width="1924" height="1128"></p><p style="margin-left:0px;">Đạo diễn thừa nhận phim có một số tình tiết hư cấu</p><p style="margin-left:0px;">Columbia Pictures</p><p style="margin-left:0px;">Nam chính Joaquin Phoenix cũng trả lời tờ <i>Empire</i>: “Nếu bạn muốn thực sự hiểu Napoléon, thì có lẽ nên tự nghiên cứu và đọc sách. Bởi nếu bạn xem bộ phim, trải nghiệm này sẽ được kể qua con mắt của Ridley”.</p><p style="margin-left:0px;">Tất nhiên, không thể đòi hỏi độ chính xác của một phim giải trí Hollywood và có thể chấp nhận việc các nhân vật thoại và hát <i>La Marseillaise</i>, hô “Vive la France” (Nước Pháp muôn năm) với giọng đặc sệt Anh - Mỹ.</p><p style="margin-left:0px;">Phim được kể theo lối tuyến tính với các mốc sự kiện hiện rõ trên màn hình. Tuy vậy, có một số sai sót về thời gian, từ lúc Napoléon gặp Joséphine, ngày ký kết hiệp ước Fontainebleau cho tới cái chết của ông. Ridley Scott cũng phóng tác quá đà khi thêm một số chi tiết hình ảnh. Ví như cảnh quân Pháp bắn đại bác nổ&nbsp;<a href="https://thanhnien.vn/phat-hien-kim-tu-thap-co-nhat-the-gioi-lau-doi-hon-ca-o-ai-cap-185231106090028779.htm">kim tự tháp</a>&nbsp;để minh họa cho việc họ chiếm Ai Cập.</p><p style="margin-left:0px;">Dù trải dài hơn 20 năm nhưng các nhân vật không có nhiều biến đổi về tạo hình. Napoléon của Joaquin ngay cảnh chào sân (giai đoạn 24 tuổi) trông đã như một ông bác trung niên khổ hạnh. Và suốt những năm sau đó, nhân vật chỉ thể hiện sự già đi bằng việc thêm vài cọng râu lún phún và độn cho cơ thể mập hơn đôi chút</p>', CAST(N'2023-12-15T15:37:31.873' AS DateTime), CAST(N'2024-02-09T15:37:33.873' AS DateTime), N'431a6594-5fd1-42b7-94c1-a8b74054d578_1-17016069148291999550520.webp', 1, 0, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (9, N'Phim hoạt hình mới của Illumination “Nhà Vịt Di Cư” tung trailer chính thức: mới lạ, hấp dẫn và ngập tràn tiếng cười', N'<p style="margin-left:0px;"><strong>(NSO) – Mới đây, hãng phim đã tung đoạn trailer chính thức, đưa khán giả “bay lượn” cùng gia đình vịt trên chuyến phiêu lưu đầy hồi hộp, kịch tính nhưng cũng rất vui nhộn và mới mẻ.&nbsp;Nhà vịt di cư&nbsp;theo chân một gia đình vịt trời gồm vịt bố, vịt mẹ, cậu con trai tuổi teen Dax và vịt út Gwen, trong lần đầu tiên trải nghiệm chuyến di cư tiến về phía nam để trú đông.</strong></p><figure class="image" style="height:auto;"><img style="aspect-ratio:680/447;" src="https://media.molistar.com/thumb_w/editors/2023/07/20/thumb-viez_680.jpg" alt="Phim hoạt hình “Nhà vịt di cư” tung trailer chính thức: Mới lạ, hấp dẫn và ngập tràn tiếng cười" width="680" height="447"><figcaption>&nbsp;</figcaption></figure><p style="margin-left:0px;">Đoạn trailer mở ra với khung cảnh rực rỡ sắc trời thu tại một chiếc ao ở New England – địa bàn hoạt động từ lâu của gia đình vịt. Cái ao bình thường vốn vắng vẻ nhưng nay lại đông đúc lạ thường bởi sự “ghé thăm” của một đàn vịt trời từ nơi khác bay tới.&nbsp;Đàn vịt lạ hạ cánh nghỉ chân&nbsp;và mang đến những câu chuyện ly kỳ về nơi xa xôi ngoài kia.</p><p style="margin-left:0px;">Thế nhưng, niềm vui vẻ sự háo hức kéo dài không bao lâu, gia đình vịt nhận ra, họ đang bay ngược chiều với tất cả các đàn vịt khác. Không kịp quay đầu, họ bất ngờ gặp phải loạt “chướng ngại vật” là những tòa nhà cao tầng của thành phố hiện đại. Liên tiếp sau đó là những thước phim đầy kịch tính nhưng vô cùng hài hước của nhà vịt trong quá trình khám phá đô thị mới.</p><figure class="image" style="height:auto;"><img style="aspect-ratio:680/447;" src="https://media.molistar.com/thumb_w/editors/2023/07/20/thumb-viez-1_680.jpg" alt="Phim hoạt hình “Nhà vịt di cư” tung trailer chính thức: Mới lạ, hấp dẫn và ngập tràn tiếng cười" width="680" height="447"><figcaption>&nbsp;</figcaption></figure><p style="margin-left:0px;">Từ dạo quanh sân vườn cho đến chơi cầu trượt tại công viên nước, hay trải nghiệm cả tình huống nguy hiểm “cá lớn nuốt vịt bé”. Nhận ra sự thật rằng&nbsp;nhà vịt đã lạc lối quá xa, liệu gia đình vịt có thể cùng nhau tìm được đường tới vùng nhiệt đới Jamaica như ý định ban đầu?</p><p style="margin-left:0px;">Nhà vịt di cư&nbsp;được đạo diễn bởi Benjamin Renner, nhà làm phim từng được đề cử giải Oscar với tác phẩm hoạt hình nổi tiếng&nbsp;<i>Ernest &amp; Celestine</i>, đồng đạo diễn bởi Guylo Homsy (<i>Sing 2</i>). Bộ phim được sản xất bởi giám đốc của Illumination Chris Meledandri, biên tập bởi Christian Gazal (<i>Happy Feet, Peter Rabbit</i>), thiết kế bởi Colin Stimpson (<i>The Secret Life of Pets 2</i>), kịch bản của Mike White, tác giả từng đoạt giải Emmy với&nbsp;<i>The White Lotus</i>&nbsp;và là nhà biên kịch của&nbsp;<i>School of Rock.</i></p><figure class="image" style="height:auto;"><img style="aspect-ratio:680/447;" src="https://media.molistar.com/thumb_w/editors/2023/07/20/thumb-viez-2_680.jpg" alt="Phim hoạt hình “Nhà vịt di cư” tung trailer chính thức: Mới lạ, hấp dẫn và ngập tràn tiếng cười" width="680" height="447"><figcaption>&nbsp;</figcaption></figure><p style="margin-left:0px;">Sở hữu một ekip đầy tài năng, Nhà vịt di cư hứa hẹn sẽ mang đến câu chuyện ý nghĩa cùng sự hài hước đặc trưng của Illumination và những nhân vật khó quên, tạo nên trải nghiệm điện ảnh náo nhiệt vui nhộn cho cả gia đình trong dịp lễ.</p>', CAST(N'2023-12-15T15:38:52.527' AS DateTime), CAST(N'2024-02-09T15:38:53.527' AS DateTime), N'3616ea84-e526-460d-b536-7e82561f6212_maxresdefault (4).jpg', 1, 0, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (10, N'Những bí ẩn thú vị fan DC mong đợi ở Aquaman 2: Cây đinh ba đen của Black Manta, thuyết 7 vương quốc', N'<h2 style="margin-left:0px;"><strong>Aquaman và Vương Quốc Thất Lạc sẽ là bom tấn cuối cùng thuộc đề tài siêu anh hùng khép lại năm 2023.</strong></h2><p style="margin-left:0px;">Vào dịp cuối năm 2023, khán giả sẽ được chứng kiến sự trở lại của Arthur Curry - vua vùng Thất hải trong Aquaman 2. Trước thềm cuộc đối đầu gay cấn, các fan của DC đã truyền tay nhau loạt thông tin thú vị khi <a href="https://www.saostar.vn/dien-anh/batman-se-tai-xuat-o-aquaman-va-vuong-quoc-that-lac-202312052128550088.html"><i><strong>Aquaman Và Vương Quốc Thất Lạc</strong></i><strong> </strong></a>ra mắt.</p><p style="margin-left:0px;"><img class="image_resized" style="height:auto !important;width:1px;" src="https://tracking.saostar.vn/pixel.png?type=ads_request&amp;track=request&amp;name=PC_Article-Normal_Inread_Inread" alt="tracking"></p><p style="margin-left:auto;">&nbsp;</p><p style="margin-left:0px;">&nbsp;</p><h3 style="margin-left:0px;"><strong>The Lost Kingdom và thuyết 7 vương quốc</strong></h3><p style="margin-left:0px;">Sau khi Atlantis chìm xuống lòng đại dương theo truyền thuyết, vùng Thất Hải chính thức được hình thành bao gồm Atlantis, Xebel, Vương quốc Trench, Vương quốc Brine, Vương quốc Fishermen, Vương quốc Deserter và Vương quốc Valor. Mỗi “vùng biển” đều có một chủng loại tộc người riêng sinh sống, có xã hội riêng và cả thủ lĩnh riêng. Tuy vậy, <a href="https://www.saostar.vn/dien-anh/aquaman-tro-lai-phan-2-co-cuop-ngoi-bom-tan-ca-kiem-nhat-vu-tru-dc-202312031341004901.html"><strong>vùng Thất hải có một vị vua là Arthur Curry - Aquaman</strong></a>.</p><figure class="image image_resized" style="height:auto !important;width:670px;"><img style="aspect-ratio:1200/675;" src="https://ss-images.saostar.vn/wp700/2023/12/12/pc/1702366251735/e2w7jzr77m1-kc1e3ok3q42-cv2b0yo7bb3.jpg" alt="Những bí ẩn thú vị fan DC mong đợi ở Aquaman 2: Cây đinh ba đen của Black Manta, thuyết 7 vương quốc Ảnh 1" width="1200" height="675"><figcaption><i>Aquaman là vua vùng Thất hải</i></figcaption></figure><p style="margin-left:0px;"><img class="image_resized" style="height:auto !important;width:1px;" src="https://tracking.saostar.vn/pixel.png?type=ads_request&amp;track=request&amp;name=PC_Article-Normal_Inread2_Inread" alt="tracking"></p><p style="margin-left:0px;">&nbsp;</p><p style="margin-left:0px;">Phần 2 Aquaman có nhắc đến “The lost kingdom” - vương quốc bị mất. Trước kia, James Wan từng “nhá hàng” trên trang cá nhân rằng vương quốc bị mất này có tên Necrus. Theo truyện tranh DC, Necrus là vương quốc thứ 2 chìm xuống đại dương sau Atlantis. Necrus được trị vì bởi Mongo, và là tộc người khá hiếu chiến.&nbsp;</p><h3 style="margin-left:0px;"><strong>Cây đinh ba vàng của Aquaman</strong></h3><p style="margin-left:0px;">Để trở thành kẻ thống trị vùng Thất hải, <a href="https://www.saostar.vn/dien-anh/he-lo-dan-cast-cua-aquaman-sau-nua-thap-ky-amber-heard-van-co-mat-202311271542334774.html"><strong>Aquaman phải giành lấy cây đinh ba vàng</strong></a> đại diện cho ngôi vua. Trước kia, “tiên đế” Atlan đã phong ấn cây đinh ba và ra lệnh cho thủy quái Karathen canh giữ.&nbsp;</p><figure class="image image_resized" style="height:auto !important;width:670px;"><img style="aspect-ratio:1200/675;" src="https://ss-images.saostar.vn/wp700/2023/12/12/pc/1702366251735/rmgiprvosp1-20a521l4ki2-1g2uxlzodv3.jpg" alt="Những bí ẩn thú vị fan DC mong đợi ở Aquaman 2: Cây đinh ba đen của Black Manta, thuyết 7 vương quốc Ảnh 2" width="1200" height="675"><figcaption><i>Aquaman sở hữu cây đinh ba vàng của Atlan</i></figcaption></figure><p style="margin-left:0px;">Đó là lý do mà trong <i><strong>Aquaman</strong></i>, Arthur Curry đã đối đầu với Karathen để có được đinh ba của Atlan. Thực chất Arthur Curry được truyền ngôi không phải vì anh đánh bại Karathen, mà vì anh đích thực là hậu duệ mà Atlan tìm kiếm.</p><h3 style="margin-left:0px;"><strong>Cây đinh ba đen của Black Manta</strong></h3><p style="margin-left:0px;">Trái ngược với đinh ba vàng của Aquaman, đinh ba đen là vũ khí lợi hại không kém sẽ xuất hiện trong <i><strong>Aquaman Và Vương Quốc Thất Lạc</strong></i> lần này. Black Manta là kẻ sở hữu cây đinh ba đen, chứa trong đó là phép thuật hắc ám có thể hủy diệt cả nhân loại. Nhiều khả năng cây đinh ba đen này thuộc về tộc Necrus, và bị thất lạc cùng vương quốc này cho đến khi được Black Manta tìm ra.</p><figure class="image image_resized" style="height:auto !important;width:670px;"><img style="aspect-ratio:1920/1080;" src="https://ss-images.saostar.vn/wp700/2023/12/12/pc/1702366251735/avm1lxlh9i1-1flkp53pue2-cmiuaq9cy23.jpg" alt="Những bí ẩn thú vị fan DC mong đợi ở Aquaman 2: Cây đinh ba đen của Black Manta, thuyết 7 vương quốc Ảnh 3" width="1920" height="1080"><figcaption><i>Black Manta là kẻ sở hữu cây đinh ba đen</i></figcaption></figure><h3 style="margin-left:0px;"><strong>Bộ giáp mới của Aquaman</strong></h3><p style="margin-left:0px;">Bên cạnh bộ giáp vàng kinh điển làm nên thương hiệu của vị vua Thất hải, <i><strong>Aquaman Và Vương Quốc Thất Lạc</strong></i> còn khiến fan nhà DC háo hức bởi tạo hình mới của nam chính. Arthur Curry lần này “gây sốt” với thêm một bộ giáp nữa, khác biệt hẳn với trang phục chói sáng thường thấy. Điều đặc biệt nhất ở bộ suit này, theo tiết lộ từ ekip, đó là khả năng giúp chủ nhân của nó tàng hình, lẫn vào làn nước đại dương.</p><figure class="image image_resized" style="height:auto !important;width:670px;"><img style="aspect-ratio:1000/611;" src="https://ss-images.saostar.vn/wp700/2023/12/12/pc/1702366251735/z1imehp1bt1-xrevv5b7u32-xdk03zojf23.jpg" alt="Những bí ẩn thú vị fan DC mong đợi ở Aquaman 2: Cây đinh ba đen của Black Manta, thuyết 7 vương quốc Ảnh 4" width="1000" height="611"><figcaption><i>Bộ giáp mới của Aquaman</i></figcaption></figure><p style="margin-left:0px;"><i><strong>Aquaman Và Vương Quốc Thất Lạc </strong></i>đang khiến khán giả cực kỳ mong đợi trong dịp Giáng sinh này.</p>', CAST(N'2023-12-15T15:39:59.333' AS DateTime), CAST(N'2024-01-05T15:40:00.333' AS DateTime), N'46d4a6e8-a689-4f98-8ddb-113650ef0690_750_1702280452553.webp', 1, 0, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (11, N'Phim Mai của Trấn Thành sẽ ra rạp đúng ngày mùng 1 Tết Nguyên đán Giáp Thìn 2024', N'<p><img src="https://photo-baomoi.bmcdn.me/w700_r1/2023_11_29_194_47670892/2a88cd73c53f2c61752e.jpg" alt="Một cảnh trong bộ phim điện ảnh &quot;Mai&quot; của đạo diễn Trấn Thành." width="625" height="375"></p><p style="margin-left:0px;"><i>Một cảnh trong bộ phim điện ảnh "Mai" của đạo diễn Trấn Thành.</i></p><p style="margin-left:0px;">&nbsp;</p><p style="margin-left:0px;">Tiếp nối thành công đi vào lịch sử phòng vé Việt của <i>Nhà bà Nữ</i> trong mùa Tết 2023, <i>Mai</i> ấn định khởi chiếu vào mùng 1 Tết Nguyên đán 2024 (tức ngày 10/2/2024). First-look trailer và poster đầy ấn tượng của bộ phim có sự xuất hiện của diễn viên <a href="https://baomoi.com/phuong-anh-dao-tag11068.epi">Phương Anh Đào</a>, người được đạo diễn Trấn Thành “chọn mặt gửi vàng” để đảm nhận vai nữ chính.</p><p style="margin-left:0px;">Thuộc thể loại tâm lý, tình cảm, <i>Mai</i> xoay quanh câu chuyện về cuộc đời của một người phụ nữ cùng tên với bộ phim. Trên First-look poster, Phương Anh Đào tạo ấn tượng mạnh với cái nhìn tĩnh lặng, xuyên thấu, đặc biệt, trên bờ môi nữ diễn viên là hình ảnh cô đang nằm nghiêng trên mặt nước.</p><p style="margin-left:0px;">Được phủ một màn sương mờ ảo, poster đậm chất nghệ thuật của <i>Mai</i> gây tò mò với lời tựa: “Quá khứ chưa ngủ yên, ngày mai liệu sẽ đến?".</p><p style="margin-left:0px;">First-look trailer của <i>Mai</i> hé lộ những thước phim tình cảm lãng mạn đầu tiên giữa Mai (Phương Anh Đào) và Dương (Tuấn Trần).</p><p style="margin-left:0px;">Dương tâm sự về Mai - cô gái khiến mình rơi vào "lưới tình": “Em làm cho anh thay đổi nhiều lắm. Biết lắng nghe hơn, biết để ý cảm xúc của người khác hơn, thực sự muốn quan tâm một ai đó”.</p><p style="margin-left:0px;">Đáp lại lời tỏ tình ngọt ngào của Dương, câu trả lời có phần lấp lửng của Mai đủ khiến khán giả suy ngẫm: “Đừng yêu tôi. Quá khứ của tôi tệ lắm”.</p><p style="margin-left:0px;">Từ 3 năm trước, ngay sau khi hoàn thành phim <i>Bố già</i>, <a href="https://baomoi.com/tran-thanh-tag651.epi">Trấn Thành</a> đã bắt tay vào chuẩn bị cho dự án <i>Mai</i>. Bộ phim được đầu tư mạnh về bối cảnh, thiết bị, kỹ thuật ghi hình, thời gian quay cho đến kịch bản độc đáo cùng dàn diễn viên chất lượng.</p><p style="margin-left:0px;">Đạo diễn Trấn Thành không giấu được sự hào hứng về dự án <i>Mai</i>, khẳng định đây là tác phẩm anh dành nhiều thời gian, công sức và tâm huyết nhất cho đến thời điểm này.</p><p style="margin-left:0px;"><i>Mai</i> là dự án phim hết sức đặc biệt bởi được công bố từ năm 2022. Khi đó, đạo diễn - nhà sản xuất Trấn Thành giới thiệu nam diễn viên chính <a href="https://baomoi.com/tuan-tran-tag12503.epi">Tuấn Trần</a> cùng dàn diễn viên phụ Uyển Ân, Anh Đức, Quốc Khánh.</p><p style="margin-left:0px;">Tuy nhiên, vì sự kỹ lưỡng trong quá trình phát triển kịch bản và casting mà <i>Mai</i> đành “nhường chỗ” cho <i>Nhà bà Nữ</i> - bộ phim lập kỷ lục doanh thu 475 tỷ đồng của chính đạo diễn Trấn Thành.</p><p style="margin-left:0px;">Quen thuộc với khán giả Việt qua hàng loạt phim điện ảnh như <i>Tro tàn rực rỡ</i> (2022), <i>Bằng chứng vô hình</i> (2020), <i>Chàng vợ của em</i> (2018)… Phương Anh Đào dần chứng minh được thực lực diễn xuất và nhận được đánh giá cao từ giới chuyên môn.</p><p style="margin-left:0px;">Đạo diễn Trấn Thành chia sẻ, quá trình “đi tìm Mai” vô cùng gian truân, trải qua rất nhiều vòng tuyển chọn mới có thể gặp được người phù hợp nhất: “Phương Anh Đào đối với tôi còn hơn cả một sự lựa chọn.</p><p style="margin-left:0px;">Định mệnh giúp chúng tôi gặp nhau và sự thể hiện của cô ấy ngay từ lần casting đầu tiên đã khiến tôi tin rằng, Mai phải là Phương Anh Đào. Phương Anh Đào tài năng, đa dạng trong cách diễn xuất và thật sự có một nội tâm sâu sắc, chân thật”.</p><p style="margin-left:0px;">Có thể nói, Phương Anh Đào chính là “nàng thơ” đích thực của đạo diễn Trấn Thành khi cô vượt qua nhiều ứng cử viên và “gánh vác” một vai diễn nặng ký như vậy.</p><p style="margin-left:0px;">Theo Trấn Thành, <i>Mai</i> sẽ khai thác một con người mới cùng nội tâm sâu thẳm mà khán giả chưa từng thấy ở Phương Anh Đào trước đây. Tiếp tục chinh phục đề tài về phụ nữ, Trấn Thành bày tỏ: “Tôi muốn làm một tác phẩm để mọi người có thể xem, cảm nhận và trân trọng những người phụ nữ xung quanh mình nhiều hơn.</p><p style="margin-left:0px;"><i>Nhà bà Nữ</i> và <i>Mai</i> là hai thế giới khác nhau về góc độ nghệ thuật cũng như câu chuyện và cả nội tâm từng nhân vật. Ở <i>Nhà bà Nữ</i> là những người phụ nữ chịu tổn thương nhưng lại tổn thương người khác, còn ở <i>Mai</i>, tuy vẫn chịu tổn thương nhưng cách người phụ nữ đối diện, lựa chọn lại hoàn toàn khác”.</p><p style="margin-left:0px;"><i>Mai</i> là bộ phim điện ảnh thứ ba trong sự nghiệp đạo diễn của Trấn Thành. Với <i>Bố già</i>, anh đảm nhận vai trò đồng đạo diễn và diễn xuất vai Ba Sang. Tác phẩm thu về 426 tỷ đồng, trở thành phim điện ảnh Việt có doanh thu cao nhất mọi thời đại vào năm 2021.</p><p style="margin-left:0px;">Tới năm 2023, Trấn Thành tự “phá vỡ” kỷ lục của chính mình với Nhà bà Nữ. Bộ phim do anh độc lập làm đạo diễn và kiêm vai Phú Nhuận đã vượt <i>Bố già</i> để giữ vị trí top 1 doanh thu phim Việt mọi thời đại khi chạm mốc 475 tỷ đồng.</p>', CAST(N'2023-12-15T15:41:14.507' AS DateTime), CAST(N'2024-02-10T15:41:15.507' AS DateTime), N'dc0de3cf-fb77-4389-a807-0e798b47b945_maxresdefault (6).jpg', 1, 0, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (12, N'Tài tử Henry Cavill và nữ ca sĩ Dua Lipa sánh đôi trong phim hành động "Argylle Siêu Điệp Viên"', N'<p style="text-align:justify;"><img style="height:auto !important;" src="https://vnmedia.vn/common/v1/image/logo_insert.png" width="92" height="21"> - <strong>Mới đây, đoạn trailer chính thức đầu tiên của siêu phẩm điện ảnh dự kiến ra mắt vào&nbsp;TẾT ÂM LỊCH 2024&nbsp;-&nbsp;ARGYLLE SIÊU ĐIỆP VIÊN&nbsp;(tựa gốc:&nbsp;ARGYLLE) tới từ đạo diễn loạt&nbsp;Kingsman&nbsp;đình đám Matthew Vaughn đã được tung ra. Với sự góp mặt của nam tài tử Henry Cavill cùng những tên tuổi quen mặt Sam Rockwell, Bryce Dallas Howard, John Cena, Bryan Cranston và Samuel L. Jackson, tác phẩm chủ đề điệp viên mới này không khỏi khiến nhiều “mọt” phim mong chờ.</strong></p><p style="text-align:justify;">Đặc biệt, “hiện tượng nhạc Pop” Dua Lipa cũng xuất hiện với hình ảnh yêu kiều đầy quyến rũ trong đoạn trích đang nhận được nhiều sự chú ý.</p><figure class="table" style="width:auto;"><table><tbody><tr><td style="border:1px solid rgb(237, 237, 237);padding:2px 8px;" colspan="2"><a href="https://vnmedia.vn/van-hoa/tuong-tac/201412/kate-hudson-huy-hon-henry-cavill-bat-ngo-chia-tay-ban-gai-463730/">Kate Hudson hủy hôn, Henry Cavill bất ngờ chia tay bạn gái</a></td></tr><tr><td style="border:1px solid rgb(237, 237, 237);padding:2px 8px;" colspan="2"><a href="https://vnmedia.vn/giai-tri-so/202203/dua-lipa-lam-roi-micro-4ac3114/">Dua Lipa làm rơi micro</a></td></tr></tbody></table></figure><figure class="table" style="width:auto;"><table><tbody><tr><td style="border:1px solid rgb(237, 237, 237);padding:2px 8px;"><figure class="image" style="height:auto !important;"><img style="aspect-ratio:831/545;" src="https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/102023/2_20231006152309.png" alt="" width="831" height="545"></figure></td></tr><tr><td style="border:1px solid rgb(237, 237, 237);padding:2px 8px;text-align:center;">&nbsp;</td></tr></tbody></table></figure><p style="text-align:justify;">Trong&nbsp;ARGYLLE SIÊU ĐIỆP VIÊN, Elly Conway là một tác giả ẩn dật sở hữu loạt tiểu thuyết gián điệp bán chạy nhất, nhưng đối với cô hạnh phúc là được ở nhà “gõ chữ” cùng mèo cưng Alfie. Tuy nhiên, giờ đây những buổi tối yên tĩnh ở nhà đã trở thành quá khứ, khi câu chuyện hư cấu của cô về điệp viên bí mật Argylle đột nhiên trùng khớp với những gì đang xảy ra ở hiện thực. Vô tình bị cuốn vào vòng vây của tổ chức gián điệp toàn cầu, Elly đeo chú mèo cưng trong balo sau lưng, cùng nhau chạy đến mọi miền thế giới để cố gắng đi trước kẻ phản diện một bước. Ranh giới giữa hư cấu và thế giới thực của&nbsp;Elly càng trở nên mơ hồ.</p><p style="text-align:justify;">Đoạn trailer mở ra với bối cảnh tại một buổi tiệc tối, nơi mà nhân vật của Henry Cavill và Dua Lipa gặp nhau. Nhưng dưới lớp ngụy trang đầy lãng mạn và quyến rũ ấy, mật vụ Argylle đã bị cô nàng phát hiện thân phận và rơi vào tầm ngắm, hàng loạt họng súng từ tay khách mời trong bữa tiệc đang nhắm vào anh. Với thân thế là một siêu điệp viên, Argylle đã thoát khỏi vòng vây và nhanh chóng truy đuổi cô gái ấy. Gay cấn là vậy nhưng tất cả thực ra lại chỉ là tình tiết trong cuốn tiểu thuyết về điệp viên Argylle đang bán chạy của tác giả mới nổi Elly Conway.</p><figure class="table" style="width:auto;"><table><tbody><tr><td style="border:1px solid rgb(237, 237, 237);padding:2px 8px;"><figure class="image" style="height:auto !important;"><img style="aspect-ratio:834/550;" src="https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/102023/3_20231006152309.png" alt="" width="834" height="550"></figure></td></tr><tr><td style="border:1px solid rgb(237, 237, 237);padding:2px 8px;text-align:center;">&nbsp;</td></tr></tbody></table></figure><p style="text-align:justify;">Quay trở lại với hiện thực, trong một chuyến du lịch của Elly Conway cùng với mèo cưng, cô được fan hâm mộ bắt gặp, người này&nbsp;tình cờ lại là một tình báo. Chưa kịp nói chuyện cho “ra ngô ra khoai”, cô bỗng rơi vào giữa trận đánh đầy kịch tính trong toa tàu giữa tên tình báo này và nhiều kẻ khác, mà tất cả họ đều đem theo những vũ khí nguy hiểm tính mạng. Không còn cách nào khác, cô cùng chú mèo buộc phải theo tên tình báo nhảy dù tẩu thoát.</p><p style="text-align:justify;">Di chuyển đến ngôi nhà giữa nơi hoang vắng, Elly còn gặp thêm nhiều điệp viên khác. Tất cả những điều này xảy ra với Elly bởi ngờ đâu, cô là “thầy bói ra trò”. Những gì cô viết trong cuốn tiểu thuyết mới đó thật sự đang diễn ra, cũng vì vậy mà Elly đã chọc phải chỗ cô không nên động đến. Có vẻ như, tổ chức bí mật này đang cần cô bởi khả năng có thể viết ra chương tiếp theo, cho mật vụ Argylle “hàng thật”. Bất đắc dĩ trải qua hàng loạt tình huống đầy thử thách mà chỉ những điêp viên mới có thể thực hiện, Elly sẽ làm thế nào để có thể toàn mạng mà chắp bút nối tiếp câu chuyện?</p><figure class="table" style="width:auto;"><table><tbody><tr><td style="border:1px solid rgb(237, 237, 237);padding:2px 8px;"><figure class="image" style="height:auto !important;"><img style="aspect-ratio:837/560;" src="https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/102023/4_20231006152309.png" alt="" width="837" height="560"></figure></td></tr><tr><td style="border:1px solid rgb(237, 237, 237);padding:2px 8px;text-align:center;">&nbsp;</td></tr></tbody></table></figure><p style="text-align:justify;">ARGYLLE SIÊU ĐIỆP VIÊN&nbsp;do Matthew Vaughn đạo diễn và sản xuất cùng Adam Bohling (Kingsman) và David Reid (Kingsman). Quen thuộc với thể loại điệp viên, Matthew Vaughn cũng từng đồng sáng tác, đạo diễn và sản xuất loạt phim&nbsp;Kingsman&nbsp;đình đám với sự tham gia của Colin Firth và Taron Egerton. Ông còn sở hữu các dự án đáng chú ý khác như&nbsp;Stardust, X-Men First Class&nbsp;và&nbsp;Two Smoking Barrels. Người viết kịch bản cho Argylle là Jason Fuchs, anh trước đây từng viết kịch bản cho&nbsp;Wonder Woman&nbsp;và&nbsp;Ice Age: Continental Drift. Fuchs cũng sẽ là nhà sản xuất cùng với Vaughn, Adam Bohling và David Reid.&nbsp;</p><figure class="table" style="width:auto;"><table><tbody><tr><td style="border:1px solid rgb(237, 237, 237);padding:2px 8px;"><figure class="image image_resized" style="height:auto !important;width:600px;"><img style="aspect-ratio:524/830;" src="https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/102023/1_20231006152309.png" width="524" height="830"></figure></td></tr><tr><td style="border:1px solid rgb(237, 237, 237);padding:2px 8px;text-align:center;">&nbsp;</td></tr></tbody></table></figure><p style="text-align:justify;">Thủ vai chính siêu điệp viên Argylle là diễn viên Henry Cavill, nam thần sở hữu nhiều tác phẩm nổi tiếng và từng là&nbsp;một siêu anh&nbsp;hùng mang tính biểu tượng với&nbsp;Man of Steel, Batman v Superman: Dawn of Justice&nbsp;và&nbsp;Justice League.&nbsp;Cạnh đó, dàn diễn viên cũng sở hữu nhiều cái tên đình đám không kém như siêu sao nhạc pop Dua Lipa, John Cena (Fast X), diễn viên từng đoạt giải Oscar - Ariana DeBose (West Side Story), Bryan Cranston (Breaking Bad), biểu tượng hài kịch Catherine O''Hara (Schitt''s Creek), Sofia Boutella (Kingsman: The Secret Service) và huyền thoại Samuel L. Jackson.&nbsp;</p><p style="text-align:justify;">ARGYLLE SIÊU ĐIỆP VIÊN&nbsp;(tựa gốc:&nbsp;ARGYLLE) dự kiến khởi chiếu vào&nbsp;Tết âm lịch 2024</p>', CAST(N'2023-12-15T15:42:38.777' AS DateTime), CAST(N'2024-02-10T15:42:40.777' AS DateTime), N'e7486409-bf74-4df2-951d-9ab042ec0342_maxresdefault (7).jpg', 1, 0, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (13, N'Hai siêu quái vật phòng vé Godzilla x Kong trở lại', N'<p style="margin-left:0px;">Bom tấn hành động <i>Godzilla x </i><a href="https://tuoitre.vn/truc-thang-bay-qua-vinh-ha-long-trong-trailer-kong-skull-island-1210012.htm"><i>Kong</i></a><i>: Đế chế mới</i> vừa chính thức hé lộ những hình ảnh đầu tiên. Từng đối đầu nhau trong <i>Godzilla đại chiến Kong</i><strong> </strong>hồi năm 2021, ở phần phim mới, hai đại titan có màn hợp tác được chờ đợi, cùng nhau bảo vệ sự sống trên địa cầu.</p><p style="margin-left:0px;">Trong trailer vừa được hãng<a href="https://tuoitre.vn/hollywood-ban-phim-qua-mang-130949.htm">&nbsp;Warner Bros. Pictures</a>&nbsp;tiết lộ tại sự kiện <i>Cinema Con Experience Sao Paulo 2023</i>, chuyện phim của <i>Godzilla x Kong: Đế chế mới</i><strong> </strong>sẽ tiếp tục những sự kiện của phần phim tiền nhiệm, khi Kong tìm được đường trở về quê hương của mình ở Trái đất Rỗng, nằm sâu trong lòng đất.</p><p style="margin-left:0px;">Đây cũng chính là bối cảnh quan trọng trong phần phim mới, qua đó tiếp tục mở rộng không gian vũ trụ Monsterverse.</p><h2 style="margin-left:0px;"><strong>Kẻ thù của Kong xuất hiện dữ tợn với khả năng hủy diệt</strong></h2><p style="margin-left:0px;">Đoạn trailer bắt đầu với lời dẫn chuyện của tiến sĩ Andrews (Rebecca Hall), nói về việc "Văn minh nhân loại đã luôn tin rằng, sự sống chỉ tồn tại trên mặt đất", kèm theo các hình ảnh về một thế giới trù phú, khoáng đạt ở Trái đất Rỗng.</p><p><img class="image_resized" style="aspect-ratio:752/397;height:auto;width:730px;" src="https://cdn.tuoitre.vn/thumb_w/730/471584752817336320/2023/12/4/image012-17016687271641476005507.jpg" alt="Godzilla x Kong: Đế chế mới nối tiếp câu chuyện trong phần phim tiền nhiệm - Ảnh: ĐPCC" width="752" height="397"></p><p style="margin-left:auto;">&nbsp;</p><p>&nbsp;</p><p style="margin-left:0px;"><i>Godzilla x Kong: Đế chế mới </i>nối tiếp câu chuyện trong phần phim tiền nhiệm - Ảnh: ĐPCC</p><p style="margin-left:0px;">Sau khi tìm được đường về nhà, Kong bắt đầu hành trình đầy tự do cùng các sinh vật kỳ bí. Tại đây, Kong gặp gỡ một tiểu titan đồng loại, cho thấy rõ hơn giả thuyết về những thành viên khác trong đại gia đình của Kong.</p><h4 style="margin-left:!important;"><a href="https://tuoitre.vn/vi-sao-godzilla-vs-kong-thua-phim-trung-quoc-co-kinh-phi-kem-33-lan-20210412100849105.htm"><strong>Vì sao ''Godzilla Vs. Kong'' thua phim Trung Quốc có kinh phí kém 33 lần?</strong></a></h4><h4 style="margin-left:!important;"><a href="https://tuoitre.vn/godzilla-vs-kong-dai-thang-123-trieu-usd-vi-sao-phim-ngo-ngan-la-tru-cot-phong-ve-toan-cau-20210331171026525.htm"><strong>''Godzilla vs. Kong'' đại thắng 123 triệu USD: Vì sao phim ''ngớ ngẩn'' là trụ cột phòng vé toàn cầu?</strong></a></h4><p style="margin-left:0px;">Nhóm thám hiểm của tiến sĩ Andrews sau đó phát hiện dấu tay màu đỏ khổng lồ tương tự với một godzilla cỡ lớn. Đó là Skar King - đại titan mới trong phần phim này.</p><p style="margin-left:0px;">Skar King với bộ lông đỏ xuất hiện trong dáng vẻ dữ tợn và khả năng tàn sát ghê gớm.</p><p style="margin-left:0px;">Nhiều khả năng đây chính là đối trọng trực tiếp của Kong, buộc Kong và "cựu kẻ thù" Godzilla phải cùng bắt tay tiêu diệt.</p><p style="margin-left:0px;">Phần phim mới tiếp tục được chỉ đạo bởi đạo diễn Adam Wingard, cùng dàn diễn viên quen mặt trong series bao gồm&nbsp;<a href="https://tuoitre.vn/9-my-nhan-tre-len-bia-vanity-fair-362244.htm">Rebecca Hall</a>, Brian Tyree Henry và "bạn thân Kong" Kaylee Hottle.</p><p style="margin-left:0px;"><i>Godzilla x Kong: Đế chế mới</i><strong> </strong>là phần mới nhất thuộc vũ trụ điện ảnh quái vật tỉ đô Monsterverse, xoay quanh cuộc chiến sinh tồn của loài người với các quái vật hủy diệt.</p><p style="margin-left:0px;">Năm 2014, vũ trụ điện ảnh này khởi động với phần phim đầu tiên <i>Godzilla</i><strong>, </strong>tiếp theo đó là <i>Kong: Đảo đầu lâu</i><strong> </strong>năm 2017, <i>Godzilla: Đế vương bất tử</i><strong> </strong>năm 2019 và gần đây nhất là bom tấn năm 2021 <i>Godzilla đại chiến Kong</i><strong>. </strong>Các tựa phim này đã thu về xấp xỉ 2 tỉ USD tại phòng vé toàn cầu.</p>', CAST(N'2023-12-15T15:44:36.193' AS DateTime), CAST(N'2024-02-09T15:44:37.193' AS DateTime), N'6ae6bce7-c835-45e3-92d8-87cecba72fb6_0be.jpeg', 1, 0, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (14, N'Wonka: viên sô cô la ngọt ngào khép lại năm 2023', N'<h2 style="margin-left:0px;"><strong>Bạn nghĩ sao về một thế giới mà sô cô la không dành cho mọi người? Một thế giới mà sô cô la là đặc quyền của vài tầng lớp thống trị, có thể được dùng thay tiền, được canh giữ bởi nhà thờ và được dùng làm quà hối lộ?</strong></h2><p><img class="image_resized" style="aspect-ratio:2000/1141;height:auto;width:730px;" src="https://cdn.tuoitre.vn/thumb_w/730/471584752817336320/2023/12/10/screenshot-2023-12-10-at-093414-1702175673282755989936.png" alt="Wonka cùng Timothée Chalamet mang sự ngọt ngào đến cho mọi người sau một năm mỏi mệt - Ảnh: IMDb" width="2000" height="1141"></p><p>&nbsp;</p><p style="margin-left:0px;">Wonka cùng Timothée Chalamet mang sự ngọt ngào đến cho mọi người sau một năm mỏi mệt - Ảnh: IMDb</p><p style="margin-left:0px;">Đó là thế giới trong Wonka, bộ phim nhạc kịch bom tấn mùa Giáng sinh năm nay của đạo diễn Paul King, do "chàng thơ" <a href="https://tuoitre.vn/timothee-chalamet.html">Timothée Chalamet</a> vào vai chính.</p><p style="margin-left:0px;">Mang theo một số tiền ít ỏi 12 đồng cùng ước mơ lớn lao là mở một cửa hiệu sô cô la, Willy <a href="https://tuoitre.vn/wonka.html">Wonka</a> vượt đại dương tới thành phố hoa lệ, để rồi sớm nhận ra rằng ước mơ của mình thật xa vời.</p><p style="margin-left:0px;">Anh bị liên minh sản xuất <a href="https://tuoitre.vn/so-co-la.html">sô cô la</a> cho giới thượng lưu cùng cảnh sát truy lùng, lại lọt vào tay vợ chồng chủ nhà trọ tàn ác không kém gì vợ chồng nhà Thénardier trong Những người khốn khổ.</p><p style="margin-left:0px;text-align:center;">WONKA | Official Trailer</p><h2 style="margin-left:0px;"><strong>Những viên sô cô la bay của Timothée Chalamet</strong></h2><p style="margin-left:0px;">Có một thế hệ trẻ em lớn lên với nhân vật Willy Wonka - ông chủ lập dị của nhà máy sô cô la trong cuốn truyện thiếu nhi hài hước và đen tối của Roald Dahl.</p><p style="margin-left:0px;">Chúng ta đã có ít nhất hai Wonka nổi tiếng trên màn ảnh: Gene Wilder - một Wonka u buồn, tuyệt vọng và phần nào đáng sợ trong bản phim năm 1971, và Johnny Depp - một Wonka cô đơn, quái đản, không được thấu hiểu, lấy cảm hứng từ... Michael Jackson trong bản phim 2005. Không đặt mục tiêu vượt qua hai cái bóng ấy, Wonka 2023 được thể hiện khác đi.</p><h4 style="margin-left:!important;"><a href="https://tuoitre.vn/hanh-trinh-thanh-sao-hang-a-hollywood-hen-ho-toan-ban-gai-xinh-dep-cua-timothee-chalamet-20231206183631005.htm"><strong>Hành trình thành sao hạng A Hollywood, hẹn hò toàn bạn gái xinh đẹp của Timothée Chalamet</strong></a></h4><h4 style="margin-left:!important;"><a href="https://tuoitre.vn/timothee-chalamet-dong-vai-tho-lam-socola-lap-di-trong-wonka-20231013150028254.htm"><strong>Timothée Chalamet đóng vai thợ làm socola lập dị trong ''Wonka''</strong></a></h4><h4 style="margin-left:!important;"><a href="https://tuoitre.vn/dune-part-two-cua-timothee-chalamet-roi-lich-phat-hanh-20230825104424446.htm"><strong>''Dune: Part Two'' của Timothée Chalamet dời lịch phát hành</strong></a></h4><p style="margin-left:0px;">Tiền truyện Wonka mang đến một chàng Wonka ngây thơ, mơ mộng với tâm hồn treo ngược cành cây, luôn hát ca và nhảy múa. Vai diễn được dành riêng cho Chalamet.</p><p style="margin-left:0px;">Trong bản gốc, Wonka là ông chủ của bản hợp đồng buộc những đứa trẻ phải tuân lệnh mình trong nhà máy bánh kẹo, nhưng ở đây Wonka lại là nạn nhân của một hợp đồng nô lệ vì cậu đã quá say mê sô cô la mà bỏ học chữ nghĩa.</p><p style="margin-left:0px;">Ngoài Chalamet, khó có một nam diễn viên nào khác hiện nay có thể khiến ta tin anh hô biến ra được những giấc mơ ngọt ngào.</p><p style="margin-left:0px;">Phải là Chalamet và dáng vẻ "nhất trần bất nhiễm" (một hạt bụi cũng không nhiễm) của anh mới khiến những phân cảnh bay bổng của Wonka trở nên khả tín: cảnh Wonka bay lên cùng chùm bóng bay, cảnh Wonka phát những viên sô cô la biết bay, cảnh anh cưỡi trên đám mây đường và tạo nên cơn mưa kẹo rớt xuống bao đàn ông, đàn bà, người già, trẻ nhỏ háo hức bên dưới...</p><p style="margin-left:0px;">Trong nguyên tác của Dahl, giấc mơ sô cô la của Wonka chỉ đẹp đẽ ở bên ngoài còn khi bước vào trong, lũ trẻ nhận ra mình phải nhận những hình phạt ghê gớm như bị sông sô cô la cuốn đi hay bị teo bé thành kích thước một thanh sô cô la nếu làm trái lời Wonka.</p><p style="margin-left:0px;">Còn trong bộ phim này, mỗi lần nhà máy mini trong chiếc vali nhỏ của Wonka được mở ra, ta lại trông chờ một phép màu mới: một viên sô cô la biết bay, một viên sô cô la tựa phúc lạc dược, một viên sô cô la làm từ sấm sét và nắng trời...</p><p style="margin-left:0px;">Đó là những điều đẹp đẽ khác xa với hiện thực trong căn nhà trọ nô lệ, với sự suy đồi của cảnh sát, giám mục, tài phiệt...</p><p><img class="image_resized" style="aspect-ratio:2000/1123;height:auto;width:730px;" src="https://cdn.tuoitre.vn/thumb_w/730/471584752817336320/2023/12/10/screenshot-2023-12-10-at-093824-17021760005221231148483.png" alt="Cảnh trong phim Wonka" width="2000" height="1123"></p><p style="margin-left:0px;">Cảnh trong phim Wonka</p><h2 style="margin-left:0px;"><strong>Món tráng miệng cho một năm ảm đạm</strong></h2><p style="margin-left:0px;">Trong Wonka, sô cô la của các tập đoàn lớn rất cổ điển và đơn thuần như đại diện cho những giấc mơ theo lề thói, trong khi sô cô la của Wonka thì làm từ những nguyên liệu thần tiên nhất, như những trái anh đào trong vườn <a href="https://tuoitre.vn/hoang-gia-nhat-ban.html">hoàng gia Nhật Bản</a>, những loại rượu bí mật trong ngăn kéo hay sữa hươu cao cổ.</p><p style="margin-left:0px;">Người ăn sô cô la của Wonka sẽ rơi vào những trạng thái mà họ chưa từng biết, họ nhung nhớ quá khứ, họ có đủ can đảm để tỏ tình, họ nghĩ ra những ý tưởng mới.</p><p><img class="image_resized" style="aspect-ratio:2000/1203;height:auto;width:730px;" src="https://cdn.tuoitre.vn/thumb_w/730/471584752817336320/2023/12/10/screenshot-2023-12-10-at-093942-17021760005201816443968.png" alt="Cảnh trong phim Wonka" width="2000" height="1203"></p><p style="margin-left:0px;">Cảnh trong phim Wonka</p><p style="margin-left:0px;">Khi Wonka quyết thay đổi thế giới, cách anh làm là cho mọi người bất kể giàu nghèo đều được ăn sô cô la. Vì nếm sô cô la là nếm hương vị sống trọn vẹn như một con người.</p><p style="margin-left:0px;">Người ta thường nói, món tráng miệng là liều thuốc cho cả một ngày ảm đạm. Bộ phim Wonka và thế giới bánh kẹo của nó giống như liều thuốc cả một năm ảm đạm, khi kinh tế thế giới vẫn còn ngụp lặn thì đã phải gánh chịu thêm những cuộc chiến tranh.</p><p style="margin-left:0px;">Mọi điều trong Wonka đều là một món <a href="https://tuoitre.vn/qua-giang-sinh.html">quà Giáng sinh</a> sớm: những bài hát rộn ràng khiến ta thấy yêu đời, thiên đường kẹo sô cô la khiến ta thèm thuồng, trí tưởng tượng lộng lẫy của đội ngũ làm phim khiến ta như được trở lại làm một đứa trẻ, cả cách tài tử điển trai Hugh Grant tự làm xấu mình khi vào vai người lùn da cam Oompa Loompa khiến ta bất ngờ, hay giây phút Rowan Atkinson - Mr.Bean kinh điển - xuất hiện trên màn ảnh trong vai vị giám mục mê đồ ngọt khiến ta bật cười.</p><p style="margin-left:0px;">Cuối năm có lẽ người ta cần cảm giác ấm áp như một liều giả dược dù biết rằng phim kết thì giấc mơ cũng hết.</p><p style="margin-left:0px;">Dường như nhà làm phim cũng hiểu điều đó. Khi Wonka ăn miếng sô cô la ngon nhất trần đời mà mẹ mình để lại, cậu đã ước giây phút ấy kéo dài thêm một lát. Đó cũng là điều ta muốn khi xem Wonka, ước gì hạnh phúc ấy kéo dài thêm một lát.</p>', CAST(N'2023-12-15T15:45:28.013' AS DateTime), CAST(N'2024-02-09T15:45:29.013' AS DateTime), N'760d92d6-8164-440b-ad08-99c5a3598960_screenshot-2023-12-10-at-093414-1702175673282755989936.webp', 1, 0, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (15, N'Chi Pu quyến rũ lấn lướt dàn mỹ nhân, Anh Tú cực bảnh bao tại thảm đỏ ra mắt Người Mặt Trời', N'<p style="margin-left:0px;">Sau bao ngày chờ đợi, cuối cùng bộ phim <a href="https://kenh14.vn/nguoi-mat-troi-2023.html"><i>Người Mặt Trời</i></a><i> </i>- tác phẩm đánh dấu sự trở lại trên màn ảnh rộng của Chi Pu - đã có buổi ra mắt chính thức đầu tiên ở sự kiện thảm đỏ tại thành phố Hồ Chí Minh. Buổi họp báo quy tụ đông đảo những gương mặt đình đám trong showbiz Việt tới chúc mừng và ủng hộ dự án như Khổng Tú Quỳnh, Anh Tú, Quang Tuấn,...</p><p style="margin-left:0px;">&nbsp;</p><p style="margin-left:0px;">&nbsp;</p><p style="margin-left:0px;"><span style="color:rgb(255,255,255);font-family:Arial, Helvetica, sans-serif;">00:01:17</span></p><p style="margin-left:0.45em;">&nbsp;</p><p style="margin-left:0px;text-align:center;"><i>Toàn cảnh thảm đỏ Người Mặt Trời</i></p><figure class="table"><table style="background-color:rgb(255, 255, 255);border-width:0px;"><tbody><tr><td>&nbsp;</td></tr></tbody></table></figure><p style="margin-left:0px;">Tâm điểm của thảm đỏ dĩ nhiên thuộc về sự xuất hiện của Chi Pu. Cô nổi bật trong chiếc đầm đỏ khoe vai trần quyến rũ và vòng eo đáng ghen tị. 2023 có thể coi là năm vô cùng thành công của Chi Pu khi cô có bước tiến lớn trong sự nghiệp ca hát. Và hiện tại,<i> Người Mặt Trời</i> cũng hứa hẹn sẽ mang tới một màu sắc mới của nữ diễn viên.</p><figure class="image image_resized" style="width:580px;"><a href="https://kenh14cdn.com/203336854389633024/2023/12/5/photo-12-1701785232943674023737.jpg"><img style="aspect-ratio:620/413;" src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/12/5/photo-12-1701785232943674023737.jpg" alt="Chi Pu quyến rũ lấn lướt dàn mỹ nhân, Anh Tú cực bảnh bao tại thảm đỏ ra mắt Người Mặt Trời - Ảnh 2." width="620" height="413"></a></figure><figure class="image image_resized" style="width:580px;"><a href="https://kenh14cdn.com/203336854389633024/2023/12/5/photo-11-1701785231546904720033.jpg"><img style="aspect-ratio:620/413;" src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/12/5/photo-11-1701785231546904720033.jpg" alt="Chi Pu quyến rũ lấn lướt dàn mỹ nhân, Anh Tú cực bảnh bao tại thảm đỏ ra mắt Người Mặt Trời - Ảnh 3." width="620" height="413"></a></figure><p style="margin-left:0px;"><i>Bộ tứ diễn viên chính Thuận Nguyễn - Chi Pu - Trần Ngọc Vàng - Trịnh Thảo</i></p><p style="margin-left:0px;">Ngoài Chi Pu và các diễn viên chính trong phim, sự xuất hiện của những cái tên đình đám như Anh Tú, Khổng Tú Quỳnh,... cũng chiếm trọn sự chú ý từ khán giả và giới truyền thông.</p><p style="margin-left:0px;">&nbsp;</p><p style="margin-left:0px;">ADVERTISING</p><p style="margin-left:0px;">&nbsp;</p><p style="margin-left:0px;">&nbsp;</p><p style="margin-left:0px;">iTVC <span style="color:rgb(153,153,153);">from Admicro</span></p><figure class="image image_resized" style="height:auto;width:580px;"><a href="https://kenh14cdn.com/203336854389633024/2023/12/5/photo-10-1701785229018299469919.jpg"><img style="aspect-ratio:620/931;" src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/12/5/photo-10-1701785229018299469919.jpg" alt="Chi Pu quyến rũ lấn lướt dàn mỹ nhân, Anh Tú cực bảnh bao tại thảm đỏ ra mắt Người Mặt Trời - Ảnh 4." width="620" height="931"></a></figure><p style="margin-left:0px;"><i>Anh Tú</i></p><figure class="image image_resized" style="height:auto;width:580px;"><a href="https://kenh14cdn.com/203336854389633024/2023/12/5/photo-9-17017852274611690168651.jpg"><img style="aspect-ratio:620/931;" src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/12/5/photo-9-17017852274611690168651.jpg" alt="Chi Pu quyến rũ lấn lướt dàn mỹ nhân, Anh Tú cực bảnh bao tại thảm đỏ ra mắt Người Mặt Trời - Ảnh 5." width="620" height="931"></a></figure><p style="margin-left:0px;"><i>Khổng Tú Quỳnh</i></p><figure class="image image_resized" style="height:auto;width:580px;"><a href="https://kenh14cdn.com/203336854389633024/2023/12/5/photo-8-17017852254001480464885.jpg"><img style="aspect-ratio:620/931;" src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/12/5/photo-8-17017852254001480464885.jpg" alt="Chi Pu quyến rũ lấn lướt dàn mỹ nhân, Anh Tú cực bảnh bao tại thảm đỏ ra mắt Người Mặt Trời - Ảnh 6." width="620" height="931"></a></figure><p style="margin-left:0px;"><i>Quang Tuấn</i></p><figure class="image image_resized" style="height:auto;width:580px;"><a href="https://kenh14cdn.com/203336854389633024/2023/12/5/photo-7-17017852233531675839456.jpg"><img style="aspect-ratio:620/931;" src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/12/5/photo-7-17017852233531675839456.jpg" alt="Chi Pu quyến rũ lấn lướt dàn mỹ nhân, Anh Tú cực bảnh bao tại thảm đỏ ra mắt Người Mặt Trời - Ảnh 7." width="620" height="931"></a></figure><p style="margin-left:0px;"><i>Ngân Hòa</i></p><figure class="image image_resized" style="height:auto;width:580px;"><a href="https://kenh14cdn.com/203336854389633024/2023/12/5/photo-6-1701785222350262183681.jpg"><img style="aspect-ratio:620/931;" src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/12/5/photo-6-1701785222350262183681.jpg" alt="Chi Pu quyến rũ lấn lướt dàn mỹ nhân, Anh Tú cực bảnh bao tại thảm đỏ ra mắt Người Mặt Trời - Ảnh 8." width="620" height="931"></a></figure><p style="margin-left:0px;"><i>Quốc Huy</i></p><figure class="image image_resized" style="height:auto;width:580px;"><a href="https://kenh14cdn.com/203336854389633024/2023/12/5/photo-5-17017852213961588454245.jpg"><img style="aspect-ratio:620/931;" src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/12/5/photo-5-17017852213961588454245.jpg" alt="Chi Pu quyến rũ lấn lướt dàn mỹ nhân, Anh Tú cực bảnh bao tại thảm đỏ ra mắt Người Mặt Trời - Ảnh 9." width="620" height="931"></a></figure><p style="margin-left:0px;"><i>NS Kiều Trinh</i></p><figure class="image image_resized" style="height:auto;width:580px;"><a href="https://kenh14cdn.com/203336854389633024/2023/12/5/photo-4-1701785219978177400298.jpg"><img style="aspect-ratio:620/931;" src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/12/5/photo-4-1701785219978177400298.jpg" alt="Chi Pu quyến rũ lấn lướt dàn mỹ nhân, Anh Tú cực bảnh bao tại thảm đỏ ra mắt Người Mặt Trời - Ảnh 10." width="620" height="931"></a></figure><p style="margin-left:0px;"><i>Otis Nhật Trường</i></p><figure class="image image_resized" style="width:580px;"><a href="https://kenh14cdn.com/203336854389633024/2023/12/5/photo-3-1701785218835672114200.jpg"><img style="aspect-ratio:620/413;" src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/12/5/photo-3-1701785218835672114200.jpg" alt="Chi Pu quyến rũ lấn lướt dàn mỹ nhân, Anh Tú cực bảnh bao tại thảm đỏ ra mắt Người Mặt Trời - Ảnh 11." width="620" height="413"></a></figure><p style="margin-left:0px;"><i>Ngọc Phước - Khả Như - B Trần</i></p><figure class="image image_resized" style="height:auto;width:580px;"><a href="https://kenh14cdn.com/203336854389633024/2023/12/5/photo-2-17017852177861138736933.jpg"><img style="aspect-ratio:620/931;" src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/12/5/photo-2-17017852177861138736933.jpg" alt="Chi Pu quyến rũ lấn lướt dàn mỹ nhân, Anh Tú cực bảnh bao tại thảm đỏ ra mắt Người Mặt Trời - Ảnh 12." width="620" height="931"></a></figure><p style="margin-left:0px;"><i>Trương Thế Vinh</i></p><figure class="image image_resized" style="height:auto;width:580px;"><a href="https://kenh14cdn.com/203336854389633024/2023/12/5/photo-1-17017852164461411857050.jpg"><img style="aspect-ratio:620/931;" src="https://kenh14cdn.com/thumb_w/620/203336854389633024/2023/12/5/photo-1-17017852164461411857050.jpg" alt="Chi Pu quyến rũ lấn lướt dàn mỹ nhân, Anh Tú cực bảnh bao tại thảm đỏ ra mắt Người Mặt Trời - Ảnh 13." width="620" height="931"></a></figure><p style="margin-left:0px;"><i>Hoàng Dũng</i></p>', CAST(N'2023-12-15T15:46:54.060' AS DateTime), CAST(N'2024-02-10T15:46:55.060' AS DateTime), N'93c246b8-2402-4e1b-bbfb-cf935184dda2_323376434-1880719388938298-4953387488888957780-n-1-8314.webp', 1, 0, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (16, N'Kang Ha Neul yêu lại vợ ngầu Jung So Min trong phim trăm tỉ', N'<p style="margin-left:0px;"><a href="https://tuoitre.vn/park-seojoon-cua-doi-toi-hang-bet-se-len-man-anh-rong-voi-midnight-runners-1366402.htm"><i>Yêu lại vợ ngầu</i></a><i> (Love Reset)</i> là bộ phim hài, tình cảm lãng mạn đến từ Hàn Quốc, do đạo diễn Nam Dae Jung cầm trịch. Phim đánh dấu sự tái hợp của cặp đôi được yêu thích trên màn ảnh là Kang Ha Neul và Jung So Min.</p><p style="margin-left:0px;"><i>Yêu lại vợ ngầu</i> là tác phẩm dẫn đầu phòng vé 3 tuần liên tiếp, đạt doanh thu hơn 200 tỉ tại Hàn Quốc.</p><p style="margin-left:0px;">Tác phẩm có mô típ không mới nhưng vẫn thu hút khán giả nhờ những câu thoại và sự tung hứng duyên dáng của dàn diễn viên từ chính đến phụ.</p><h2 style="margin-left:0px;"><strong>Cơ hội thứ hai cho một chuyện tình lãng mạn</strong></h2><p style="margin-left:0px;"><i>Yêu lại vợ ngầu</i> mở đầu bằng câu chuyện tình đẹp như mơ của cặp vợ chồng trẻ No Jung Yeol (<a href="https://tuoitre.vn/ve-dep-ben-trong-manh-hon-nhan-sac-343198.htm">Kang Ha Neul</a>) và Hong Na Ra (Jung So Min).&nbsp;</p><p style="margin-left:0px;">Họ từng yêu nhau say đắm, đến mức Na Ra sẵn sàng hủy đám cưới ngay giờ chót để chạy đến bên Jung Yeol. Dù bị gia đình hai bên phản đối, họ vẫn quyết tâm kết hôn với nhau.</p><p style="margin-left:-350px;">&nbsp;</p><ul><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li></ul><p><a href="https://cdn.tuoitre.vn/471584752817336320/2023/11/11/wz7bhhn-1699670547030485346598.jpg"><img class="image_resized" style="aspect-ratio:1920/1279;height:auto;width:730px;" src="https://cdn.tuoitre.vn/thumb_w/730/471584752817336320/2023/11/11/wz7bhhn-1699670547030485346598.jpg" alt="Câu chuyện tình dở khóc dở cười trong Yêu lại vợ ngầu - Ảnh: Soompi" width="1920" height="1279"></a></p><p>&nbsp;</p><p style="margin-left:0px;">Câu chuyện tình dở khóc dở cười trong <i>Yêu lại vợ ngầu </i>- Ảnh: Soompi</p><p style="margin-left:!important;">&nbsp;</p><p style="margin-left:!important;">&nbsp;</p><p style="margin-left:!important;">&nbsp;</p><p style="margin-left:0px;">Thế nhưng, đời không như là mơ. Câu chuyện cổ tích nhanh chóng trở về hiện thực khi cả hai dần bộc lộ những nét xấu trong tính cách.</p><p style="margin-left:0px;">Từ chuyện tình ai cũng ngưỡng mộ, họ trở thành kẻ thù không đội trời chung dù sống cùng một căn nhà. Ở phiên tòa xét xử ly hôn, cả hai thay nhau kể xấu đối phương.</p><p style="margin-left:0px;">Tuy nhiên, trên đường rời tòa án, họ bất ngờ gặp tai nạn giao thông khiến cả hai rơi vào tình trạng mất trí nhớ tạm thời. Từ đây, những tình huống dở khóc dở cười diễn ra, khiến họ yêu lại từ đầu.</p><p style="margin-left:0px;"><i>Yêu lại vợ ngầu</i> có mô típ không mới. Nhưng điểm mạnh của tác phẩm nằm ở những tình tiết và câu thoại hài hước, khiến mỗi cảnh phim đều trở nên bất ngờ và thú vị, đem lại tiếng cười cho khán giả.</p><p><a href="https://cdn.tuoitre.vn/471584752817336320/2023/11/11/yeu-lai-vo-ngau-2-169967059451035867122.jpg"><img class="image_resized" style="aspect-ratio:1200/675;height:auto;width:730px;" src="https://cdn.tuoitre.vn/thumb_w/730/471584752817336320/2023/11/11/yeu-lai-vo-ngau-2-169967059451035867122.jpg" alt="Cặp vợ chồng trẻ thi nhau đấu tố tại phiên tòa ly hôn - Ảnh: Soompi" width="1200" height="675"></a></p><p style="margin-left:0px;">Cặp vợ chồng trẻ thi nhau đấu tố tại phiên tòa ly hôn - Ảnh: Soompi</p><p style="margin-left:0px;">Thông qua câu chuyện tình yêu lứa đôi, tác phẩm truyền tải thông điệp về cách mỗi chúng ta hàn gắn lại những mối quan hệ đổ vỡ.</p><p>&nbsp;</p><h4 style="margin-left:!important;"><a href="https://tuoitre.vn/14-phim-hai-tinh-cam-han-quoc-hay-nhat-truoc-nay-20190530171512176.htm"><strong>14 phim hài tình cảm Hàn Quốc hay nhất trước nay</strong></a></h4><h4 style="margin-left:!important;"><a href="https://tuoitre.vn/phim-tinh-cam-co-kinh-phi-lon-nhat-han-quoc-97333.htm"><strong>Phim tình cảm có kinh phí lớn nhất Hàn Quốc</strong></a></h4><p style="margin-left:0px;">Jung Yeol và Na Ra chỉ "<a href="https://tuoitre.vn/the-vow---yeu-lai-tu-dau-479946.htm">yêu lại từ đầu</a>" sau khi mất trí nhớ. Nhưng đây lại tình cờ là cơ hội để họ gạt bỏ những định kiến dành cho nhau, nhìn nhau bằng ánh mắt cảm thông và dễ chịu hơn.</p><p style="margin-left:0px;">Phim cho thấy mối quan hệ nào cũng đều trải qua những thăng trầm, va vấp và tranh cãi.</p><p style="margin-left:0px;">Nhưng điều quan trọng là cả hai người đều chịu nhìn nhận những thiếu sót của bản thân, cùng nhau hoàn thiện và vun đắp tình cảm vốn có.</p><p style="margin-left:0px;">Đội ngũ dịch phụ đề của <i>Yêu lại vợ ngầu</i> mang đến phần Vietsub hài hước, vui nhộn và bắt trend. Yếu tố này góp phần không nhỏ trong việc truyền tải mạch lạc câu chuyện, nhất là với một tác phẩm tập trung vào các mảng miếng đến từ thoại và hành động, thay vì phần nhìn đậm chất điện ảnh.</p><h2 style="margin-left:0px;"><strong>Kang Ha Neul và Jung So Min tái hợp ăn ý trong "Yêu lại vợ ngầu"</strong></h2><p style="margin-left:0px;">Là tác phẩm thứ 2 hợp tác sau&nbsp;<a href="https://tuoitre.vn/tre-trung-voi-tuoi-20-611688.htm">Trai 20 (Twenty- 2015)</a>, Kang Ha Neul và Jung So Min tỏ ra "hợp rơ", tung hứng ăn ý với nhau khi hóa thân thành một cặp vợ chồng gặp mâu thuẫn khi bước vào cuộc sống hôn nhân.</p><p style="margin-left:0px;">Nếu <i>Trai 20</i> là câu chuyện về những người trẻ trong độ tuổi thanh xuân chớm nở, phải đối mặt với những bỡ ngỡ trong tình yêu, những đau đớn, hụt hẫng khi thất bại, để cuối cùng đối mặt với cuộc sống bằng một trái tim mạnh mẽ, thì <i>Yêu lại vợ ngầu </i>mang đến góc nhìn từ lăng kính những người trưởng thành hơn.</p><p><a href="https://cdn.tuoitre.vn/471584752817336320/2023/11/11/yeu-lai-vo-ngau-1-1699670644680711526428.jpg"><img class="image_resized" style="aspect-ratio:1200/675;height:auto;width:730px;" src="https://cdn.tuoitre.vn/thumb_w/730/471584752817336320/2023/11/11/yeu-lai-vo-ngau-1-1699670644680711526428.jpg" alt="Jung So Min và Kang Ha Neul tương tác ăn ý, nhịp nhàng - Ảnh: Soompi" width="1200" height="675"></a></p><p style="margin-left:0px;">Jung So Min và Kang Ha Neul tương tác ăn ý, nhịp nhàng - Ảnh: Soompi</p><p style="margin-left:0px;">Tuy vậy, trưởng thành không có nghĩa là không có nhiều vấn đề trong cuộc sống. Dù đã từng là bạn bè thân thiết, hiểu nhau đến thế nào thì khi trở thành vợ chồng, họ vẫn phải học cách yêu thương nhau lại một lần nữa.</p><p style="margin-left:0px;"><i>Yêu lại vợ ngầu</i> là một tác phẩm chỉn chu, vừa vặn để giải trí. Nhưng phim vẫn có điểm trừ nằm ở những tình tiết đôi khi thừa thãi, không mang đến nhiều ý nghĩa cho câu chuyện, chỉ dừng lại ở mức độ gây cười.</p><p style="margin-left:0px;">Ngoài ra, cách xây dựng nhân vật của Kang Ha Neul và <a href="https://tuoitre.vn/tin-tuc-xem-nghe-dieu-nhi-duoc-mua-hat-phim-han-tram-ti-ra-rap-viet-20231110134749487.htm">Jung So Min</a> thiếu chiều sâu do phần kịch bản tập trung vào sự hài hước. Câu chuyện đầu phim diễn ra đột ngột khiến người xem chưa cảm nhận được tình yêu thắm thiết mà hai nhân vật từng dành cho nhau.</p>', CAST(N'2023-12-15T15:48:35.497' AS DateTime), CAST(N'2024-02-10T15:48:37.497' AS DateTime), N'6b47e322-cca5-4005-815a-9328d68428ab_maxresdefault (5).jpg', 1, 0, N'admin')
INSERT [dbo].[Events] ([id], [name], [description], [start_date], [end_date], [banner], [status], [type_event], [account_id]) VALUES (17, N'''Cô giáo em là số 1'' lên án bạo lực học đường ở Hàn Quốc', N'<p style="margin-left:0px;">Trailer chính thức <a href="https://vietnamnet.vn/giai-tri/phim">phim</a> <i>Cô giáo em là số 1 </i>(tên tiếng Anh:<i> Brave Citizen) </i>vừa được công bố, hé lộ màn so găng gay cấn giữa “cô giáo” Shin Hae Sun và “hổ báo” Lee Jun Young sắp ra rạp cuối tuần này.&nbsp;</p><p style="margin-left:0px;">Dựa trên webtoon nổi tiếng <i>Brave Citizen</i>, phim kể về So Si Min (do Shin Hae-sun thủ vai) - cựu ngôi sao quyền Anh phải từ bỏ ước mơ để theo đuổi nghề giáo viên với mong muốn có một cuộc sống ổn định hơn. Nhưng tại trường học, cô phải giả vờ như “mắt không thấy, tai không nghe” những điều bất công xảy ra xung quanh mình để sớm được nhận làm giáo viên chính thức.</p><figure class="image image_resized" style="height:auto;width:760px;"><img style="aspect-ratio:2048/1365;" src="https://static-images.vnncdn.net/files/publish/2023/11/20/404591342-7014590425267394-5004552888323910530-n-900.jpg" alt="404591342 7014590425267394 5004552888323910530 n.jpg" width="2048" height="1365"><figcaption>&nbsp;</figcaption></figure><p style="margin-left:0px;">Tuy nhiên, Han Su Gang (Lee Jun Young) - tên học sinh ''hổ báo'' lạm quyền, lấy bắt nạt, hành hạ kẻ yếu thế làm niềm vui - đã khiến sức chịu đựng của Si Min đi đến giới hạn. Trong một lần giải cứu học sinh khỏi bàn tay hung bạo của Su Gang, cô giáo Si Min bất ngờ trở thành nạn nhân tiếp theo của hắn tại trường học.</p><p style="margin-left:0px;">Khi chứng kiến những tội ác của Su Gang được dung túng bởi gia đình, nhà trường và pháp luật, Si Min đành giấu danh tính đằng sau chiếc mặt nạ mèo để “thay trường hành đạo”.&nbsp;</p><figure class="image image_resized" style="height:auto;width:760px;"><img style="aspect-ratio:2048/1365;" src="https://static-images.vnncdn.net/files/publish/2023/11/20/404551923-7014590455267391-6482123710050409074-n-901.jpg" alt="404551923 7014590455267391 6482123710050409074 n.jpg" width="2048" height="1365"><figcaption>&nbsp;</figcaption></figure><p style="margin-left:0px;">Phim lấy đề tài gai góc về nạn bắt nạt và bóc trần những sự thật tàn bạo chốn học đường tại Hàn Quốc - nơi tưởng chừng chỉ có sự lành mạnh của giáo dục lại tồn đọng những “mầm ác” được gieo rắc và hình thành. Không chỉ mượn bạo lực học đường làm chất liệu chính, phim còn khéo léo đề cập những vấn nạn nhức nhối khác như sự phân hoá giàu - nghèo, xâm phạm quyền giáo viên và sự “bành trướng” quyền lực của phụ huynh tại trường học.</p><p style="margin-left:0px;">Shin Hae-sun nhấn mạnh: “Phim cho thấy một công dân bình thường đang tìm kiếm công lý chống lại kẻ xấu như thế nào. Và chúng tôi không làm bộ phim với mong muốn giải quyết vấn đề bắt nạt học đường. Thay vì là một bộ phim lên án xã hội, tôi nghĩ rằng đây là một bộ phim giả tưởng mang lại sự hài lòng cho khán giả và gián tiếp khơi dậy lòng dũng cảm mà ai cũng có”.</p><figure class="image image_resized" style="height:auto;width:760px;"><img style="aspect-ratio:1280/853;" src="https://static-images.vnncdn.net/files/publish/2023/11/20/4photo-15-902.jpeg" alt="4photo 15.jpeg" width="1280" height="853"><figcaption>&nbsp;</figcaption></figure><p style="margin-left:0px;">Bên cạnh đó, cái nhìn gai góc và giọng nói đay nghiến của nam diễn viên Lee Jun Young trong vai phản diện Su Gang cũng đã nâng tầm hơn so với các vai phản diện trước đây của anh trong loạt phim đình đám <i>D.P. </i>và <i>Mask Girl</i>. Tuy nhiên, Lee Jun Young cũng bày tỏ sự khó khăn và dằn vặt khi hóa thân thành một “ác nam học đường” với những cảnh bắt nạt tàn bạo trong<i> Cô giáo em là số 1.&nbsp;</i></p><p style="margin-left:0px;">Lee Jun Young chia sẻ: "Tôi đã có rất nhiều sợ hãi và lo lắng khi quay phim này. Tôi chưa bao giờ cảm thấy thoải mái. Tôi phải vật lộn với sự dằn vặt mỗi khi quay cảnh bắt nạt người khác. Tôi liên tục không ổn định và cảm thấy như hôm nay tôi lại làm khổ ai đó. Nó rất đau đớn. Tuy nhiên, sau khi trải qua khoảng thời gian khó khăn và tàn khốc đó, tôi cảm thấy mình đã trưởng thành hơn với tư cách một diễn viên”.&nbsp;</p><figure class="image image_resized" style="height:auto;width:760px;"><img style="aspect-ratio:1280/853;" src="https://static-images.vnncdn.net/files/publish/2023/11/20/404545623-7014590248600745-4738493261023839540-n-903.jpg" alt="404545623 7014590248600745 4738493261023839540 n.jpg" width="1280" height="853"><figcaption>&nbsp;</figcaption></figure><p style="margin-left:0px;">Ngoài ra, phim còn có sự góp mặt của “thượng cung” Cha Chung Hwa trong vai giáo viên cùng trường của Si Min (do Shin Hae Sun thủ vai), điều này càng khiến những khán giả yêu thích phim <i>Chàng Hậu (Mr. Queen) </i>thêm hào hứng trước màn kết hợp lần thứ 3 của cả hai trên màn ảnh. Trước đó, “cặp bài trùng” này từng có màn tái hợp hài hước trong <i>Hẹn gặp anh ở kiếp thứ 19 (See You In My 19th Life).</i></p><p style="margin-left:0px;"><i>Cô giáo em là số 1</i> chính thức khởi chiếu tại Việt Nam từ 24/11/2023.</p>', CAST(N'2023-12-15T15:50:07.290' AS DateTime), CAST(N'2024-03-08T15:50:08.290' AS DateTime), N'6078af57-317e-4a24-8ae0-10bd1e66e568_maxresdefault (8).jpg', 1, 0, N'admin')
SET IDENTITY_INSERT [dbo].[Events] OFF
GO
SET IDENTITY_INSERT [dbo].[Price_Services] ON 

INSERT [dbo].[Price_Services] ([id], [price], [start_date], [end_date], [service_id]) VALUES (1, 50000, CAST(N'2023-12-05T00:00:00.000' AS DateTime), CAST(N'2023-12-29T00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Price_Services] ([id], [price], [start_date], [end_date], [service_id]) VALUES (2, 100000, CAST(N'2023-10-05T00:00:00.000' AS DateTime), CAST(N'2023-12-29T00:00:00.000' AS DateTime), 2)
INSERT [dbo].[Price_Services] ([id], [price], [start_date], [end_date], [service_id]) VALUES (3, 20000, CAST(N'2023-10-05T00:00:00.000' AS DateTime), CAST(N'2023-12-29T00:00:00.000' AS DateTime), 3)
INSERT [dbo].[Price_Services] ([id], [price], [start_date], [end_date], [service_id]) VALUES (4, 5000, CAST(N'2023-10-05T00:00:00.000' AS DateTime), CAST(N'2023-12-29T00:00:00.000' AS DateTime), 4)
INSERT [dbo].[Price_Services] ([id], [price], [start_date], [end_date], [service_id]) VALUES (5, 70000, CAST(N'2023-10-05T00:00:00.000' AS DateTime), CAST(N'2023-12-29T00:00:00.000' AS DateTime), 5)
INSERT [dbo].[Price_Services] ([id], [price], [start_date], [end_date], [service_id]) VALUES (6, 25000, CAST(N'2023-10-05T00:00:00.000' AS DateTime), CAST(N'2023-12-29T00:00:00.000' AS DateTime), 6)
INSERT [dbo].[Price_Services] ([id], [price], [start_date], [end_date], [service_id]) VALUES (7, 150000, CAST(N'2023-10-05T00:00:00.000' AS DateTime), CAST(N'2023-12-29T00:00:00.000' AS DateTime), 7)
SET IDENTITY_INSERT [dbo].[Price_Services] OFF
GO
INSERT [dbo].[Services_Booking] ([booking_id], [service_id], [quantity], [price]) VALUES (N'169119893', 1, 5, 250000)
INSERT [dbo].[Services_Booking] ([booking_id], [service_id], [quantity], [price]) VALUES (N'169119893', 2, 4, 400000)
INSERT [dbo].[Services_Booking] ([booking_id], [service_id], [quantity], [price]) VALUES (N'169119893', 4, 7, 35000)
INSERT [dbo].[Services_Booking] ([booking_id], [service_id], [quantity], [price]) VALUES (N'2659744188', 1, 1, 50000)
INSERT [dbo].[Services_Booking] ([booking_id], [service_id], [quantity], [price]) VALUES (N'2659744188', 2, 2, 200000)
INSERT [dbo].[Services_Booking] ([booking_id], [service_id], [quantity], [price]) VALUES (N'2659744188', 4, 2, 10000)
INSERT [dbo].[Services_Booking] ([booking_id], [service_id], [quantity], [price]) VALUES (N'7425531041', 1, 1, 50000)
INSERT [dbo].[Services_Booking] ([booking_id], [service_id], [quantity], [price]) VALUES (N'7425531041', 2, 1, 100000)
INSERT [dbo].[Services_Booking] ([booking_id], [service_id], [quantity], [price]) VALUES (N'7425531041', 4, 2, 10000)
GO
INSERT [dbo].[Payment_Info] ([transaction_id], [tmn_code], [booking_id], [amount], [pay_date], [order_info], [bank_code], [transaction_status]) VALUES (N'14241765', N'TT7GVXVQ', N'169119893', 955000, CAST(N'2023-12-14T11:42:21.000' AS DateTime), N'Thanh toan ve xem phim ', N'NCB', N'00')
INSERT [dbo].[Payment_Info] ([transaction_id], [tmn_code], [booking_id], [amount], [pay_date], [order_info], [bank_code], [transaction_status]) VALUES (N'14244842', N'TT7GVXVQ', N'7425531041', 430000, CAST(N'2023-12-15T21:05:02.000' AS DateTime), N'Thanh toan ve xem phim ', N'NCB', N'00')
INSERT [dbo].[Payment_Info] ([transaction_id], [tmn_code], [booking_id], [amount], [pay_date], [order_info], [bank_code], [transaction_status]) VALUES (N'14244843', N'TT7GVXVQ', N'2659744188', 530000, CAST(N'2023-12-15T21:05:47.000' AS DateTime), N'Thanh toan ve xem phim ', N'NCB', N'00')
GO

--27 bảng dữ liệu reivew
 SELECT *
FROM [TicketEZ].[dbo].[Reviews]
WHERE [movie_id] = 1;

  INSERT INTO [TicketEZ].[dbo].[Reviews] ([comment], [rating], [create_date], [edit_date], [account_id], [movie_id], [status])
VALUES 
(N'Màu phim thì đánh giá cao đẹp, sắc nét, nhân vật nhập tâm. Vui có, hài có, sợ có, một chút hồi hộp.
Tuy nhiên chưa toát vẻ cổ xưa phong kiến lắm, xuyên suốt phim tình tiết chưa logic khúc cần làm rõ thì làm khá nhanh, so với nhịp phim khúc đầu khá chậm. Mình bị tụt mood khúc Nhân bị bắt trong rừng, quá dễ dàng và từ đó đến hết phim mọi chuyện giải quyết khá nhanh chóng và không được thuyết trình phục. 
Để coi thì cũng ok á, nhưng mà coi xong mình bị tụt mood :((( chả hỉu sao luô', 5, '2023-01-24 09:30:00', NULL, N'user2', 1, 0),
(N'Nói thật trước khi đi xem tôi cũng nghe rất nhiều luồng ý kiến về bộ phim cả khen lẫn chê. Nhưng khi xem xong tôi cảm giác bộ phim rất có chiều sâu. Yếu tố văn hoá, thiên nhiên cảm giác rất đã mắt. Bộ phim khai thác về bối cảnh phong kiến rất hà khắc với phụ nữ. Phim có cảnh nóng được diễn khá thật nên nếu ai không thích không khuyến khích xem. Ngoài ra nó cũng gợi đến tình mẫu tử giữa mợ Ba và bé Đông Nhi. Thú thật thì tôi xem cũng ấm ức theo mẹ nào chẳng thương con mợ ba đã chịu đựng quá nhiều 6,7 năm trời nhưng khi bà Cả đem con mình ra quỳ nguyên đêm. Là tôi khéo tôi đào mả cả nhà quan còn được. Hành mình đã đành con mình một đứa bé 6 tuổi nó biết gì hành nó. Ngoài ra thì phim cũng cho tôi khá nhiều cảm xúc vì xem phim nhưng cảm giác như thật. Duy nhất có điểm trừ là giọng nữ chính hơi trẻ con thật. Một vài phân cảnh lặp lại khiến phim dễ bị nhàm. Còn lại thì phim này vẫn đáng trải nghiệm nó đọng lại khá nhiều giá trị. Nếu mọi người xem hãy nhìn và cảm nhận sâu đừng chỉ tập trung yếu tố ngoài lề', 5, '2023-02-14 09:30:00', NULL, N'user3', 1, 0),
(N'Hình ảnh đã mắt , cũng có vài miếng hài khá hay=)), sự kết hợp của 3 cô gái là một sự hoàn hảo....', 5, '2023-03-04 09:30:00', NULL, N'user3', 1, 0),
(N'lâu lắm k đi coi phim vì chọn mãi không thấy bộ nào thích. rồi thấy có phim này đi coi thử mà cười banh cả hàm luôn á kkkkk', 5, '2023-04-22 09:30:00', NULL, N'user5', 1, 0),
(N'Em khóc nhiều khi xem phim này.em cảm thấy em rất may mắn khi có mẹ ở bên.khi quen người yêu.lúc trẻ con cãi nhau.mẹ là người khuyên rằng con phải thật bình tĩnh.thấu hiểu.em và người yêu đi xem.2 đứa nhìn nhau và nói với nhau rằng.thật cảm ơn vì 2 đứa đã kịp hiểu nhau thấu hiểu nhau.để vẫn còn hạnh phúc ở bên nhau', 5, '2023-05-28 09:30:00', NULL, N'user4', 1, 0),
(N'phim đối với mình chưa đặc sắc lắm, ko xúc động như mng review. Nữ 9 diễn tạm ổn, mẹ n9 thì mặt diễn hơi đơ. Các vai diễn khác cũng tạm. Kịch bản chấp nhận được . Âm thanh hơi ồn. Tóm lại mình hài lòng so với mặt bằng phim việt nói chung.', 5, '2023-05-30 09:30:00', NULL, N'user2', 1, 0),
(N'Hay đấy', 5, '2023-06-11 09:30:00', NULL, N'user6', 1, 1),
(N'Trên cả tuyệt vời', 5, '2023-06-13 09:30:00', NULL, N'user4', 1, 0),
(N'Tôi không thích bộ này cho lắm chắc gu phim của thôi không phải loại này', 5, '2023-06-14 09:30:00', NULL, N'user5', 1, 1),
(N'Màu phim thì đánh giá cao đẹp, sắc nét, nhân vật nhập tâm. Vui có, hài có, sợ có, một chút hồi hộp.
Tuy nhiên chưa toát vẻ cổ xưa phong kiến lắm, xuyên suốt phim tình tiết chưa logic khúc cần làm rõ thì làm khá nhanh, so với nhịp phim khúc đầu khá chậm. Mình bị tụt mood khúc Nhân bị bắt trong rừng, quá dễ dàng và từ đó đến hết phim mọi chuyện giải quyết khá nhanh chóng và không được thuyết trình phục. 
Để coi thì cũng ok á, nhưng mà coi xong mình bị tụt mood :((( chả hỉu sao luô', 5, '2023-01-24 09:30:00', NULL, N'user2', 2, 0),
(N'Nói thật trước khi đi xem tôi cũng nghe rất nhiều luồng ý kiến về bộ phim cả khen lẫn chê. Nhưng khi xem xong tôi cảm giác bộ phim rất có chiều sâu. Yếu tố văn hoá, thiên nhiên cảm giác rất đã mắt. Bộ phim khai thác về bối cảnh phong kiến rất hà khắc với phụ nữ. Phim có cảnh nóng được diễn khá thật nên nếu ai không thích không khuyến khích xem. Ngoài ra nó cũng gợi đến tình mẫu tử giữa mợ Ba và bé Đông Nhi. Thú thật thì tôi xem cũng ấm ức theo mẹ nào chẳng thương con mợ ba đã chịu đựng quá nhiều 6,7 năm trời nhưng khi bà Cả đem con mình ra quỳ nguyên đêm. Là tôi khéo tôi đào mả cả nhà quan còn được. Hành mình đã đành con mình một đứa bé 6 tuổi nó biết gì hành nó. Ngoài ra thì phim cũng cho tôi khá nhiều cảm xúc vì xem phim nhưng cảm giác như thật. Duy nhất có điểm trừ là giọng nữ chính hơi trẻ con thật. Một vài phân cảnh lặp lại khiến phim dễ bị nhàm. Còn lại thì phim này vẫn đáng trải nghiệm nó đọng lại khá nhiều giá trị. Nếu mọi người xem hãy nhìn và cảm nhận sâu đừng chỉ tập trung yếu tố ngoài lề', 5, '2023-02-14 09:30:00', NULL, N'user3', 2, 0),
(N'Hình ảnh đã mắt , cũng có vài miếng hài khá hay=)), sự kết hợp của 3 cô gái là một sự hoàn hảo....', 5, '2023-03-04 09:30:00', NULL, N'user4', 2, 1),
(N'lâu lắm k đi coi phim vì chọn mãi không thấy bộ nào thích. rồi thấy có phim này đi coi thử mà cười banh cả hàm luôn á kkkkk', 5, '2023-04-22 09:30:00', NULL, N'user5', 2, 1),
(N'Em khóc nhiều khi xem phim này.em cảm thấy em rất may mắn khi có mẹ ở bên.khi quen người yêu.lúc trẻ con cãi nhau.mẹ là người khuyên rằng con phải thật bình tĩnh.thấu hiểu.em và người yêu đi xem.2 đứa nhìn nhau và nói với nhau rằng.thật cảm ơn vì 2 đứa đã kịp hiểu nhau thấu hiểu nhau.để vẫn còn hạnh phúc ở bên nhau', 5, '2023-05-28 09:30:00', NULL, N'user4', 2, 0),
(N'phim đối với mình chưa đặc sắc lắm, ko xúc động như mng review. Nữ 9 diễn tạm ổn, mẹ n9 thì mặt diễn hơi đơ. Các vai diễn khác cũng tạm. Kịch bản chấp nhận được . Âm thanh hơi ồn. Tóm lại mình hài lòng so với mặt bằng phim việt nói chung.', 5, '2023-05-30 09:30:00', NULL, N'user6', 2, 1),
(N'Hay đấy', 5, '2023-06-11 09:30:00', NULL, N'user2', 2, 0),
(N'Trên cả tuyệt vời', 5, '2023-06-13 09:30:00', NULL, N'user3', 2, 0),
(N'Tôi không thích bộ này cho lắm chắc gu phim của thôi không phải loại này', 5, '2023-06-14 09:30:00', NULL, N'user2', 2, 0);




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