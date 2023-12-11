import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Col, Row, DatePicker, Button } from 'antd';
import axiosClient from '~/api/global/axiosClient';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';

const { RangePicker } = DatePicker;

const AdminTicketStatistics = () => {
    const [bookingDataDTO, setBookingDataDTO] = useState([]);
    const [series, setSeries] = useState([]);
    const [labels, setLabels] = useState([]);
    const [options, setOptions] = useState({
        chart: {
            type: 'donut',
        },
        labels: labels,
    });

    const fetchDatabookingDataDTO = async () => {
        try {
            const res = await axiosClient.get(`cinemaChain/cinemaChainBookingDTO`);
            setBookingDataDTO(res.data);
        } catch (error) {
            console.error('Error fetching booking data:', error);
        }
    };

    const getBestMovie = (idCinemaChain) => {
        const movieBookingCount = {};
        // Lặp qua mảng bookingDataDTO và cập nhật số lượng đặt vé cho từng bộ phim
        bookingDataDTO.forEach((bookingData) => {
            if (idCinemaChain === bookingData.cinemaChain.id) {
                if (bookingData.bookings) {
                    bookingData.bookings.forEach((booking) => {
                        const movieId = booking.showtime.formatMovie.movie.id;

                        if (movieBookingCount[movieId]) {
                            movieBookingCount[movieId]++;
                        } else {
                            movieBookingCount[movieId] = 1;
                        }
                    });
                }
            }
        });

        if (Object.keys(movieBookingCount).length === 0) {
            return;
        }
        // Tìm bộ phim có lượt đặt vé nhiều nhất
        const mostBookedMovieId = Object.keys(movieBookingCount).reduce((a, b) =>
            movieBookingCount[a] > movieBookingCount[b] ? a : b,
        );

        // Tìm thông tin của bộ phim có lượt đặt vé nhiều nhất
        const mostBookedMovie = bookingDataDTO.reduce((acc, bookingData) => {
            if (bookingData.bookings) {
                const movie = bookingData.bookings.find(
                    (booking) => booking.showtime.formatMovie.movie.id === parseInt(mostBookedMovieId, 10),
                );

                if (movie && (!acc || movie.createDate > acc.createDate)) {
                    return movie;
                }
            }

            return acc;
        }, null);

        console.log('Bộ phim có lượt đặt vé nhiều nhất:', mostBookedMovie?.showtime.formatMovie.movie.title);
        return mostBookedMovie?.showtime.formatMovie.movie.title;
    };

    useEffect(() => {
        fetchDatabookingDataDTO();
    }, []);

    useEffect(() => {
        const newLabels = bookingDataDTO.map((data) => data.cinemaChain.name);
        const newSeries = bookingDataDTO.map((data) => (data.bookings ? data.bookings.length : 0));

        setLabels(newLabels);
        setSeries(newSeries);
        setOptions({
            chart: {
                type: 'donut',
            },
            labels: newLabels ,
        });
    }, [bookingDataDTO]);

    return (
        <>
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={12}></Col>
                        <Col span={12}>
                            <RangePicker />
                        </Col>
                    </Row>
                </Col>
                <Col span={16}>
                    <BaseTable
                        columns={[
                            {
                                title: 'Tên chuỗi rạp',
                                render: (_, record) => record.cinemaChain.name,
                            },
                            {
                                title: 'Số lượng vé bán',
                                render: (_, record) => (record.bookings ? record.bookings.length : 0),
                            },
                            {
                                title: 'Phim có số vé cao nhất',
                                render: (_, record) => getBestMovie( record.cinemaChain.id),
                            },
                        ]}
                        dataSource={bookingDataDTO.map((post) => ({
                            ...post,
                            key: post.cinemaChain.id,
                        }))}
                    />
                </Col>
                <Col span={8}>
                    {bookingDataDTO.length > 0 && (
                        <div className="donut">
                            <Chart options={options} series={series} type="donut" width="380" />
                        </div>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default AdminTicketStatistics;
