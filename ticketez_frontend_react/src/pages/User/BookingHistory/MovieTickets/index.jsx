import { Button, Col, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MovieTickets.module.scss';
import cgvLogo from '../../../../assets/img/cgv.png';
import BaseModal from '~/components/Admin/BaseModal/BaseModal';
import { TicketDetails } from '../..';
import { bookingApi } from '~/api/user';
import moment from 'moment';
import uploadApi from '~/api/service/uploadApi';
import authApi from '~/api/user/Security/authApi';
import funcUtils from '~/utils/funcUtils';
const cx = classNames.bind(styles);
function MovieTickets() {
    const ticketStatus = {
        UNUSED: 0,
        USED: 1,
        EXPIRES: 2,
    };
    const [paymentInfoDTO, setPaymentInfoDTO] = useState({
        paymentInfo: {},
        booking: {},
        seatBookings: [],
    });
    const [bookings, setBookings] = useState([]);
    const [paymentId, setPaymentId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadDataTicket = async () => {
            try {
                console.log('sss1');
                const resp = await bookingApi.getPaymentInfoById(paymentId);
                console.log('resp', resp);
                const booking = resp.data.booking;
                const paymentInfo = resp.data.paymentInfo;
                const seatBookings = resp.data.seatBookings;
                console.log('booking', booking);
                setPaymentInfoDTO({ booking, paymentInfo, seatBookings });
            } catch (error) {
                console.log('error', error);
            }
        };
        if (isModalOpen) {
            loadDataTicket();
        }
    }, [paymentId]);
    useEffect(() => {
        console.log('ssss');
        const loadTickets = async () => {
            try {
                const account = authApi.getUser();
                console.log(account);

                if (account == null) {
                    funcUtils.notify('Vui lòng đăng nhập');
                    return;
                }
                const resp = await bookingApi.getBookingByAcc(1, 10, account.id);
                console.log('resp', resp);
                const dataFormat = resp.data.map((item) => ({
                    id: item.booking.id,
                    paymentId: item.paymentId,
                    movieTitle: item.booking.showtime.formatMovie.movie.title,
                    cinemaCplxName: item.booking.showtime.cinema.cinemaComplex.name,
                    cinemaChainLogo: item.booking.showtime.cinema.cinemaComplex.cinemaChain.image,
                    startTime: moment(item.startTime).format('HH:mm'),
                    showDate: moment(item.showDate).format('ddd, DD/MM'),
                    ticketStatus: item.booking.ticketStatus,
                }));
                setBookings(dataFormat);
            } catch (error) {}
        };
        loadTickets();
    }, []);
    const showModal = (paymentId) => {
        setPaymentId(paymentId);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div id={cx('wrapper-movie-ticket-tabs')}>
            <BaseModal
                open={isModalOpen}
                title="Vé của bạn"
                onCancel={handleCancel}
                footer={[
                    <Button key="1" onClick={handleCancel}>
                        Thoát
                    </Button>,
                ]}
            >
                <div className={cx('wrapp-ticket-innerModal')}>
                    {isModalOpen && Object.keys(paymentInfoDTO.booking).length > 0 && (
                        <TicketDetails paymentInfoDTO={paymentInfoDTO} />
                    )}
                </div>
            </BaseModal>
            <div className={cx('wrapper')}>
                <Row style={{ width: '95%' }}>
                    {bookings.map((item) => (
                        <Col key={item.id} className={cx('wrapp-ticket')} span={8} style={{ marginBottom: 20 }}>
                            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                <Col span={5} className={cx('wrapp-logo')}>
                                    <div className={cx('box-logo')}>
                                        <img src={uploadApi.get(item.cinemaChainLogo)} className={cx('logo')} alt="" />
                                    </div>
                                </Col>
                                <Col span={17} className={cx('wrapp-info-ticket')}>
                                    {item.ticketStatus === ticketStatus.USED && (
                                        <div className={cx('status-ticket')}>Vé đã sử dụng</div>
                                    )}
                                    {item.ticketStatus === ticketStatus.EXPIRES && (
                                        <div className={cx('status-ticket')}>Vé đã hết hạn</div>
                                    )}

                                    <b className={cx('movie-name')}>{item.movieTitle}</b>
                                    <span className={cx('cinema-cplx-name')}>{item.cinemaCplxName}</span>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span className={cx('datetime')}>
                                            <span style={{ fontWeight: 800 }}>{item.startTime}</span>{' '}
                                            <span style={{ fontSize: 20 }}>&#8226;</span>
                                            <span> {item.showDate}</span>
                                        </span>
                                        <Button
                                            type="text"
                                            onClick={() => showModal(item.paymentId)}
                                            className={cx('btn-view-ticket')}
                                        >
                                            Xem
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default MovieTickets;
