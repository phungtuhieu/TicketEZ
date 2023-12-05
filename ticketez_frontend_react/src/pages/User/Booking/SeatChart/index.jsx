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
import img, { listIcon } from '~/assets/img';

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
        const seatState = seatArray.seatType;
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

        seatState.seatHeader = rowHeader;

        return seatState;
    };

    const [showSeat, setShowSeat] = useState(false);
    const [reload, setReload] = useState(false);
    const [allSeats, setAllSeats] = useState([]);
    const [seatState, setSeatState] = useState();
    // SeatChoose
    const [seatBookingData, setSeatBookingData] = useState([]);
    // seatBooking
    const [seatBookingData2, setSeatBookingData2] = useState([]);
    const [prices, setPrices] = useState([]);
    const [seatType, setSeatType] = useState();
    const [seatArray, setSeatArray] = useState({
        seatType: { seat: [] },
    });

    const getDataSeatArray = async () => {
        if (seatType) {
            // Tạo seatType
            const newObj = { ...seatArray };
            const newtest = { ...seatArray };
            // Tạo list ghế
            for (const seatTypeItem of seatType) {
                newObj.seatType[seatTypeItem.nickName] = [];
            }
            for (const seatTypeItem of seatType) {
                for (const seatItem of allSeats) {
                    if (seatTypeItem.id === seatItem.seatType.id) {
                        const respVip = await axiosClient.get(
                            `seat/by-seatchart-and-seattype/${showtime.seatChart.id}/${seatTypeItem.id}`,
                        );
                        const newVipSeats = respVip.data.map((seat) => seat.name);
                        for (const key in newObj.seatType) {
                            if (newObj.seatType.hasOwnProperty(key)) {
                                if (key === seatTypeItem.nickName) {
                                    newObj.seatType[key] = newVipSeats;
                                }
                            }
                        }
                    }
                }
            }
            setSeatArray(newObj);
        }
    };
    const fetchDaTaSeatType = async () => {
        const respAll = await axiosClient.get(`seatType/getAll`);
        setSeatType(respAll.data);
    };

    const fetchDataSeatChoose = async () => {
        try {
            const resp = await axiosClient.get(
                `seat-choose/find-seat-choose-by-seat-char-id-and-showtime-id/${showtime.seatChart.id}/${showtime.id}`,
            );
            const data = resp.data;
            if (data.length <= 0) {
                setSeatBookingData([]);
            }
            data.forEach((newItem) => {
                if (!seatBookingData.includes(newItem)) {
                    setSeatBookingData((prev) => [...prev, newItem]);
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDataSeatBooking = async () => {
        try {
            const resp = await axiosClient.get(
                `seatBooking/find-seat-booking-by-seat-char-id-and-showtime-id/${showtime.seatChart.id}/${showtime.id}`,
            );
            const data = resp.data;
            if (data.length <= 0) {
                setSeatBookingData2([]);
            }
            data.forEach((newItem) => {
                if (!seatBookingData2.includes(newItem)) {
                    setSeatBookingData2((prev) => [...prev, newItem]);
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchDataInterval = setInterval(() => {
            fetchDataSeatChoose();
            fetchDataSeatBooking();
        }, 1000);

        // Để ngăn fetchDataSeatChoose chạy ngay khi component bị unmounted
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

            const respPrice = await axiosClient.get(`price/findByShowtimeId/${showtime.id}`);
            const currentDate = new Date();

            // Lọc ra các phần tử có startDate và endDate trong khoảng ngày hiện tại
            // const filteredPrices = respPrice.data.filter((price) => {
            //     const startDate = new Date(price.price.startDate);
            //     const endDate = new Date(price.price.endDate);

            //     return startDate <= currentDate && endDate >= currentDate;
            // });

            setPrices(respPrice.data);

            if (seatBookingData.length > 0) {
                setReload(true);
            }
            if (allSeats.length > 0) {
                setSeatState(createSeatArray());
                setShowSeat(true);
                setReload(false);
            } else {
                setReload(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDaTaSeatType();
        fetchDataSeat();
        getDataSeatArray();
    }, [reload]);

    // Lấy price từ ghế

    // Check giá theo ngày
    const moment = require('moment');

    const getSeatPrice = (priceOneSeat) => {
        if (priceOneSeat === null) {
            return;
        }
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
    const findPriceBySeatType = (seatStateArray, seat, seatTypeId) => {
        console.log(prices);
        let result = null;
        let finalRS = null;
        seatStateArray.forEach((seatItem) => {
            if (seatItem === seat) {
                const price = prices.find((price) => {
                    return price.newPriceSeatTypeDTOs.some((seatType) => seatType.seatType.id === seatTypeId);
                });
                console.log(prices);
                if (price) {
                    result = price.newPriceSeatTypeDTOs;

                    result.map((newPriceSeatTypeDTO, index) => {
                        if (newPriceSeatTypeDTO.seatType.id === seatTypeId) {
                            finalRS = newPriceSeatTypeDTO;
                        }
                    });
                }
            }
        });

        return finalRS;
    };
    const onClickData = async (seat) => {
        const { seatReserved, seatAvailable, vipSeat, normalSeat, seatUnavailable } = seatState;

        // }
        const objectsWithData = Object.keys(seatState).reduce((result, key) => {
            if (Array.isArray(seatState[key]) && seatState[key].length > 0 && key !== 'seat' && key !== 'seatHeader') {
                result[key] = seatState[key];
            }
            return result;
        }, {});

        const filteredObjectsWithNames = Object.keys(objectsWithData).reduce((result, key) => {
            if (objectsWithData[key].length > 0) {
                result.push({ name: key, data: objectsWithData[key] });
            }
            return result;
        }, []);
        const rs = {};
        filteredObjectsWithNames.forEach(({ name, data }, index) => {
            seatType.forEach((value) => {
                if (value.nickName === name) {
                    const priceResult = findPriceBySeatType(data, seat, value.id);
                    if (priceResult !== null) {
                        Object.assign(rs, {
                            seatType: value,
                            weekdayPrice: priceResult.weekdayPrice,
                            weekendPrice: priceResult.weekendPrice,
                        });
                    }
                }
            });
        });
        console.log('====================================');
        console.log(rs);
        console.log('====================================');
        const seatPrices = getSeatPrice(rs);

        if (seatReserved.indexOf(seat) > -1) {
            setPriceSeats(priceSeats - seatPrices);
            seatReserved.splice(seatReserved.indexOf(seat), 1);
            setSeatState({
                ...seatState,
                seatReserved: [...seatReserved],
            });
            removeDataFromDuplicateSeatByName(seat);
        } else {
            Object.keys(seatState).forEach((key) => {
                seatType.forEach((seatType) => {
                    if (seatType.nickName === key) {
                        setSeatState({
                            ...seatState,
                            seatReserved: [...seatReserved, seat],
                        });
                    }
                });
            });
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
            console.log(seatState.seatReserved);
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
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        if (seatState && seatState.seatReserved) {
            const hasData = seatState.seatReserved.length > 0 ? true : false;
            setHasData(hasData);
        }
    }, [seatState ? seatState.seatReserved : null]);

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

    const [isTableLoaded, setIsTableLoaded] = useState(false);

    useEffect(() => {
        // Simulate a delay (replace this with your actual data fetching logic)
        const fetchData = async () => {
            // Simulate data fetching delay
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Set isTableLoaded to true when data is fetched
            setIsTableLoaded(true);
        };

        fetchData();
    }, []);
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
                        {isTableLoaded && (
                            <table className="grid">
                                {showSeat && (
                                    <tbody>
                                        {seatState.seatHeader.map((header, rowIndex) => (
                                            <tr key={header}>
                                                <td className="header-cell protected-element">{header}</td>
                                                {seatState.seat[rowIndex].map((seat_no) => {
                                                    let width = 1;
                                                    const seatClassName =
                                                        seatBookingData2.indexOf(seat_no) > -1
                                                            ? '#404040'
                                                            : seatBookingData.indexOf(seat_no) > -1
                                                            ? '#404040'
                                                            : seatState.seatReserved.indexOf(seat_no) > -1
                                                            ? '#16A34A'
                                                            : Object.keys(seatState)
                                                                  .map((key) => {
                                                                      let color = null;
                                                                      if (seatState[key].indexOf(seat_no) > -1) {
                                                                          seatType.forEach((seat) => {
                                                                              if (seat.nickName === key) {
                                                                                  color = seat.color;
                                                                                  if (seat.width >= 2) {
                                                                                      width = seat.width;
                                                                                  }
                                                                              }
                                                                          });
                                                                      }

                                                                      return color;
                                                                  })
                                                                  .filter(Boolean)
                                                                  .join(' ') || 'reserved';

                                                    const style = {
                                                        backgroundColor: seatClassName,
                                                        pointerEvents: seatClassName === '#404040' ? 'none' : 'auto',
                                                        visibility: seatClassName === '#121B2B' ? 'hidden' : 'visible',
                                                        textIndent: seatClassName === '#121B2B' ? '-9999px' : '0',
                                                        transform: `scaleX(${width})`,
                                                        transformOrigin: 'top left',
                                                    };
                                                    return (
                                                        <td
                                                            className={`protected-element`}
                                                            style={style}
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
                        )}
                        {!isTableLoaded && (
                            <div
                                className="tw-text-white tw-text-2xl"
                                style={{ marginLeft: '60px', position: 'relative', bottom: '60px' }}
                            >
                                <img src={img.loading} alt="Loading" />
                            </div>
                        )}
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
                                <div style={{ display: 'flex', overflowX: 'auto', maxWidth: '600px' }}>
                                    {seatType &&
                                        seatType.map((value) => {
                                            if (value.id === 7) {
                                                return null;
                                            }
                                            return (
                                                <Tag className={cx('tagg')} key={value.id} color={value.color}>
                                                    {value.name}
                                                </Tag>
                                            );
                                        })}
                                </div>
                            </Space>
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
                                            backgroundColor: hasData ? '#EB2F96' : 'gray',
                                            fontWeight: 'bolder',
                                        }}
                                        className={`btn ${
                                            hasData === false ? 'bg-gray-500' : ''
                                        } tw-text-white tw-hover:bg-gray-600 tw-focus:outline-none`}
                                        type="primary"
                                        onClick={handleButtonClick}
                                        icon={<ShoppingOutlined style={{ fontSize: '32px' }} />}
                                        disabled={hasData === false}
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
                open={isModalOpenBooking}
                onCancel={handleCancel}
                destroyOnClose={true}
            />
            {/* )} */}
        </>
    );
}

export default SeatChart;
