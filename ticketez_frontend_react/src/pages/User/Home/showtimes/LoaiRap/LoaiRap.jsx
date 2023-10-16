import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Input } from 'antd';
import { EnvironmentOutlined, AimOutlined } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';

import style from './LoaiRap.module.scss';
const cx = classNames.bind(style);

function LoaiRap() {
    const [a, setA] = useState(true);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', { active: a, titleA: !a })}>
                <div className={cx('border')}>
                    <img
                        className={cx('img')}
                        src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                        alt=""
                    />
                </div>
                <div className={cx('title')}>Tất cả</div>
            </div>
            <div className={cx('container')}>
                <div className={cx('border')}>
                    <img
                        className={cx('img')}
                        src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                        alt=""
                    />
                </div>
                <div className={cx('title')}>Lotte Cinnnnn</div>
            </div>
            <div className={cx('container')}>
                <div className={cx('border')}>
                    <img
                        className={cx('img')}
                        src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                        alt=""
                    />
                </div>
                <div className={cx('title')}>Beta Cineeeee</div>
            </div>
            <div className={cx('container')}>
                <div className={cx('border')}>
                    <img
                        className={cx('img')}
                        src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                        alt=""
                    />
                </div>
                <div className={cx('title')}>Galaxy Cinnn</div>
            </div>
            <div className={cx('container')}>
                <div className={cx('border')}>
                    <img
                        className={cx('img')}
                        src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                        alt=""
                    />
                </div>
                <div className={cx('title')}>galaxy19991kcsnda</div>
            </div>
        </div>
    );
}

export default LoaiRap;
