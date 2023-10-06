import React, { useState } from 'react';
import { Button, Modal, Divider, Space, Tag } from 'antd';
import classNames from 'classnames/bind';
import style from './SearChart.module.scss';
import FormOption from '../FormOption';

const cx = classNames.bind(style);

function SeatChart() {
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

    const [seatState, setSeatState] = useState({
        seat: [
            ['1', '2', '3', '4', '5', '6', '7', '8'],
            ['11', '12', '13', '14', '15', '16', '17', '18'],
            ['21', '22', '23', '24', '25', '26', '27', '28'],
            ['31', '32', '33', '34', '35', '36', '37', '38'],
            ['41', '42', '43', '44', '45', '46', '47', '48'],
        ],
        seatAvailable: [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            ['11', '12', '13', '14', '15', '16', '17', '18'],
            ['21', '22', '23', '24', '25', '26', '27', '28'],
            ['31', '32', '33', '34', '35', '36', 'n37', '38'],
            ['41', '42', '43', '44', '45', '46', '47', '48'],
        ],
        seatReserved: [],
        seatUnavailable: ['12', '13', '14'],
    });
    const onClickData = (seat) => {
        showModal();
        console.log(seat);
        // Cập nhật trạng thái của ghế dựa trên seat
        // if (seatState.seatReserved.indexOf(seat) > -1) {
        //     setSeatState({
        //         ...seatState,
        //         seatAvailable: seatState.seatAvailable.concat(seat),
        //         seatReserved: seatState.seatReserved.filter((res) => res !== seat),
        //     });
        // } else {
        //     setSeatState({
        //         ...seatState,
        //         seatReserved: seatState.seatReserved.concat(seat),
        //         seatAvailable: seatState.seatAvailable.filter((res) => res !== seat),
        //     });
        // }
    };

    return (
        <div className={cx('container')}>
            <Modal title="Chi tiết" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <FormOption />
            </Modal>
            <hr className={cx('screen')} />
            <h6 className={cx('screen-title')}>Màn hình</h6>
            <div className={cx('container-from')}>
                <table className="grid">
                    <tbody>
                        {seatState.seat.map((numList, i) => (
                            <tr key={i}>
                                {numList.map((seat_no) => (
                                    <td
                                        className={
                                            seatState.seatUnavailable.indexOf(seat_no) > -1
                                                ? 'unavailable'
                                                : seatState.seatReserved.indexOf(seat_no) > -1
                                                ? 'reserved'
                                                : seat_no.startsWith('2') // Kiểm tra nếu là ghế VIP
                                                ? 'vip-seat'
                                                : 'normal-seat' // Mặc định là ghế thường
                                        }
                                        key={seat_no}
                                        onClick={() => onClickData(seat_no)}
                                    >
                                        {seat_no}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('color')}>
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
        </div>
    );
}

export default SeatChart;
