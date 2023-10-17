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
    return (
        <>
            <Row className={cx('wrapper')}>
                <Col span={24} className={cx('col1')}>
                    <Row>
                        <Col span={24} className={cx('col1-dia-chi')}>
                            <Row className={cx('container')}>
                                <Col span={2} style={{ backgroundColor: 'red', display: 'flex', alignItems: 'center' }}>
                                    <div className={cx('border-img')}>
                                        <img
                                            className={cx('img')}
                                            src="https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170617-637584231772974269.png"
                                            width={32}
                                            height={32}
                                            alt=""
                                        />
                                    </div>
                                </Col>
                                <Col span={22} >
                                    <Row>
                                        <Col span={24} className={cx('ten-rap')}>
                                            Name
                                        </Col>
                                        <Col span={24}className={cx('container-info')} >
                                            <div className={cx('chi-tiet-dia-chi')} >detailsdetailsdetailsdtailsdetailsdetailsdetailsdetailsdetailsdtailsdetailsdetails detailsdetailsdetailsdtailsdetailsdetails</div>
                                            <div className={cx('ban-do')} >[Bản đồ]</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            {/* <div className={cx('container')}>
                                <img
                                    className={cx('img')}
                                    src="https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170617-637584231772974269.png"
                                    width={36}
                                    alt=""
                                />
                                <div className={cx('info')}>
                                    <div className={cx('name')}>Name</div>
                                    <div className={cx('details')}>
                                        detailsdetailsdetailsdetailsdetailsdetailsdetailsdetailsdetailsdlsdetailsdetailsdetailsdetails<span className={cx('span')}>[ Bản đồ ]</span>
                                    </div>
                                    
                                </div>
                                

                            </div> */}
                        </Col>
                        <Col span={24} className={cx('col1-chon-ngay')}>
                            <div className={cx('ngay')}>ádasd</div>
                            <div className={cx('ngay')}>ádasd</div>
                            <div className={cx('ngay')}>ádasd</div>
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
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                </Col>
            </Row>
        </>
    );
}

export default ListPhim;
