package com.ticketez_backend_springboot.modules.account;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
// 
import com.ticketez_backend_springboot.dto.AccountDTO;
import com.ticketez_backend_springboot.dto.TotalDashboardAdmin;
import com.ticketez_backend_springboot.modules.movie.Movie;

public interface AccountDAO extends JpaRepository<Account, String> {
        // WHERE a.role = 0 ORDER BY a.active DESC
        // @Query("SELECT new com.ticketez_backend_springboot.dto.AccountDTO( a.phone,
        // a.fullname, a.email, a.birthday, a.gender, a.image, a.role, a.verified) FROM
        // Account a "
        // +"WHERE a.role = false AND a.active = :active AND a.fullname like CONCAT('%',
        // :search, '%') ORDER BY a.active DESC")
        // Page<AccountDTO> getAllRoleUserAndActive(Pageable pageable, @Param("active")
        // Boolean active, @Param("search") String search);

        @Query("SELECT new com.ticketez_backend_springboot.dto.AccountDTO( a.id, a.phone, a.fullname, a.email, a.birthday, a.gender, a.image, a.status, a.address, a.verified) "
                        + "FROM Account a JOIN a.accountRoles ar "
                        + "WHERE ar.role.id = 2 AND a.fullname like CONCAT('%', :search, '%') AND a.status = :status  ORDER BY a.createdDate DESC")
        Page<AccountDTO> getAllRoleUserAndActive(Pageable pageable, @Param("status") Integer status,
                        @Param("search") String search);

        // List<Account> findAllByOrderByPhoneDesc ();
        List<Account> findAllByOrderByCreatedDateDesc();

        @Query("SELECT new com.ticketez_backend_springboot.dto.TotalDashboardAdmin ( " +
                        " COUNT(a.id) as total_user )" +
                        " FROM Account a " +
                        " JOIN " +
                        " AccountRole ar on ar.account.id = a.id" +
                        " WHERE ar.role.id = 2")
        List<TotalDashboardAdmin> getTotalUser();

        @Query(value = "WITH GenreRank AS (\r\n" + //
                        "    SELECT\r\n" + //
                        "        a.id 'userId',\r\n" + //
                        "        g.name AS'theloai',\r\n" + //
                        "\t\tm.id AS 'phim',\r\n" + //
                        "        COUNT(g.name) AS 'sl',\r\n" + //
                        "        RANK() OVER (PARTITION BY a.id ORDER BY COUNT(g.name) DESC) AS rnk,\r\n" + //
                        "\t\t ROW_NUMBER() OVER (PARTITION BY a.id ORDER BY COUNT(g.name) DESC) AS row_num_within_user\r\n" + //
                        "    FROM\r\n" + //
                        "        dbo.Accounts a\r\n" + //
                        "        INNER JOIN dbo.Booking b ON b.account_id = a.id\r\n" + //
                        "        INNER JOIN dbo.Showtimes st ON st.id = b.showtime_id\r\n" + //
                        "        INNER JOIN dbo.Formats_Movies fm ON fm.id = st.format_movie_id\r\n" + //
                        "        INNER JOIN dbo.Movies m ON m.id = fm.movie_id\r\n" + //
                        "        INNER JOIN dbo.Genres_Movies gm ON gm.movie_id = m.id\r\n" + //
                        "        INNER JOIN dbo.Genres g ON g.id = gm.genre_id\r\n" + //
                        "    GROUP BY\r\n" + //
                        "        a.id,\r\n" + //
                        "        g.name,\r\n" + //
                        "\t\tm.id\r\n" + //
                        ")\r\n" + //
                        "SELECT * FROM dbo.Accounts accounts WHERE EXISTS (\r\n" + //
                        "\t\t\tSELECT gr.userId, gr.theloai, gr.sl, gr.phim\r\n" + //
                        "\t\t\tFROM GenreRank gr\r\n" + //
                        "\t\t\tWHERE accounts.id = gr.userId AND gr.rnk = 1 AND gr.row_num_within_user = 1 AND EXISTS (\r\n" + //
                        "\t\t\t\t\tSELECT * FROM dbo.Genres g INNER JOIN dbo.Genres_Movies gm ON gm.genre_id = g.id\r\n" + //
                        "\t\t\t\t\tINNER JOIN dbo.Movies m ON m.id = gm.movie_id\r\n" + //
                        "\t\t\t\t\tWHERE m.id = :movieId AND gr.theloai = g.name\t\t\r\n" + //
                        "\t\t\t)\r\n" + //
                        ")", nativeQuery = true)
        List<Account> listAccount(@Param("movieId") Long movieId);

}
