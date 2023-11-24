import React, { useState, useEffect } from 'react';
import { Button, Modal, Divider, Space, Tag, Radio, Col, Row, Card } from 'antd';
import classNames from 'classnames/bind';
import style from '~/pages/Admin/Seat/SeatChart/SearChart.module.scss';
import '../SeatChart/chart.scss';
import axiosClient from '~/api/global/axiosClient';
import { ShoppingOutlined } from '@ant-design/icons';
import funcUtils from '~/utils/funcUtils';
import { BookingDetail } from '../..';
import { sassFalse } from 'sass';

const cx = classNames.bind(style);
function SeatChart(props) {
    const { showtime } = props;

    const [isModalOpenBooking, setIsModalOpenBooking] = useState(false);
    const showModal = () => {
        setIsModalOpenBooking(true);
    };
    const handleOk = () => {
        setIsModalOpenBooking(false);
    };
    const handleCancel = () => {
        console.log(seatChoose);
        deleteSeatChoose();
        setIsModalOpenBooking(false);
    };
    const createSeatArray = () => {
        console.log(allSeats);
        let seatRows = showtime.seatChart.rows; // Số hàng
        let seatColumns = showtime.seatChart.columns; // Số cột

        const rowLabels = Array.from({ length: seatRows }, (_, index) => String.fromCharCode(65 + index));
        const seatState = {
            seat: [],
            way: listWay,
            seatAvailable: [],
            seatReserved: [],
            coupleSeat: listSeatCouple,
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
    const [listSeatCouple, setListSeatcouple] = useState([]);
    const [allSeatsLocal, setAllSeatsLocal] = useState([]);
    const [seatState, setSeatState] = useState();
    const [selectedSeatType, setSelectedSeatType] = useState('normal-seat');
    const [seatBookingData, setSeatBookingData] = useState([]);
    const [prices, setPrices] = useState([]);

    const fetchDataSeatBooking = async () => {
        try {
            const resp = await axiosClient.get(
                `seat-choose/find-seat-choose-by-seat-char-id-and-showtime-id/${showtime.seatChart.id}/${showtime.id}`,
            );
            const data = resp.data;
            if (data.length <= 0) {
                setSeatBookingData([]);
            }
            // console.log(data);
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
        }, 1000);

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
            const respAll = await axiosClient.get(`seat/by-seatchart/${showtime.seatChart.id}`);
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

            const respCouple = await axiosClient.get(`seat/by-seatchart-and-seattype/${showtime.seatChart.id}/${4}`);
            const newCoupleSeats = respCouple.data.map((seat) => seat.name);
            setListSeatcouple((prevState) => {
                for (const newSeat of newCoupleSeats) {
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

            const respPrice = await axiosClient.get(
                `price/findByCinemaComplexIdAndMovieId/${showtime.cinema.cinemaComplex.id}/${showtime.formatMovie.movie.id}`,
            );
            const newPrices = respPrice.data.map((price) => price);
            setPrices(newPrices);

            console.log(newPrices);
            // console.log(listSeatNormal);
            // console.log(listSeatVip);
            // console.log(allSeats);
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

    useEffect(() => {
        fetchDataSeat();
    }, [reload]);

    const [showInfo, setShowInfo] = useState('');
    useEffect(() => {
        if (showInfo === 'success') {
            funcUtils.notify('Sửa thành công dữ liệu trong bảng', 'success');
        }
        if (showInfo === 'error') {
            funcUtils.notify('Sửa thành công dữ liệu trong bảng', 'error');
        }
    }, [showInfo]);

    // Lấy price từ ghế
    const findPriceBySeatType = (seatStateArray, seat, seatTypeId) => {
        let result = null;
        let finalRS = null;
        seatStateArray.forEach((seatItem) => {
            if (seatItem === seat) {
                const price = prices.find((price) => {
                    return price.newPriceSeatTypeDTOs.some((seatType) => seatType.seatTypeId === seatTypeId);
                });

                if (price) {
                    result = price.newPriceSeatTypeDTOs;
                    result.map((newPriceSeatTypeDTO, index) => {
                        console.log(newPriceSeatTypeDTO);
                        if (newPriceSeatTypeDTO.seatTypeId === seatTypeId) {
                            finalRS = newPriceSeatTypeDTO;
                        }
                    });
                }
            }
        });

        return finalRS;
    };

    // Check giá theo ngày
    const moment = require('moment');

    const getSeatPrice = (priceOneSeat) => {
        const currentDate = moment();
        const dayOfWeek = currentDate.day();

        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            return priceOneSeat.weekdayPrice;
        } else if (dayOfWeek === 6 || dayOfWeek === 0) {
            return priceOneSeat.weekendPrice;
        } else {
            return null;
        }
    };

    const [priceSeats, setPriceSeats] = useState(0);
    const onClickData = async (seat) => {
        const { seatReserved, seatAvailable, vipSeat, normalSeat, seatUnavailable } = seatState;

        let normal = findPriceBySeatType(seatState.normalSeat, seat, 1);
        let vip = findPriceBySeatType(seatState.vipSeat, seat, 2);

        const priceOneSeat = normal ? normal : vip;

        console.log(priceOneSeat);
        const seatPrices = getSeatPrice(priceOneSeat);

        if (seatReserved.indexOf(seat) > -1) {
            removeDataFromDuplicateSeatByName(seat);

            seatReserved.splice(seatReserved.indexOf(seat), 1);
            // Trừ tiền
            setPriceSeats(priceSeats - seatPrices);
        } else {
            if (seatReserved.length >= 8) {
                alert('Quý khách chỉ có thể chọn tối đa 8 ghế 1 lần.');
                return;
            }
            setSeatState({
                ...seatState,
                seatReserved: [...seatReserved, seat],
            });
            // Cộng tiền
            setPriceSeats(priceSeats + seatPrices);
        }
    };

    // Lọc ghế trùng
    const [duplicateSeat, setDuplicateSeat] = useState([]);
    const [seatBooking, setSeatBooking] = useState([]);
    const fetchData = async () => {
        try {
            if (!seatState || !seatState.seatReserved || seatState.seatReserved.length === 0) {
                throw new Error('No seats are reserved.');
            }

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

            // Kiểm tra xem uniqueData có dữ liệu mới hay không trước khi cập nhật state
            if (uniqueData.length > 0) {
                setDuplicateSeat((prev) => {
                    const newSeatIds = new Set(uniqueData.map((seat) => seat.id));
                    const updatedPrev = prev.filter((prevSeat) => !newSeatIds.has(prevSeat.id));
                    return [...updatedPrev, ...uniqueData];
                });
            }
        } catch (error) {
            // Xử lý lỗi khi không có ghế nào được đặt
            console.error(error.message);
        }
    };

    const removeDataFromDuplicateSeatByName = (seatNamesToRemove) => {
        setDuplicateSeat((prev) => {
            const updatedPrev = prev.filter((prevSeat) => {
                const shouldKeep = !seatNamesToRemove.includes(prevSeat.name);
                return shouldKeep;
            });

            return updatedPrev;
        });
    };

    useEffect(() => {
        fetchData();
    }, [seatState ? seatState.seatReserved : null]);

    const [seatChoose, setSeatChoose] = useState([]);
    const onCreateDaTaSeatChoose = async () => {
        try {
            console.log(duplicateSeat);
            setSeatBooking(duplicateSeat);
            const currentTime = new Date();
            const vietnamTimezoneOffset = 7 * 60;
            // Chuyển múi giờ hiện tại thành múi giờ Việt Nam
            currentTime.setMinutes(currentTime.getMinutes() + vietnamTimezoneOffset);
            const formattedTime = currentTime.toISOString();
            const data = duplicateSeat.map((s) => ({
                lastSelectedTime: formattedTime,
                seat: s,
                showtime: showtime,
            }));
            await Promise.all([]);
            try {
                const resp = await axiosClient.post(`seat-choose`, data);
                setSeatChoose(resp.data);
                console.log(data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu từ server', error);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu từ server', error);
        }
    };

    const deleteSeatChoose = async () => {
        const resp = await axiosClient.post(`seat-choose/deleteMultiple`, seatChoose);
    };

    useEffect(() => {
        fetchDataSeat();
    }, [reload]);

    const handleButtonClick = () => {
        onCreateDaTaSeatChoose();
        showModal();
    };

    const deleteSeat = () => {
        // setSeatState({ seatReserved: [] });
        setDuplicateSeat([]);
        setSeatState({
            ...seatState,
            seatReserved: [],
        });
        setPriceSeats(0);
    };

    // Lấy thời gian bắt đầu phim--------------------------------------------------
    const startDate = new Date(showtime.startTime);
    const startHour = startDate.getHours();
    const startMinute = startDate.getMinutes();
    const startSecond = startDate.getSeconds();
    const formattedStartTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
    // Lấy thời gian kết thúc phim
    const endDate = new Date(showtime.endTime);
    const endHour = endDate.getHours();
    const endMinute = endDate.getMinutes();
    const endSecond = endDate.getSeconds();
    const formattedEndTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

    // Lấy ngày hiện tại
    const currentDate = new Date();

    // Lấy ngày và tháng từ đối tượng ngày
    const dayOfMonth = startDate.getDate();
    const month = startDate.getMonth() + 1;

    const isToday =
        startDate.getDate() === currentDate.getDate() &&
        startDate.getMonth() === currentDate.getMonth() &&
        startDate.getFullYear() === currentDate.getFullYear();
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
                          : seatState.coupleSeat.indexOf(seat_no) > -1
                          ? 'couple-seat'
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

                <Row gutter={50} className="tw-bg-white">
                    <Col span={24}>
                        <div className="tw-mt-6">
                            <b className="tw-text-3xl tw-line-clamp-1 tw-md:line-clamp-none">
                                {showtime.formatMovie.movie.title}
                            </b>
                        </div>
                        <div className="tw-mb-4">
                            <span className="tw-block tw-text-tiny tw-text-orange-500 tw-lg:text-sm">
                                {formattedStartTime} ~ {formattedEndTime} {isToday ? 'Hôm nay' : null}, {dayOfMonth}/
                                {month} · {showtime.formatMovie.movie.title} · {showtime.formatMovie.format.name}
                            </span>
                        </div>
                        <hr />
                        <div className="tw-opacity-90"></div>
                    </Col>
                    <Col span={24}>
                        <div className="tw-mt-3 tw-mb-3">
                            <div className="tw-flex tw-items-center tw-justify-between tw-space-x-3 tw-py-1.5">
                                <span className="tw-shrink-0 tw-text-gray-500">Chỗ ngồi</span>
                                {seatState && seatState.seatReserved && (
                                    <div
                                        style={{ border: '1px solid' }}
                                        className="tw-flex tw-flex-wrap tw-flex tw-items-center tw-space-x-2 tw-rounded-lg tw-border tw-border-gray-200 tw-px-3 tw-py-1"
                                    >
                                        {seatState.seatReserved.map((isReserved, index, array) => (
                                            <React.Fragment key={index}>
                                                <div>
                                                    <span>{isReserved}</span>
                                                </div>
                                                {index < array.length - 1 && ','}
                                            </React.Fragment>
                                        ))}

                                        <svg
                                            onClick={deleteSeat}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="rgb(239 68 68)"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                            className="tw-h-6 tw-shrink-0 tw-cursor-pointer tw-text-white tw-transition-all tw-hover:opacity-70"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                        <hr />
                    </Col>
                    <Col span={24}>
                        <div className="tw-flex-1 tw-mt-3">
                            <span className="tw-block tw-text-gray-500 tw-text-2xl tw-mb-2 ">Tạm tính</span>
                            <b className="tw-text-2xl tw-mt-5">{priceSeats}đ</b>
                        </div>
                    </Col>
                    <Col span={120}>
                        <div className="tw-mt-12 tw-mb-6">
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
                                <Tag className={cx('tagg')} color="#d82d8b">
                                    Ghế đôi
                                </Tag>
                            </Space>
                            {/* <Button
                                style={{
                                    width: '140px',
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
                            </Button> */}
                        </div>
                    </Col>

                    <Col span={24}>
                        <hr></hr>
                        <Row>
                            <Col span={15}></Col>
                            <Col span={9}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="tw-mt-6">
                                    <Button
                                        style={{
                                            width: '150px',
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
                    </Col>
                </Row>
            </Card>
            <BookingDetail
                showtime={showtime}
                seatBooking={seatBooking}
                seat={seatState ? seatState.seatReserved : null}
                open={isModalOpenBooking}
                onCancel={handleCancel}
            />
            {/* )} */}
        </>
    );
}

export default SeatChart;
