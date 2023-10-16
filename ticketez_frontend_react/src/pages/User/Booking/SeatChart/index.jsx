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
import { CloseOutlined } from '@ant-design/icons';

const cx = classNames.bind(style);
function SeatChart(props) {
    const { rows, columns, idSeatChart } = props;
    // Hiện modal thông tin ghế
    const [isModalOpenSeat, setIsModalOpenSeat] = useState(false);

    const showModaSeat = () => {
        setIsModalOpenSeat(true);
    };

    const handleOkSeat = () => {
        setIsModalOpenSeat(false);
    };

    const handleCancelSeat = () => {
        setIsModalOpenSeat(false);
    };

    // Hiện modal đặt qué
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


    const handleWheel = (event) => {
        if (event.deltaY > 0) {
            // Cuộn xuống (thu nhỏ)
            if (tableScale > 1) {
                setTableScale(tableScale - 0.1);
            }
        } else {
            // Cuộn lên (phóng to)
            setTableScale(tableScale + 0.1);
        }
    };

    useEffect(() => {
        // Đăng ký sự kiện wheel khi component được mount
        window.addEventListener('wheel', handleWheel);

        // Hủy đăng ký sự kiện khi component unmount
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [tableScale]);

    return (
        <>
            {/* <button onClick={handleZoomIn}>Phóng to</button>
            <button onClick={handleZoomOut}>Thu nhỏ</button> */}

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
                                    className="grid zoom-container "
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
                <Row gutter={10}>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
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
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                            <div
                                onClick={showModaSeat}
                                style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bolder' }}
                            >
                                Xem chi tiết hình
                            </div>
                            <p style={{ marginLeft: '10px' }}>ảnh và thông tin ghế</p>
                        </div>
                    </Col>
                </Row>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
                    <Row>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <h2 style={{ fontWeight: 'bolder' }}>Phim: Đất rừng phương nam</h2>
                        </Col>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <h3 style={{ color: 'orange', fontFamily: '-moz-initial' }}>
                                15:45 ~ 17:35 Hôm nay , 16/10 phòng chiếu Screen 02 - 2D lồng tiếng
                            </h3>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                        <Col
                            span={100}
                            xs={24}
                            style={{
                                paddingTop: '50px',
                            }}
                        >
                            <Col span={24} style={{ marginBottom: '20px' }}>
                                <Col>
                                    <Row style={{ color: 'black' }}>
                                        {' '}
                                        <h3 style={{ float: 'left', marginRight: '10px', marginTop: '5px' }}>
                                            Ghế bạn đã chọn:
                                        </h3>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: '1px solid rgba(169, 169, 169, 0.3)',

                                                borderRadius: '10px',
                                                padding: '3px',
                                                display:
                                                    seatState &&
                                                    seatState.seatReserved &&
                                                    seatState.seatReserved.length > 0
                                                        ? 'flex'
                                                        : 'none',
                                            }}
                                        >
                                            {' '}
                                            <div
                                                className="hoverDiv"
                                                style={{
                                                    marginRight: '10px',
                                                    padding: '3px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <CloseOutlined
                                                    style={{
                                                        color: 'red',
                                                        fontSize: '20px',
                                                        fontWeight: 'bold',
                                                        transition: 'color 0.3s',
                                                    }}
                                                />
                                            </div>
                                            {seatState &&
                                            seatState.seatReserved &&
                                            seatState.seatReserved.length > 0 ? (
                                                seatState.seatReserved.map((seat, index) => (
                                                    <p style={{ fontSize: '20px' }} key={index}>
                                                        {index === 0 ? seat : `, ${seat}`}
                                                    </p>
                                                ))
                                            ) : (
                                                <p></p>
                                            )}
                                        </div>
                                    </Row>
                                </Col>
                            </Col>
                            <hr></hr>
                            <Row style={{ marginTop: '20px' }}>
                                <Col>
                                    {' '}
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {' '}
                                        <p
                                            style={{
                                                float: 'left',
                                                marginRight: '10px',
                                                fontSize: '20px',
                                                color: 'silver',
                                            }}
                                        >
                                            Tạm tính:
                                        </p>
                                        <p
                                            style={{
                                                float: 'left',

                                                fontSize: '20px',
                                                fontWeight: 'bolder',
                                            }}
                                        >
                                            200000Đ
                                        </p>
                                    </div>
                                </Col>
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
                </div>
            </Card>
            <Modal
                title="Chi tiết loại ghế"
                open={isModalOpenSeat}
                onOk={handleOkSeat}
                onCancel={handleCancelSeat}
                footer={null}
            >
                <Card
                    style={{
                        background: `url('https://homepage.momocdn.net/cinema/momo-upload-api-221122145441-638047256815541651.jpg')`,
                        backgroundSize: '100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div style={{ marginTop: '200px', color: 'white' }}>
                        <h3 style={{ fontWeight: 'bolder' }}>Ghế thường</h3>
                        <p>Ghế đệm nhung êm ái, chỗ để tay thoải mái.</p>
                    </div>
                </Card>

                <Card
                    style={{
                        background: `url('https://homepage.momocdn.net/cinema/momo-upload-api-221122145441-638047256815541651.jpg')`,
                        backgroundSize: '100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div style={{ marginTop: '200px', color: 'white' }}>
                        <h3 style={{ fontWeight: 'bolder' }}>Ghế Vip</h3>
                        <p>
                            Ghế đệm nhung êm ái, chỗ để tay thoải mái. Vị trí giữa màn hình để có trải nghiệm điện ảnh
                            hoàn thiện nhất
                        </p>
                    </div>
                </Card>

                <Card
                    style={{
                        background: `url('https://homepage.momocdn.net/cinema/momo-upload-api-221122145649-638047258093509168.jpg')`,
                        backgroundSize: '100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div style={{ marginTop: '200px', color: 'white' }}>
                        <h3 style={{ fontWeight: 'bolder' }}>Ghế Đôi</h3>
                        <p>
                            Ghế đệm nhung êm ái, chỗ để tay thoải mái. Không gian riêng tư, thoải mái cho các cặp đôi
                            hoặc bạn bè.
                        </p>
                    </div>
                </Card>
            </Modal>
            <BookingDetail open={isModalOpen} onCancel={handleCancel} />
        </>
    );
}

export default SeatChart;
