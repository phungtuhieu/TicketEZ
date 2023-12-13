import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Webcam.module.scss';
import { Col, QRCode, Row, Tag, Watermark } from 'antd';
import datrungphuongnamImg from '../../../assets/img/datrungphuongnam.jpg';
import logorap from '../../../assets/img/lotte.jpg';
import { useEffect, useState } from 'react';
import uploadApi from '~/api/service/uploadApi';
import moment from 'moment';
import 'moment/locale/vi';
import { QrReader } from 'react-qr-reader';
import axiosClient from '~/api/global/axiosClient';
import { bookingApi } from '~/api/user';
import { data, info } from 'autoprefixer';

const cx = classNames.bind(style);

function Webcam({ paymentInfoDTO }) {
    // const location = useLocation();

    const [data, setData] = useState('');
    const [dataDTO, setDataDTO] = useState({});
    const [bookingNew, setBookingNew] = useState({});

    useEffect(() => {
        const get = async () => {
            try {
                if (data) {
                    // const res = await axiosClient.get(`booking/get/booking-payment-info-seat-booking/${data}`);
                    const res = await bookingApi.getBookingPaymentInfoSeatBooking(data);
                    if (res.data.booking.ticketStatus === 0) {
                        const bookingNew = {
                            ...res.data.booking,
                            ticketStatus: 1,
                        };
                        const resBookingNew = await bookingApi.update(bookingNew.id, bookingNew);
                        setDataDTO({
                            ...res.data,
                            booking: resBookingNew.data,
                        });
                    }
                    setDataDTO(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        get();
    }, [data]);

    useEffect(() => {});

    const [infoTicket, setInfoTicket] = useState({});
    const { booking, paymentInfo, seatBookings } = dataDTO;

    // Lấy dữ liệu từ state
    // const paymentInfo = location.state?.paymentInfo;

    useEffect(() => {
        moment.locale('vi');

        if (booking ?? paymentInfo ?? seatBookings) {
            const movie = {
                ...booking.showtime.formatMovie.movie,
                format: booking.showtime.formatMovie.fomat,
            };

            const showtime = booking.showtime;
            const cinemaComplex = booking?.showtime?.cinema?.cinemaComplex;

            const capitalizeFirstLetter = (inputString) => {
                return `${inputString.charAt(0).toUpperCase()}${inputString.slice(1)}`;
            };
            const info = {
                // ratingCode: movie.mpaaRating.ratingCode,
                booking: {
                    ticketStatus: booking.ticketStatus,
                },
                movie: {
                    title: movie.title,
                    poster: movie.poster,
                    format: showtime.formatMovie.format.name,
                },
                time: {
                    startTime: moment(showtime.startTime).format('HH:mm'),
                    endTime: moment(showtime.endTime).format('HH:mm'),
                    showDate: capitalizeFirstLetter(moment(showtime.startDate).format('dddd, DD/MM/YYYY')),
                },
                // seat,
                cinemaComplex: {
                    name: cinemaComplex.name,
                    image: cinemaComplex.cinemaChain.image,
                    address: cinemaComplex.address,
                },
                cinemaName: showtime.cinema.name,
                seatNumber: seatBookings.length.toString().padStart(2, '0'),
                seatNames: seatBookings.map((sb) => sb.seat.name).join(', '),
                paymentInfo: {
                    ticketId: booking.id,
                    amount: new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(paymentInfo.amount),
                    transactionId: paymentInfo.transactionId,
                    payDate: moment(paymentInfo.payDate).format('HH:mm - DD/MM/YYYY'),
                },
            };
            // console.log('', info);
            setInfoTicket(info);
        }
    }, [dataDTO]);

    const ticketStatus = {
        UNUSED: 0,
        USED: 1,
        EXPIRES: 2,
    };

    return (
        <>
            <Row>
                <Col span={12} className=" tw-bg-slate-300">
                    <QrReader
                        scanDelay={300}
                        className="tw-w-[500px]"
                        onResult={(result, error) => {
                            if (!!result) {
                                setData(result?.text);
                            }

                            if (!!error) {
                                console.info(error);
                            }
                        }}
                    />
                    <p>{data}</p>
                </Col>
                <Col span={12} className=" tw-bg-slate-700">
                    {' '}
                    {Object.keys(infoTicket).length > 0 && (
                        <div className={cx('wrapper')}>
                            <div className={cx('container')}>
                                {booking.ticketStatus === ticketStatus.USED && (
                                    <div className={cx('status-ticket-1', ' tw-opacity-100')}>Vé đã sử dụng</div>
                                )}
                                {booking.ticketStatus === ticketStatus.EXPIRES && (
                                    <div className={cx('status-ticket-2', ' tw-opacity-100')}>Hết hạn sử dụng</div>
                                )}
                                <div
                                    className={cx(
                                        'wrapper-ticket',
                                        'light',
                                        booking.ticketStatus === ticketStatus.USED ||
                                            booking.ticketStatus === ticketStatus.EXPIRES
                                            ? 'tw-opacity-50'
                                            : '',
                                    )}
                                >
                                    <div className={cx('ticket-head')}>
                                        <Row>
                                            <Col span={7} className={cx('wrapp-movie-poster')}>
                                                <div className={cx('box-movie-poster')}>
                                                    <a href="">
                                                        <img
                                                            className={cx('poster')}
                                                            src={uploadApi.get(infoTicket.movie.poster)}
                                                            // src={datrungphuongnamImg}
                                                            alt=""
                                                        />
                                                    </a>
                                                </div>
                                            </Col>
                                            <Col span={17} className={cx('wrapp-movie-info')}>
                                                <ul className={cx('info-movie')}>
                                                    <li>{/* <Tag color={getColorForRating('PG-13')}>G-13</Tag> */}</li>
                                                    <li className={cx('movie-name')}>
                                                        <span>{infoTicket.movie.title}</span>
                                                        {/* <span>đất rừng phương nam</span> */}
                                                    </li>
                                                    <li className={cx('format-movie')}>{infoTicket.movie.format}</li>
                                                    {/* <li className={cx('format-movie')}>3D</li> */}
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
                                                        <span className={cx('ticket-id')}>
                                                            {infoTicket.paymentInfo.ticketId}
                                                            {/* 12312412512 */}
                                                        </span>
                                                    </li>
                                                </ul>
                                                <ul className={cx('info-ticket', 'tw-mt-8')}>
                                                    <li className={cx('ticket-title')}>Thời gian</li>
                                                    <li className={cx('ticket-body-text')}>
                                                        <span className={cx('ticket-time')}>
                                                            <span className={cx('start-time')}>
                                                                {infoTicket.time.startTime}
                                                                {/* 12:00 */}
                                                            </span>
                                                            ~
                                                            <span className={cx('end-time')}>
                                                                {infoTicket.time.endTime}
                                                                {/* 14:00 */}
                                                            </span>
                                                        </span>
                                                    </li>
                                                    <li className={cx('ticket-body-text')}>
                                                        <span className={cx('show-date')}>
                                                            {infoTicket.time.showDate}
                                                        </span>
                                                        {/* <span className={cx('show-date')}>Thứ năm, 07/12/2023</span> */}
                                                    </li>
                                                </ul>
                                            </Col>
                                            <Col span={12} className={cx('ticket-qrcode-area')}>
                                                <QRCode
                                                    value={infoTicket.paymentInfo.ticketId}
                                                    // value={12312412512}
                                                    // value={'Title: 1, ID: 2'}
                                                    bgColor="white"
                                                    className={cx('qrcode')}
                                                />
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
                                                            <span className={cx('cinema-name')}>
                                                                {infoTicket.cinemaName}
                                                                {/* Cinema 1 - Standard Cinema Complex */}
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </Col>
                                                <Col span={8}>
                                                    <ul className={cx('info-ticket', 'tw-text-center')}>
                                                        <li className={cx('ticket-title')}>Số vé</li>
                                                        <li className={cx('ticket-body-text')}>
                                                            <span className={cx('ticket-quatity')}>
                                                                {infoTicket.seatNumber}
                                                                {/* 01 */}
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </Col>
                                                <Col span={8}>
                                                    <ul className={cx('info-ticket', 'tw-text-end')}>
                                                        <li className={cx('ticket-title')}>Số ghế</li>
                                                        <li className={cx('ticket-body-text')}>
                                                            <span className={cx('seats-name')}>
                                                                {infoTicket.seatNames}
                                                                {/* E4 */}
                                                            </span>
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
                                                            <span className={cx('cinema-complex-name')}>
                                                                {infoTicket.cinemaComplex.name}
                                                                {/* Standard Cinema Complex */}
                                                            </span>
                                                        </li>
                                                        <li className={cx('ticket-body-text')}>
                                                            <p className={cx('cinema-clx-address')}>
                                                                {infoTicket.cinemaComplex.address}
                                                                {/* 123 Park Street, Quận 1, Thành phố Hồ Chí Minh */}
                                                            </p>
                                                        </li>
                                                    </ul>
                                                </Col>
                                                <Col span={6} className="tw-flex tw-justify-end">
                                                    <div className={cx('box-logo-cinema-chain')}>
                                                        <img
                                                            className={cx('logo-cinema-chain')}
                                                            src={uploadApi.get(infoTicket.cinemaComplex.image)}
                                                            // src="https://gigamall.com.vn/data/2019/05/06/11365490_logo-cgv-500x500.jpg"
                                                            alt=""
                                                        />
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
                                                    <span className={cx('total-price')}>
                                                        {infoTicket.paymentInfo.amount}
                                                        {/* 70.000 ₫ */}
                                                    </span>
                                                </li>
                                                <li className={cx('ticket-info-inner')}>
                                                    <span className={cx('title')}>Mã giao dịch</span>
                                                    <span className={cx('transaction-id')}>
                                                        {infoTicket.paymentInfo.transactionId}
                                                        {/* 14225688 */}
                                                    </span>
                                                </li>
                                                <li className={cx('ticket-info-inner')}>
                                                    <span className={cx('title')}>Thời gian giao dịch</span>
                                                    <span className={cx('paid-datetime')}>
                                                        {infoTicket.paymentInfo.payDate}
                                                        {/* 15:04 - 07/12/2023 */}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </>
    );
}

export default Webcam;
