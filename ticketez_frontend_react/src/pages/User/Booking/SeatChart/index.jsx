import React, { useState, useEffect } from 'react';
import { Button, Modal, Divider, Space, Tag, Radio, Col, Row, Card } from 'antd';
import classNames from 'classnames/bind';
import style from '~/pages/Admin/Seat/SeatChart/SearChart.module.scss';
import '../SeatChart/chart.scss';
import axiosClient from '~/api/global/axiosClient';
import { ShoppingOutlined } from '@ant-design/icons';
import funcUtils from '~/utils/funcUtils';
import { BookingDetail } from '../..';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const cx = classNames.bind(style);
function SeatChart(props) {
    const { rows, columns, idSeatChart } = props;

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
        let seatRows = 10;
        let seatColumns = 7;
        const rowLabels = Array.from({ length: seatRows }, (_, index) => String.fromCharCode(65 + index));

        const seatState = {
            seat: [],
            seatAvailable: [],
            seatReserved: [],
            vipSeat: listSeatVip,
            normalSeat: listSeatNormal,
            seatUnavailable: [],
        };

        const rowHeader = rowLabels.map((label) => label + ' ');

        for (let i = 0; i < seatRows; i++) {
            const row = [];
            const rowAvailable = [];
            const rowLabel = rowLabels[i];
            for (let j = 1; j <= seatColumns; j++) {
                const seatNumber = `${rowLabel}${j}`;
                row.push(seatNumber);
                if (!seatState.seatUnavailable.includes(seatNumber)) {
                    rowAvailable.push(seatNumber);
                }
            }

            seatState.seat.push(row);
        }

        seatState.seatHeader = rowHeader;

        return seatState;
    };

    const [showSeat, setShowSeat] = useState(false);
    const [reload, setReload] = useState(false);
    const [listSeatNormal, setListSeatNormal] = useState([]);
    const [listSeatVip, setListSeatVip] = useState([]);
    const [allSeats, setAllSeats] = useState([]);
    const [allSeatsLocal, setAllSeatsLocal] = useState([]);
    const [seatState, setSeatState] = useState();
    const [selectedSeatType, setSelectedSeatType] = useState('normal-seat');

    const fetchDataSeat = async () => {
        try {
            const respAll = await axiosClient.get(`seat/getAll`);
            setAllSeats(respAll.data);
            const respVip = await axiosClient.get(`seat/by-seatchart-and-seattype/${1}/${2}`);
            const newVipSeats = respVip.data.map((seat) => seat.name);
            setListSeatVip((prevState) => {
                for (const newSeat of newVipSeats) {
                    if (!prevState.includes(newSeat)) {
                        prevState.push(newSeat);
                    }
                }
                return prevState;
            });

            const respNormal = await axiosClient.get(`seat/by-seatchart-and-seattype/${1}/${1}`);
            const newNormalSeats = respNormal.data.map((seat) => seat.name);
            setListSeatNormal((prevState) => {
                for (const newSeat of newNormalSeats) {
                    if (!prevState.includes(newSeat)) {
                        prevState.push(newSeat);
                    }
                }
                return prevState;
            });

            console.log(listSeatNormal);
            console.log(listSeatVip);

            if (listSeatVip.length > 0 && listSeatNormal.length > 0) {
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

    const onClickUpdate = () => {
        const seatVipAndNormal = [
            ...seatState.vipSeat.map((seat) => ({ name: seat, type: 2 })),
            ...seatState.normalSeat.map((seat) => ({ name: seat, type: 1 })),
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
                        id: 1,
                    },
                };
            }
            return allSeat;
        });
        try {
            updatedSeat.forEach((seat) => {
                handelUpdate(seat.id, seat);
                setShowInfo('success');
                setTimeout(() => {
                    setShowInfo('');
                }, 1000);
            });
        } catch (error) {
            setShowInfo('error');
            setTimeout(() => {
                setShowInfo('');
            }, 1000);
        }
        console.log(updatedSeat);
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

    const onClickData = (seat) => {
        const { seatReserved, seatAvailable, vipSeat, normalSeat, seatUnavailable } = seatState;

        console.log('------------------------------------------------');
        console.log(seatState.seatReserved);
        while (normalSeat.indexOf(seat) > -1) {
            normalSeat.splice(normalSeat.indexOf(seat), 1);
        }
        while (vipSeat.indexOf(seat) > -1) {
            vipSeat.splice(vipSeat.indexOf(seat), 1);
        }
        setSeatState({
            ...seatState,
            seatReserved: [...seatReserved, seat],
        });
    };

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setSelectedSeatType(e.target.value);
    };

    useEffect(() => {
        fetchDataSeat();
    }, [reload]);
    const [tableScale, setTableScale] = useState(1);

    const handleZoomIn = () => {
        setTableScale(tableScale + 0.1);
    };

    const handleZoomOut = () => {
        if (tableScale > 1) {
            setTableScale(tableScale - 0.1);
        }
    };

    return (
        <>
            <button onClick={handleZoomIn}>Phóng to</button>
            <button onClick={handleZoomOut}>Thu nhỏ</button>

            <Card className="card" style={{ display: 'flex' }}>
                <Row className="card">
                    <DndProvider backend={HTML5Backend}>
                        <div
                            id="divContainer"
                            style={{
                                overflowY: 'auto',
                                overflowX: 'scroll',
                                height: '400px',
                                width: '600px',
                                position: 'relative',
                                display: 'flex', // Bật chế độ hiển thị flex
                                justifyContent: 'center', // Căn giữa theo chiều ngang
                            }}
                        >
                            <div style={{ minWidth: '3000px' }}>
                                <div style={{ marginBottom: '200px', backgroundColor: 'red' }}></div>

                                <table
                                    className="grid "
                                    style={{ maxWidth: '100%', maxHeight: '100%', transform: `scale(${tableScale})` }}
                                >
                                    {showSeat && (
                                        <tbody>
                                            <div
                                                style={{
                                                    position: 'relative',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <div
                                                    className="screen"
                                                    style={{
                                                        backgroundColor: 'white',
                                                        width: '200px',
                                                        marginBottom: '20px',
                                                    }}
                                                >
                                                    .
                                                </div>
                                            </div>

                                            {seatState.seatHeader.map((header, rowIndex) => (
                                                <tr key={header}>
                                                    <td className="header-cell">{header}</td>
                                                    {seatState.seat[rowIndex].map((seat_no) => {
                                                        const seatClassName = `
                                                                                ${
                                                                                    seatState.normalSeat.indexOf(
                                                                                        seat_no,
                                                                                    ) > -1
                                                                                        ? 'normal-seat'
                                                                                        : seatState.seatUnavailable.indexOf(
                                                                                              seat_no,
                                                                                          ) > -1
                                                                                        ? 'unavailable'
                                                                                        : seatState.vipSeat.indexOf(
                                                                                              seat_no,
                                                                                          ) > -1
                                                                                        ? 'vip-seat'
                                                                                        : seatState.seatReserved.indexOf(
                                                                                              seat_no,
                                                                                          ) > -1
                                                                                        ? 'reserved'
                                                                                        : 'reservedd'
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
                            </div>
                        </div>
                    </DndProvider>
                </Row>

                <hr></hr>
                <Row gutter={10}>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                        <hr></hr>
                        <div style={{ padding: '10px' }}>
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
                    <Col
                        span={100}
                        xs={24}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            paddingTop: '50px',
                        }}
                    >
                        <Col span={24} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <div style={{ padding: '10px', color: 'white' }}>
                                <h3>Ghế bạn đã chọn:</h3>
                                {seatState && seatState.seatReserved && seatState.seatReserved.length > 0 ? (
                                    seatState.seatReserved.map((seat, index) => <p key={index}>{seat}</p>)
                                ) : (
                                    <p>Không có ghế nào được chọn.</p>
                                )}
                            </div>
                        </Col>
                        <Row>
                            <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <div>
                                    <Button
                                        style={{
                                            width: '200px',
                                            height: '70px',
                                            backgroundColor: '#EB2F96',
                                            fontWeight: 'bolder',
                                        }}
                                        className={cx('btn')}
                                        type="primary"
                                        onClick={showModal}
                                        icon={
                                            <ShoppingOutlined
                                                style={{ fontSize: '32px' }} // Đổi kích thước và màu sắc
                                            />
                                        }
                                    >
                                        Mua vé
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
            <BookingDetail open={isModalOpen} onCancel={handleCancel} />
        </>
    );
}

export default SeatChart;
