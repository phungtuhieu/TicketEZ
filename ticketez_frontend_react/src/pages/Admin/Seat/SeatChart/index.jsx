import React, { useState, useEffect } from 'react';
import { Button, Modal, Divider, Space, Tag, Radio, Col, Row, Card } from 'antd';
import classNames from 'classnames/bind';
import style from './SearChart.module.scss';
import FormOption from '../FormOption';
import RRadioBox from '../RadioBox';
import axiosClient from '~/api/global/axiosClient';

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
    const { rows, columns, idSeatChart } = props;

    const createSeatArray = () => {
        let seatRows = rows; // Số hàng
        let seatColumns = columns; // Số cột
        // Tạo mảng chú thích hàng ở bên trái dựa vào số hàng
        const rowLabels = Array.from({ length: seatRows }, (_, index) => String.fromCharCode(65 + index));

        const seatState = {
            seat: [],
            seatAvailable: [],
            seatReserved: [],
            vipSeat: listSeatVip,
            normalSeat: listSeatNormal,
            seatUnavailable: ['A1', '13', '14'],
        };

        // Tạo mảng chỗ ngồi
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

        // Thêm cột chú thích hàng ở bên trái
        seatState.seatHeader = rowHeader;

        return seatState;
    };

    const [showSeat, setShowSeat] = useState(false);
    const [reload, setReload] = useState(false);
    const [listSeatNormal, setListSeatNormal] = useState([]);
    const [listSeatVip, setListSeatVip] = useState([]);
    const [seatState, setSeatState] = useState();
    const [selectedSeatType, setSelectedSeatType] = useState('normal-seat'); // Mặc định ban đầu là 'normal-seat'

    const fetchDataSeat = async () => {
        try {
            const respVip = await axiosClient.get(`seat/by-seatchart-and-seattype/${idSeatChart}/${2}`);
            respVip.data.forEach((seat) => {
                setListSeatVip((prevState) => [...prevState, seat.name]);
            });
            const respNormal = await axiosClient.get(`seat/by-seatchart-and-seattype/${idSeatChart}/${1}`);
            respNormal.data.forEach((seat) => {
                setListSeatNormal((prevState) => [...prevState, seat.name]);
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

    const onClickData = (seat) => {
        const { seatReserved, seatAvailable, vipSeat, normalSeat, seatUnavailable } = seatState;

        console.log('------------------------------------------------');
        if (selectedSeatType === 'normal-seat') {
            while (vipSeat.indexOf(seat) > -1) {
                vipSeat.splice(vipSeat.indexOf(seat), 1);
            }
            while (seatUnavailable.indexOf(seat) > -1) {
                seatUnavailable.splice(seatUnavailable.indexOf(seat), 1);
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

            setSeatState({
                ...seatState,
                vipSeat: [...vipSeat, seat],
            });
        }
        if (selectedSeatType === 'unavailable') {
            while (normalSeat.indexOf(seat) > -1) {
                normalSeat.splice(normalSeat.indexOf(seat), 1);
            }
            while (vipSeat.indexOf(seat) > -1) {
                vipSeat.splice(vipSeat.indexOf(seat), 1);
            }
            setSeatState({
                ...seatState,
                seatUnavailable: [...seatUnavailable, seat],
            });
        }
    };

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
                    <Col span={24}>
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
                                                    <td className="header-cell">{header}</td>
                                                    {seatState.seat[rowIndex].map((seat_no) => {
                                                        const seatClassName = `
                                                ${
                                                    seatState.normalSeat.indexOf(seat_no) > -1
                                                        ? 'normal-seat'
                                                        : seatState.seatUnavailable.indexOf(seat_no) > -1
                                                        ? 'unavailable'
                                                        : seatState.vipSeat.indexOf(seat_no) > -1
                                                        ? 'vip-seat'
                                                        : 'normal-seatt'
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
                                    
                                    <Col span={24} >
                                        <Radio.Group style={radioStyl} onChange={onChange} value={selectedSeatType}>
                                            <Radio style={radioStyle} value="unavailable">
                                                <Tag color="#404040">Đã đặt</Tag>
                                            </Radio>
                                            <Radio style={radioStyle} value="vip-seat">
                                                <Tag color="#b7232b">Ghế vip</Tag>
                                            </Radio>
                                            <Radio style={radioStyle} value="normal-seat">
                                                <Tag color="#5b2b9f">Ghế thường</Tag>
                                            </Radio>
                                        </Radio.Group>
                                    </Col>
                                    <Col span={24} style={{marginTop: 30}} >
                                        <div className={cx('custom-btn')}>
                                            <Button className={cx('btn')} type="primary">
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
                            </Space>
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default SeatChart;
