import { Badge, Button, Col, Descriptions, Divider, Input, Modal, QRCode, Row, Space, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import style from './BookingDetail.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);
function BookingDetail() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState('https://ant.design/');

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title="Thanh toán"
                className={cx('modal-custom')}
                width={760}
                open={isModalOpen}
                // onOk={handleOk}
                onCancel={handleCancel}
                footer={''}
            >
                <Row className={cx('content-info-details', 'ps-0')}>
                    <Col span={13} className="pe-20">
                        <div className={cx('wrapp-title-movie')}>
                            <Tag className={cx('mpaa-movie')} color="blue-inverse">
                                K
                            </Tag>
                            <h3 className={cx('title-movie')} level={4}>
                                Đất rừng phương nam
                            </h3>
                        </div>
                        <Divider dashed className={cx('divider-custom')} plain></Divider>
                        <Row className={cx('wrapp-info')}>
                            <Col span={12}>
                                <ul className={cx('wrapp-info-details')}>
                                    <li className={cx('label-inner', 'text-gray-500')}>Thời gian</li>
                                    <li className={cx('info-inner', 'duration')}>
                                        <b>15:40 ~ 14:30</b>
                                    </li>
                                </ul>
                            </Col>
                            <Col span={12}>
                                <ul className={cx('wrapp-info-details')}>
                                    <li className={cx('label-inner', 'text-gray-500')}>Ngày chiếu</li>
                                    <li className={cx('info-inner', 'release-date')}>
                                        <b>15/10/2023</b>
                                    </li>
                                </ul>
                            </Col>
                            <Col span={24}>
                                <ul className={cx('wrapp-info-details')}>
                                    <li className={cx('label-inner', 'text-gray-500')}>Thời gian</li>
                                    <li className={cx('cinema-complex-name', 'info-inner')}>
                                        <b>Lotte Nowzone</b>
                                        <p className={cx('address-cinema-complex', 'text-gray-500')}>
                                            Tầng 5, TTTM Nowzone, 235 Nguyễn Văn Cừ, P.Nguyễn Cư Trinh, Quận 1
                                        </p>
                                    </li>
                                </ul>
                            </Col>
                            <Col span={12}>
                                <ul className={cx('wrapp-info-details')}>
                                    <li className={cx('label-inner', 'text-gray-500')}>Phòng chiếu</li>
                                    <li className={cx('info-inner')}>
                                        <b>Screen03</b>
                                    </li>
                                </ul>
                            </Col>
                            <Col span={12}>
                                <ul className={cx('wrapp-info-details')}>
                                    <li className={cx('label-inner', 'text-gray-500')}>Định dạng</li>
                                    <li className={cx('info-inner')}>
                                        <b>2D Phụ đề</b>{' '}
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        <Divider dashed className={cx('divider-custom')} plain></Divider>
                        <Row className={cx('wrapp-seat-info')}>
                            <Col span={12} className="">
                                <ul className={cx('wrapp-info-details')}>
                                    <li className={cx('label-inner', 'text-gray-500')}>Ghế</li>
                                    <li className={cx('info-inner')}>
                                        <b>E8</b>{' '}
                                    </li>
                                </ul>
                            </Col>
                            <Col span={12}>
                                <ul className={cx('wrapp-info-details')}>
                                    <li className={cx('label-inner', 'text-gray-500')}>&nbsp;</li>
                                    <li className={cx('info-inner', 'text-end')}>
                                        <b>130.000đ</b>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        <Divider dashed className={cx('divider-custom')} plain></Divider>
                        <Row className={cx('wrapp-price-ticket')}>
                            <Col span={12}>
                                <ul className={cx('wrapp-info-details')}>
                                    <li className={cx('info-inner')}>
                                        <b>Tạm tính</b>
                                    </li>
                                </ul>
                            </Col>
                            <Col span={12}>
                                <ul className={cx('wrapp-info-details')}>
                                    <li className={cx('info-inner', 'text-end')}>
                                        <b>130.000đ</b>{' '}
                                    </li>
                                </ul>
                            </Col>
                            <Col span={24}>
                                <span className={cx('discount-info', 'text-gray-500')}>
                                    Ưu đãi (nếu có) sẽ được áp dụng ở bước thanh toán.
                                </span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={11} className={cx('wrapp-qrcode')}>
                        <Row>
                            <Col span={24}>Quét mã QR bằng VNPay để thanh toán</Col>
                            <Col span={24} className={cx('wrapp-qrcode-inner')}>
                                <Space direction="vertical" align="center">
                                    <QRCode value={text || '-'} className={cx('qrcode-custom')} />
                                </Space>
                            </Col>
                            <Col span={24} className="text-center">
                                <FontAwesomeIcon icon={solidIcon.faQrcode} /> &nbsp; Sử dụng App VNPay hoặc <br /> ứng
                                dụng Camera hỗ trợ QR code để quét mã.
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </>
    );
}

export default BookingDetail;
