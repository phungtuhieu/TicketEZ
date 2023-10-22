import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'antd';

import classNames from 'classnames/bind';
import style from './ListPhim.module.scss';

import moment from 'moment-timezone';
import movieUserApi from '~/api/user/cinemaComplex/movieUserAPI';

const cx = classNames.bind(style);

function ListPhim({ cinemaComplex }) {
    const [ngay, setNgay] = useState(1);
    const [weekDays, setWeekDays] = useState([]);
    const daysOfWeekInVietnamese = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

    useEffect(() => {
        const currentTimeInVietnam = moment.tz('Asia/Ho_Chi_Minh');
        const nextWeekDays = [];
        for (let i = 0; i < 7; i++) {
            const currentDay = currentTimeInVietnam.clone().add(i, 'days');
            nextWeekDays.push(currentDay);
        }
        // console.log(nextWeekDays);
        setWeekDays(nextWeekDays);
    }, []);

    const handleDayClick = (index) => {
        setNgay(index + 1);
        const selectedDay = weekDays[index];
        console.log('Ngày được chọn:', selectedDay.format('YYYY-MM-DD'));
    };

    const [movieData, setMovieData] = useState([])

    useEffect(() => {
        console.log(cinemaComplex);
        try {
            if (cinemaComplex !== null) {
                const get = async () => {
                    const res = await movieUserApi.getMovieByCinemaComplex(cinemaComplex);
                    console.log('resne:', res);
                    setMovieData(res)
                };
                get();
            }
        } catch (error) {
            console.log(error);
        }
    }, [cinemaComplex]);

    return (
        <>
            <Row className={cx('wrapper')}>
                <Col span={24} className={cx('col1')}>
                    <Row>
                        <Col span={24} className={cx('col1-dia-chi')}>
                            <Row className={cx('container')}>
                                <Col span={2} style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className={cx('border-img')}>
                                        <img
                                            className={cx('img')}
                                            // src="https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170617-637584231772974269.png"
                                            src={
                                                'http://localhost:8081/api/upload/' +
                                                (cinemaComplex?.cinemaChain?.image ?? '')
                                            }
                                            alt="l"
                                        />
                                    </div>
                                </Col>
                                <Col span={22}>
                                    <Row>
                                        <Col span={24} className={cx('ten-rap')}>
                                            {/* Lịch chiếu phim Lotte Phú Thọ */}
                                            {'Lịch chiếu phim ' + (cinemaComplex?.name ?? '')}
                                        </Col>
                                        <Col span={24} className={cx('container-info')}>
                                            <div className={cx('chi-tiet-dia-chi')}>
                                                {/* Tầng 4 Lotte Mart Phú Thọ, Số 968 đường Ba Tháng Hai, P.15, Quận 11 */}
                                                {cinemaComplex?.address ?? ''}
                                            </div>
                                            <div className={cx('ban-do')}>[Bản đồ]</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} className={cx('col1-chon-ngay')}>
                            {weekDays.map((day, index) => (
                                <div
                                    key={index}
                                    className={cx('container-day', { active: ngay === index + 1 })}
                                    onClick={() => handleDayClick(index)}
                                >
                                    <div className={cx('ngay')}>{day.date()}</div>
                                    <div className={cx('thu')}>
                                        {index === 0 ? 'Hôm nay' : daysOfWeekInVietnamese[day.day()]}
                                    </div>
                                </div>
                            ))}
                        </Col>
                        <Col span={24} className={cx('col1-su-kien')}>
                            <div className={cx('title-event')}>
                                Ưu đãi 89K/vé 2D cả tuần không giới hạn; 69K/vé 2D, tối đa 1 vé/tháng khi thanh toán
                                bằng Ví Trả Sau
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} className={cx('col2')}>

                    {/* <Row className={cx('container-movie')}>
                        <Col span={4} className={cx('col1-movie')}>
                            <div className={cx('border-movie')}>
                                <img
                                    className={cx('img-movie')}
                                    src="https://cinema.momocdn.net/img/21556485482318514-poster.jpg"
                                    alt=""
                                />
                            </div>
                        </Col>

                        <Col span={20} className={cx('col2-movie')}>
                            2
                        </Col>
                    </Row> */}

                    {movieData.map((movie) => (
                        <Row className={cx('container-movie')}>
                        <Col span={4} className={cx('col1-movie')}>
                            <div className={cx('border-movie')}>
                                <img
                                    className={cx('img-movie')}
                                    src="https://cinema.momocdn.net/img/21556485482318514-poster.jpg"
                                    alt=""
                                />
                            </div>
                        </Col>
                        <Col span={20} className={cx('col2-movie')}>
                            <Row>
                                <Col span={24} className={cx('container-thong-tin-phim')}>
                                    <div className={cx('k')}>{movie.mpaaRating.ratingCode}</div>
                                    <div className={cx('ten-phim')}>{movie.title}</div>
                                    <div className={cx('the-loai-phim')}>Chính Kịch, Lãng Mạn</div>
                                </Col>
                                <Col span={24} className={cx('container-suat-chieu')}>
                                    <div className={cx('title')}>2D Phụ đề</div>
                                    <div className={cx('suat-chieu')}>
                                        <Button className={cx('btn-suat-chieu')} danger>
                                            <span className={cx('gio-bat-dau')}>20:45</span>
                                            <span className={cx('gio-ket-thuc')}>21:45</span>
                                        </Button>
                                        <Button className={cx('btn-suat-chieu')} danger>
                                            <span className={cx('gio-bat-dau')}>20:45</span>
                                            <span className={cx('gio-ket-thuc')}>21:45</span>
                                        </Button>
                                        <Button className={cx('btn-suat-chieu')} danger>
                                            <span className={cx('gio-bat-dau')}>20:45</span>
                                            <span className={cx('gio-ket-thuc')}>21:45</span>
                                        </Button>
                                        <Button className={cx('btn-suat-chieu')} danger>
                                            <span className={cx('gio-bat-dau')}>20:45</span>
                                            <span className={cx('gio-ket-thuc')}>21:45</span>
                                        </Button>
                                        <Button className={cx('btn-suat-chieu')} danger>
                                            <span className={cx('gio-bat-dau')}>20:45</span>
                                            <span className={cx('gio-ket-thuc')}>21:45</span>
                                        </Button>
                                    </div>
                                </Col>

                                <Col span={24} className={cx('container-suat-chieu')}>
                                    <div className={cx('title')}>2D Phụ đề</div>
                                    <div className={cx('suat-chieu')}>
                                        <Button className={cx('btn-suat-chieu')} danger>
                                            <span className={cx('gio-bat-dau')}>20:45</span>
                                            <span className={cx('gio-ket-thuc')}>21:45</span>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    ))}
                </Col>
            </Row>
        </>
    );
}

export default ListPhim;
