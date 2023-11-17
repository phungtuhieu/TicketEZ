import React, { useState, useEffect } from 'react';
import { Button, Modal, Divider, Space, Tag, Radio, Col, Row, Card } from 'antd';
import classNames from 'classnames/bind';
import style from './SearChart.module.scss';
// import '~/pages/User/Booking/SeatChart/chart.scss'
import axiosClient from '~/api/global/axiosClient';
import funcUtils from '~/utils/funcUtils';

const cx = classNames.bind(style);

const radioStyle = {
    display: 'block',
    marginBottom: '10px',
    lineHeight: '1.5', // Chiều cao của Radio.Button
};

const radioStyl = {
    display: 'flex',
    flexDirection: 'column', // Hiển thị các tùy chọn theo chiều dọc
    alignItems: 'flex-start', // Đẩy các tùy chọn về phía trái
};

function SeatChart(props) {
    const { rows, columns, nameSeat, idSeatChart } = props;

    const createSeatArray = () => {
        let seatRows = rows; // Số hàng
        let seatColumns = columns; // Số cột
        console.log(seatRows);
        console.log(seatColumns);
        // Tạo mảng chú thích hàng ở bên trái dựa vào số hàng
        const rowLabels = Array.from({ length: seatRows }, (_, index) => String.fromCharCode(65 + index));
        console.log(nameSeat);
        const seatState = {
            seat: [],
            way: listWay,
            seatAvailable: [],
            seatReserved: [],
            coupleSeat: listSeatCouple,
            vipSeat: listSeatVip,
            normalSeat: listSeatNormal,

            seatUnavailable: nameSeat,
        };
        // Tạo mảng chỗ ngồi
        const rowHeader = rowLabels.map((label) => label + ' ');
        console.log(allSeats);
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
            console.log(mangHaiChieu[i]);
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
    const [listSeatCouple, setListSeatcouple] = useState([]);
    const [listWay, setListWay] = useState([]);
    const [allSeats, setAllSeats] = useState([]);
    const [allSeatsLocal, setAllSeatsLocal] = useState([]);
    const [seatState, setSeatState] = useState();
    const [selectedSeatType, setSelectedSeatType] = useState('normal-seat'); // Mặc định ban đầu là 'normal-seat'

    const fetchDataSeat = async () => {
        console.log(idSeatChart);
        try {
            const respAll = await axiosClient.get(`seat/by-seatchart/${idSeatChart}`);
            setAllSeats(respAll.data);

            const respVip = await axiosClient.get(`seat/by-seatchart-and-seattype/${idSeatChart}/${2}`);
            const newVipSeats = respVip.data.map((seat) => seat.name);
            setListSeatVip((prevState) => {
                for (const newSeat of newVipSeats) {
                    if (!prevState.includes(newSeat)) {
                        prevState.push(newSeat);
                    }
                }
                return prevState;
            });

            const respNormal = await axiosClient.get(`seat/by-seatchart-and-seattype/${idSeatChart}/${1}`);
            const newNormalSeats = respNormal.data.map((seat) => seat.name);
            setListSeatNormal((prevState) => {
                for (const newSeat of newNormalSeats) {
                    if (!prevState.includes(newSeat)) {
                        prevState.push(newSeat);
                    }
                }
                return prevState;
            });

            const respCouple = await axiosClient.get(`seat/by-seatchart-and-seattype/${idSeatChart}/${4}`);
            const newCoupleSeats = respCouple.data.map((seat) => seat.name);
            setListSeatcouple((prevState) => {
                for (const newSeat of newCoupleSeats) {
                    if (!prevState.includes(newSeat)) {
                        prevState.push(newSeat);
                    }
                }
                return prevState;
            });

            const respWay = await axiosClient.get(`seat/by-seatchart-and-seattype/${idSeatChart}/${7}`);
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

    const onClickUpdate = () => {
        const seatVipAndNormal = [
            ...seatState.vipSeat.map((seat) => ({ name: seat, type: 2 })),
            ...seatState.normalSeat.map((seat) => ({ name: seat, type: 1 })),
            ...seatState.coupleSeat.map((seat) => ({ name: seat, type: 4 })),
        ];

        const updatedSeat = allSeats.map((allSeat) => {
            const matchingItem = seatVipAndNormal.find((seat) => allSeat.name === seat.name);
            if (matchingItem) {
                return {
                    ...allSeat,
                    seatType: {
                        id: matchingItem.type,
                    },
                    seatChart: {
                        id: idSeatChart,
                    },
                };
            }
            return allSeat;
        });
        console.log(updatedSeat);

        const flattenedArray = [].concat(...updatedSeat);
        console.log(flattenedArray);

        handelUpdate(flattenedArray);
        setShowInfo('success');
        // try {
        //     updatedSeat.forEach((seat) => {
        //         handelUpdate(seat.id, seat);
        //         setShowInfo('success');
        //         setTimeout(() => {
        //             setShowInfo(''); // Đặt lại showInfo sau một khoảng thời gian
        //         }, 1000);
        //     });
        // } catch (error) {
        //     setShowInfo('error');
        //     setTimeout(() => {
        //         setShowInfo(''); // Đặt lại showInfo sau một khoảng thời gian
        //     }, 1000);
        // }
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

    const handelUpdate = async (dataSeat) => {
        let data = dataSeat;

        const respVip = await axiosClient.put(`seat/update`, data);
    };

    const onClickData = (seat) => {
        const { seatReserved, seatAvailable, vipSeat, normalSeat, seatUnavailable, coupleSeat } = seatState;

        console.log('------------------------------------------------');
        console.log('Vip', vipSeat);

        console.log('normal', normalSeat);

        console.log('Đã đặt', seatUnavailable);
        if (selectedSeatType === 'normal-seat') {
            while (vipSeat.indexOf(seat) > -1) {
                vipSeat.splice(vipSeat.indexOf(seat), 1);
            }
            while (seatUnavailable.indexOf(seat) > -1) {
                seatUnavailable.splice(seatUnavailable.indexOf(seat), 1);
            }
            while (normalSeat.indexOf(seat) > -1) {
                normalSeat.splice(normalSeat.indexOf(seat), 1);
            }
            while (coupleSeat.indexOf(seat) > -1) {
                coupleSeat.splice(coupleSeat.indexOf(seat), 1);
            }
            setSeatState({
                ...seatState,
                normalSeat: [...normalSeat, seat],
            });
        }
        if (selectedSeatType === 'vip-seat') {
            while (normalSeat.indexOf(seat) > -1) {
                normalSeat.splice(normalSeat.indexOf(seat), 1);
            }
            while (seatUnavailable.indexOf(seat) > -1) {
                seatUnavailable.splice(seatUnavailable.indexOf(seat), 1);
            }
            while (vipSeat.indexOf(seat) > -1) {
                vipSeat.splice(vipSeat.indexOf(seat), 1);
            }
            while (coupleSeat.indexOf(seat) > -1) {
                coupleSeat.splice(coupleSeat.indexOf(seat), 1);
            }

            setSeatState({
                ...seatState,
                vipSeat: [...vipSeat, seat],
            });
        }
        if (selectedSeatType === 'couple-seat') {
            while (normalSeat.indexOf(seat) > -1) {
                normalSeat.splice(normalSeat.indexOf(seat), 1);
            }
            while (vipSeat.indexOf(seat) > -1) {
                vipSeat.splice(vipSeat.indexOf(seat), 1);
            }
            while (seatUnavailable.indexOf(seat) > -1) {
                seatUnavailable.splice(seatUnavailable.indexOf(seat), 1);
            }
            while (coupleSeat.indexOf(seat) > -1) {
                coupleSeat.splice(coupleSeat.indexOf(seat), 1);
            }
            setSeatState({
                ...seatState,
                coupleSeat: [...coupleSeat, seat],
            });
        }
        if (selectedSeatType === 'unavailable') {
            while (normalSeat.indexOf(seat) > -1) {
                normalSeat.splice(normalSeat.indexOf(seat), 1);
            }
            while (vipSeat.indexOf(seat) > -1) {
                vipSeat.splice(vipSeat.indexOf(seat), 1);
            }
            while (seatUnavailable.indexOf(seat) > -1) {
                seatUnavailable.splice(seatUnavailable.indexOf(seat), 1);
            }
            setSeatState({
                ...seatState,
                seatUnavailable: [...seatUnavailable, seat],
            });
        }
    };

    // const handelUpdate   = () => {
    //     setShowSeat(false);
    // };
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setSelectedSeatType(e.target.value);
    };

    useEffect(() => {
        fetchDataSeat();
    }, [reload]);

    return (
        <>
            <Card className={cx('card')}>
                <Row>
                    <Col className={cx('div-screen')} span={8} style={{ marginLeft: '140px' }}>
                        <hr className={cx('screen')} />
                        <h6 className={cx('screen-title')}>Màn hình</h6>
                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={18}>
                                <table className="grid">
                                    {showSeat && (
                                        <tbody>
                                            {seatState.seatHeader.map((header, rowIndex) => (
                                                <tr key={header}>
                                                    <td className="header-cell protected-element">{header}</td>
                                                    {seatState.seat[rowIndex].map((seat_no) => {
                                                        const seatClassName = `
                                                ${
                                                    seatState.way.indexOf(seat_no) > -1
                                                        ? 'way-user'
                                                        : seatState.seatUnavailable.indexOf(seat_no) > -1
                                                        ? 'unavailable'
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
                            <Col span={6} className={cx('col-right-radioBox-btn')}>
                                <Row>
                                    <Col span={24}>
                                        <Radio.Group style={radioStyl} onChange={onChange} value={selectedSeatType}>
                                            {/* <Radio style={radioStyle} value="unavailable">
                                                <Tag color="#404040">Đã đặt</Tag>
                                            </Radio> */}
                                            <Radio style={radioStyle} value="vip-seat">
                                                <Tag color="#b7232b">Ghế vip</Tag>
                                            </Radio>
                                            <Radio style={radioStyle} value="normal-seat">
                                                <Tag color="#5b2b9f">Ghế thường</Tag>
                                            </Radio>
                                            <Radio style={radioStyle} value="couple-seat">
                                                <Tag color="#d82d8b">Ghế đôi</Tag>
                                            </Radio>
                                        </Radio.Group>
                                    </Col>
                                    <Col span={24} style={{ marginTop: 30 }}>
                                        <div className={cx('custom-btn')}>
                                            <Button className={cx('btn')} type="primary" onClick={onClickUpdate}>
                                                Cập nhật ghế
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <div className={cx('container-tag')}>
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
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default SeatChart;
