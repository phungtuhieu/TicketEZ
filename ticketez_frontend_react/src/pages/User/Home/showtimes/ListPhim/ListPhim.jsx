import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Input } from 'antd';
import { EnvironmentOutlined, AimOutlined } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Avatar, List, Skeleton } from 'antd';
import classNames from 'classnames/bind';
import style from './ListPhim.module.scss';

const cx = classNames.bind(style);

function ListPhim() {
    const [ngay, setNgay] = useState(1);

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
                                            src="https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170617-637584231772974269.png"
                                            alt=""
                                        />
                                    </div>
                                </Col>
                                <Col span={22}>
                                    <Row>
                                        <Col span={24} className={cx('ten-rap')}>
                                            Lịch chiếu phim Lotte Phú Thọ
                                        </Col>
                                        <Col span={24} className={cx('container-info')}>
                                            <div className={cx('chi-tiet-dia-chi')}>
                                                Tầng 4 Lotte Mart Phú Thọ, Số 968 đường Ba Tháng Hai, P.15, Quận 11
                                            </div>
                                            <div className={cx('ban-do')}>[Bản đồ]</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} className={cx('col1-chon-ngay')}>
                            <div className={cx('container-day', { active: ngay === 1 })} onClick={() => setNgay(1)}>
                                <div className={cx('ngay')}>17</div>
                                <div className={cx('thu')}>Hôm nay</div>
                            </div>
                            <div className={cx('container-day', { active: ngay === 2 })} onClick={() => setNgay(2)}>
                                <div className={cx('ngay')}>18</div>
                                <div className={cx('thu')}>Thứ 4</div>
                            </div>
                            <div className={cx('container-day', { active: ngay === 3 })} onClick={() => setNgay(3)}>
                                <div className={cx('ngay')}>19</div>
                                <div className={cx('thu')}>Thứ 5</div>
                            </div>
                            <div className={cx('container-day', { active: ngay === 4 })} onClick={() => setNgay(4)}>
                                <div className={cx('ngay')}>20</div>
                                <div className={cx('thu')}>Thứ 7</div>
                            </div>
                            <div className={cx('container-day', { active: ngay === 5 })} onClick={() => setNgay(5)}>
                                <div className={cx('ngay')}>21</div>
                                <div className={cx('thu')}>Chủ Nhật</div>
                            </div>
                            <div className={cx('container-day', { active: ngay === 6 })} onClick={() => setNgay(6)}>
                                <div className={cx('ngay')}>22</div>
                                <div className={cx('thu')}>Thứ 2</div>
                            </div>
                            <div className={cx('container-day', { active: ngay === 7 })} onClick={() => setNgay(7)}>
                                <div className={cx('ngay')}>23</div>
                                <div className={cx('thu')}>Thứ 3</div>
                            </div>
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
                            2
                        </Col>
                    </Row>

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
                                    <div className={cx('')}>16</div>
                                    <div className={cx('')}>Muôn Kiếp Nhân Duyên</div>
                                    <div className={cx('')}>Chính Kịch, Lãng Mạn</div>
                                </Col>
                                <Col span={24} className={cx('container-suat-chieu')}>
                                    <div>2D Phụ đề</div>
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
                </Col>
            </Row>
        </>
    );
}

export default ListPhim;
