import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Input } from 'antd';
import { EnvironmentOutlined, AimOutlined } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Avatar, List, Skeleton } from 'antd';
import classNames from 'classnames/bind';
import style from './Ngay.module.scss';
import ListPhim from '../ListPhim/ListPhim';

const cx = classNames.bind(style);

function Ngay() {
    const [ngay, setNgay] = useState(1);
    const [a, setA] = useState(true);
    const [loai, setLoai] = useState(0);

    console.log(loai, ngay);

    return (
        <>
            <Row className={cx('wrapper')}>
                <Col span={24} className={cx('col1')}>
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
                <Col span={24} className={cx('col2')}>
                    <div className={cx('wrapper-loai-rap')}>
                        <div className={cx('container',{ active: loai === 0 })} onClick={() => setLoai(0)}>
                            <div className={cx('border')}>
                                <img
                                    className={cx('img')}
                                    src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                                    alt=""
                                />
                            </div>
                            <div className={cx('title')}>Tất cả</div>
                        </div>
                        <div className={cx('container', { active: loai === 1 }, { active: loai === 1 })} onClick={() => setLoai(1)}>
                            <div className={cx('border')}>
                                <img
                                    className={cx('img')}
                                    src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                                    alt=""
                                />
                            </div>
                            <div className={cx('title')}>Lotte Cinnnnn</div>
                        </div>
                        <div className={cx('container', { active: loai === 2 })} onClick={() => setLoai(2)}>
                            <div className={cx('border')}>
                                <img
                                    className={cx('img')}
                                    src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                                    alt=""
                                />
                            </div>
                            <div className={cx('title')}>Beta Cineeeee</div>
                        </div>
                        <div className={cx('container', { active: loai === 3 })} onClick={() => setLoai(3)}>
                            <div className={cx('border')}>
                                <img
                                    className={cx('img')}
                                    src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                                    alt=""
                                />
                            </div>
                            <div className={cx('title')}>Galaxy Cinnn</div>
                        </div>
                        <div className={cx('container', { active: loai === 4 })} onClick={() => setLoai(4)}>
                            <div className={cx('border')}>
                                <img
                                    className={cx('img')}
                                    src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                                    alt=""
                                />
                            </div>
                            <div className={cx('title')}>Beta Cineeeee</div>
                        </div>
                    </div>
                </Col>
                <Col span={24} className={cx('col3')}>
                    <ListPhim/>
                </Col>
            </Row>
        </>
    );
}

export default Ngay;
