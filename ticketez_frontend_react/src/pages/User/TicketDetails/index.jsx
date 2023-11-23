import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './TicketDetails.module.scss';
import { Col, QRCode, Row, Tag } from 'antd';
import datrungphuongnamImg from '../../../assets/img/datrungphuongnam.jpg';
import logorap from '../../../assets/img/lotte.jpg';
import { useEffect } from 'react';
const cx = classNames.bind(style);

function TicketDetails({ paymentInfoDTO }) {
    // const location = useLocation();
    const { booking, paymentInfo, seatBookings } = paymentInfoDTO;
    // Lấy dữ liệu từ state
    // const paymentInfo = location.state?.paymentInfo;
    useEffect(() => {
        console.log('paymentInfo', paymentInfoDTO);
    }, []);
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('wrapper-ticket', 'light')}>
                        <div className={cx('ticket-head')}>
                            <Row>
                                <Col span={7} className={cx('wrapp-movie-poster')}>
                                    <div className={cx('box-movie-poster')}>
                                        <a href="">
                                            <img className={cx('poster')} src={datrungphuongnamImg} alt="" />
                                        </a>
                                    </div>
                                </Col>
                                <Col span={17} className={cx('wrapp-movie-info')}>
                                    <ul className={cx('info-movie')}>
                                        <li>{/* <Tag color={getColorForRating('PG-13')}>G-13</Tag> */}</li>
                                        <li className={cx('movie-name')}>
                                            <span>Đất rừng phương nam</span>
                                        </li>
                                        <li className={cx('format-movie')}>3D phụ đề</li>
                                        {/* <li className={cx('cinema-clx-name')}>Lotte Ninh Kiều</li> */}
                                    </ul>
                                </Col>
                            </Row>
                        </div>
                        <div className={cx('ticket-body')}>
                            <Row>
                                <Col span={12} className={cx('wrapp-info-ticket')}>
                                    <ul className={cx('info-ticket')}>
                                        <li className={cx('ticket-title')}>Mã đặt vé</li>
                                        <li className={cx('ticket-body-text')}>
                                            <span className={cx('ticket-id')}>0123456789</span>
                                        </li>
                                    </ul>
                                    <ul className={cx('info-ticket', 'tw-mt-8')}>
                                        <li className={cx('ticket-title')}>Thời gian</li>
                                        <li className={cx('ticket-body-text')}>
                                            <span className={cx('ticket-time')}>
                                                <span className={cx('start-time')}>23:20</span>~
                                                <span className={cx('end-time')}>01:15</span>
                                            </span>
                                        </li>
                                        <li className={cx('ticket-body-text')}>
                                            <span className={cx('show-date')}>Thứ 3, 16/10/2023</span>
                                        </li>
                                    </ul>
                                </Col>
                                <Col span={12} className={cx('ticket-qrcode-area')}>
                                    <QRCode value="0123456789" bgColor="white" className={cx('qrcode')} />
                                </Col>
                                <Col span={24}>
                                    <p className={cx('note', 'tw-text-center')}>
                                        Đưa mã này cho nhân viên soát vé để nhận vé vào rạp
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        <div className={cx('ticket-footer-top')}>
                            <div className={cx('wrapp-info-top')}>
                                <Row>
                                    <Col span={8}>
                                        <ul className={cx('info-ticket', 'tw-text-start')}>
                                            <li className={cx('ticket-title')}>Phòng chiếu</li>
                                            <li className={cx('ticket-body-text')}>
                                                <span className={cx('cinema-name')}>Screen01</span>
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col span={8}>
                                        <ul className={cx('info-ticket', 'tw-text-center')}>
                                            <li className={cx('ticket-title')}>Số vé</li>
                                            <li className={cx('ticket-body-text')}>
                                                <span className={cx('ticket-quatity')}>02</span>
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col span={8}>
                                        <ul className={cx('info-ticket', 'tw-text-end')}>
                                            <li className={cx('ticket-title')}>Số ghế</li>
                                            <li className={cx('ticket-body-text')}>
                                                <span className={cx('seats-name')}>F14, F15, F16</span>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                            <div className={cx('wrapp-info-center')}>
                                <Row>
                                    <Col span={18}>
                                        <ul className={cx('info-ticket')}>
                                            <li className={cx('ticket-title')}>Rạp chiếu</li>
                                            <li className={cx('ticket-body-text')}>
                                                <span className={cx('cinema-complex-name')}>Lotte Ninh Kiều</span>
                                            </li>
                                            <li className={cx('ticket-body-text')}>
                                                <p className={cx('cinema-clx-address')}>
                                                    Tầng 5, TTTM Nowzone, 235 Nguyễn Văn Cừ, P.Nguyễn Cư Trinh, Quận 1
                                                </p>
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col span={6} className="tw-flex tw-justify-end">
                                        <div className={cx('box-logo-cinema-chain')}>
                                            <img className={cx('logo-cinema-chain')} src={logorap} alt="" />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className={cx('ticket-footer-bottom')}>
                            <div className={cx('wrapp-info-bottom')}>
                                <ul className={cx('info-ticket-bottom')}>
                                    <li className={cx('ticket-info-inner')}>
                                        <span className={cx('title')}>Tổng tiền</span>
                                        <span className={cx('total-price')}>120.000đ</span>
                                    </li>
                                    <li className={cx('ticket-info-inner')}>
                                        <span className={cx('title')}>Mã giao dịch</span>
                                        <span className={cx('transaction-id')}>5687451556872</span>
                                    </li>
                                    <li className={cx('ticket-info-inner')}>
                                        <span className={cx('title')}>Thời gian giao dịch</span>
                                        <span className={cx('paid-datetime')}>18:44 - 16/10/2023</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TicketDetails;
