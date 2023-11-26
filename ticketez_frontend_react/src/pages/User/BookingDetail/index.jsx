import { Button, Col, Divider, Form, Input, Modal, QRCode, Row, Space, Tag } from 'antd';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import style from './BookingDetail.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import priceSeatApi from '~/api/admin/managementSeat/priceApi';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { accountApi } from '~/api/admin';
import bookingApi from '~/api/user/booking/bookingApi';
import httpStatus from '~/api/global/httpStatus';
import funcUtils from '~/utils/funcUtils';
import { useNavigate } from 'react-router-dom';
import authApi from '~/api/user/Security/authApi';
const cx = classNames.bind(style);

function BookingDetail(props) {
    const { showtime, seatBooking } = props;
    const [text, setText] = useState('https://ant.design/');
    const [showtimeInfo, setShowtimeInfo] = useState({});
    const [account, setAccount] = useState({});
    const [loading, setLoading] = useState(true);
    const [listPrice, setListPrice] = useState([]);
    const [ellipsis, setEllipsis] = useState(true);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    // Load table
    useEffect(() => {
        console.log('seatBooking2a', seatBooking);

        const fetchData = async () => {
            if (showtime != null) {
                if (seatBooking != null) {
                    const weekends = {
                        SUN: 0,
                        FRI: 5,
                        SAT: 6,
                    };

                    const dateNow = moment();
                    const today = dateNow.toDate().getDay();
                    console.log('seatBooking1', seatBooking);
                    console.log('today', dateNow.toDate().getDay());
                    // const seatTypeIds = seatBooking.map((item) => item.seatType.id);
                    console.log('showtime cinema', showtime.cinema.cinemaComplex.id);
                    const getPriceListBySeatTypeIdsAsync = async () => {
                        const listPriceDb = await priceSeatApi.getListPriceDbBySeatType({
                            cinemaCplxId: showtime.cinema.cinemaComplex.id,
                            movieId: showtime.formatMovie.movie.id,
                        });
                        return listPriceDb;
                    };
                    const listPriceResp = await getPriceListBySeatTypeIdsAsync();
                    console.log('listPriceResp', listPriceResp);
                    let listPr = [];
                    const totalAmount = seatBooking.reduce((total, item) => {
                        const seatTypeAndPrice = {
                            seatTypeId: 0,
                            price: 0.0,
                        };
                        const seatTypePrice = listPriceResp.data[0].newPriceSeatTypeDTOs.find(
                            (prStype) => item.seatType.id === prStype.seatType.id,
                        );
                        seatTypeAndPrice.seatTypeId = item.seatType.id;
                        if (seatTypePrice) {
                            const amountPrice =
                                weekends[today] !== undefined ? seatTypePrice.weekendPrice : seatTypePrice.weekdayPrice;
                            seatTypeAndPrice.price = amountPrice;
                            listPr.push(seatTypeAndPrice);
                            return total + amountPrice;
                        } else {
                            funcUtils.notify('Không tìm thấy giá của loại ghế này', 'error');
                            return (total = 0);
                        }
                    }, 0);

                    setListPrice(listPr);
                    const formattedTotalAmount = new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(totalAmount);
                    console.log('totalAmount', totalAmount);
                    console.log('formattedTotalAmount', formattedTotalAmount);
                    const seatInfo = {
                        listSeat: seatBooking,
                        totalAmount: formattedTotalAmount,
                    };
                    console.log('totalAmount', totalAmount);
                    const infoS = {
                        ratingCode: showtime.formatMovie.movie.mpaaRating.ratingCode,
                        movieTitle: showtime.formatMovie.movie.title,
                        format: showtime.formatMovie.format.name,
                        time: {
                            startTime: moment(showtime.startTime).format('HH:mm'),
                            endTime: moment(showtime.endTime).format('HH:mm'),
                            showDate: moment(showtime.startDate).format('DD/MM/YYYY'),
                        },
                        seatInfo,
                        cinemaClx: {
                            name: showtime.cinema.cinemaComplex.name,
                            address: showtime.cinema.cinemaComplex.address,
                        },
                        cinemaName: showtime.cinema.name,
                    };
                    const acc = authApi.getUser();
                    console.log('acc', acc);
                    console.log('showtime', showtime);
                    console.log('seatBooking', seatBooking);
                    // const acc = authApi.getUser();
                    // form.setFieldValue({
                    //     fullname: acc.fullname,
                    //     email: acc.email,
                    //     phone: acc.phone,
                    // });
                    setShowtimeInfo(infoS);
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [showtime, seatBooking]);

    const handlePurchase = async () => {
        const values = await form.getFieldsValue();
        console.log(values);
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        const id = generateRandomId();
        try {
            const accResp = await accountApi.getById('user2');

            const booking = {
                id,
                account: accResp.data,
                showtime,
                createDate: formattedDate,
                status: 0, // 0: thành công, 1:thanh toán gặp lỗi
            };

            const bookingDto = {
                booking,
                seats: seatBooking,
                listPrice,
            };
            const resp = await bookingApi.create(bookingDto);
            const payUrl = resp.data;
            window.location.href = payUrl;
        } catch (error) {
            funcUtils.notify(error.data, 'error');
        }
        console.log('id', id);
    };
    const generateRandomId = () => {
        // Lấy thời gian mili giây hiện tại
        const timestamp = Date.now().toString();

        // Tạo chuỗi ngẫu nhiên từ thời gian mili giây
        const randomString = Math.random().toString().substring(2, 12);

        // Kết hợp thời gian mili giây và chuỗi ngẫu nhiên
        const combinedString = timestamp + randomString;

        // Tạo mã băm SHA-256 từ chuỗi kết hợp
        const hash = CryptoJS.SHA256(combinedString).toString();

        // Lấy 10 ký tự đầu tiên của mã băm
        const randomId = hash.substring(0, 10);

        // Chuyển đổi chuỗi thành số ngẫu nhiên và giữ lại tối đa 10 ký tự
        const randomNumber = parseInt(randomId, 16) % Math.pow(10, 10);

        // Hiển thị log với màu sắc và định dạng thời gian
        console.log({
            timestamp: timestamp,
            randomString: randomString,
            combinedString: combinedString,
            hash: hash,
            randomId: randomId,
            randomNumber: randomNumber,
        });

        return JSON.stringify(randomNumber);
    };

    return (
        <>
            {showtime != null && (
                <Modal
                    {...props}
                    title="Thanh toán"
                    className={cx('modal-custom')}
                    width={760}
                    // open={isModalOpen}
                    // onOk={handleOk}

                    footer={null}
                >
                    {loading === false && (
                        <Row className={cx('content-info-details', 'ps-0')}>
                            <Col span={13} className="pe-20">
                                <div className={cx('wrapp-title-movie')}>
                                    <Tag className={cx('mpaa-movie')} color="blue-inverse">
                                        {showtimeInfo.ratingCode}
                                    </Tag>
                                    <h3 className={cx('title-movie')} level={4}>
                                        {showtimeInfo.movieTitle}
                                    </h3>
                                </div>
                                <Divider dashed className={cx('divider-custom')} plain></Divider>
                                <Row className={cx('wrapp-info')}>
                                    <Col span={12}>
                                        <ul className={cx('wrapp-info-details')}>
                                            <li className={cx('label-inner', 'text-gray-500')}>Thời gian</li>
                                            <li className={cx('info-inner', 'duration')}>
                                                <b>
                                                    <span className="start-time">{showtimeInfo.time.startTime}</span> ~
                                                    <span className="end-time">{showtimeInfo.time.endTime}</span>
                                                </b>
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col span={12}>
                                        <ul className={cx('wrapp-info-details')}>
                                            <li className={cx('label-inner', 'text-gray-500')}>Ngày chiếu</li>
                                            <li className={cx('info-inner', 'release-date')}>
                                                <b>{showtimeInfo.time.showDate}</b>
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col span={24}>
                                        <ul className={cx('wrapp-info-details')}>
                                            <li className={cx('label-inner', 'text-gray-500')}>Thời gian</li>
                                            <li className={cx('cinema-complex-name', 'info-inner')}>
                                                <b>{showtimeInfo.cinemaClx.name}</b>
                                                <Paragraph
                                                    className={cx('address-cinema-complex', 'text-gray-500')}
                                                    ellipsis={
                                                        ellipsis
                                                            ? {
                                                                  rows: 2,
                                                                  expandable: true,
                                                                  symbol: 'Xem thêm',
                                                              }
                                                            : false
                                                    }
                                                >
                                                    {showtimeInfo.cinemaClx.address}
                                                </Paragraph>
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col span={12}>
                                        <ul className={cx('wrapp-info-details')}>
                                            <li className={cx('label-inner', 'text-gray-500')}>Phòng chiếu</li>
                                            <li className={cx('info-inner')}>
                                                <b>{showtimeInfo.cinemaName}</b>
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col span={12}>
                                        <ul className={cx('wrapp-info-details')}>
                                            <li className={cx('label-inner', 'text-gray-500')}>Định dạng</li>
                                            <li className={cx('info-inner')}>
                                                <b>{showtimeInfo.format}</b>{' '}
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
                                                <b>
                                                    {showtimeInfo.seatInfo.listSeat.map((item) => item.name).join(', ')}
                                                </b>
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col span={12}>
                                        <ul className={cx('wrapp-info-details')}>
                                            <li className={cx('label-inner', 'text-gray-500')}>&nbsp;</li>
                                            <li className={cx('info-inner', 'text-end')}>
                                                <b>{showtimeInfo.seatInfo.totalAmount}</b>
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
                                                <b>{showtimeInfo.seatInfo.totalAmount}</b>{' '}
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
                            <Col span={11} className={cx('wrapp-pay-area')}>
                                <Row>
                                    {/* <Col span={24}>Quét mã QR bằng VNPay để thanh toán</Col>
                                    <Col span={24} className={cx('wrapp-qrcode-inner')}>
                                        <Space direction="vertical" align="center">
                                            <QRCode value={text || '-'} className={cx('qrcode-custom')} />
                                        </Space>
                                    </Col>
                                    <Col span={24} className="text-center">
                                        <FontAwesomeIcon icon={solidIcon.faQrcode} /> &nbsp; Sử dụng App VNPay hoặc{' '}
                                        <br /> ứng dụng Camera hỗ trợ QR code để quét mã.
                                    </Col> */}
                                    <div className={cx('wrapp-pay-area-inner')}>
                                        <Title level={4} className={cx('title')}>
                                            Kiểm tra thông tin
                                        </Title>
                                        <Divider style={{ backgroundColor: '#fff' }} />
                                        <Form form={form} name="basic" layout="vertical" autoComplete="off">
                                            <Form.Item
                                                className={cx('form-item')}
                                                label={<label className={cx('label')}>Tên người dùng</label>}
                                                name="fullname"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: 'Vui lòng nhập tên phim!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Nhập tên của bạn" />
                                            </Form.Item>

                                            <Form.Item
                                                className={cx('form-item')}
                                                label={<label className={cx('label')}>Số điện thoại</label>}
                                                name="phone"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: 'Vui lòng nhập tên phim!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Nhập số điện thoại" />
                                            </Form.Item>
                                            <Form.Item
                                                className={cx('form-item')}
                                                label={<label className={cx('label')}>Email</label>}
                                                name="email"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: 'Vui lòng nhập tên phim!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Nhập email" />
                                            </Form.Item>
                                            <Form.Item>
                                                <Space>
                                                    <Button type="primary" key="submit" onClick={handlePurchase}>
                                                        Mua vé
                                                    </Button>
                                                </Space>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    )}
                </Modal>
            )}
        </>
    );
}

export default BookingDetail;
