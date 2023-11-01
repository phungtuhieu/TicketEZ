import React, { useState, useEffect } from 'react';
import { Button, Modal, Divider, Space, Tag, Radio, Col, Row, Card } from 'antd';
import classNames from 'classnames/bind';
import style from '~/pages/Admin/Seat/SeatChart/SearChart.module.scss';
import '../SeatChart/chart.scss';
import axiosClient from '~/api/global/axiosClient';
import { ShoppingOutlined } from '@ant-design/icons';
import funcUtils from '~/utils/funcUtils';
import { BookingDetail } from '../..';

const cx = classNames.bind(style);
function SeatChart(props) {
    const { showtime } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const createSeatArray = () => {
        console.log('222222222222222222222222222222222222222222222222');
        console.log(showtime);
        let seatRows = showtime.seatChart.rows; // Số hàng
        let seatColumns = showtime.seatChart.columns; // Số cột
        // Tạo mảng chú thích hàng ở bên trái dựa vào số hàng
        const rowLabels = Array.from({ length: seatRows }, (_, index) => String.fromCharCode(65 + index));
        const seatState = {
            seat: [],
            way: ['A2'],
            seatAvailable: [],
            seatReserved: [],
            vipSeat: listSeatVip,
            normalSeat: listSeatNormal,
            seatUnavailable: seatBookingData,
        };
        // Tạo mảng chỗ ngồi
        const rowHeader = rowLabels.map((label) => label + ' ');
        var mangHaiChieu = new Array(seatRows);
        for (var i = 0; i < seatRows; i++) {
            mangHaiChieu[i] = new Array(seatColumns);
        }

        var index = 0;
        for (var i = 0; i < seatRows; i++) {
            for (var j = 0; j < seatColumns; j++) {
                if (index < allSeats.length) {
                    mangHaiChieu[i][j] = allSeats[index];
                    index++;
                }
            }
        }
        for (var i = 0; i < seatRows; i++) {
            const row = [];
            const rowAvailable = [];
            const rowLabel = rowLabels[i];
            for (let j = 0; j < seatColumns; j++) {
                const seatNumber = `${mangHaiChieu[i][j].name}`;
                row.push(seatNumber);
            }
            seatState.seat.push(row);
        }

        // for (let i = 0; i < seatRows; i++) {
        //     const row = [];
        //     const rowAvailable = [];
        //     const rowLabel = rowLabels[i];
        //     for (let j = 1; j <= seatColumns; j++) {
        //         const seatNumber = `${rowLabel}${j}`;
        //         row.push(seatNumber);
        //     }

        //     seatState.seat.push(row);
        // }

        // Thêm cột chú thích hàng ở bên trái
        seatState.seatHeader = rowHeader;

        return seatState;
    };

    const [showSeat, setShowSeat] = useState(false);
    const [reload, setReload] = useState(false);
    const [listSeatNormal, setListSeatNormal] = useState([]);
    const [listSeatVip, setListSeatVip] = useState([]);
    const [allSeats, setAllSeats] = useState([]);
    const [listWay, setListWay] = useState([]);
    const [allSeatsLocal, setAllSeatsLocal] = useState([]);
    const [seatState, setSeatState] = useState();
    const [selectedSeatType, setSelectedSeatType] = useState('normal-seat');
    const [seatBookingData, setSeatBookingData] = useState([]);

    const fetchDataSeatBooking = async () => {
        try {
            const resp = await axiosClient.get(`seat-choose/find-seat-choose-by-seat-char-id/${showtime.seatChart.id}`);
            const data = resp.data;
            if (data.length <= 0) {
                setSeatBookingData([]);
            }
            console.log(data);
            data.forEach((newItem) => {
                // Kiểm tra xem newItem đã tồn tại trong mảng hay chưa
                if (!seatBookingData.includes(newItem)) {
                    // Nếu chưa tồn tại, thì thêm vào mảng
                    setSeatBookingData((prev) => [...prev, newItem]);
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchDataInterval = setInterval(() => {
            fetchDataSeatBooking();
        }, 5000);

        // Để ngăn fetchDataSeatBooking chạy ngay khi component bị unmounted
        return () => {
            clearInterval(fetchDataInterval);
        };
    }, []);

    useEffect(() => {
        if (allSeats.length > 0 && seatBookingData.length > 0 && !seatState.seatReserved.length > 0) {
            setSeatState(createSeatArray());
            console.log('useEffect reload createSeatArray run');
        }
    }, [seatBookingData]);

    const fetchDataSeat = async () => {
        try {
            const respAll = await axiosClient.get(`seat/getAll`);
            setAllSeats(respAll.data);
            const respVip = await axiosClient.get(`seat/by-seatchart-and-seattype/${showtime.seatChart.id}/${2}`);
            const newVipSeats = respVip.data.map((seat) => seat.name);
            setListSeatVip((prevState) => {
                for (const newSeat of newVipSeats) {
                    if (!prevState.includes(newSeat)) {
                        prevState.push(newSeat);
                    }
                }
                return prevState;
            });

            const respNormal = await axiosClient.get(`seat/by-seatchart-and-seattype/${showtime.seatChart.id}/${1}`);
            const newNormalSeats = respNormal.data.map((seat) => seat.name);
            setListSeatNormal((prevState) => {
                for (const newSeat of newNormalSeats) {
                    if (!prevState.includes(newSeat)) {
                        prevState.push(newSeat);
                    }
                }
                return prevState;
            });

            const respWay = await axiosClient.get(`seat/by-seatchart-and-seattype/${showtime.seatChart.id}/${7}`);
            const newWay = respWay.data.map((seat) => seat.name);
            setListWay((prevState) => {
                for (const newSeat of newWay) {
                    if (!prevState.includes(newSeat)) {
                        prevState.push(newSeat);
                    }
                }
                return prevState;
            });

            console.log(listWay);
            console.log(listSeatNormal);
            console.log(listSeatVip);
            console.log(allSeats);
            if (seatBookingData.length > 0) {
                setReload(true);
            }
            if (allSeats.length > 0) {
                if (listSeatVip.length > 0 || listSeatNormal.length > 0) {
                    setSeatState(createSeatArray());
                    setShowSeat(true);
                    setReload(false);
                } else {
                    setReload(true);
                }
            } else {
                setReload(true);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const [showInfo, setShowInfo] = useState('');
    useEffect(() => {
        if (showInfo === 'success') {
            funcUtils.notify('Sửa thành công dữ liệu trong bảng', 'success');
        }
        if (showInfo === 'error') {
            funcUtils.notify('Sửa thành công dữ liệu trong bảng', 'error');
        }
    }, [showInfo]);

    const handelUpdate = async (idSeat, dataSeat) => {
        let data = dataSeat;

        const respVip = await axiosClient.put(`seat/${idSeat}`, data);
    };

    const onClickData = async (seat) => {
        const { seatReserved, seatAvailable, vipSeat, normalSeat, seatUnavailable } = seatState;
        while (normalSeat.indexOf(seat) > -1) {
            normalSeat.splice(normalSeat.indexOf(seat), 1);
        }
        while (vipSeat.indexOf(seat) > -1) {
            vipSeat.splice(vipSeat.indexOf(seat), 1);
        }
        while (seatReserved.indexOf(seat) > -1) {
            seatReserved.splice(seatReserved.indexOf(seat), 1);
        }
        setSeatState({
            ...seatState,
            seatReserved: [...seatReserved, seat],
        });
    };
    const [duplicateSeat, setDuplicateSeat] = useState([]);

    const onCreateDaTaSeatChoose = async () => {
        try {
            const responses = await Promise.all(
                seatState.seatReserved.map(async (seat) => {
                    const respSeatChose = await axiosClient.get(
                        `seat/by-seatchart-name/${showtime.seatChart.id}/${seat}`,
                    );
                    return respSeatChose.data;
                }),
            );
            const newData = responses.flatMap((data) => data);
            const uniqueData = [...new Set(newData)];
            setDuplicateSeat((prev) => [...prev, ...uniqueData]);

            console.log(duplicateSeat);

            const currentTime = new Date();
            const vietnamTimezoneOffset = 7 * 60;

            // Chuyển múi giờ hiện tại thành múi giờ Việt Nam
            currentTime.setMinutes(currentTime.getMinutes() + vietnamTimezoneOffset);

            const formattedTime = currentTime.toISOString();
            const data = duplicateSeat.map((s) => ({
                lastSelectedTime: formattedTime,
                seat: s,
            }));
            await Promise.all([
                // Add other asynchronous operations here if needed
            ]);

            try {
                const resp = await axiosClient.post(`seat-choose`, data);
                console.log(data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu từ server', error);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu từ server', error);
        }
    };

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setSelectedSeatType(e.target.value);
    };

    useEffect(() => {
        fetchDataSeat();
    }, [reload]);

    const handleButtonClick = () => {
        onCreateDaTaSeatChoose();
        showModal();
    };

    return (
        <>
            <Card className="card" style={{ display: 'flex' }}>
                <Row className="ca">
                    <Col span={24}>
                        <Row>
                            {' '}
                            <Col span={7}></Col>
                            <Col span={10}>
                                <hr className={cx('screen')} />
                            </Col>
                            <Col span={7}></Col>
                        </Row>
                        <Row>
                            {' '}
                            <Col span={11}></Col>
                            <Col span={2}>
                                <h6 className={cx('screen-title')}>Màn hình</h6>
                            </Col>
                            <Col span={11}></Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <table className="grid">
                            {showSeat && (
                                <tbody>
                                    {seatState.seatHeader.map((header, rowIndex) => (
                                        <tr key={header}>
                                            <td className="header-cell">{header}</td>
                                            {seatState.seat[rowIndex].map((seat_no) => {
                                                const seatClassName = `
                  ${
                      seatState.way.indexOf(seat_no) > -1
                          ? 'way-user'
                          : seatState.seatUnavailable.indexOf(seat_no) > -1
                          ? 'unavailable'
                          : seatState.seatReserved.indexOf(seat_no) > -1
                          ? 'reserved'
                          : seatState.normalSeat.indexOf(seat_no) > -1
                          ? 'normal-seat'
                          : seatState.vipSeat.indexOf(seat_no) > -1
                          ? 'vip-seat'
                          : 'normal-seat'
                  } protected-element`;
                                                return (
                                                    <td
                                                        className={seatClassName}
                                                        key={seat_no}
                                                        onClick={() => onClickData(seat_no)}
                                                    >
                                                        {seat_no}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </Col>
                </Row>

                <Row gutter={50}>
                    <Col span={120}>
                        <div style={{ marginTop: '50px' }}>
                            <Space size={[0, 200]} wrap>
                                <Tag className={cx('tagg')} color="#404040">
                                    Đã đặt
                                </Tag>
                                <Tag className={cx('tagg')} color="#208135">
                                    ghế bạn chọn
                                </Tag>
                                <Tag className={cx('tagg')} color="#b7232b">
                                    Ghế vip
                                </Tag>
                                <Tag className={cx('tagg')} color="#5b2b9f">
                                    Ghế thường
                                </Tag>
                            </Space>
                        </div>
                    </Col>
                    <Col span={100}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', height: '100px' }}>
                            <Button
                                style={{
                                    width: '200px',
                                    height: '70px',
                                    backgroundColor: '#EB2F96',
                                    fontWeight: 'bolder',
                                }}
                                className={cx('btn')}
                                type="primary"
                                onClick={handleButtonClick}
                                icon={<ShoppingOutlined style={{ fontSize: '32px' }} />}
                            >
                                Mua vé
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card>
            <BookingDetail open={isModalOpen} onCancel={handleCancel} />
        </>
    );
}

export default SeatChart;
