import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Input } from 'antd';
import { EnvironmentOutlined, AimOutlined } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Avatar, List, Skeleton } from 'antd';
import classNames from 'classnames/bind';
import style from './Ngay.module.scss';

const cx = classNames.bind(style);

function Ngay() {
    const [ngay, setNgay] = useState(1);

    return (
        <>
            <Row className={cx('wrapper')}>
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
                <Col span={24} className={cx('col2')}>2</Col>
                <Col span={24} className={cx('col3')}>3</Col>

            </Row>
        </>
    );
}

export default Ngay;
