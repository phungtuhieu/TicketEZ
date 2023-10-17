import React, { useState } from 'react';
import { Row, Col } from 'antd';
import classNames from 'classnames/bind';
import style from './LoaiRap.module.scss';
import CumRap from '../ListCumRap/CumRap';

const cx = classNames.bind(style);

function LoaiRap({ diaDiem }) {
    const [a, setA] = useState(true);
    const [loai, setLoai] = useState('tất cả');

    const diemVaLoai = {
        diaDiem,
        loai,
    };
    console.log('lay duoc dia diem roi', diaDiem);

    return (
        <Row style={{ height: '100%' }}>
            <Col span={24} className={cx('Loai-rap-col')}>
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
                    <div className={cx('container')} onClick={() => setLoai('1')}>
                        <div className={cx('border')}>
                            <img
                                className={cx('img')}
                                src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                                alt=""
                            />
                        </div>
                        <div className={cx('title')}>Lotte Cinnnnn</div>
                    </div>
                    <div className={cx('container')} onClick={() => setLoai('2')}>
                        <div className={cx('border')}>
                            <img
                                className={cx('img')}
                                src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                                alt=""
                            />
                        </div>
                        <div className={cx('title')}>Beta Cineeeee</div>
                    </div>
                    <div className={cx('container')} onClick={() => setLoai('3')}>
                        <div className={cx('border')}>
                            <img
                                className={cx('img')}
                                src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                                alt=""
                            />
                        </div>
                        <div className={cx('title')}>Galaxy Cinnn</div>
                    </div>
                </div>
            </Col>
            <CumRap diaVaLoai={diemVaLoai} />
        </Row>
    );
}

export default LoaiRap;
